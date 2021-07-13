import React, { Fragment } from 'react';
class NumberOfOnlineUsers extends React.Component{
    
    constructor(props) {
        super (props);
        this.state = {
            listofonlines :0
        }
    }

    componentDidMount() {
        // let token = window.localStorage.getItem('token');
        // let lu = () => {
        //     fetch(process.env.REACT_APP_API_URL+`/users/listofonlines`, {
        //             method: 'GET', 
        //             mode: 'cors',
        //             cache: 'no-cache',
        //             credentials: 'same-origin',
        //             headers: {
        //                 'Content-Type': 'application/json',
        //                 'authorization': `Bearer ${token}`,
        //             },
        //             redirect: 'follow',
        //             referrer: 'no-referrer',
        //             // body: JSON.stringify({token:token}),
        //             })
        //             .then(response => response.json())
        //             .then(result => {
        //                 this.setState({listofonlines: result});
        //             });
        // }

        // setInterval(function() { 
        //     lu();
        // }, 1000);
    }

    render() {
        return(
        <div style={{
                display:"inline-block", 
                backgroundColor: '#f50057', 
                position: 'absolute',
                top: '90%',
                left: '65%',
                borderRadius: '41px',
                width: '169px',
                paddingLeft: '62px',
                color: 'ghostwhite'
            }}>
            <h2>{this.state.listofonlines}</h2>
        </div>
        )
    }
}

export default NumberOfOnlineUsers;