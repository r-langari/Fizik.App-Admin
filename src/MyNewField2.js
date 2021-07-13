import React from 'react';
import { Field, reduxForm } from 'redux-form'
import mycheckbox from './MyAutoSelect2'

const mycheckbox2 = props => {
  
  return (
      <Field name="mycheckbox" component={mycheckbox} />
  )
}

export default reduxForm({ form: 'record-form' })(mycheckbox2);