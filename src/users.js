import React, { Fragment } from "react";
import {
  List,
  Datagrid,
  Create,
  SimpleForm,
  TextInput,
  ImageInput,
  ImageField,
  BooleanField,
  SelectInput,
  Show,
  TabbedShowLayout,
  Tab,
  TextField,
  NumberInput,
  Filter,
  FunctionField,
} from "react-admin";

import UserManageTab from "./UserManageTab";
import UserFinancialTab from "./UserFinancialTab";
import UserActivityGrid from "./UserActivityTab";
import AlignItemsList from "./UserActivityTab2";
import Thumbnail from "./ThumbnailImage";
import { FormDataConsumer, REDUX_FORM_NAME } from "react-admin";
import { change } from "redux-form";
import { GetProvincesFor, GetCitiesFor, countries } from "./GetCitiesFor";
import { Pagination } from "react-admin";
import UploadComponent from "./UploadComponent";
import UsersAbundance from "./UsersAbundance";

// returnCorrectMoneyFormat = (money) => {
//     let tempMoney = parseInt(money / 10);
//     return new Intl.NumberFormat('fa-IR').format(tempMoney);
// }

export const userShow = (props) => (
  <Show {...props}>
    <TabbedShowLayout>
      <Tab label="information">
        <TextField source="id" label="Id" />
        <TextField
          source="jalaaliFullUserFriendlyCreatedDate"
          label="register date"
        />
        <TextField source="email" />
        <TextField source="phone" />
        <TextField source="mobile" />
        <BooleanField source="suspend" />
        <TextField source="gender" />
        <TextField source="gradeLabel" />
        <TextField source="address" />
      </Tab>

      <Tab label="activities" path="activities">
        <AlignItemsList />
      </Tab>

      <Tab label="financial" path="financial">
        <UserFinancialTab />
      </Tab>

      <Tab label="manage" path="manage">
        <UserManageTab />
      </Tab>
    </TabbedShowLayout>
  </Show>
);

export const UserCreatee = (props) => (
  <Create {...props}>
    <SimpleForm>
      <FormDataConsumer>
        {({ formData, dispatch, ...rest }) => (
          <Fragment>
            <SelectInput
              source="country"
              label="country"
              choices={countries}
              onChange={(value) =>
                dispatch(change(REDUX_FORM_NAME, "province", null))
              }
              {...rest}
            />
            <SelectInput
              source="province"
              label="province"
              choices={GetProvincesFor(formData.country)}
              onChange={(value) =>
                dispatch(change(REDUX_FORM_NAME, "city", null))
              }
              {...rest}
            />
            <SelectInput
              source="city"
              label="city"
              choices={GetCitiesFor(formData.province)}
              {...rest}
            />
          </Fragment>
        )}
      </FormDataConsumer>
    </SimpleForm>
  </Create>
);

export const UserCreate = (props) => (
  <Create {...props}>
    <SimpleForm submitOnEnter={true}>
      <TextInput source="firstName" label="first name" />
      <TextInput source="lastName" label="last name" />
      <TextInput source="email" label="email" />
      <TextInput source="userName" label="username" />
      <TextInput source="password" label="password" />
      <TextInput source="mobile" label="mobile" />
      <TextInput source="phone" label="phone" />
      <NumberInput source="fCoin" label="default f-coin" />
      <SelectInput
        source="gender"
        choices={[
          { id: "male", name: "male" },
          { id: "female", name: "female" },
          { id: "others", name: "others" },
        ]}
      />

      <SelectInput
        source="grade"
        choices={[
          { id: "10", name: "دهم" },
          { id: "11", name: "یازدهم" },
          { id: "12", name: "دوازدهم" },
          { id: "13", name: "فارغ التحصیل" },
        ]}
      />
      <FormDataConsumer>
        {({ formData, dispatch, ...rest }) => (
          <Fragment>
            <SelectInput
              source="country"
              label="country"
              choices={countries}
              onChange={(value) =>
                dispatch(change(REDUX_FORM_NAME, "province", null))
              }
              {...rest}
            />
            <SelectInput
              source="province"
              label="province"
              choices={GetProvincesFor(formData.country)}
              onChange={(value) =>
                dispatch(change(REDUX_FORM_NAME, "city", null))
              }
              {...rest}
            />
            <SelectInput
              source="city"
              label="city"
              choices={GetCitiesFor(formData.province)}
              {...rest}
            />
          </Fragment>
        )}
      </FormDataConsumer>
      <UploadComponent type="thumbnail" model="users" />
    </SimpleForm>
  </Create>
);

const UserPagination = (props) => (
  <Pagination rowsPerPageOptions={[5, 10, 25, 50, 100]} {...props} />
);

const PostFilter = (props) => {
  return (
    <Filter {...props}>
      {/* <TextInput label="Search" source="q" alwaysOn /> */}
      <TextInput label="search by name" source="fullName" alwaysOn />
    </Filter>
  );
};

export const UsersList = (props) => (
  <React.Fragment>
    <List {...props} pagination={<UserPagination />} filters={<PostFilter />}>
      <Datagrid rowClick="show">
        <Thumbnail sortable={false} source="thumbnail" label="thumbnail" />
        {/* <TextField 
                source="userName" 
                label="username" 
                /> */}
        <TextField
          sortBy="firstName"
          source="fullName"
          label="full name"
          style={{
            fontFamily: "Far_Kamran, Verdana",
            fontSize: "19px",
            fontWeight: "bold",
            color: "black",
          }}
        />
        <TextField
          source="jalaaliRegisterDate"
          sortBy="createdAt"
          label="last login"
          style={{
            fontFamily: "Far_Kamran",
            fontSize: "19px",
            fontWeight: "bold",
            color: "black",
          }}
        />
        <FunctionField
          label="Author"
          sortBy="last_name"
          style={{
            fontFamily: "Far_Kamran",
            fontSize: "19px",
            fontWeight: "bold",
            color: "black",
            direction: "rtl",
          }}
          render={(record) =>
            `${new Intl.NumberFormat("fa-IR").format(
              parseInt(record.totalPurchase / 10)
            )} تومان`
          }
        />
        {/* <TextField 
                sortable={false}
                source="totalPurchase" 
                label="total purchase" 
                style={{ 
                    fontFamily: 'Far_Kamran' ,
                    fontSize: '19px',
                    fontWeight : 'bold',
                    color: 'black'
                }}
                /> */}
        <TextField
          source="fCoin"
          label="f coin"
          sortBy="fCoin"
          style={{
            fontFamily: "Far_Kamran",
            fontSize: "19px",
            fontWeight: "bold",
            color: "black",
            direction: "rtl",
          }}
        />
        <FunctionField
          // source="watchTime"
          sortBy="watchTime"
          label="watch time"
          sortable={true}
          style={{
            fontFamily: "Far_Kamran",
            fontSize: "19px",
            fontWeight: "bold",
            color: "black",
            direction: "rtl",
          }}
          render={(record) =>
            `${new Intl.NumberFormat("fa-IR").format(
              parseInt(record.watchTime)
            )}`
          }
        />
        <TextField
          sortBy="invitationNewUserNumber"
          source="invitationNewUserNumber"
          label="invitations"
          style={{
            fontFamily: "Far_Kamran",
            fontSize: "19px",
            fontWeight: "bold",
            color: "black",
          }}
        />
        <TextField source="subType" label="sub type" sortable={false} />
      </Datagrid>
    </List>
    <UsersAbundance />
  </React.Fragment>
);
