import React from 'react';
import TextField from '@material-ui/core/TextField';

const MyTextField = props => {
  return (
    <TextField
        id="filled-multiline-flexible"
        label="response"
        multiline
        rowsMax="4"
        margin="normal"
        fullWidth
        {...props}
      />
  )
}
export default MyTextField;