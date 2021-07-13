import React from 'react';
import PropTypes from 'prop-types';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
function Thumbnail(props) {
    let color = null;
    if (props.record.isOnline) {
        color = '#2fe62f';
    } else {
        color = 'gray';
    }
    let src = null;
    if (typeof(props.record.data) != 'undefined'){
        src = props.record.data.thumbnail;
    } else {
        src = '';
    }
    return (
        <React.Fragment>
            <ListItemAvatar>
                <Avatar 
                    style={{
                        border:`4px solid ${color}`
                    }}
                    title={'title'} 
                    src={src} 
                    />
            </ListItemAvatar>
        </React.Fragment>
    );
}

Thumbnail.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default Thumbnail;