import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import ClearIcon from '@material-ui/icons/Clear';

class QuizOptionsList extends React.Component {
    
    constructor ( props ) {
        super (props);
    }

    componentDidMount() {
        console.info('QuizOptionsList:', this.props);
    }

    render () {
        return (
            <Table>
                <TableHead>
                <TableRow>
                    <TableCell>answers</TableCell>
                    <TableCell align="right">correct answer</TableCell>
                    <TableCell align="right">delete</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                    {this.props.options.map(
                        (item, index) => (
                            <TableRow key={index}>
                                <TableCell component="th" scope="row">{item.title}</TableCell>
                                <TableCell align="right">
                                <Tooltip title="make this option the correct answer">
                                    <IconButton aria-label="Done">
                                        <ClearIcon fontSize="small" />
                                    </IconButton>
                                </Tooltip>
                                </TableCell>
                                <TableCell align="right">
                                    <IconButton aria-label="Delete">
                                        <DeleteIcon fontSize="small" />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        )
                    )}

                </TableBody>
            </Table>
        )
    };
}

export default QuizOptionsList;