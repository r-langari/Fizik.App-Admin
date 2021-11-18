// Import React FilePond
import React, { Fragment } from 'react';
import { FilePond, registerPlugin } from "react-filepond";
import { change } from 'redux-form';
import { FormDataConsumer, REDUX_FORM_NAME } from 'react-admin';

// Import FilePond styles
import "filepond/dist/filepond.min.css";

// Import the Image EXIF Orientation and Image Preview plugins
// Note: These need to be installed separately
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";

// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

// Our app
function WarningBanner(props) {
  if (typeof (props.type.record.data) !== 'undefined')
    if (props.type.type === 'thumbnail') {
      return (
        <img
          alt=""
          src={props.type.record.data.summary.thumbnail}
          style={{
            width: '50px',
            height: '50px',
            borderRadius: '50%'
          }}
        />
      )
    }
  return null;
}

export default class UploadComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // Set initial files, type 'local' means this is a file
      // that has already been uploaded to the server (see docs)
      files: [],
      fileName: null
    };

  }

  componentDidMount() {
    let suffix = (this.props.type == 'thumbnail') ? "webp" : "mp4";
    this.setState({
      fileName: '_' + Math.random().toString(36).substr(2, 9) + '.' + suffix
    });
  }

  handleInit() {
  }

  uuidv4 = () => {
    return 'xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  render() {
    let uploadUrl = `https://admin.fizik.app/public/ffmpeg-20200604-7f81785-win64-static/ffmpeg-20200604-7f81785-win64-static/bin/upload.php?model=${this.props.model}&type=${this.props.type}&filename=${this.state.fileName}`
    return (
      <React.Fragment>
        <div>{this.props.showtext}</div>
        <WarningBanner type={this.props} />

        <FormDataConsumer>
          {({ formData, dispatch, ...rest }) => (
            <FilePond
              ref={ref => (this.pond = ref)}
              files={this.state.files}
              allowMultiple={false}
              maxFiles={1}
              server={uploadUrl}
              onprocessfile={fileItem => {
                // let fileNameInfo = this.state.files[0].name.split('.');

                dispatch(
                  change(REDUX_FORM_NAME, this.props.type, this.state.fileName)
                )
              }}
              oninit={() => this.handleInit()}
              onupdatefiles={fileItems => {
                // Set currently active file objects to this.state
                this.setState({
                  files: fileItems.map(fileItem => fileItem.file)
                }, () => {

                });

              }}
            />
          )}
        </FormDataConsumer>
      </React.Fragment>
    );
  }

}