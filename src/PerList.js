import React from 'react';
import { List } from 'react-admin';
import dataProvider from './dataProvider';

class PerList extends React.Component {
    constructor (props) {

    }

    render () {
        return (
            <Resource dataProvider={dataProvider('http://localhost:1337')} name="ppp" list={PostList} />
        );
    }

}

export const PostList = (props) => (
    <List {...props}>
        <Datagrid>
            <ReferenceField label="Post" source="id" reference="posts" sortBy="title">
                <TextField source="title" />
            </ReferenceField>
            <FunctionField
                label="Author"
                sortBy="last_name"
                render={record => `${record.author.first_name} ${record.author.last_name}`}
            />
            <TextField source="body" />
        </Datagrid>
    </List>
);
export default PerList;