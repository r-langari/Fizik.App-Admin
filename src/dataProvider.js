import { stringify } from 'query-string';
import {
    fetchUtils,
    GET_LIST,
    GET_ONE,
    GET_MANY,
    GET_MANY_REFERENCE,
    CREATE,
    UPDATE,
    UPDATE_MANY,
    DELETE,
    DELETE_MANY,
} from 'react-admin';
import lodash from 'lodash';
import forEach from 'lodash/forEach';
var _ = lodash;
const convertToWaterline = (filters) => {

    let where = {}
    forEach(filters, (value, key) => {
        if(key.endsWith("_id") || typeof value !== "string") {
            where[key] = value
        } else {
            const words = value.trim().split(" ")
            if(words.length === 1) {
                where[key] = { contains: words[0] }
            } else {
                where["and"] = words.map( word => ({[key]: {contains: word}}))
            }
        }        
    })

    return where
}

/**
 * Maps react-admin queries to a json-server powered REST API
 *
 * @example
 * GET_LIST     => GET http://my.api.url/posts?_sort=title%20ASC&skip=0&limit=24
 * GET_ONE      => GET http://my.api.url/posts/123
 * GET_MANY     => GET http://my.api.url/posts/?where={"id": [123,456,789]}
 * UPDATE       => PUT http://my.api.url/posts/123
 * CREATE       => POST http://my.api.url/posts/123
 * DELETE       => DELETE http://my.api.url/posts/123
 */
export default (apiUrl, httpClient = fetchUtils.fetchJson) => {
    /**
     * @param {String} type One of the constants appearing at the top if this file, e.g. 'UPDATE'
     * @param {String} resource Name of the resource to fetch, e.g. 'posts'
     * @param {Object} params The data request params, depending on the type
     * @returns {Object} { url, options } The HTTP request parameters
     */
    const convertDataRequestToHTTP = (type, resource, params) => {
        let url = '';
        const options = {};
        switch (type) {
            case GET_LIST: {
                const { page, perPage } = params.pagination;
                const { field, order } = params.sort;
                const rowId = params.rowId;
                const where = convertToWaterline(params.filter)
                const query = {
                    where: JSON.stringify(where),
                    sort: `${field} ${order}`,
                    skip: (page - 1) * perPage,
                    limit: perPage,
                    rowId: rowId
                };
                url = `${apiUrl}/${resource}?${stringify(query)}`;
                break;
            }
            case GET_ONE:
                url = `${apiUrl}/${resource}/${params.id}`;
                break;
            case GET_MANY_REFERENCE: {
                const { page, perPage } = params.pagination;
                const { field, order } = params.sort;
                const query = {
                    ...fetchUtils.flattenObject(params.filter),
                    [params.target]: params.id,
                    sort: `${field} ${order}`,
                    skip: (page - 1) * perPage,
                    /*FIXME:
                    pagination does not work as expected for more than 10 
                    in list view
                    */
                    limit: perPage

                };
                url = `${apiUrl}/${resource}?${stringify(query)}`;
                break;
            }
            case UPDATE:
                
                url = `${apiUrl}/${resource}/${params.id}`;
                options.method = 'PUT';
                options.body = JSON.stringify(params.data);
                break;
            case CREATE:
                url = `${apiUrl}/${resource}`;
                options.method = 'POST';
                var formData = new FormData();
                
                Object.keys(params.data).forEach(function (item) {
                    if(item != "tags" && item != "category")
                        formData.append(item, params.data[item]);

                    if (item == "tags")
                        formData.append("tags", JSON.stringify(params.data[item]));
                    
                    if (item == "category")
                        formData.append("category", JSON.stringify(params.data[item]));

                });
                
                options.body = formData ;//JSON.stringify({'name':'milad'});
                break;
            case DELETE:
                url = `${apiUrl}/${resource}/${params.id}`;
                options.method = 'DELETE';
                break;
            case GET_MANY: {
                const idsToLookOut = _.map(params.ids, look => typeof look === "object" ? look.id : look);
                const query = {
                    where: JSON.stringify({id: idsToLookOut})
                };
                url = `${apiUrl}/${resource}?${stringify(query)}`;
                break;
            }
            default:
                throw new Error(`Unsupported fetch action type ${type}`);
        }
        return { url, options };
    };

    /**
     * @param {Object} response HTTP response from fetch()
     * @param {String} type One of the constants appearing at the top if this file, e.g. 'UPDATE'
     * @param {String} resource Name of the resource to fetch, e.g. 'posts'
     * @param {Object} params The data request params, depending on the type
     * @returns {Object} Data response
     */
    const convertHTTPResponse = (response, type, resource, params) => {
        const { headers, json } = response;
        switch (type) {
            case GET_LIST:
            case GET_MANY_REFERENCE:
                /*
                FIXME:
                we must send this header from server in sails js via the x-total-count header
                */
                // if (!headers.has('x-total-count')) {
                //     throw new Error(
                //         'The X-Total-Count header is missing in the HTTP Response. The jsonServer Data Provider expects responses for lists of resources to contain this header with the total number of results to build the pagination. If you are using CORS, did you declare X-Total-Count in the Access-Control-Expose-Headers header?'
                //     );
                // }
                return {
                    data: json.data,
                    total: json.dataLength
                };
            case CREATE:
                return { data: { ...params.data, id: json.id } };
            default:
                return { data: json };
        }
    };

    /**
     * @param {string} type Request type, e.g GET_LIST
     * @param {string} resource Resource name, e.g. "posts"
     * @param {Object} payload Request parameters. Depends on the request type
     * @returns {Promise} the Promise for a data response
     */
    return (type, resource, params) => {
        // json-server doesn't handle filters on UPDATE route, so we fallback to calling UPDATE n times instead
        if (type === UPDATE_MANY) {
            return Promise.all(
                params.ids.map(id =>
                    httpClient(`${apiUrl}/${resource}/${id}`, {
                        method: 'PATCH',
                        body: JSON.stringify(params.data),
                    })
                )
            ).then(responses => ({
                data: responses.map(response => response.json),
            }));
        }
        // json-server doesn't handle filters on DELETE route, so we fallback to calling DELETE n times instead
        if (type === DELETE_MANY) {
            return Promise.all(
                params.ids.map(id =>
                    httpClient(`${apiUrl}/${resource}/${id}`, {
                        method: 'DELETE',
                    })
                )
            ).then(responses => ({
                data: responses.map(response => response.json),
            }));
        }
        const { url, options } = convertDataRequestToHTTP(
            type,
            resource,
            params
        );
        return httpClient(url, options).then(response =>
            convertHTTPResponse(response, type, resource, params)
        );
    };
};