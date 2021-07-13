import React from 'react';
import { Field, reduxForm } from 'redux-form'
import ReduxFormSelect from './MyAutoSelect'

class TagForm extends React.Component {
  
  constructor (props) {
    super (props);
    this.state = {
      tags : [],
      defualtValue : null
    }
  }

  componentDidMount () {
    // console.info('propp:', eval('this.props.record.data.summary' + this.props.default));
    // this.setState({
    //   defualtValue : eval('this.props.record.data.summary' + this.props.default)
    // });
    let finalList = [];
    let tempObj = {};
    fetch(process.env.REACT_APP_API_URL+'/tags', { method: 'GET', headers: {}})
    .then((response) => {
        return response.json();
    })
    .then((myJson) => {
      myJson.data.map(
        (item) => {
          tempObj = {};
          tempObj.label = item.name;
          tempObj.value = item.id;
          tempObj.id = item.id;
          finalList.push(tempObj);
        }
      )
      this.setState((state, props) => {
        return {tags: finalList};
      });
    })
    .catch((e) => {
        // showNotification('Error: comment not approved', 'warning')
    });
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <React.Fragment>
        <div
          style={{
            color: 'rgba(0, 0, 0, 0.54)',
            padding: '35px 9px 7px 0px'
          }}
          >{this.props.label}</div>
        <Field 
          name="tags" 
          label={this.props.label}
          onChange={handleSubmit} 
          component={ReduxFormSelect} 
          options={this.state.tags}
          // pishfarz={this.state.defualtValue}
          />
      </React.Fragment>
    );
  }
}

TagForm.defaultProps = {
  addLabel: true,
};

export default reduxForm({ form: 'record-form' })(TagForm);