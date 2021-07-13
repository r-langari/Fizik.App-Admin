import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Fab from '@material-ui/core/Fab';
import NavigationIcon from '@material-ui/icons/Navigation';

class UserActivityGrid extends React.Component {
    
    constructor() {
        super();
    }
    
render () {
    
    return (
        
          <Table>
           
            <TableBody>
                {[
                    {
                        operation:'number of watched videos',
                        value: 12
                    },
                    {
                        operation:'number of invitation',
                        value: 4
                    },
                    {
                        operation:'total online time',
                        value: 63
                    },
                    {
                        operation:'number of registered device',
                        value: 2
                    },
                    {
                        operation:'number of passed queries',
                        value: 22
                    },
                    {
                        operation:'shopping level',
                        value: 3
                    }
                ].map(row => (
                    <TableRow key={row.value}>
                        
                        <TableCell component="th" scope="row">
                            {row.operation}
                        </TableCell>

                        <TableCell>
                            {row.value}
                        </TableCell>
                        
                        <TableCell>
                            {/* <Fab color="primary" aria-label="Add">
                                <NavigationIcon />
                            </Fab> */}
                        </TableCell>

                    </TableRow>
                  
                ))}
            </TableBody>
          </Table>
       
      );
    }
}

export default UserActivityGrid;