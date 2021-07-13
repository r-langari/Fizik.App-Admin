import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { GET_LIST, withDataProvider, CREATE, showNotification, SimpleForm, GET_ONE } from 'react-admin';
import PropTypes from 'prop-types';
import dataProvider from '../dataProvider.js'
class CreateQuizDialog extends React.Component {
    constructor(props) {
        super (props);
        this.state = {
            open : false
        }
    }

handleClickOpen() {
    this.setState({open: true});
}

handleClose() {
    this.setState({open: false});
}

createQuiz (props) {
    console.info('this', this);
    const { dataProvider } = props;
    dataProvider(CREATE, 'quizes', {
        // name:this.state.folderName,
        // parentId : this.state.currentDirectory
      })
      .then((res) => {
        // this.fetchDirectory(this.state.currentDirectory);
        // this.handleClose();
      })
      .catch((e) => {
          console.info('Error: comment not approved', 'warning')
    });
}

render() {
    return (
        <Button variant="outlined" color="primary" onClick={this.createQuiz}>
            Open form dialog
        </Button>
    );
}
  
}
CreateQuizDialog.propTypes = {
    dataProvider: PropTypes.func.isRequired,
  };
export default withDataProvider(CreateQuizDialog);