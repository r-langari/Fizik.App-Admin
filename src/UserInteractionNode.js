/*
        TODO: 
        1 - it's better to add new messages in memory tree and then sync it with server
    */
import React from 'react';
import Thumbnail from './ThumbnailImage';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Switch from '@material-ui/core/Switch';

import PropTypes from 'prop-types';
// import Di from './d';

class UserInteractionNode extends React.Component {

  constructor(props) {
    super(props);
    this.textInput = React.createRef();
    this.focusTextInput = this.focusTextInput.bind(this);
    this.state = {
      interactionData: []
    };

  }


  componentDidMount() {
    this.fetchProductsQuestions();
  }

  showReplyMessage() {
    return this.replyMessage;
  }

  toggleAllocation = (m) => {
    console.info('m is:', m);
    const token = localStorage.getItem('token');
    const dataRecord = {
      allowcation: !m.isAllowed,
      userInteractionId: m.id
    }
    fetch(process.env.REACT_APP_API_URL + '/userinteractions/toggleallowcation', {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        'authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(dataRecord),
      redirect: 'follow',
      referrer: 'no-referrer',
    })
      .then(res => {
        console.info('result:', res);
        this.fetchProductsQuestions();
      });
  }

  makeTextEmpty = () => {
    console.info(this);
    // this.refs.somename.value = '';
    // this.replyMessage = '';
  }

  sendReplyToQuestion(item) {
    console.info('item:', item);
    const dataRecord = {
      message: this.replyMessage,
      parentId: (item != null) ? item.id : '',
      modelId: this.props.modelid,
      model: this.props.model,
      type: this.props.type
    }
    this.focusTextInput();
    const token = localStorage.getItem('token');
    fetch(process.env.REACT_APP_API_URL + '/userinteractions', {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        'authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(dataRecord),
      redirect: 'follow',
      referrer: 'no-referrer',
    })
      .then(response => response.json())
      .then((myJson) => {
        if (myJson.errorMessage !== '') {
          console.info('result:', myJson);
        } else {

          // this.setState({
          //   replyMessage: ''
          // });
          this.fetchProductsQuestions();
        }
      });
  }

  getReplyMessage = () => {
    return this.replyMessage;
  }

  setReplyMessage = (e) => {
    this.replyMessage = e.target.value;
  };

  sendByEnter = (event, m) => {
    console.info('bexin:', event.charCode);
    if (event.charCode === 13) {
      this.sendReplyToQuestion(m);
    }
  }

  deleteComment = (comment) => {
    fetch(process.env.REACT_APP_API_URL + `/userinteractions/${comment.id}`, {
      method: 'DELETE',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
      redirect: 'follow',
      referrer: 'no-referrer',
    })
      // .then(response => response.json())
      .then(interactionData => {
        this.fetchProductsQuestions();
      });
  }

  focusTextInput() {
    // Explicitly focus the text input using the raw DOM API
    // Note: we're accessing "current" to get the DOM node
    this.textInput.current.value = '';
  }

