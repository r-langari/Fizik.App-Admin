import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Switch from '@material-ui/core/Switch';
import VoiceOverOffIcon from '@material-ui/icons/VoiceOverOff';
import MoneyIcon from '@material-ui/icons/Money';
import MessageIcon from '@material-ui/icons/Message';
import CommentIcon from '@material-ui/icons/Comment';
import ReportIcon from '@material-ui/icons/Report';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import LiveHelpIcon from '@material-ui/icons/LiveHelp';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { withDataProvider, CREATE, showNotification } from 'react-admin';
import PropTypes from 'prop-types';
import { UPDATE } from 'ra-core';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import { makeStyles } from '@material-ui/core/styles';
import Icon from '@material-ui/core/Icon';


class UserManageTab extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            suspend: this.props.record.suspend,
            commentAuthorization : this.props.record.commentAuthorization,
            reportAuthorization : this.props.record.reportAuthorization,
            requestAuthorization : this.props.record.requestAuthorization,
            QAAuthorization : this.props.record.QAAuthorization,
            message : '',
            fCoin : this.props.record.fCoin
        };
    }
    
    setMessage = (e) => {
        this.setState({message:e.target.value});
      };
    
    setFcoin = (e) => {
        this.setState({fCoin:e.target.value});
    };
    
    handleAuthorization = (authorizationType) => {
        this.setState({ [authorizationType.target.name] : authorizationType.target.checked });
        const { dataProvider } = this.props;
        const updatedRecord = {
            [authorizationType.target.name] : authorizationType.target.checked
        }
        dataProvider(UPDATE, 'users', {
            id: this.props.record.id,
            data: updatedRecord
        })
        .then((res) => {
            
        })
        .catch((e) => {
            console.info('Error: comment not approved', 'warning')
        });
    }
    
    sendMessage = () => {

        const dataRecord = {
            userId: this.props.record.id,
            message: this.state.message,
            type: '1',
        }

        fetch(process.env.REACT_APP_API_URL+'/messages', { 
            method: 'POST', 
            body : JSON.stringify(dataRecord), 
            headers: {}
        })
        .then((response) => {
            return response.json();
        })
        .then((myJson) => {
            // this.fetchQuizes();
        })
        .catch((e) => {
            // showNotification('Error: comment not approved', 'warning')
        });

        // console.info('hiiiiii');
        // const { dataProvider } = this.props;
        // dataProvider(CREATE, 'messages', {
        //     receiver : this.props.record.id,
        //     message:this.state.message
        //   })
        //   .then((res) => {
        //     // this.fetchDirectory(this.state.currentDirectory);
        //     // this.handleClose();
        //   })
        //   .catch((e) => {
        //       console.info('Error: comment not approved', 'warning')
        //   });
        }  
    
    sendFcoin = () => {
        const updatedRecord = {
            fCoin : this.state.fCoin,
            userId: this.props.record.id
        }
        fetch(process.env.REACT_APP_API_URL+'/users/sendfcoin', { 
            method: 'PUT',
            body : JSON.stringify(updatedRecord), 
            headers: {}
        })
        .then((response) => {
            return response.json();
        })
        .then((myJson) => {
            
        })
        .catch((e) => {
            // showNotification('Error: comment not approved', 'warning')
        });

        // const { dataProvider } = this.props;
        // const updatedRecord = {
        //     fCoin : this.state.fCoin
        // }
        // dataProvider(UPDATE, 'users', {
        //         id: this.props.record.id,
        //         data: updatedRecord
        //     })
        //   .then((res) => {
            
        //   })
        //   .catch((e) => {
        //       console.info('Error: comment not approved', 'warning')
        //   });
        }  
    handleUpload = (e) => {
        console.info(e);
    }
    render() {
        const divStyle = {
            display: 'none',
          };
        return (
            <List >
                
                <ListItem>
                    <ListItemIcon>
                    <VoiceOverOffIcon />
                    </ListItemIcon>
                    <ListItemText id="switch-list-label-wifi" primary="suspend" />
                    <ListItemSecondaryAction>
                    <Switch
                        edge="end"
                        checked={this.state.suspend}
                        name="suspend"
                        inputProps={{ 'aria-labelledby': 'switch-list-label-wifi' }}
                        onChange={this.handleAuthorization.bind(this)}
                    />
                    </ListItemSecondaryAction>
                </ListItem>
                
                <ListItem>
                    
                <ListItemIcon>
                    <MoneyIcon />
                    </ListItemIcon>
                    <TextField
                        id="standard-number"
                        onChange={this.setFcoin.bind(this)}
                        label="Amount"
                        type="number"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        margin="normal"
                    />

                    <Button 
                        variant="contained" 
                        onClick={this.sendFcoin.bind(this)}
                        color="primary">
                        Send F-Coin
                    </Button>
                </ListItem>
                
                <ListItem alignItems="flex-start">
        
                    {/* <input 
                        style={divStyle} 
                        accept="image/*" 
                        id="icon-button-file" 
                        type="file"
                        onChange={this.handleUpload()}
                        /> */}
                    {/* <label htmlFor="icon-button-file">
                        <IconButton
                        color="primary"
                        aria-label="upload picture"
                        component="span"
                        >
                        <AttachFileIcon />
                        </IconButton>
                    </label> */}
                    
                    <TextField
                        id="standard-number"
                        onChange={this.setMessage.bind(this)}
                        label="message"
                        type="text"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        margin="normal"
                        fullWidth
                        InputLabelProps={{
                            shrink: true,
                        }}
                        style={{ margin: 8 }}
                    />
                    
                    <Button 
                        variant="contained" 
                        onClick={this.sendMessage.bind(this)}
                        color="primary">
                        send
                    </Button>
        
      </ListItem>
                
                <ListItem>
                    <ListItemIcon>
                    <CommentIcon />
                    </ListItemIcon>
                    <ListItemText id="switch-list-label-wifi" primary="comment authorization" />
                    <ListItemSecondaryAction>
                    <Switch
                        edge="end"
                        checked={this.state.commentAuthorization}
                        name="commentAuthorization"
                        inputProps={{ 'aria-labelledby': 'switch-list-label-wifi' }}
                        onChange={this.handleAuthorization.bind(this)}
                    />
                    </ListItemSecondaryAction>
                </ListItem>
                
                <ListItem>
                    <ListItemIcon>
                        <ReportIcon />
                    </ListItemIcon>
                    <ListItemText id="switch-list-label-bluetooth" primary="report authorization" />
                    <ListItemSecondaryAction>
                        <Switch
                            edge="end"
                            checked={this.state.reportAuthorization}
                            name="reportAuthorization"
                            inputProps={{ 'aria-labelledby': 'switch-list-label-bluetooth' }}
                            onChange={this.handleAuthorization.bind(this)}
                        />
                    </ListItemSecondaryAction>
                </ListItem>
                
                <ListItem>
                    <ListItemIcon>
                        <LiveHelpIcon />
                    </ListItemIcon>
                    <ListItemText id="switch-list-label-bluetooth" primary="request authorization" />
                    <ListItemSecondaryAction>
                        <Switch
                            edge="end"
                            checked={this.state.requestAuthorization}
                            name="requestAuthorization"
                            inputProps={{ 'aria-labelledby': 'switch-list-label-bluetooth' }}
                            onChange={this.handleAuthorization.bind(this)}
                        />
                    </ListItemSecondaryAction>
                </ListItem>
                
                <ListItem>
                    <ListItemIcon>
                        <QuestionAnswerIcon />
                    </ListItemIcon>
                    <ListItemText id="switch-list-label-bluetooth" primary="QA authorization" />
                    <ListItemSecondaryAction>
                        <Switch
                            edge="end"
                            checked={this.state.QAAuthorization}
                            name="QAAuthorization"
                            inputProps={{ 'aria-labelledby': 'switch-list-label-bluetooth' }}
                            onChange={this.handleAuthorization.bind(this)}
                        />
                    </ListItemSecondaryAction>
                </ListItem>
            
            </List>
        );
    }
}


UserManageTab.propTypes = {
    dataProvider: PropTypes.func.isRequired,
};

export default withDataProvider(UserManageTab);