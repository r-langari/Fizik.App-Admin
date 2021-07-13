import React, { useEffect } from "react";
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
} from "react-admin";

import { Pagination } from "react-admin";
import TagComponent from "./TagComponent";
import QuizManager from "./QuizManager";
import ProductReports from "./ProductReports";
import Mycheckbox from "./MyNewField2";
import Thumbnail from "./ThumbnailImage";
import VideoPlayerField from "./VideoPlayerField";
import ProductsQuestions from "./ProductsQuestions";
import ProductsComments from "./ProductsComments";
import SciencechallengeUserAnswers from "./SciencechallengeUserAnswers";
import SciencechallengeUserCorrectAnswers from "./SciencechallengeUserCorrectAnswers";
import Fab from "@material-ui/core/Fab";
import NavigationIcon from "@material-ui/icons/Navigation";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import UploadComponent from "./UploadComponent";
import ContentUserInteraction from "./ContentUserInteraction";
import MyEditor from "./TextEditor";
import Tiny from "./Tiny";

let allNames;

const duplicateNameValidation = (value, allValues) => {
  if (allNames.find((val) => val === value.trim())) return "Duplicated name";

  return "";
};

const validateScienceChallengeName = [
  required(),
  minLength(1),
  maxLength(50),
  duplicateNameValidation,
];
const validateScienceChallengeTitle = [required(), minLength(1), maxLength(30)];
const validateScienceChallengeDuration = [
  required(),
  minLength(1),
  maxLength(2000),
  minValue(1),
];
export const SciencechallengeCreate = (props) => {
  useEffect(() => {
    fetch(process.env.REACT_APP_API_URL + `/sciencechallenge/findallnames`, {
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
          validate={validateScienceChallengeName}
        />
        <TextInput
          source="title"
          label="title"
          validate={validateScienceChallengeTitle}
        />
        <TextInput
          source="titletag"
          label="title tag"
          validate={validateScienceChallengeTitle}
        />
        <LongTextInput source="descriptiontag" label="description tag" />
        <Tiny />
        {/* <TagComponent source="tags" label="select tags (optional)" /> */}
        <UploadComponent
          type="thumbnail"
          model="sciencechallenge"
          showtext="thumbnail"
        />
        <TextInput
          source="duration"
          label="duration in seconds"
          type="number"
          validate={validateScienceChallengeDuration}
        />
        <UploadComponent type="file" model="sciencechallenge" showtext=".mp4" />
      </SimpleForm>
    </Create>
  );
};

export const SciencechallengeEdit = (props) => (
  <Edit title="Sciencechallenge edit" {...props}>
    <SimpleForm>
      <TextInput source="data.summary.name" label="name" />
      <TextInput source="data.summary.title" label="title" />
      <TextInput source="data.summary.titletag" label="title tag" />
      <LongTextInput
        source="data.summary.descriptiontag"
        label="description tag"
      />
      <Tiny />
      {/* <TagComponent source="tags" label="select tags (optional)" /> */}

      <UploadComponent type="thumbnail" model="sciencechallenge" />
      <TextInput
        source="data.summary.duration"
        label="duration in seconds"
        type="number"
        validate={validateScienceChallengeDuration}
      />

      <UploadComponent type="file" model="sciencechallenge" />
    </SimpleForm>
  </Edit>
);

const qaConfig = [
  {
    type: "qa",
    label: "پرسش و پاسخ",
    model: "sciencechallenge",
  },
];

const cmConfig = [
  {
    type: "qa",
    label: "پرسش و پاسخ",
    model: "sciencechallenge",
  },
];

export const SciencechallengeShow = (props) => (
  <Show {...props}>
    <TabbedShowLayout>
      <Tab label="information">
        <TextField source="id" label="Id" />
        <Thumbnail source="thumbnail" label="thumbnail" />
        <TextField source="summary.title" label="title" />
        <TextField source="summary.name" label="name" />
        <VideoPlayerField />
        <RichTextField source="summary.description" label="description" />
        <ArrayField source="summary.tagsArray" label="tags">
          <SingleFieldList>
            <ChipField source="name" />
          </SingleFieldList>
        </ArrayField>
      </Tab>

      <Tab label="qa" path="qa">
        <ContentUserInteraction config={qaConfig} modelid={props.id} />
      </Tab>

      <Tab label="comments" path="comments">
        <ContentUserInteraction config={cmConfig} modelid={props.id} />
      </Tab>

      <Tab label="answers" path="answers">
        <SciencechallengeUserAnswers />
      </Tab>

      <Tab label="correct answers" path="correct-answers">
        <SciencechallengeUserCorrectAnswers />
      </Tab>
    </TabbedShowLayout>
  </Show>
);
const SciencechallengePagination = (props) => (
  <Pagination rowsPerPageOptions={[5, 10, 25, 50, 100]} {...props} />
);

export const SciencechallengeList = (props) => (
  <List {...props} pagination={<SciencechallengePagination />}>
    <Datagrid rowClick="show">
      <Thumbnail
        source="data.summary.thumbnail"
        label="thumbnail"
        sortable={false}
      />
      <TextField
        source="data.summary.name"
        sortBy="name"
        label="Name"
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
                label="tags"
                >
                <SingleFieldList>
                    <ChipField source="name" />
                </SingleFieldList>
            </ArrayField> */}
      <BooleanField
        source="data.summary.isEnabled"
        sortBy="isEnabled"
        label="Enable"
      />
      <TextField
        source="data.summary.jalaaliFullUserFriendlyCreatedDate"
        sortBy="createdAt"
        label="Date"
        style={{
          fontFamily: "Far_Kamran",
          fontSize: "19px",
          fontWeight: "bold",
          color: "black",
          direction: "rtl",
        }}
      />
      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
);
