import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';

const mycheckbox = props => {
  return (
    <React.Fragment>
      <br />
    <FormControl component="fieldset">
      <FormLabel component="legend">Assign responsibility</FormLabel>
      <FormGroup>
        <FormControlLabel
          control={<Checkbox value="gilad" />}
          label="Gilad Gray"
        />
        <FormControlLabel
          control={<Checkbox value="gilad" checked />}
          label="Gilad Gray"
        />
        <FormControlLabel
          control={<Checkbox value="gilad" />}
          label="Gilad Gray"
        />
        <FormControlLabel
          control={<Checkbox value="gilad" />}
          label="Gilad Gray"
        />
      </FormGroup>
    </FormControl>
    </React.Fragment>
  )
}

export default mycheckbox;