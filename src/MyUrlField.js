import React from 'react';

class MyUrlField extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            this.props.record.userInfo ?
                <a href={'#/users/' + this.props.record.userInfo.id + '/show'} target="_blank">
                    {this.props.record.userInfo.userName}
                </a>
                :
                <div>کاربر ناشناس</div>
        )
    }
}
// const MyUrlField = ({ record = {}, source }) =>


export default MyUrlField;