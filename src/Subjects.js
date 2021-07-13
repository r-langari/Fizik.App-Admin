import React, {Fragment} from 'react';
import { List, Datagrid, TextField, BooleanInput, BulkDeleteButton, Create, SimpleForm, TextInput } from 'react-admin';

import { CardActions, Filter } from 'react-admin';

import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/ExpandLess';
import ExpandLess from '@material-ui/icons/ExpandLess';
import Home from '@material-ui/icons/Home';
import CreateNewFolder from '@material-ui/icons/ExpandLess';
import Tooltip from '@material-ui/core/Tooltip'
import TextInputJadid from './TextInputJadid';
import MyList2 from './MyList2';

const PostBulkActionButtons = props => (
    <Fragment>
        <BulkDeleteButton {...props} />
        <div>Hi</div>
    </Fragment>
);

// const postRowClick = (id, basePath, record) => record.editable ? 'edit' : 'show';
const postRowClick = (id, basePath, record) => {
    // console.info('id:', id);
    // console.info('basePath:', basePath);
    // console.info('record:', record);
};

const PostPanel = ({ id, record, resource }) => (
   <span>hello</span>
);

const showstate = e => {
    
}

const PostActions = ({
    bulkActions,
    basePath,
    currentSort,
    displayedFilters,
    exporter,
    filters,
    filterValues,
    onUnselectItems,
    resource,
    selectedIds,
    showFilter,
    total
}) => (
    <CardActions>
        {bulkActions && React.cloneElement(bulkActions, {
            basePath,
            filterValues,
            resource,
            selectedIds,
            onUnselectItems,
        })}
        {filters && React.cloneElement(filters, {
            resource,
            showFilter,
            displayedFilters,
            filterValues,
            context: 'button',
        })}
        
        <Tooltip title="Up">
            <IconButton color="secondary">
                <ExpandLess />
            </IconButton>
        </Tooltip>
        
        <Tooltip title="Home">
            <IconButton color="secondary" onClick={showstate}>
                <Home />
            </IconButton>
        </Tooltip>
        
        <Tooltip title="New">
            <IconButton color="secondary">
                <CreateNewFolder />
            </IconButton>
        </Tooltip>

        <Tooltip title="Delete">
            <IconButton color="secondary">
                <DeleteIcon />
            </IconButton>
        </Tooltip>
        
    </CardActions>
);

const PostFilter = (props) => (
    <Filter {...props}>
        <TextInputJadid status="alwaysOn" source="name" />
    </Filter>
);

export const SubjectsList = props => (
    <div>
        <MyList2 />  
    </div>
);
