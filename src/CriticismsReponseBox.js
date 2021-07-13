import React from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import { push } from 'react-router-redux';
import { UPDATE, withDataProvider} from 'react-admin';
import MyTextField from './MyTextfield';
import { increaseCatSizeAction } from './action';

class CriticismsReponseBox extends React.Component {
    
    constructor (props) {
        super (props);
        this.state = {
            response : ''
        }
        console.info('props:', props);
    }
    
    componentDidMount () {
        
    }
    
    handleChange = (e) => {
        e.persist();
        this.setState((state, props) => {
            return {response: e.target.value};
          });
    }
    
    handleClick = () => {
        const { dataProvider, dispatch, record } = this.props;
        const updatedRecord = { 
            response: this.state.response,
            userId : this.props.record.userId
        };
        dataProvider(UPDATE, 'criticisms', { id: record.id, data: updatedRecord })
            .then(() => {
               dispatch(push(`/tags`));
               let rand = Math.floor(Math.random() * 100) + 1;
               dispatch(push(`/criticisms?limit=${10}&skip=${0}&rand=${rand}`));
               const increaseCatSize = this.props.increaseCatSize;
                increaseCatSize(2);
            })
            .catch((e) => {
               
            });
    }

    render () {
        return (
            <React.Fragment>
                <MyTextField
                    id="filled-multiline-flexible"
                    label="response"
                    multiline
                    rowsMax="4"
                    margin="normal"
                    onChange={this.handleChange.bind(this)}
                />
                <Button 
                    label="Approve" 
                    onClick={this.handleClick} 
                    >
                    send
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

export default connect(null, mapDispatchToProps)(withDataProvider(CriticismsReponseBox));