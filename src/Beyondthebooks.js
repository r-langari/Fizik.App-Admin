import React, {useEffect} from "react";
import {
  Show,
  RichTextField,
  TabbedShowLayout,
  Tab,
  NumberField,
  BooleanField,
  ChipField,
  FileField,
  FileInput,
  ImageField,
  ImageInput,
  NumberInput,
  BooleanInput,
  List,
  Create,
  Edit,
  SimpleForm,
  DisabledInput,
  TextInput,
  LongTextInput,
  ReferenceManyField,
  Datagrid,
  TextField,
  DateField,
  ArrayField,
  SingleFieldList,
  SelectInput,
  ShowButton,
  EditButton,
  DeleteButton,
  DateInput,
  ReferenceInput,
  required,
  minLength,
  maxLength,
  minValue,
  maxValue,
  number,
  regex,
  email,
  choices,
  Filter
} from "react-admin";

import { Pagination } from "react-admin";
import TagComponent from "./TagComponent";
import ProductReports from "./ProductReports";
import Mycheckbox from "./MyNewField2";
import Thumbnail from "./ThumbnailImage";
import VideoPlayerField from "./VideoPlayerField";
import ProductsQuestions from "./ProductsQuestions";
import ProductsComments from "./ProductsComments";
import Fab from "@material-ui/core/Fab";
import NavigationIcon from "@material-ui/icons/Navigation";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";

import UploadComponent from "./UploadComponent";
import ContentUserInteraction from "./ContentUserInteraction";
import MyEditor from "./TextEditor";
import Typography from "@material-ui/core/Typography";
import Tiny from "./Tiny";

let allNames;

const duplicateNameValidation = (value, allValues) => {
  if (allNames.find((val) => val === value.trim())) return "Duplicated name";

  return "";
};

const validateBeyondTheBookName = [
  required(),
  minLength(1),
  maxLength(50),
  duplicateNameValidation,
];
const validateBeyondTheBookTitle = [required(), minLength(1), maxLength(100)];
const validateBeyondTheBookDuration = [
  required(),
  minLength(1),
  maxLength(2000),
  minValue(1),
];

export const BeyondthebooksCreate = (props) => {
  useEffect(() => {
    fetch(process.env.REACT_APP_API_URL + `/beyondthebooks/findallnames`, {
      method: "GET",
      headers: {},
    })
      .then((response) => {
        return response.json();
      })
      .then((myJson) => {
        let temp = myJson.map((val) => val.name);
        console.log(myJson);
        allNames = temp;
      })
      .catch((e) => {});
  }, []);
  return (
  <Create {...props}>
    <SimpleForm redirect="list" submitOnEnter={true}>
      <TextInput
        source="name"
        label="name"
        validate={validateBeyondTheBookName}
      />
      <TextInput
        source="title"
        label="title"
        validate={validateBeyondTheBookTitle}
      />
      <TextInput
        source="titletag"
        label="title tag"
        validate={validateBeyondTheBookTitle}
      />
      <LongTextInput source="descriptiontag" label="description tag" />
      <Tiny />
      <UploadComponent
        type="thumbnail"
        model="beyondthebooks"
        showtext="thumbnail"
      />

      <TextInput
        source="duration"
        label="duration in seconds"
        type="number"
        validate={validateBeyondTheBookDuration}
      />

      <UploadComponent type="file" model="beyondthebooks" showtext=".mp4" />
      {/* <UploadComponent
                type="thumbnail"
                model="beyondthebooks"
                showtext="thumbnail"
                />
            <TextInput source="duration" label="duration in seconds" type="number" validate={validateBeyondTheBookDuration} />

            <UploadComponent 
                type="file"
                model="beyondthebooks"
                showtext=".ts"
                />

            <UploadComponent 
                type="streamDictionary"
                model="beyondthebooks"
                showtext=".m3u8"
                /> */}
    </SimpleForm>
  </Create>
  );
};

export const BeyondthebooksEdit = (props) => (
  <Edit title="Product edit" {...props}>
    <SimpleForm>
      <TextInput source="data.summary.name" label="name" />
      <TextInput source="data.summary.title" label="title" />
      <TextInput source="data.summary.titletag" label="title tag" />
      <LongTextInput
        source="data.summary.descriptiontag"
        label="description tag"
      />
      <Tiny />
      {/* <LongTextInput source="description" label="description" /> */}
      {/* <TagComponent 
                source="data.summary.tags" 
                label="select tags (optional)" 
                /> */}
      <UploadComponent type="thumbnail" model="beyondthebooks" />
      <TextInput
        source="data.summary.duration"
        label="duration in seconds"
        type="number"
        validate={validateBeyondTheBookDuration}
      />

      {/* <UploadComponent
                type="file"
                model="beyondthebooks"
            /> */}
    </SimpleForm>
  </Edit>
);

const qaConfig = [
  {
    type: "qa",
    label: "پرسش و پاسخ",
    model: "beyondthebook",
  },
];

const cmConfig = [
  {
    type: "qa",
    label: "پرسش و پاسخ",
    model: "beyondthebook",
  },
];

