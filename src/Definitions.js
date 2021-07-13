import React from 'react';
import {Show, RichTextField, TabbedShowLayout, Tab, NumberField,BooleanField,
        ChipField, FileField ,FileInput,
        ImageField, ImageInput, NumberInput, BooleanInput, List, Create,
        Edit, SimpleForm, DisabledInput, TextInput, LongTextInput, ReferenceManyField, Datagrid,
        TextField, DateField,ArrayField,SingleFieldList, SelectInput, ShowButton, EditButton, DeleteButton, 
        DateInput ,ReferenceInput, required,
        minLength,
        maxLength,
        minValue,
        maxValue,
        number,
        regex,
        email,
        choices } from 'react-admin';

import { Pagination } from 'react-admin';
import QuizManager from './QuizManager';
import ProductReports from './ProductReports';
import Mycheckbox from './MyNewField2';
import Thumbnail from './ThumbnailImage';
import ProductsQuestions from './ProductsQuestions';
import ProductsComments from './ProductsComments';
import Fab from '@material-ui/core/Fab';
import NavigationIcon from '@material-ui/icons/Navigation';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Book from './Book';
import UploadComponent from './UploadComponent';
import MyEditor  from './TextEditor';
import ContentUserInteraction from "./ContentUserInteraction";
import Tiny  from './Tiny';

// const validateDefinitionName = [required(), minLength(1), maxLength(30)];
const validateDefinitionTitle = [required(), minLength(1), maxLength(50)];

export const DefinitionsCreate = (props) => (
    <Create {...props} >
        
        <SimpleForm redirect="list" submitOnEnter={true}>
            {/* <TextInput source="name" label="name" validate={validateDefinitionName} /> */}
            <TextInput source="title" label="title" validate={validateDefinitionTitle} />
            <Book 
                {...props}
                />
            {/* <MyEditor /> */}
            <Tiny />
            <UploadComponent 
                type="thumbnail"
                model="definitions"
                />
        </SimpleForm>
    </Create>
);

export const DefinitionsEdit = (props) => (
    <Edit title="Definitions edit" {...props}>
        <SimpleForm>
            {/* <TextInput 
                source="data.summary.name" 
                label="name" 
                /> */}
            <LongTextInput 
                source="data.summary.title" 
                label="title" 
                />
            <Book 
                {...props}
                />
            {/* <MyEditor /> */}
            <Tiny />
            <UploadComponent 
                type="thumbnail"
                model="definitions"
                />
        </SimpleForm>
    </Edit>
);

const qaConfig = [
    {
        type:'qa',
        label:'پرسش و پاسخ',
        model:'definitions'
    },
]

const cmConfig = [
    {
        type:'qa',
        label:'پرسش و پاسخ',
        model:'definitions'
    },
]

export const DefinitionsShow = (props) => (
    <Show {...props}>
        <TabbedShowLayout>

            <Tab label="information">
                <TextField source="id" label="Id" />
                <Thumbnail source="thumbnail" label="thumbnail" />
                <TextField source="summary.title" label="title" />
                {/* <TextField source="summary.name" label="name" /> */}
                <RichTextField source="summary.description" label="description" />
                <ArrayField source="summary.tagsArray" label="tags">
                    <SingleFieldList>
                        <ChipField source="name" />
                    </SingleFieldList>
                </ArrayField>
            </Tab>

            <Tab label="qa" path="qa">
            <ContentUserInteraction 
                config={qaConfig}
                modelid={props.id}
                />
            </Tab>

            <Tab label="comments" path="comments">
            <ContentUserInteraction 
                config={cmConfig}
                modelid={props.id}
                />
            </Tab>

        </TabbedShowLayout>
    </Show>
);
const DefinitionsPagination = props => <Pagination rowsPerPageOptions={[5, 10, 25, 50, 100]} {...props} />

export const DefinitionsList = props => (
    
    <List {...props} pagination={<DefinitionsPagination />}>
        <Datagrid rowClick="show">
            <Thumbnail 
                source="data.summary.thumbnail" 
                label="thumbnail"
                sortable={false} 
                />
            {/* <TextField 
                source="data.summary.name" 
                label="Name" 
                style={{ 
                    fontFamily: 'Far_Kamran' ,
                    fontSize: '19px',
                    fontWeight : 'bold',
                    color: 'black',
                    direction: 'rtl'
                  }}
                /> */}
            <TextField 
                source="data.summary.title" 
                sortBy="title"
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
                source="data.summary.jalaaliFullUserFriendlyCreatedDate" 
                sortBy="createdAt"
                label="Date" 
                style={{ 
                    fontFamily: 'Far_Kamran' ,
                    fontSize: '19px',
                    fontWeight : 'bold',
                    color: 'black',
                    direction: 'rtl'
                  }}
                />
            <EditButton />
            <DeleteButton />
        </Datagrid>
    </List>
);