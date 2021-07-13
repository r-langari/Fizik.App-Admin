import React from 'react';
import { withDataProvider } from 'react-admin';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Link from '@material-ui/core/Link';
import DialogTitle from '@material-ui/core/DialogTitle';

class Di extends React.Component {
    constructor(props) {
        super (props);
        this.state = {
            open : false,
            replyMessage: ''
          }
    }
      sendReplyToQuestion = () => {
        const dataRecord = {
          message:this.state.replyMessage
        }
        fetch(process.env.REACT_APP_API_URL+'/productsquestions', { 
            method: 'POST', 
            body : JSON.stringify(dataRecord), 
            headers: {}
          }
        )
        .then((response) => {
            return response.json();
        })
        .then((myJson) => {
            this.fetchQuizes();
        })
        .catch((e) => {
            // showNotification('Error: comment not approved', 'warning')
        });
      }

      setReplyMessage = (e) => {
        e.persist();
        this.setState((state, props) => {
          return {replyMessage: e.target.value};
        });
      };
  
      handleClickOpen() {
        this.setState((state, props) => {
          return {open: true};
        });
      }
      
      handleClose() {
        this.setState((state, props) => {
          return {open: false};
        });
      }

    render () {
        return (
            <React.Fragment>
                <Link
                    component="button"
                    variant="body2"
                    onClick={this.handleClickOpen.bind(this)}
                >
                    reply
                </Link>
                <div>milad</div>
                <Dialog open={this.state.open} onClose={this.handleClose.bind(this)} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">reply</DialogTitle>
                <DialogContent>
                <TextField
                    margin="dense"
                    label="write your idea"
                    type="text"
                    onChange={this.setReplyMessage.bind(this)}
                    fullWidth
                />
                </DialogContent>
                <DialogActions>
                <Button onClick={this.handleClose.bind(this)} color="primary">
                    Cancel
                </Button>
                <Button onClick={this.sendReplyToQuestion.bind(this)} color="primary">
                    Send
                </Button>
                </DialogActions>
            </Dialog>
            </React.Fragment>
        )
    }
}
export default withDataProvider(Di);