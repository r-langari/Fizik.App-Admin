import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import CheckboxTree from 'react-checkbox-tree';
import Button from '@material-ui/core/Button';
import { FormDataConsumer, REDUX_FORM_NAME } from 'react-admin';
import { change } from 'redux-form';
import { faCoffee, faChevronLeft } from '@fortawesome/free-solid-svg-icons';

export default class InsertSubject extends React.Component {
    state = {
        checked: [],
        expanded: [],
        nodes:[],
        isRender:false
    };

    list_to_tree = (list)=> {
        var map = {}, node, roots = [], i;
        for (i = 0; i < list.length; i += 1) {
            map[list[i].id] = i; // initialize the map
            list[i].children = []; // initialize the children
        }
        for (i = 0; i < list.length; i += 1) {
            node = list[i];
            if (node.parentId !== "0") {
                //  if you have dangling branches check that map[node.parentId] exists
                if (map[node.parentId]) {
                list[map[node.parentId]].children.push(node);
                }
            } else {
                roots.push(node);
            }
        }
        return roots;
    }
    
    componentDidMount() {
        fetch(process.env.REACT_APP_API_URL+`/subjects/allsubjects`, {
            method: 'GET', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, cors, *same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json',
                // 'authorization': `Bearer ${token}`,
            },
            redirect: 'follow', // manual, *follow, error
            referrer: 'no-referrer', // no-referrer, *client
            // body: JSON.stringify(data), // body data type must match "Content-Type" header
            })
            .then(response => response.json())
            .then(response => {
                this.setState({
                    nodes:this.list_to_tree(response.data)
                }, () => {
                    this.setState({isRender:true});
                });
            });
    }

    render() {
        return (
           <div style={{
               direction: 'rtl',
               fontFamily:'IranSans'
                }}>
                    <FormDataConsumer>
                    {({ formData, dispatch, ...rest }) => (
                    <CheckboxTree
                    nodes={this.state.nodes}
                    checked={this.state.checked}
                    expanded={this.state.expanded}
                    onCheck={ (checked) => {
                        this.setState({ checked }, () => {
                            dispatch(
                                change(REDUX_FORM_NAME, 'subjects', this.state.checked)
                            )
                        });
                    }}
                    onExpand={expanded => this.setState({ expanded })}
                    icons={{
                        // check: <FontAwesomeIcon icon={faCoffee} />,
                        // uncheck: <FontAwesomeIcon icon={faChevronLeft} />,
                        // halfCheck: <FontAwesomeIcon icon={faChevronLeft} />,
                        expandClose: <FontAwesomeIcon icon={faChevronLeft} />,
                        expandOpen: <FontAwesomeIcon icon={faChevronLeft} />,
                        // expandAll: <FontAwesomeIcon icon={faChevronLeft} />,
                        // collapseAll: <FontAwesomeIcon icon={faChevronLeft} />,
                        // parentClose: <FontAwesomeIcon icon={faChevronLeft} />,
                        // parentOpen: <FontAwesomeIcon icon={faChevronLeft} />,
                        // leaf: <FontAwesomeIcon icon={faChevronLeft} />
                    }}
                    noCascade
                />
                )}
                </FormDataConsumer>
            </div> 
        ) 
    }
}
