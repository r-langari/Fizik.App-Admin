import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Switch from '@material-ui/core/Switch';

class SciencechallengeUserAnswers extends React.Component {
    
    constructor(props) {
        super (props);
        console.info('etelaat:', props);
        this.state = {
            sciencechallengeresponse : []
        }
    }

    changeStatus = (elm) => {
        console.info(elm.target.id);
        // fetch(`http://localhost:1337/sciencechallengeresponse/${this.props.record.id}?isCorrect=${elm.target.checked}`, {
        fetch(process.env.REACT_APP_API_URL+`/sciencechallengeresponse/${elm.target.id}?isCorrect=${elm.target.checked}`, {
            method: 'PUT',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
            },
            redirect: 'follow',
            referrer: 'no-referrer',
            })
            .then(response => response.json())
            .then(sciencechallengeresponse => {
                fetch(process.env.REACT_APP_API_URL+`/Sciencechallengeresponse?sciencechallengeid=${this.props.record.id}`, {
                    method: 'GET', 
                    mode: 'cors',
                    cache: 'no-cache',
                    credentials: 'same-origin',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    redirect: 'follow',
                    referrer: 'no-referrer',
                    })
                    .then(response => response.json())
                    .then(sciencechallengeresponse => {
                        this.setState(function(state, props) {
                            return {
                                sciencechallengeresponse: JSON.parse(JSON.stringify(sciencechallengeresponse.data)),
                            };
                          }, () => {
                            console.info('after set');
                          });
                    });
            });
    }

    componentDidMount() {
        fetch(process.env.REACT_APP_API_URL+`/Sciencechallengeresponse?sciencechallengeid=${this.props.record.id}`, {
            method: 'GET', 
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
            },
            redirect: 'follow',
            referrer: 'no-referrer',
            })
            .then(response => response.json())
            .then(sciencechallengeresponse => {
                this.setState(function(state, props) {
                    return {
                        sciencechallengeresponse: JSON.parse(JSON.stringify(sciencechallengeresponse.data)),
                    };
                  }, () => {
                    console.info('after set');
                  });
            });
    }

    render () {
        return (
            <List>
                {this.state.sciencechallengeresponse.map(
                    (item, index) =>
                        <ListItem 
                            alignItems="flex-start"
                            key={index}
                            >
                            <ListItemAvatar>
                            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                            </ListItemAvatar>
                            <ListItemText
                                primary={item.userinfo.firstName + ' ' + item.userinfo.lastName}
                                secondary={
                                    <React.Fragment>
                                    <Typography
                                        component="span"
                                        variant="body2"
                                        color="textPrimary"
                                    >
                                        
                                    </Typography>
                                    {item.userAnswerMessage}
                                    </React.Fragment>
                                }
                            />
                            <Switch
                                checked={item.isCorrect}
                                id={item.id}
                                onChange={this.changeStatus.bind(this)}
                                value="right"
                                inputProps={{ 'aria-label': 'secondary checkbox' }}
                            />
                        </ListItem>
                )}
            </List>
        );
    }
}
export default SciencechallengeUserAnswers;