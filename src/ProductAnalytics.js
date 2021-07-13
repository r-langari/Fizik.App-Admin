import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';

class ProductAnalytics extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
          productanalytics : []
        }
    }
    
    componentDidMount() {

      fetch(process.env.REACT_APP_API_URL+`/products/productanalytics`, { 
        method: 'GET',
        headers: {}
      })
      .then((response) => {
          return response.json();
      })
      .then((myJson) => {

          this.setState({productanalytics:myJson});

      })
      .catch((e) => {
          // showNotification('Error: comment not approved', 'warning')
      });
      
    }

render () {
      
    return (
        <React.Fragment>
          
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Thumbnail</TableCell>
                <TableCell>Name</TableCell>
                <TableCell align="right">Views</TableCell>
                <TableCell align="right">Likes</TableCell>
                <TableCell align="right">dis Likes</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.productanalytics.map(row => (
                <TableRow key={row.id}>
                  <TableCell scope="row">
                    <Avatar alt="Remy Sharp" src={row.thumbnail} />
                  </TableCell>
                  <TableCell scope="row">{row.name}</TableCell>
                  <TableCell align="right">{row.views}</TableCell>
                  <TableCell align="right">{row.likes}</TableCell>
                  <TableCell align="right">{row.dislikes}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          
        </React.Fragment>
      );
    }
}

export default ProductAnalytics;