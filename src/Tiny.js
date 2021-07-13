import React from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { FormDataConsumer, REDUX_FORM_NAME } from 'react-admin';
import { change } from 'redux-form';
// import './tiny-mce-fonts.css';

class Tiny extends React.Component {

  constructor(props) {
    super(props);
  }
  handleEditorChange = (e) => {
    console.log('Content was updated:', e.target.getContent());
  }

  componentDidMount() {
  }

  render() {
    let initVal;
    if (typeof (this.props.record.data) !== 'undefined') {
      initVal = this.props.record.data.summary.description;
    }

    else
      initVal = '';
    return (
      <FormDataConsumer>
        {({ formData, dispatch, ...rest }) => (
          <Editor
            apiKey="cd17a1x8m0m5e3yp3kswj336m51li7i90glwf1mqs9jjqg0j"
            initialValue={initVal}
            init={{
              height: 500,
              menubar: false,
              //  tinydrive_token_provider: function (success, failure) {
              //   success({ token: 'jwt-token' });
              //   failure('Could not create a jwt token')
              // },
              // tinydrive_upload_path: '/uploads',
              tinydrive_token_provider: 'http://localhost:1337/users/jwt',
              plugins: [
                'code emoticons textcolor tinydrive advlist autolink lists link image charmap print preview anchor',
                'searchreplace visualblocks code fullscreen',
                'insertdatetime media table paste code help wordcount '
              ],
              imagetools_toolbar: "rotateleft rotateright | flipv fliph | editimage imageoptions",
              toolbar:
                'code fontsizeselect fontselect emoticons insertfile image imagetools undo redo | fullscreen | formatselect | forecolor backcolor | bold italic | \
             alignleft aligncenter alignright alignjustify | \
             bullist numlist outdent indent | removeformat | help',
              content_css: 'tiny-mce-fonts.css',
              font_formats: 'Arial Black=arial black,avant garde;Indie Flower=indie flower;Amiri=Amiri;B Jadid=B Jadid;B Morvarid=B Morvarid;B Kamran=B Kamran;B Nazanin=B Nazanin;Lateef=Lateef;Almarai=Almarai;Mada=Mada;Baloo Bhaijaan=Baloo Bhaijaan;Mirza=Mirza;Rakkas=Rakkas;Katibeh=Katibeh;Vibes=Vibes;Jomhuria=Jomhuria;Aref Ruqaa=Aref Ruqaa;Harmattan=Harmattan;Lemonada=Lemonada;Scheherazade=Scheherazade;Reem Kufi=Reem Kufi;Markazi Text=Markazi Text;Lalezar=Lalezar;El Messiri=El Messiri;Tajawal=Tajawal;Changa=Changa; cursive;Times New Roman=times new roman,times;'
            }}
            // onChange={this.handleEditorChange}
            onChange={
              (e) => {
                dispatch(
                  change(REDUX_FORM_NAME, 'description', e.target.getContent())
                )
              }
            }
          />
        )}
      </FormDataConsumer>
    );
  }
}

export default Tiny;