import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    position: 'relative',
    overflow: 'auto',
    maxHeight: 450,
  },
  listSection: {
    backgroundColor: 'inherit',
  },
  ul: {
    backgroundColor: 'inherit',
    padding: 0,
  },
}));

export default class InvitationList extends React.Component {
  constructor(props) {
    super(props);
  }
  // const classes = useStyles();
  // const CollisionLink = React.forwardRef((props, ref) => (
  //   <RouterLink innerRef={ref} to="/getting-started/installation/" {...props} />
  // ));
  state = {
    list: []
  }
  componentDidMount() {
    console.info('bezinji: ', this.props);
    fetch(process.env.REACT_APP_API_URL + `/users/invitationlist?inviterId=${this.props.userid}`, {
      method: "GET",
      headers: {},
    })
      .then((response) => {
        return response.json();
      })
      .then((myJson) => {
        console.info('natijeye invitation list:', myJson);
        this.setState({
          list: myJson.list
        })
      })
      .catch((e) => {

      });
  }

  render() {
    return (

      <List
        // className={classes.root} 
        subheader={<li />}
      >
        {
          this.state.list
            .map((item, index) => (
              <ListItem key={index}>
                <ListItemAvatar>
                  <Avatar
                    alt={`Avatar n°${1}`}
                    src={item.thumbnail}
                  />
                </ListItemAvatar>
                {/* <Link component={RouterLink} to={'/' + item.link}> */}
                  <ListItemText primary={item.firstName + ' ' + item.lastName} />
                {/* </Link> */}

              </ListItem>
            ))
        }
      </List>
    );
  }
}