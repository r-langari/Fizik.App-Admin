import React, { Fragment, useState, useEffect } from "react";
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
  TextInput,
  LongTextInput,
  ReferenceManyField,
  Datagrid,
  TextField,
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
  Filter,
} from "react-admin";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { Pagination } from "react-admin";
import TagComponent from "./TagComponent";
import Book from "./Book";
import QuizManager from "./QuizManager";
import ProductReports from "./ProductReports";
import Mycheckbox from "./MyNewField2";
import Thumbnail from "./ThumbnailImage";
import UploadComponent from "./UploadComponent";
import VideoPlayerField from "./VideoPlayerField";
import ProductsQuestions from "./ProductsQuestions";
import ProductsComments from "./ProductsComments";
import Fab from "@material-ui/core/Fab";
import NavigationIcon from "@material-ui/icons/Navigation";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import { FormDataConsumer, REDUX_FORM_NAME } from "react-admin";
import { change } from "redux-form";
import ContentUserInteraction from "./ContentUserInteraction";
import MyEditor from "./TextEditor";
import Tiny from "./Tiny";
import Typography from "@material-ui/core/Typography";

let formElementValues = {};

const formInformationHolder = (formData) => {
  formElementValues = formData;
};

// const findDuplicateName = async (name) => {
//     const errors = {};
//     fetch(process.env.REACT_APP_API_URL+`/products/findproductbyname?name=${name}`, {
//         method: "GET",
//         headers: {},
//     })
//     .then((response) => {
//         return response.json();
//     })
//     .then((myJson) => {
//         if (typeof myJson.data.name !== "undefined"){
//             console.log(`duplicate name ${myJson.data.name.name}`);
//             errors.name = ['Duplicate Name'];
//         }
//     })
//     .catch((e) => {

//     });
//     return errors;
// }
let allNames;

const duplicateNameValidation = (value, allValues) => {
  if (allNames.find((val) => val === value.trim())) return "Duplicated name";

  return "";
};

const validateProductName = [
  required(),
  minLength(1),
  maxLength(100),
  duplicateNameValidation,
];
const validateProductTitle = [required(), minLength(1), maxLength(100)];
const validateProductDuration = [
  required(),
  minLength(1),
  maxLength(2000),
  minValue(1),
];

export const ProductCreate = (props) => {
  useEffect(() => {
    fetch(process.env.REACT_APP_API_URL + `/products/findallnames`, {
      method: "GET",
      headers: {},
    })
      .then((response) => {
        return response.json();
      })
      .then((myJson) => {
        let temp = myJson.map((val) => val.name);
        allNames = temp;
      })
      .catch((e) => {});
  }, []);
  return (
    <Create {...props}>
      <SimpleForm redirect="list" submitOnEnter={true}>
        <TextInput source="name" label="name" validate={validateProductName} />
        <TextInput
          source="title"
          label="title"
          validate={validateProductTitle}
        />
        <TextInput
          source="titletag"
          label="title tag"
          validate={validateProductTitle}
        />
        <LongTextInput source="descriptiontag" label="description tag" />
        <Tiny />
        <BooleanInput label="is medal" source="isMedal" />
        <Book {...props} />
        <UploadComponent
          type="thumbnail"
          model="products"
          showtext="thumbnail"
        />
        <TextInput
          source="duration"
          label="duration in seconds"
          type="number"
          validate={validateProductDuration}
        />
        {/* <UploadComponent
                    type="file"
                    model="products"
                    showtext=".mp4"
                /> */}
        <UploadComponent type="file" model="products" showtext=".mp4" />
      </SimpleForm>
    </Create>
  );
};

export const ProductEdit = (props) => (
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

      <BooleanInput label="is medal" source="data.summary.isMedal" />

      <Book {...props} />

      <UploadComponent
        type="thumbnail"
        model="products"
        default="data.summary.thumbnail"
        showtext="thumbnail"
      />

      <TextInput
        source="data.summary.duration"
        label="duration in seconds"
        type="number"
        validate={validateProductDuration}
      />
      
      <UploadComponent
        type="file"
        model="products"
        default="data.summary.file"
        showtext="mp4"
      />

      {/* <UploadComponent
                type="file"
                model="products"
                showtext=".m3u8"
            /> */}
      {/* <UploadComponent
                type="file"
                model="products"
                showtext=".mp4"
            /> */}
    </SimpleForm>
  </Edit>
);

const qaConfig = [
  {
    type: "qa",
    label: "پرسش و پاسخ",
    model: "products",
  },
];

const cmConfig = [
  {
    type: "comment",
    label: "پرسش و پاسخ",
    model: "products",
  },
];

