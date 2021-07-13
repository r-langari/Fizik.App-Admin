import React from 'react';
import Paper from '@material-ui/core/Paper';
import { withDataProvider } from 'react-admin';
import PropTypes from 'prop-types';

import EnhancedTable from './EnhancedTable' ;

class Mylist extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
        
    }
  }

  render() {
    return (
      <Paper>
        <EnhancedTable />
      </Paper>
    )
  };
}
Mylist.propTypes = {
  dataProvider: PropTypes.func.isRequired,
};
export default withDataProvider(Mylist);