  fetchProductsQuestions = () => {
    const token = localStorage.getItem('token');
    this.setState({
      replyMessage: null
    });
    fetch(process.env.REACT_APP_API_URL + `/userinteractions?model=${this.props.model}&modelid=${this.props.modelid}&type=${this.props.type}&isAdmin=${true}`, {
      method: 'GET',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        'authorization': `Bearer ${token}`,
      },
      redirect: 'follow',
      referrer: 'no-referrer',
    })
      .then(response => response.json())
      .then(interactionData => {
        this.setState({
          interactionData: interactionData.data
        }, function () {

        });
      });
  }

  render() {
    var data = [],
      mappedArr = {},
      arrElem,
      mappedElem;
    {/*TODO: we MUST create a component for COMMENT as a tree view!*/ }
    // First map the nodes of the array to an object -> create a hash table.

    {/*TODO: we must change the below code to a function!*/ }
    for (var i = 0, len = this.state.interactionData.length; i < len; i++) {
      arrElem = this.state.interactionData[i];
      mappedArr[arrElem.id] = arrElem;
      mappedArr[arrElem.id]['children'] = [];
    }

    for (var id in mappedArr) {
      if (mappedArr.hasOwnProperty(id)) {
        mappedElem = mappedArr[id];
        // If the element is not at the root level, add it to its parent array of children.
        if (mappedElem.parentId) {
          mappedArr[mappedElem['parentId']]['children'].push(mappedElem);
        }
        // If the element is at the root level, add it to first level elements array.
        else {
          data.push(mappedElem);
        }
      }
    }
    const Menu = ({ data }) => {
      {/*TODO: we have lots of errors in console for this DOM node style!*/ }
      return (
        <React.Fragment>
          <List>
            {data.map((m, i) => {
              return (
                <ListItem key={i} alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar
                      title={m.userInfo ? m.userInfo.firstName + ' ' + m.userInfo.lastName : 'کاربر ناشناخته'}
                      alt={m.userInfo ? m.userInfo.firstName + ' ' + m.userInfo.lastName : 'کاربر ناشناخته'}
                      src={m.userInfo ? m.userInfo.thumbnail : ''} />
                  </ListItemAvatar>
                  <ListItemText

                    primary={<Typography
                      style={{
                        fontFamily: 'Almarai',
                        color: 'black',
                        fontSize: '12px'
                      }}
                    >
                      {m.message}
                    </Typography>}

                    secondary={
                      <React.Fragment>
                        <Typography
                          component="span"
                          variant="body2"
                          color="textPrimary"
                        >
                          {/* <Link
                            href={m.userInfo ? m.userInfo.url : ''}
                            style={{ fontFamily: 'Almarai', fontSize: '12px' }}
                          > */}
                            {m.userInfo ? m.userInfo.firstName + ' ' + m.userInfo.lastName : 'کاربر ناشناخته'}
                          {/* </Link> */}

                        </Typography>
                               &nbsp;
                               <Typography
                          style={{ fontFamily: 'Almarai', fontSize: '12px' }}
                        >
                          {m.jalaaliUserFriendlyCreatedDate}
                        </Typography>
                        <Typography
                          style={{ fontFamily: 'IranSans_UltraLight' }}
                        >
                          {m.canDelete ?
                            <div
                              onClick={() => this.deleteComment(m)}
                            >X</div> : null
                          }
                        </Typography>
                        {(localStorage.getItem('token')) ?
                          <div>
                            <input
                              onKeyPress={(event) => this.sendByEnter(event, m)}
                              margin="dense"
                              placeholder="نظر شما چیست"
                              type="text"
                              onChange={(e) => this.setReplyMessage(e)}
                            />

                            <Button
                              variant="contained"
                              // onClick= {this.sendReplyToQuestion.bind(this, m)}
                              onClick={() => this.sendReplyToQuestion(m)}
                              color="primary"
                              style={{
                                fontFamily: 'IranSans_UltraLight'
                              }}
                            >ارسال</Button>
                            <Switch
                              checked={m.isAllowed}
                              onChange={() => this.toggleAllocation(m)}
                              name="checkedA"
                              inputProps={{ 'aria-label': 'secondary checkbox' }}
                            />
                          </div>
                          : null}
                               &nbsp;
                               {m.children && <Menu data={m.children} />}
                      </React.Fragment>
                    }
                  />

                </ListItem>
              );
            })}
          </List>
        </React.Fragment>
      );
    }

    return (
      <React.Fragment>
        {(localStorage.getItem('token')) ?
          <div>
            <input
              type="text"
              onKeyPress={(event) => this.sendByEnter(event)}
              margin="dense"
              placeholder="1نظر شما چیست"
              ref={this.textInput}
              onChange={(e) => this.setReplyMessage(e)}
            />

            <Button
              variant="contained"
              onClick={() => this.sendReplyToQuestion()}
              color="primary"
              style={{
                fontFamily: 'IranSans_UltraLight'
              }}
            >
              ارسال
               </Button>

          </div>
          : null}
        <Menu data={data} />
      </React.Fragment>
    )
  }

}

export default UserInteractionNode;