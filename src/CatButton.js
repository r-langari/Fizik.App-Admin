import React from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import { increaseCatSizeAction } from './action';

class CatButton extends React.Component {
    
    componentDidMount() {
        const increaseCatSize = this.props.increaseCatSize;
        increaseCatSize(2);
    }

    render() {
        const { myCat, increaseCatSize } = this.props;
        return (
            <span></span>
        // <Button
        //          onClick={() => increaseCatSize(2) }>
        //                 click me {myCat}
        //         </Button>
                )
    }
    
}

const mapStateToProps = state => ({
    myCat: state.catReducer.count,
});

const mapDispatchToProps = dispatch => ({
    increaseCatSize: (howMuch) => {
        fetch(process.env.REACT_APP_API_URL+'/criticisms/badgecount', { method: 'GET', headers: {}})
        .then((response) => {
            return response.json();
        })
        .then((myJson) => {
            dispatch(increaseCatSizeAction(myJson.data))
        })
        .catch((e) => {
            // showNotification('Error: comment not approved', 'warning')
        });
        
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(CatButton);