export const ProductShow = (props) => (
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
        <TextField source="data.id" label="Id" />
        <Thumbnail
          source="data.thumbnail"
          label={
            <Typography
              style={{
                fontFamily: "IranSans",
                fontSize: "13px",
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
          style={{
            fontFamily: "IranSans",
            fontSize: "13px",
            color: "black",
            direction: "rtl",
          }}
          source="data.summary.title"
          label={
            <Typography
              style={{
                fontFamily: "IranSans",
                fontSize: "13px",
                color: "black",
                direction: "rtl",
              }}
              color="inherit"
              variant="subtitle1"
            >
              عنوان
            </Typography>
          }
        />
        <TextField
          style={{
            fontFamily: "IranSans",
            fontSize: "13px",
            color: "black",
            direction: "rtl",
          }}
          source="data.summary.name"
          label={
            <Typography
              style={{
                fontFamily: "IranSans",
                fontSize: "13px",
                color: "black",
                direction: "rtl",
              }}
              color="inherit"
              variant="subtitle1"
            >
              نام
            </Typography>
          }
        />
        {/* <VideoPlayerField /> */}
        <RichTextField
          source="data.summary.description"
          label={
            <Typography
              style={{
                fontFamily: "IranSans",
                fontSize: "13px",
                color: "black",
                direction: "rtl",
              }}
              color="inherit"
              variant="subtitle1"
            >
              توضیحات
            </Typography>
          }
        />
        <ArrayField
          source="data.summary.tagsArray"
          label={
            <Typography
              style={{
                fontFamily: "IranSans",
                fontSize: "13px",
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
            <ChipField
              source="name"
              style={{
                fontFamily: "Far_Kamran",
                fontSize: "13px",
                color: "black",
                direction: "rtl",
              }}
            />
          </SingleFieldList>
        </ArrayField>
      </Tab>

      <Tab
        label={
          <Typography
            style={{
              fontFamily: "IranSans",
              fontSize: "13px",
              color: "black",
              direction: "rtl",
            }}
            color="inherit"
            variant="subtitle1"
          >
            پرسش پاسخ
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

      <Tab
        label={
          <Typography
            style={{
              fontFamily: "IranSans",
              fontSize: "13px",
              color: "black",
              direction: "rtl",
            }}
            color="inherit"
            variant="subtitle1"
          >
            کوییز
          </Typography>
        }
        path="quiz"
      >
        <QuizManager model="products" />
      </Tab>
    </TabbedShowLayout>
  </Show>
);
const ProductPagination = (props) => (
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

export const ProductsList = (props) => (
  <React.Fragment>
    <div>{props.length}</div>
    <List
      {...props}
      pagination={<ProductPagination />}
      filters={<PostFilter />}
    >
      <Datagrid rowClick="show">
        <Thumbnail
          source="data.thumbnail"
          sortable={false}
          label={
            <Typography
              style={{
                fontFamily: "IranSans",
                fontSize: "13px",
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
          sortBy="name"
          label={
            <Typography
              style={{
                fontFamily: "IranSans",
                fontSize: "13px",
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
            direction: "rtl",
          }}
        />

<TextField
          source="data.summary.newUserinteractions"
          sortBy="newUserinteractions"
          label={
            <Typography
              style={{
                fontFamily: "IranSans",
                fontSize: "13px",
                color: "black",
                direction: "rtl",
              }}
              color="inherit"
              variant="subtitle1"
            >
              کامنت جدید
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
        {/* <ArrayField 
                source="data.summary.tagsArray" 
                label={<Typography 
                style={{ 
                    fontFamily: 'IranSans' ,
                    fontSize: '13px',
                    color: 'black',
                    direction: 'rtl'
                }}
                color="inherit" variant="subtitle1">
                برچسب
            </Typography>}>
                <SingleFieldList>
                    <ChipField 
                        source="name" 
                        style={{ 
                            fontFamily: 'Far_Kamran' ,
                            fontSize: '13px',
                            color: 'black',
                            direction: 'rtl'
                        }}
                        />
                </SingleFieldList>
            </ArrayField> */}
        <BooleanField
          source="data.summary.isMedal"
          sortBy="isMedal"
          label={
            <Typography
              style={{
                fontFamily: "IranSans",
                fontSize: "13px",
                color: "black",
                direction: "rtl",
              }}
              color="inherit"
              variant="subtitle1"
            >
              مدالیون
            </Typography>
          }
        />
        <BooleanField
          source="data.summary.hasQuiz"
          sortable={false}
          label={
            <Typography
              style={{
                fontFamily: "IranSans",
                fontSize: "13px",
                color: "black",
                direction: "rtl",
              }}
              color="inherit"
              variant="subtitle1"
            >
              کوییز
            </Typography>
          }
        />
        <TextField
          source="data.summary.jalaaliFullUserFriendlyCreatedDate"
          sortBy="createdAt"
          label={
            <Typography
              style={{
                fontFamily: "IranSans",
                fontSize: "13px",
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
  </React.Fragment>
);
