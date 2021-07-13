import { Layout } from 'react-admin';
import React from 'react';
import MyMenu from './MyMenu';

const MyLayout = (props) => <Layout
    {...props}
    menu={MyMenu}
    />;

export default MyLayout;