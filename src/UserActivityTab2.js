import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import NumberOfInvitationsChart from './NumberOfInvitationsChart';
import UserTotalOnlineTimeChart from './UserTotalOnlineTimeChart';
import NumberOfWatchedVideosChart from './NumberOfWatchedVideosChart';
import NumberOfRegisteredDevice from './NumberOfRegisteredDevice';
import InvitationList from './InvitationsList';
import Link from '@material-ui/core/Link';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Checkbox from '@material-ui/core/Checkbox';
import { Link as RouterLink } from 'react-router-dom';
import VideoViewsStatistics from './VideoViewsStatistics'

class AlignItemsList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            listofuserquizes : [],
            isRender: false,
            shoppinglevel : 0
        }
    }

    componentDidMount() {
        console.info('user idd:', this.props);
            fetch(process.env.REACT_APP_API_URL+`/users/listofuserquizes?userId=${this.props.record.id}`, { method: 'GET', headers: {}})
            .then((response) => {
                return response.json();
            })
            .then((myJson) => {

                this.setState({listofuserquizes:myJson.data},() => {
                    // this.setState({isRender:true})
                });

            })
            .catch((e) => {
                // showNotification('Error: comment not approved', 'warning')
            });

            fetch(process.env.REACT_APP_API_URL+`/users/shoppinglevel?userId=${this.props.record.id}`, { 
                method: 'GET',
                headers: {}
            })
            .then((response) => {
                return response.json();
            })
            .then((myJson) => {

                this.setState({shoppinglevel:myJson},() => {
                    // this.setState({isRender:true})
                });

            })
            .catch((e) => {
                // showNotification('Error: comment not approved', 'warning')
            });
    }

    returnCorrectMoneyFormat = (money) => {
        let tempMoney = parseInt(money / 10);
		return new Intl.NumberFormat('fa-IR').format(tempMoney);
	}

    render() {
        return (
        <List>
            <ListItem alignItems="flex-start">

                <ListItemText
                primary="Number of watched videos"
                secondary={
                    <React.Fragment>
                    {/* <Typography
                        component="span"
                        variant="body2"
                        
                        color="textPrimary"
                    >
                        Ali Connors
                    </Typography>
                    {" — I'll be in your neighborhood doing errands this…"} */}
                    </React.Fragment>
                }
                />

                <NumberOfWatchedVideosChart userid={this.props.record.id} />
            </ListItem>
            <Divider variant="inset" component="li" />
            <ListItem alignItems="flex-start">
                <ListItemText
                primary={"Number of invitations : " + this.props.record.inviteCount}
                secondary={
                    <NumberOfInvitationsChart 

                    /> 
                }
                />
                <InvitationList userid={this.props.record.id} />
            </ListItem>
            <Divider variant="inset" component="li" />
            <ListItem alignItems="flex-start">
                <ListItemText
                primary="Number of registered device"
                secondary={
                    <NumberOfRegisteredDevice /> 
                }
                />
            </ListItem>
            <Divider variant="inset" component="li" />
            <ListItem alignItems="flex-start">
                <ListItemText
                primary="Total online time"
                secondary={
                    <UserTotalOnlineTimeChart 
                    userid={this.props.record.id}
                    /> 
                }
                />
            </ListItem>
            <Divider variant="inset" component="li" />
            <ListItem alignItems="flex-start">

                <ListItemText
                primary="Number of passed quizes"
                secondary={
                    <React.Fragment>
                        
                        <Typography
                                component="span"
                                variant="body2"
                                color="textPrimary"
                            > 
                            {this.state.listofuserquizes.map(
                                (item, index) => 
                                    <Link component={RouterLink} to="/">{item}</Link>
                            )}
                        </Typography> 

                    </React.Fragment>
                }
                />
                
            </ListItem>
            <Divider variant="inset" component="li" />
            <ListItem alignItems="flex-start">

                <ListItemText
                primary="Shopping level"
                secondary={
                    <React.Fragment>
                    <Typography
                        component="span"
                        variant="body2"
                        
                        color="textPrimary"
                    >
                      تومان  {this.returnCorrectMoneyFormat(this.state.shoppinglevel)}
                    </Typography>
                    
                    </React.Fragment>
                }
                />
            </ListItem>
            <Divider variant="inset" component="li" />
            <VideoViewsStatistics userid={this.props.record.id} />
        </List>
        )
    }

}
export default AlignItemsList;