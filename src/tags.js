import React from 'react';
import { List, Create, Edit, SimpleForm, DisabledInput,
         TextInput,Datagrid, TextField, EditButton, required,
         minLength,
         maxLength,
         minValue,
         maxValue,
         number,
         regex,
         email,
         choices
        }
         from 'react-admin';
import { Pagination } from 'react-admin';

const validateTagName = [required(), minLength(5), maxLength(30)];

export const TagCreate = (props) => (
    <Create {...props}>
        <SimpleForm redirect="list" submitOnEnter={true}>
            <TextInput source="name" validate={validateTagName} />
        </SimpleForm>
    </Create>
);

export const TagEdit = (props) => (
    <Edit title="tag edit" {...props}>
        <SimpleForm>
            <TextInput source="name" />
        </SimpleForm>
    </Edit>
);

const TagPagination = props => <Pagination rowsPerPageOptions={[5, 10, 25, 50, 100]} {...props} />
export const TagsList = props => (
    <List {...props} pagination={<TagPagination />}>
        <Datagrid>
            <TextField 
                source="name" 
                label="Name" 
                style={{ 
                    fontFamily: 'Far_Kamran' ,
                    fontSize: '19px',
                    fontWeight : 'bold',
                    color: 'black',
                    direction: 'rtl'
                  }}
                />
            <TextField 
                source="count" 
                label="Count" 
                style={{ 
                    fontFamily: 'Far_Kamran' ,
                    fontSize: '19px',
                    fontWeight : 'bold',
                    color: 'black',
                    direction: 'rtl'
                  }}
                />
            {/* <TextField source="jalaaliCreatedDate" label="Jalaali date" />
            <TextField source="jalaaliUserFriendlyCreatedDate" label="Jalaali user friendly date" /> */}
            <EditButton />
        </Datagrid>
    </List>
);