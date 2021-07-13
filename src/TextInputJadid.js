import React from 'react';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import { increaseCatSizeAction } from './action';
import {TextInput} from 'react-admin';
class TextInputJadid extends React.Component {
    render() {
        const { myCat, increaseCatSize } = this.props;
        return (
            <React.Fragment>
                <TextInput source="name" name="name" defaultValue="picture" />
                {/* <TextInput name="name" source="name" />  */}
            </React.Fragment>
        );
    } 
}

const mapStateToProps = state => ({
    myCat: state.catReducer.count,
});

const mapDispatchToProps = dispatch => ({
    increaseCatSize: (howMuch) => dispatch(increaseCatSizeAction(howMuch))
})

export default connect(mapStateToProps, mapDispatchToProps)(TextInputJadid);