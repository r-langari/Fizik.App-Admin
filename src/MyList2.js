import React from 'react';
import Paper from '@material-ui/core/Paper';
import { withDataProvider } from 'react-admin';
import PropTypes from 'prop-types';

import EnhancedTable2 from './EnhancedTable2' ;

class Mylist2 extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
        
      }
  }
  
  render() {
    return (
    <Paper>
      <EnhancedTable2 />
    </Paper>
  )
};
}
Mylist2.propTypes = {
  dataProvider: PropTypes.func.isRequired,
};
export default withDataProvider(Mylist2);