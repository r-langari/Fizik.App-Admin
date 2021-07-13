import React from 'react';
import { SimpleForm, LongTextInput, CREATE,UPDATE , withDataProvider } from 'react-admin';
import { push } from 'react-router-redux';
import dataProvider from './dataProvider';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class AnswerToRequestForm extends React.Component {
    
    constructor (props) {
        super(props);
        
        this.state = {
            formName : 'answerToRequest',
            response : ''
        }
    }

    setResponse (e) {
        this.setState((state, props) => {
            return {response: e.target.value};
          });
    }

    componentDidMount () {

    }

    submitForm() {
        // console.info(dataProvider);
        // return;
        // const { dataProvider, dispatch, record } = this.props;
        const dataProvider = dataProvider
        dataProvider(process.env.REACT_APP_API_URL+'/requests', { method: 'POST', body: {name:'ali'} })
            .then(() => {
                // showNotification('Comment approved');
                // push('/comments');
            })
            .catch((e) => {
                // showNotification('Error: comment not approved', 'warning')
            });
    }

    render (props) {
        return (
            <SimpleForm
                submitOnEnter = {false}
                save={this.submitForm.bind(this)}
                form={this.state.formName}
                {...props}
            >
                <LongTextInput 
                    source="title" 
                    label="title"
                    onChange={this.setResponse.bind(this)}
                    />
            </SimpleForm>
        )
    }

}

AnswerToRequestForm.propTypes = {
    // dataProvider: PropTypes.func.isRequired,
    // dispatch: PropTypes.func.isRequired,
    // record: PropTypes.object,
};

export default AnswerToRequestForm;