export const BeyondthebooksShow = (props) => (
  <Show {...props}>
    <TabbedShowLayout>
      <Tab
        label={
          <Typography
            style={{
              fontFamily: "IranSans",
              fontSize: "13px",
              // fontWeight : 'bold',
              color: "black",
              direction: "rtl",
            }}
            color="inherit"
            variant="subtitle1"
          >
            اطلاعات
          </Typography>
        }
      >
        <TextField source="id" label="Id" />
        <Thumbnail source="thumbnail" label="thumbnail" />
        <TextField source="data.summary.title" label="title" />
        <TextField source="data.summary.name" label="name" />
        <VideoPlayerField />
        <RichTextField source="data.summary.description" label="description" />
        <ArrayField source="data.summary.tagsArray" label="tags">
          <SingleFieldList>
            <ChipField source="name" />
          </SingleFieldList>
        </ArrayField>
      </Tab>

      <Tab
        label={
          <Typography
            style={{
              fontFamily: "IranSans",
              fontSize: "13px",
              // fontWeight : 'bold',
              color: "black",
              direction: "rtl",
            }}
            color="inherit"
            variant="subtitle1"
          >
            پرسش و پاسخ
          </Typography>
        }
        path="qa"
      >
        <ContentUserInteraction config={qaConfig} modelid={props.id} />
      </Tab>

      <Tab
        label={
          <Typography
            style={{
              fontFamily: "IranSans",
              fontSize: "13px",
              // fontWeight : 'bold',
              color: "black",
              direction: "rtl",
            }}
            color="inherit"
            variant="subtitle1"
          >
            گزارشات
          </Typography>
        }
        path="report"
      >
        <ProductReports />
      </Tab>

      <Tab
        label={
          <Typography
            style={{
              fontFamily: "IranSans",
              fontSize: "13px",
              // fontWeight : 'bold',
              color: "black",
              direction: "rtl",
            }}
            color="inherit"
            variant="subtitle1"
          >
            کامنت
          </Typography>
        }
        path="comments"
      >
        <ContentUserInteraction config={cmConfig} modelid={props.id} />
      </Tab>
    </TabbedShowLayout>
  </Show>
);
const BeyondthebookPagination = (props) => (
  <Pagination rowsPerPageOptions={[5, 10, 25, 50, 100]} {...props} />
);

const PostFilter = (props) => {
  return (
    <Filter {...props}>
      {/* <TextInput label="Search" source="q" alwaysOn /> */}
      <TextInput label="search by name" source="name" alwaysOn />
    </Filter>
  );
};

export const BeyondthebooksList = (props) => (
  <List {...props} pagination={<BeyondthebookPagination />} filters={<PostFilter/>}>
    <Datagrid rowClick="show">
      <Thumbnail
        source="data.thumbnail"
        label={
          <Typography
            style={{
              fontFamily: "IranSans",
              fontSize: "13px",
              // fontWeight : 'bold',
              color: "black",
              direction: "rtl",
            }}
            color="inherit"
            variant="subtitle1"
          >
            تصویر
          </Typography>
        }
      />
      <TextField
        source="data.summary.name"
        label={
          <Typography
            style={{
              fontFamily: "IranSans",
              fontSize: "13px",
              // fontWeight : 'bold',
              color: "black",
              direction: "rtl",
            }}
            color="inherit"
            variant="subtitle1"
          >
            نام
          </Typography>
        }
        style={{
          fontFamily: "Far_Kamran",
          fontSize: "19px",
          fontWeight: "bold",
          color: "black",
        }}
      />
      <ArrayField
        source="data.summary.tagsArray"
        label={
          <Typography
            style={{
              fontFamily: "IranSans",
              fontSize: "13px",
              // fontWeight : 'bold',
              color: "black",
              direction: "rtl",
            }}
            color="inherit"
            variant="subtitle1"
          >
            برچسب ها
          </Typography>
        }
      >
        <SingleFieldList>
          <ChipField source="name" />
        </SingleFieldList>
      </ArrayField>
      <TextField
        source="data.summary.jalaaliFullUserFriendlyCreatedDate"
        label={
          <Typography
            style={{
              fontFamily: "IranSans",
              fontSize: "13px",
              // fontWeight : 'bold',
              color: "black",
              direction: "rtl",
            }}
            color="inherit"
            variant="subtitle1"
          >
            تاریخ ایجاد
          </Typography>
        }
        style={{
          fontFamily: "Far_Kamran",
          fontSize: "19px",
          fontWeight: "bold",
          color: "black",
          direction: "rtl",
        }}
      />
      <EditButton
        label={
          <Typography
            style={{
              fontFamily: "IranSans",
              fontSize: "13px",
              // fontWeight : 'bold',
              color: "black",
              direction: "rtl",
            }}
            color="inherit"
            variant="subtitle1"
          >
            ویرایش
          </Typography>
        }
      />
      <DeleteButton
        label={
          <Typography
            style={{
              fontFamily: "IranSans",
              fontSize: "13px",
              // fontWeight : 'bold',
              color: "black",
              direction: "rtl",
            }}
            color="inherit"
            variant="subtitle1"
          >
            حذف
          </Typography>
        }
      />
    </Datagrid>
  </List>
);
