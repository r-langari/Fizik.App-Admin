import React from 'react';
import Button from '@material-ui/core/Button';
import { push } from 'react-router-redux';
import { CREATE, withDataProvider} from 'react-admin';
import MyTextField from './MyTextfield';
import { UPDATE } from 'ra-core';
import { increaseCatSizeAction } from './action';
import { connect } from 'react-redux';

class RequestsResponseBox extends React.Component {
    
    constructor (props) {
        super (props);
        this.state = {
            response : ''
        }
    }
    
    componentDidMount () {
        
    }
    
    handleChange = (e) => {
        e.persist();
        this.setState((state, props) => {
            return {response: e.target.value};
          });
    }
    
    sendAdminResponse = () => {
        // console.info('sendAdminResponse happend');
        const { dataProvider, dispatch, record } = this.props;
        const ResponseRecord = { 
            adminAnswer: this.state.response,
            id: record.id,
        };
        dataProvider(UPDATE, 'requests', { id: record.id, data: ResponseRecord })
            .then(() => {
               dispatch(push(`/tags`));
               let rand = Math.floor(Math.random() * 100) + 1;
               dispatch(push(`/requests?limit=${10}&skip=${0}&rand=${rand}`));
               const increaseCatSize = this.props.increaseCatSize;
               increaseCatSize(2);
            })
            .catch((e) => {
               
        });
        let data = {
            userId : this.props.record.userId,
            message : 'مدیر به درخواست شما پاسخ داد',
            type:'1'
        }

        fetch(process.env.REACT_APP_API_URL+`/messages`, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, cors, *same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json'
            },
            redirect: 'follow', // manual, *follow, error
            referrer: 'no-referrer', // no-referrer, *client
            body: JSON.stringify(data), // body data type must match "Content-Type" header
            })
            .then(response => response.json())
            .then(result => {
                
            });
    }

    render () {
        return (
            <React.Fragment>
                <MyTextField
                    id="filled-multiline-flexible"
                    label="what do you think?"
                    multiline
                    rowsMax="4"
                    margin="normal"
                    onChange={this.handleChange.bind(this)}
                />
                <br />
                <Button 
                    label="Approve" 
                    onClick={this.sendAdminResponse} 
                    >
                    send answer
                </Button>
            </React.Fragment>
        )
    }

}

const mapDispatchToProps = dispatch => ({
    increaseCatSize: (howMuch) => {
        fetch(process.env.REACT_APP_API_URL+'/criticisms/badgecount', { method: 'GET', headers: {}})
        .then((response) => {
            return response.json();
        })
        .then((myJson) => {
            dispatch(increaseCatSizeAction(myJson.data))
        })
        .catch((e) => {
            // showNotification('Error: comment not approved', 'warning')
        });
        
    }
});

export default connect(null, mapDispatchToProps)(withDataProvider(RequestsResponseBox));