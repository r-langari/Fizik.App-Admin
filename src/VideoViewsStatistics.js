import React from 'react';
import { BooleanField } from 'react-admin';
import Typography from '@material-ui/core/Typography';
import TableCell from '@material-ui/core/TableCell';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Avatar from '@material-ui/core/Avatar';
import CheckIcon from '@material-ui/icons/Check';

class VideoViewsStatistics extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      rows: []
    }
  }

  componentDidMount() {
    fetch(process.env.REACT_APP_API_URL + `/users/videoviewsstatistics?userId=${this.props.userid}`, {
      method: "GET",
      headers: {},
    })
      .then((response) => {
        return response.json();
      })
      .then((myJson) => {
        this.setState({
          rows: myJson
        })
      })
      .catch((e) => {

      });
  }

  render() {
    return (
      <React.Fragment>

        <Table>
          <TableHead>
            <TableRow>
              <TableCell>تصویر</TableCell>
              <TableCell>نام ویدیو</TableCell>
              <TableCell>دهم</TableCell>
              <TableCell>یازدهم</TableCell>
              <TableCell>دوازدهم</TableCell>
              <TableCell>تاریخ بازدید</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.rows.map((row) => (
              <TableRow key={row.name}>
                <TableCell component="th" scope="row">
                  <Avatar alt={row.name} src={row.thumbnail} />
                </TableCell>

                <TableCell>{row.name}</TableCell>
                <TableCell>
                  {row.isDahom ? <CheckIcon /> : null}
                </TableCell>
                <TableCell>
                  {row.isYazdahom ? <CheckIcon /> : null}
                </TableCell>
                <TableCell>
                  {row.isDavazdahom ? <CheckIcon /> : null}
                </TableCell>
                <TableCell>{row.jalaaliFullUserFriendlyCreatedDate}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

      </React.Fragment>
    );
  }
}


export default VideoViewsStatistics;