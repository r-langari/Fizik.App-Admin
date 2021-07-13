import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
// import ProductAnalytics from './ProductAnalytics';
import ProductAnalytics2 from './ProductAnalytics2';
import SalesChart from './SalesChart';
import SignUpChart from './SignUpChart';
import OnlineUsersChart from './OnlineUsersChart';
import UserSignupSensitiveLocation from './userSignupSensitiveLocation';
import ShoppingSensitiveLocation from './shoppingSensitiveLocation';
import NumberOfOnlineUsers from './NumberOfOnlineUsers';

export default () => (
    <React.Fragment>
        
        <Card>
            <CardHeader title="Shopping and User Signup Location Sensitive" />
            <CardContent>
                <ShoppingSensitiveLocation />
                <UserSignupSensitiveLocation name="CodeSandbox" />
            </CardContent>
        </Card>
        <br />
        <Card>
            <CardHeader title="Products Analytics" />
            <CardContent>
                {/* <ProductAnalytics /> */}
                <ProductAnalytics2 />
            </CardContent>
        </Card>
        <br />
        <Card>
            <CardHeader title="Sales Chart and Signup Chart" />
            <CardContent>
                <SalesChart />
                <SignUpChart />
            </CardContent>
        </Card>
        <br />
        <Card>
            <CardHeader title="Online Users Chart" />
            <CardContent>
                <OnlineUsersChart />
                <NumberOfOnlineUsers />
            </CardContent>
        </Card>
        
    </React.Fragment>
);