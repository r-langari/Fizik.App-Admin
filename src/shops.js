import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import ShoppingPlansPurchaseChart from './ShoppingPlansPurchaseChart';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Thumbnail from './ThumbnailImage';
import { Pagination } from 'react-admin';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import MyUrlField from './MyUrlField';
import ShowPurchaseViaFPoint from './ShowPurchaseViaFPoint';
import Typography from '@material-ui/core/Typography';

import {Show, TabbedShowLayout, Tab, NumberField,BooleanField,
    List, ReferenceManyField, Datagrid, TextField, DateField, EditButton, UrlField, FunctionField } from 'react-admin';
    function createData(name, calories, fat, carbs, protein) {
        return { name, calories, fat, carbs, protein };
      }
const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
    ];
export const shopShow = (props) => (
    <Show {...props}>
        <TabbedShowLayout>
            
            <Tab label="information">
                <TextField label="Id" source="id" />
                <TextField source="title" />
                <TextField source="teaser" />
            </Tab>
            
        </TabbedShowLayout>
    </Show>
);

const ShopPagination = props => <Pagination rowsPerPageOptions={[5, 10, 25, 50, 100]} {...props} />

export const ShopsList = props => (
    <React.Fragment>
        <Typography
            style={{
                fontWeight: 'bold'
            }}
            >
            Purchase via online payment
        </Typography>
        <List {...props} pagination={<ShopPagination />}>
            <Datagrid >{/*  rowClick="show" */}
                <TextField 
                    // sortBy="firstName"
                    sortable={false}
                    source="userInfo.firstName" 
                    label="name" 
                    />
                <TextField 
                    // sortBy="lastName"
                    sortable={false}
                    source="userInfo.lastName" 
                    label="family" 
                    />
                <TextField 
                    sortable={false}
                    source="type" 
                    label="type" 
                    // sortBy="type"
                    />

                <FunctionField
                label="amount"
                sortBy="amount"
                style={{ 
                    fontFamily: 'Far_Kamran' ,
                    fontSize: '19px',
                    fontWeight : 'bold',
                    color: 'black',
                    direction: 'rtl'
                }}
                    render={record => `${new Intl.NumberFormat('fa-IR').format(parseInt(record.amount / 10))} تومان`}
                />
                <TextField 
                    source="jalaaliFullUserFriendlyCreatedDate" 
                    sortBy="createdAt"
                    label="purchased Date" 
                    style={{
                        direction: 'rtl'
                    }}
                    />

            </Datagrid>
        </List>

        <br />
        <ShowPurchaseViaFPoint />
        <br />
        <Card>
            <CardHeader title="shopping plans purchase chart" />
                <CardContent>
                    <ShoppingPlansPurchaseChart />
                </CardContent>
        </Card>

    </React.Fragment>
);