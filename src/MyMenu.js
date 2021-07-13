import React from 'react';
import { connect } from 'react-redux';
import { MenuItemLink, getResources, Responsive } from 'react-admin';
import { withRouter } from 'react-router-dom';
import Badge from '@material-ui/core/Badge';
import CatButton from './CatButton';
import DashboardIcon from '@material-ui/icons/Dashboard';
import Typography from '@material-ui/core/Typography';

const MyMenu = ({
    resources,
    onMenuClick,
    logout,
    criticismsBadgeCount,
    requestsBadgeCount,
    policeBadgeCount,
    productsBadgeCount
}) => (
    <div>
        <CatButton />
        {/* {resources.map(resource => (
            <MenuItemLink
                key={resource.name}
                to={`/${resource.name}`}
                primaryText={resource.options && resource.options.label || resource.name}
                leftIcon={React.createElement(resource.icon)}
                onClick={onMenuClick}
            />
        ))} */}

        <MenuItemLink
            key='dahsboard'
            to="/"
            primaryText={<Typography
                style={{
                    fontFamily: 'IranSans',
                    fontSize: '13px',
                    fontWeight: 'bold',
                    color: 'black',
                    direction: 'rtl'
                }}
                color="inherit" variant="subtitle1">
                Dashboard
            </Typography>}
            onClick={onMenuClick}
            leftIcon={React.createElement(DashboardIcon)}
        />

        <MenuItemLink
            key={resources[0].name}
            to="/products"
            primaryText={<Badge badgeContent={productsBadgeCount} color="primary"><Typography
                style={{
                    fontFamily: 'IranSans',
                    fontSize: '13px',
                    fontWeight: 'bold',
                    color: 'black',
                    direction: 'rtl'
                }}
                color="inherit" variant="subtitle1">
                products
            </Typography>  </Badge>}
            onClick={onMenuClick}
            leftIcon={React.createElement(resources[0].icon)}
        />

        <MenuItemLink
            key={resources[1].name}
            to="/beyondthebooks"
            primaryText={<Typography
                style={{
                    fontFamily: 'IranSans',
                    fontSize: '13px',
                    fontWeight: 'bold',
                    color: 'black',
                    direction: 'rtl'
                }}
                color="inherit" variant="subtitle1">
                Beyond the book
            </Typography>}
            onClick={onMenuClick}
            leftIcon={React.createElement(resources[1].icon)}
        />
        <MenuItemLink
            key={resources[2].name}
            to="/users"
            primaryText={<Typography
                style={{
                    fontFamily: 'IranSans',
                    fontSize: '13px',
                    fontWeight: 'bold',
                    color: 'black',
                    direction: 'rtl'
                }}
                color="inherit" variant="subtitle1">
                Users
            </Typography>}
            onClick={onMenuClick}
            leftIcon={React.createElement(resources[2].icon)}
        />
        <MenuItemLink
            key={resources[3].name}
            to="/categories"
            primaryText={<Typography
                style={{
                    fontFamily: 'IranSans',
                    fontSize: '13px',
                    fontWeight: 'bold',
                    color: 'black',
                    direction: 'rtl'
                }}
                color="inherit" variant="subtitle1">
                Categories
            </Typography>}
            onClick={onMenuClick}
            leftIcon={React.createElement(resources[3].icon)}
        />
        <MenuItemLink
            key={resources[4].name}
            to="/subjects"
            primaryText={<Typography
                style={{
                    fontFamily: 'IranSans',
                    fontSize: '13px',
                    fontWeight: 'bold',
                    color: 'black',
                    direction: 'rtl'
                }}
                color="inherit" variant="subtitle1">
                Subjects
            </Typography>}
            onClick={onMenuClick}
            leftIcon={React.createElement(resources[4].icon)}
        />
        <MenuItemLink
            key={resources[5].name}
            to="/exercises"
            primaryText={<Typography
                style={{
                    fontFamily: 'IranSans',
                    fontSize: '13px',
                    fontWeight: 'bold',
                    color: 'black',
                    direction: 'rtl'
                }}
                color="inherit" variant="subtitle1">
                Exercises
            </Typography>}
            onClick={onMenuClick}
            leftIcon={React.createElement(resources[5].icon)}
        />
        <MenuItemLink
            key={resources[6].name}
            to="/definitions"
            primaryText={<Typography
                style={{
                    fontFamily: 'IranSans',
                    fontSize: '13px',
                    fontWeight: 'bold',
                    color: 'black',
                    direction: 'rtl'
                }}
                color="inherit" variant="subtitle1">
                Definitions
            </Typography>}
            onClick={onMenuClick}
            leftIcon={React.createElement(resources[6].icon)}
        />
        <MenuItemLink
            key={resources[7].name}
            to="/sciencechallenge"
            primaryText={<Typography
                style={{
                    fontFamily: 'IranSans',
                    fontSize: '13px',
                    fontWeight: 'bold',
                    color: 'black',
                    direction: 'rtl'
                }}
                color="inherit" variant="subtitle1">
                Science challenges
            </Typography>}
            onClick={onMenuClick}
            leftIcon={React.createElement(resources[7].icon)}
        />
        <MenuItemLink
            key={resources[8].name}
            to="/tags"
            primaryText={<Typography
                style={{
                    fontFamily: 'IranSans',
                    fontSize: '13px',
                    fontWeight: 'bold',
                    color: 'black',
                    direction: 'rtl'
                }}
                color="inherit" variant="subtitle1">
                Tags
            </Typography>}
            onClick={onMenuClick}
            leftIcon={React.createElement(resources[8].icon)}
        />
        <MenuItemLink
            key={resources[9].name}
            to="/shops"
            primaryText={<Typography
                style={{
                    fontFamily: 'IranSans',
                    fontSize: '13px',
                    fontWeight: 'bold',
                    color: 'black',
                    direction: 'rtl'
                }}
                color="inherit" variant="subtitle1">
                Shops
            </Typography>}
            onClick={onMenuClick}
            leftIcon={React.createElement(resources[9].icon)}
        />
        <MenuItemLink
            key={resources[10].name}
            to="/criticisms"
            primaryText={<Badge badgeContent={criticismsBadgeCount}
                color="primary"> <Typography
                    style={{
                        fontFamily: 'IranSans',
                        fontSize: '13px',
                        fontWeight: 'bold',
                        color: 'black',
                        direction: 'rtl'
                    }}
                    color="inherit" variant="subtitle1">
                    Criticisms
            </Typography> </Badge>}
            onClick={onMenuClick} leftIcon={React.createElement(resources[10].icon)}
        />
        <MenuItemLink
            key={resources[11].name}
            to="/shoppingplans"
            primaryText={<Typography
                style={{
                    fontFamily: 'IranSans',
                    fontSize: '13px',
                    fontWeight: 'bold',
                    color: 'black',
                    direction: 'rtl'
                }}
                color="inherit" variant="subtitle1">
                Shopping plans
            </Typography>}
            onClick={onMenuClick}
            leftIcon={React.createElement(resources[11].icon)}
        />
        <MenuItemLink
            key={resources[12].name}
            to="/police"
            primaryText={<Badge badgeContent={policeBadgeCount} color="primary"><Typography
                style={{
                    fontFamily: 'IranSans',
                    fontSize: '13px',
                    fontWeight: 'bold',
                    color: 'black',
                    direction: 'rtl'
                }}
                color="inherit" variant="subtitle1">
                Police
            </Typography></Badge>} onClick={onMenuClick} leftIcon={React.createElement(resources[12].icon)} />
        <MenuItemLink
            key={resources[13].name}
            to="/requests"
            primaryText={<Badge badgeContent={requestsBadgeCount} color="primary"><Typography
                style={{
                    fontFamily: 'IranSans',
                    fontSize: '13px',
                    fontWeight: 'bold',
                    color: 'black',
                    direction: 'rtl'
                }}
                color="inherit" variant="subtitle1">
                Requests
            </Typography>  </Badge>}
            onClick={onMenuClick}
            leftIcon={React.createElement(resources[13].icon)}
        />

        <Responsive
            small={logout}
            medium={null} // Pass null to render nothing on larger devices
        />
    </div>
);

const mapStateToProps = state => ({
    resources: getResources(state),
    criticismsBadgeCount: state.catReducer.criticismsBadgeCount,
    productsBadgeCount: state.catReducer.productsBadgeCount,
    policeBadgeCount: state.catReducer.policeBadgeCount,
    requestsBadgeCount: state.catReducer.requestsBadgeCount
});

export default withRouter(connect(mapStateToProps)(MyMenu));