import React from 'react';
import { List, Datagrid, TextField, BooleanField } from 'react-admin';
import Thumbnail from './ThumbnailImage';
import CriticismsReponseBox from './CriticismsReponseBox'
import { Pagination } from 'react-admin';
import Button from '@material-ui/core/Button';
import MyUrlField from './MyUrlField';

let doIt = () => {
    console.info('hello');
}

const CriticismsPanel = ({ id, record, resource }) => (
    <React.Fragment>
        <p><strong>Message:</strong></p>
        {record.message}
        {/*  */}
        
        {record.isResponsed
            ? 
            <div>
                <p><strong>Admin answer:</strong></p>
                {record.response}
            </div>
            : 
                <CriticismsReponseBox record={record} /> 
        }
    </React.Fragment>
);

const CriticismPagination = props => <Pagination rowsPerPageOptions={[5, 10, 25, 50, 100]} {...props} />

export const CriticismsList = props => (
    <List {...props} pagination={<CriticismPagination />}>
        <Datagrid expand={<CriticismsPanel />}>
            <Thumbnail source="thumbnail" label="thumbnail" />
            <MyUrlField label="username"/>
            <TextField 
                source="fullName" 
                label="name" 
                style={{ 
                    fontFamily: 'Far_Kamran' ,
                    fontSize: '19px',
                    fontWeight : 'bold',
                    color: 'black',
                    direction: 'rtl'
                  }}
                />
            <TextField 
                source="title" 
                label="title" 
                style={{ 
                    fontFamily: 'Far_Kamran' ,
                    fontSize: '19px',
                    fontWeight : 'bold',
                    color: 'black',
                    direction: 'rtl'
                  }}
                />
            <BooleanField source="isResponsed" label="isResponsed" />
            {/* <TextField source="jalaaliCreatedDate" label="jalaali Created Date" />
            <TextField source="jalaaliUserFriendlyCreatedDate" label="User Friendly Date" /> */}
            <TextField 
                source="jalaaliFullUserFriendlyCreatedDate" 
                label="Date" 
                style={{ 
                    fontFamily: 'Far_Kamran' ,
                    fontSize: '19px',
                    fontWeight : 'bold',
                    color: 'black',
                    direction: 'rtl'
                  }}
                />
        </Datagrid>
    </List>
);