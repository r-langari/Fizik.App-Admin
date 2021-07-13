import React from 'react';
import {Show, RichTextField, TabbedShowLayout, Tab, NumberField,BooleanField,
        ImageField, ImageInput, NumberInput, BooleanInput, List, Create,
        Edit, SimpleForm, DisabledInput, TextInput, LongTextInput, ReferenceManyField, Datagrid,
        TextField, DateField, ShowButton, EditButton, DateInput, TabbedForm, FormTab } from 'react-admin';

import Thumbnail from './ThumbnailImage';
import RequestsUsersAnswer from './RequestsUsersAnswer';
import RequestsResponseBox from './RequestsResponseBox';
import { Pagination } from 'react-admin';
import MyUrlField from './MyUrlField';
export const RequestShow = (props) => (
    <Show {...props}>
        <TabbedShowLayout>
            
            <Tab label="question">
                <br />
                <Thumbnail source="thumbnail" label="thumbnail" />
                <MyUrlField label="username"/>
                <TextField source="userInfo.fullName" label="" />
                <TextField source="title" label="" />
                <TextField source="message" label="" />
            </Tab>
            
            <Tab label="users answer" path="usersanswer" >
                <RequestsUsersAnswer />
            </Tab>
            
        </TabbedShowLayout>
    </Show>
);

const RequestPanel = ({ id, record, resource }) => (
    <React.Fragment>
        <p><strong>Question:</strong></p>
        <div>{record.message}</div>
        {
            (record.isResponsed == '') ? 
                <RequestsResponseBox record={record} /> 
            : 
            <div>
                <p><strong>Admin answer:</strong></p>
                {record.adminAnswer}
            </div>
    }
    </React.Fragment>
);

const RequestPagination = props => <Pagination rowsPerPageOptions={[5, 10, 25, 50, 100]} {...props} />

export const RequestList = props => (
    <List {...props} pagination={<RequestPagination />}>
        <Datagrid rowClick="show" expand={<RequestPanel />}>
            <Thumbnail source="thumbnail" label="thumbnail" />
            <TextField 
                source="userInfo.fullName" 
                label="name" 
                style={{ 
                    fontFamily: 'Far_Kamran' ,
                    fontSize: '19px',
                    fontWeight : 'bold',
                    color: 'black',
                    direction: 'rtl'
                  }}
                />
            <MyUrlField label="username"/>
            <TextField source="userInfo.userName" label="user name" />
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
            <TextField 
                source="jalaaliFullUserFriendlyUpdatedDate" 
                label="Date" 
                style={{ 
                    fontFamily: 'Far_Kamran' ,
                    fontSize: '19px',
                    fontWeight : 'bold',
                    color: 'black',
                    direction: 'rtl'
                  }}
                />
            <BooleanField source="isResponsed" label="isResponsed" label="isResponsed" />
        </Datagrid>
    </List>
);