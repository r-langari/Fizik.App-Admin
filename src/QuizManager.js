import React from 'react';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import AddIcon from '@material-ui/icons/Add';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import SlowMotionVideo from '@material-ui/icons/SlowMotionVideo';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import QuizOptionsList from './QuizOptionsList';
// import CreateQuizDialog from './CreateQuizDialog';
import dataProvider from './dataProvider';
import { push } from 'react-router-redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { GET_LIST, withDataProvider, CREATE, showNotification, SimpleForm, GET_ONE } from 'react-admin';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import DeleteIcon from '@material-ui/icons/Delete';
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
import TableHead from '@material-ui/core/TableHead';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Editor } from '@tinymce/tinymce-react';
class QuizManager extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            open: true,
            quizes: [],
            dialogOpen: false,
            text: '',
            showOptionDialog: false,
            optionText: '',
            itemId: '',
            showDeleteDialog: false
        }

    }

    componentDidMount() {
        this.fetchQuizes();
    }

    handleClick() {
        this.setState((state, props) => {
            return { open: !state.open };
        });
    }

    fetchQuizes = () => {
        fetch(process.env.REACT_APP_API_URL + `/quizes/?model=${this.props.model}&modelId=${this.props.record.data.id}`, { method: 'GET', headers: {} })
            .then((response) => {
                return response.json();
            })
            .then((myJson) => {
                this.setState((state, props) => {
                    return { quizes: myJson.data };
                });
                this.handleClose();
            })
            .catch((e) => {
                // showNotification('Error: comment not approved', 'warning')
            });
    }

    insertQuizItem = () => {
        const dataRecord = {
            question: this.state.text,
            modelId: this.props.record.id,
            model: this.props.model
        }
        fetch(process.env.REACT_APP_API_URL + '/quizes', { method: 'POST', body: JSON.stringify(dataRecord), headers: {} })
            .then((response) => {
                return response.json();
            })
            .then((myJson) => {
                this.fetchQuizes();
            })
            .catch((e) => {
                // showNotification('Error: comment not approved', 'warning')
            });
    }

    insertQuizItemOption = (item) => {
        const dataRecord = {
            optionText: this.state.optionText
        }
        fetch(process.env.REACT_APP_API_URL + '/quizes/' + item, { method: 'PUT', body: JSON.stringify(dataRecord), headers: {} })
            .then((response) => {
                return response.json();
            })
            .then((myJson) => {
                this.fetchQuizes();
            })
            .catch((e) => {
                // showNotification('Error: comment not approved', 'warning')
            });
    }

    expandLess = (obj, itemId) => {
        const dataRecord = {
            isOpen: false
        }
        fetch(process.env.REACT_APP_API_URL + '/quizes/' + obj, {
            method: 'PUT',
            body: JSON.stringify(dataRecord),
            headers: {}
        })
            .then((response) => {
                return response.json();
            })
            .then((myJson) => {
                this.fetchQuizes();
            })
            .catch((e) => {
                // showNotification('Error: comment not approved', 'warning')
            });
    }

    expandMore = (obj, itemId) => {
        const dataRecord = {
            isOpen: true
        }
        fetch(process.env.REACT_APP_API_URL + '/quizes/' + obj, {
            method: 'PUT',
            body: JSON.stringify(dataRecord),
            headers: {}
        })
            .then((response) => {
                return response.json();
            })
            .then((myJson) => {
                this.fetchQuizes();
            })
            .catch((e) => {
                // showNotification('Error: comment not approved', 'warning')
            });
    }

    insertQuizOption = () => {
        const dataRecord = {
            question: this.state.text
        }
        fetch(process.env.REACT_APP_API_URL + '/quizes', { method: 'PUT', body: JSON.stringify(dataRecord), headers: {} })
            .then((response) => {
                return response.json();
            })
            .then((myJson) => {
                this.fetchQuizes();
            })
            .catch((e) => {
                // showNotification('Error: comment not approved', 'warning')
            });
    }

    handleClickOpen = () => {
        this.setState((state, props) => {
            return { dialogOpen: true };
        });
    }

    handleClose = () => {
        this.setState((state, props) => {
            return {
                dialogOpen: false,
                showOptionDialog: false
            };
        });
    }

    closeDeleteQuizDialog = () => {
        this.setState({ showDeleteDialog: false });
    }

    setItemText = (event) => {
        this.setState((state, props) => {
            return { text: event.target.getContent() };
        });
    }

    setOptionText = (event) => {
        // event.persist();
        this.setState((state, props) => {
            return { optionText: event.target.getContent() };
        });
    }

    showAddOptionDialog = (obj, parentid) => {
        console.info('obj:', obj);
        this.setState((state, props) => {
            return {
                showOptionDialog: true,
                itemId: obj
            };
        });
    }

    showDeleteOptionDialog = (obj, parentid) => {
        this.setState((state, props) => {
            return {
                showDeleteDialog: true,
                itemId: obj
            };
        });
    }

    makeThisOptionCorrectAnswer = (quizItemId, optionId, flag, value) => {
        const dataRecord = {
            optionId: optionId,
            flag: flag,
            value: value
        };

        fetch(process.env.REACT_APP_API_URL + '/quizes/' + quizItemId, {
            method: 'PUT',
            body: JSON.stringify(dataRecord),
            headers: {}
        })
            .then((response) => {
                return response.json();
            })
            .then((myJson) => {
                this.fetchQuizes();
            })
            .catch((e) => {
                // showNotification('Error: comment not approved', 'warning')
            });
    }

    deleteThisOption = (quizItemId, optionId, flag, value) => {
        const dataRecord = {
            optionId: optionId,
            flag: flag,
            value: value
        };

        fetch(process.env.REACT_APP_API_URL + '/quizes/' + quizItemId, {
            method: 'PUT',
            body: JSON.stringify(dataRecord),
            headers: {}
        })
            .then((response) => {
                return response.json();
            })
            .then((myJson) => {
                this.fetchQuizes();
            })
            .catch((e) => {
                // showNotification('Error: comment not approved', 'warning')
            });
    }

    deleteThisQuizItem = () => {

        fetch(process.env.REACT_APP_API_URL + '/quizes/' + this.state.itemId, {
            method: 'DELETE',
            headers: {}
        })
            .then((response) => {
                return response.json();
            })
            .then((myJson) => {
                this.fetchQuizes();
                this.closeDeleteQuizDialog();
            })
            .catch((e) => {
                // showNotification('Error: comment not approved', 'warning')
            });
    }

    closeOptionDialog = () => {
        this.setState((state, props) => {
            return { showOptionDialog: false };
        });
    }

    render() {

        return (
            <React.Fragment>
                <div
                    style={{
                        backgroundColor: '#e3e3e3',
                    }}
                >
                    <Typography
                        style={{
                            color: 'black',
                            padding: '7px',

                            marginTop: '7px'
                        }}
                    >Question:</Typography>
                    <Editor
                        apiKey="cd17a1x8m0m5e3yp3kswj336m51li7i90glwf1mqs9jjqg0j"
                        init={{
                            height: 200,
                            menubar: false,
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
                        onChange={(event) => this.setItemText(event)}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={this.insertQuizItem}
                        style={{
                            margin: '5px 5px'
                        }}
                    >
                        Insert Question
                    </Button>
                </div>

                <Dialog
                    open={this.state.showDeleteDialog}
                    onClose={this.closeDeleteQuizDialog}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="alert-dialog-title">{"Delete Question?"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            are you sure?
                </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button
                            color="primary"
                            onClick={this.closeDeleteQuizDialog}
                        >
                            cancel
                </Button>
                        <Button
                            color="primary"
                            onClick={() => this.deleteThisQuizItem()}
                            autoFocus
                        >
                            delete
                </Button>
                    </DialogActions>
                </Dialog>

                <List
                    component="nav"
                    aria-labelledby="nested-list-subheader"
                >
                    {this.state.quizes.map(
                        (item, index) => (
                            <React.Fragment

                                key={index}>
                                <div
                                    style={{
                                        backgroundColor: '#efeeee',
                                        border: '1px solid #e3e3e3',
                                        marginTop: '7px',
                                    }}
                                >


                                    <ListItem

                                        button>
                                        <ListItemIcon>
                                            <SlowMotionVideo />
                                        </ListItemIcon>
                                        <ListItemText
                                            primary={<div dangerouslySetInnerHTML={{ __html: item.question }} />}
                                        />

                                        <Tooltip
                                            title="delete"
                                            onClick={this.showDeleteOptionDialog.bind(this, item.id)}
                                        >
                                            <IconButton>
                                                <DeleteIcon />
                                            </IconButton>
                                        </Tooltip>
                                        {item.isOpen
                                            ?
                                            <ExpandLess onClick={this.expandLess.bind(this, item.id)} />
                                            :
                                            <ExpandMore onClick={this.expandMore.bind(this, item.id)} />
                                        }

                                    </ListItem>
                                    <Collapse
                                        in={item.isOpen}
                                        timeout="auto"
                                        unmountOnExit
                                    >
                                        <Editor
                                            init={{
                                                height: 150,
                                                menubar: false,
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
                                            onChange={(event) => this.setOptionText(event)}
                                        />
                                        <div
                                            style={{
                                                backgroundColor: '#e3e3e3'
                                            }}
                                        >


                                            <Button
                                                style={{
                                                    margin: '5px 5px',

                                                }}
                                                variant="contained"
                                                color="primary"
                                                onClick={() => this.insertQuizItemOption(item.id)}>
                                                Insert Option
                                    </Button>
                                        </div>
                                        <Table>
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell>answers</TableCell>
                                                    <TableCell align="right">correct answer</TableCell>
                                                    <TableCell align="right">delete</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {item.options.map(
                                                    (option, optionIndex) => (
                                                        <TableRow
                                                            key={optionIndex}
                                                        >
                                                            <TableCell component="th" scope="row">
                                                                {<div dangerouslySetInnerHTML={{ __html: option.title }} />}
                                                                {/* {option.title} */}
                                                            </TableCell>
                                                            <TableCell align="right">
                                                                {option.isAnswer ?
                                                                    <Tooltip
                                                                        title="correct answer"
                                                                    >
                                                                        <IconButton aria-label="Done">
                                                                            <CheckIcon fontSize="small" />
                                                                        </IconButton>
                                                                    </Tooltip>
                                                                    :
                                                                    <Tooltip
                                                                        title="make this option the correct answer"
                                                                        onClick={() => this.makeThisOptionCorrectAnswer(item.id, option.id, 'isAnswer', true)}
                                                                    >
                                                                        <IconButton aria-label="Done">
                                                                            <ClearIcon fontSize="small" />
                                                                        </IconButton>
                                                                    </Tooltip>
                                                                }

                                                            </TableCell>
                                                            <TableCell align="right">
                                                                <Tooltip
                                                                    title="delete option"
                                                                    onClick={() => this.deleteThisOption(item.id, option.id, 'delete', true)}
                                                                >
                                                                    <IconButton aria-label="Delete">
                                                                        <DeleteIcon fontSize="small" />
                                                                    </IconButton>
                                                                </Tooltip>
                                                            </TableCell>
                                                        </TableRow>
                                                    )
                                                )}

                                            </TableBody>
                                        </Table>

                                    </Collapse>
                                </div>
                            </React.Fragment>
                        )
                    )}

                </List>
            </React.Fragment>
        )
    };
}

// QuizManager.propTypes = {
//     push: PropTypes.func,
//     showNotification: PropTypes.func,
// };

// export default connect(null, {
//     showNotification,
//     push,
// })(QuizManager);

export default withDataProvider(QuizManager);