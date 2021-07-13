import React from 'react';
import catReducer from './reducer';
import { fetchUtils, Admin, Resource } from 'react-admin';
import { ProductsList, ProductCreate, ProductEdit, ProductShow } from './products';
import { BeyondthebooksList, BeyondthebooksCreate, BeyondthebooksEdit, BeyondthebooksShow } from './Beyondthebooks';
import { ExercisesList, ExercisesCreate, ExercisesEdit, ExercisesShow } from './Exercises';
import { UsersList, UserCreate, UserCreatee, userShow } from './users';
import { DefinitionsList, DefinitionsCreate, DefinitionsEdit, DefinitionsShow } from './Definitions';
import { SciencechallengeList, SciencechallengeCreate, SciencechallengeEdit, SciencechallengeShow } from './Sciencechallenge';
import { ShopsList, shopShow } from './shops';
import { TagsList, TagCreate, TagEdit } from './tags';
import { SubjectsList, SubjectsCreate, SubjectsEdit } from './Subjects';
import { CriticismsList } from './criticisms';
import { ShoppingplansList, ShoppingplansCreate, ShoppingplansEdit, ShoppingplansShow } from './shoppingplans';
import { RequestList, RequestShow } from './Requests';
import { PoliceList } from './police';
import Dashboard from './Dashboard';
import dataProvider from './dataProvider';
import NotificationsPaused from '@material-ui/icons/NotificationsPaused';
import VideoCallIcon from '@material-ui/icons/VideoCall';
import OndemandVideoIcon from '@material-ui/icons/OndemandVideo';
import UserIcon from '@material-ui/icons/Group';
import CreateNewFolder from '@material-ui/icons/CreateNewFolder';
import CategoryIcon from '@material-ui/icons/Category';
import ImportContactsIcon from '@material-ui/icons/ImportContacts';
import GpsFixedIcon from '@material-ui/icons/GpsFixed';
import Rotate90DegreesCcwIcon from '@material-ui/icons/Rotate90DegreesCcw';
import FlareIcon from '@material-ui/icons/Flare';
import SubjectIcon from '@material-ui/icons/Subject';
import VideoLbabelIcon from '@material-ui/icons/VideoLabel';
import ShoppingIcon from '@material-ui/icons/AddShoppingCart';
import CommentIcon from '@material-ui/icons/Comment';
import VpnKey from '@material-ui/icons/VpnKey';
import InsertInvitationIcon from '@material-ui/icons/InsertInvitation';
import authProvider from './authProvider';
import { CategoriesList } from './categories';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import MyLayout from './MyLayout';
import './font-style.css';

am4core.useTheme(am4themes_animated);
const httpClient = (url, options = {}) => {
    if (!options.headers) {
        options.headers = new Headers({ Accept: 'application/json' });
    }
    const token = localStorage.getItem('token');
    options.headers.set('Authorization', `Bearer ${token}`);
    return fetchUtils.fetchJson(url, options);
}
const App = () => (
    <Admin 
        customReducers={{ catReducer }} 
        dashboard={Dashboard} 
        dataProvider={dataProvider(process.env.REACT_APP_API_URL, httpClient)} //http://188.212.22.83/api
        authProvider={authProvider}
        appLayout={MyLayout}
        >
        <Resource 
            name="Products" 
            create={ProductCreate} 
            edit={ProductEdit} 
            list={ProductsList} 
            icon={VideoCallIcon} 
            show={ProductShow} 
            />
        <Resource 
            name="Beyondthebooks" 
            create={BeyondthebooksCreate} 
            edit={BeyondthebooksEdit} 
            list={BeyondthebooksList} 
            icon={OndemandVideoIcon} 
            show={BeyondthebooksShow} 
            />
        <Resource 
            name="Users" 
            list={UsersList} 
            icon={UserIcon} 
            create={UserCreate} 
            show={userShow} 
            />
        <Resource 
            name="Categories" 
            list={CategoriesList} 
            icon={CategoryIcon} 
            />
        <Resource 
            name="Subjects" 
            list={SubjectsList} 
            icon={SubjectIcon} 
            />
        <Resource 
            name="Exercises" 
            list={ExercisesList} 
            create={ExercisesCreate} 
            show={ExercisesShow} 
            edit={ExercisesEdit} 
            icon={GpsFixedIcon} 
            />
        <Resource 
            name="Definitions" 
            list={DefinitionsList} 
            create={DefinitionsCreate} 
            show={DefinitionsShow} 
            edit={DefinitionsEdit} 
            icon={ImportContactsIcon} 
            />
        <Resource 
            name="Sciencechallenge" 
            list={SciencechallengeList} 
            create={SciencechallengeCreate} 
            show={SciencechallengeShow} 
            edit={SciencechallengeEdit} 
            icon={Rotate90DegreesCcwIcon} 
            />
        <Resource 
            name="Tags" 
            create={TagCreate} 
            edit={TagEdit} 
            list={TagsList} 
            icon={FlareIcon} 
            />
        <Resource 
            name="Shops" 
            list={ShopsList} 
            icon={ShoppingIcon} 
            show={shopShow} 
            />
        <Resource 
            name="Criticisms" 
            list={CriticismsList} 
            icon={CommentIcon} 
            />
        <Resource 
            name="Shoppingplans" 
            icon={InsertInvitationIcon} 
            list={ShoppingplansList} 
            show={ShoppingplansShow} 
            create={ShoppingplansCreate} 
            edit={ShoppingplansEdit} 
            />
        <Resource 
            name="Police" 
            icon={NotificationsPaused} 
            list={PoliceList} 
            />
        <Resource 
            name="Requests" 
            icon={VpnKey} 
            list={RequestList} 
            show={RequestShow} 
            />
    </Admin>  
);

export default App;