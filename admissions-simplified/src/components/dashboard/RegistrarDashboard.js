import React from 'react';
import { useEffect } from 'react'

import { getAllFilesFromContractAddress, getRegistrarContractAdress, uploadFileToContract } from '../../back-end/functions'
import { getContractData, updateContractStatus, getContract } from '../../back-end/taquito_functions'
import { UserContext } from '../../providers/UserProvider'

import { TablePaginationActions} from './tablePagination'
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import './dashboard.css'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
import TableFooter from '@material-ui/core/TableFooter';
import { green } from '@material-ui/core/colors';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import { Tab, Tooltip } from '@material-ui/core';
import { ContactsOutlined } from '@material-ui/icons';
import IconButton from '@material-ui/core/IconButton';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Collapse from '@material-ui/core/Collapse';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import GetAppIcon from '@material-ui/icons/GetApp';
import SaveIcon from '@material-ui/icons/Save';
import SendIcon from '@material-ui/icons/Send';
import PublishIcon from '@material-ui/icons/Publish';

import {DropzoneArea} from 'material-ui-dropzone'



const useStyles = {
  table: {
    minWidth: 650,
  },
};

function UploadDocument(props) {
  const [open, setOpen] = React.useState(false);
  const [files, setFiles] = React.useState([]);

  const contractAddress = props.contracAddress

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (files) => {
    setFiles(files);
  }

  const uploadFiles = async () => {
      files.forEach(async file => {
            const uploadedFile = await uploadFileToContract(file, contractAddress);
            props.callbackFromParent(file);
      });
      setOpen(false);
  }

  return (
    <div>
      <Button variant="outlined" color="secondary" onClick={handleClickOpen}>
        Upload File
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Upload files</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Contract address: {props.contracAddress}
          </DialogContentText>
          <DropzoneArea onChange={handleChange}></DropzoneArea>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button color="secondary" onClick={uploadFiles}>
            Upload 
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
});

function Row(props) {
    const { address, user } = props;
    const [open, setOpen] = React.useState(false);
    const [doc_status, setDocStatus] = React.useState("")
    const [doc_type, setDocType] = React.useState("")
    const [graduation_year, setGraduationYear] = React.useState("")
    const [first_name, setFirstName] = React.useState("")
    const [last_name, setLastName] = React.useState("")
    const [student_school_name, setStudentSchoolName] = React.useState("")
    const [files, setFiles] = React.useState([])
    const classes = useRowStyles();
    const [loading, setLoading] = React.useState(false);

    const fetchData = async (userId) => {
          const contractData = await getContractData(address);
          const files = await getAllFilesFromContractAddress(address);
          setFiles(files)
          setStudentSchoolName(contractData.student_school_name)
          setFirstName(contractData.student_first_name)
          setLastName(contractData.student_last_name)
          setDocType(contractData.doc_type)
          setDocStatus(contractData.doc_status)
          setGraduationYear(contractData.graduation_year)
        }
    
    useEffect(() => {
        fetchData(user.displayName);
    }, [])

    const setFilesInRow = (new_files) => {
        if (files) setFiles([...files, new_files]);
        else setFiles([new_files]);
    }

    const sendToUniversity = async () => {
        const contract = await getContract(address);
        setLoading(true);
        const newStorage = updateContractStatus(contract, "approved").then(new_storage => {
            setDocStatus("approved");
            setLoading(false);
        });
    }

    return (
        <React.Fragment>
            <TableRow className={classes.root}>
                <TableCell>
                    <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell>{first_name + " "+ last_name}</TableCell>
                <TableCell align="right">{doc_type}</TableCell>
                <TableCell align="right">{graduation_year || 'none'}</TableCell>
                <TableCell align="right">
                    {!doc_status 
                    ? <Tooltip title="none">
                            <FiberManualRecordIcon style={{color: 'black'}}/>
                        </Tooltip>
                    : (doc_status==="approved"
                        ? <Tooltip title="approved">
                                <FiberManualRecordIcon style={{color: green[500]}}/>
                            </Tooltip>
                        : (doc_status==="rejected")
                            ? <Tooltip title="rejected">
                                <FiberManualRecordIcon style={{color: 'red'}}/>
                            </Tooltip>
                            : <Tooltip title="pending">
                                <FiberManualRecordIcon style={{color: 'orange'}}/>
                            </Tooltip>
                    )
                }
                </TableCell>
                {doc_status==="pending"
                ? 
                <>
                    <TableCell><UploadDocument contracAddress={address} callbackFromParent={setFilesInRow}></UploadDocument></TableCell>
                    <TableCell><Button variant="contained" color="secondary" className={classes.button} startIcon={<SendIcon />} onClick={sendToUniversity}>{loading ? "Loading" : "Send to university"}</Button></TableCell>
                </>
                :
                    <></>
                }
                {/* <TableCell><UploadDocument contracAddress={data.address}></UploadDocument></TableCell> */}
            </TableRow>
            {/* The following contains the dropdown with all the files associated with one contract */}
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box margin={1}>
                            <Typography variant="h6" gutterBottom component="div">
                                Uploaded Files
                            </Typography>
                            <Table size="small" aria-label="files">
                                <TableHead>
                                <TableRow>
                                    <TableCell>File name</TableCell>
                                    <TableCell>Download URL</TableCell>
                                </TableRow>
                                </TableHead>
                                <TableBody>
                                    {files
                                    ? files.map(file => (
                                        <TableRow key={file.downloadUrl}>
                                            <TableCell component="th" scope="row">
                                                {file.name || "no name file"}
                                            </TableCell>
                                            <TableCell><Button variant="outlined" href={file.downloadUrl}><GetAppIcon color="default"></GetAppIcon> Download File</Button></TableCell>
                                        </TableRow>
                                    ))
                                    : <TableRow><TableCell component="th" scope="row">No files</TableCell></TableRow>
                                    }
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

class RegistrarDashboard extends React.Component {
    static contextType = UserContext;
    constructor(props) {
        super(props)
        this.state = {
            addresses: [],
            page: 0,
            rowsPerPage: 5,
            emptyRows: 5,
            user: {},
        }
        this.handleChangePage = this.handleChangePage.bind(this);
        this.handleChangeRowsPerPage = this.handleChangeRowsPerPage.bind(this);

    }
    fetchData = async (userId) => {
        let contractAddresses = await getRegistrarContractAdress(userId)
        this.setState(({addresses: contractAddresses}))
        this.setState({emptyRows: this.state.rowsPerPage - Math.min(this.state.rowsPerPage, contractAddresses.length - this.state.page*this.state.rowsPerPage)})
    }
    componentDidMount() {
        this.setState({user: this.context})
        if (!this.context) this.props.history.push('/sign-in')
        else if (!this.context.userType || this.context.userType !== "highschool") this.props.history.push('/')
        else this.fetchData(this.context.displayName);
    }
    
    handleChangeRowsPerPage(event) {
        this.setState({rowsPerPage: parseInt(event.target.value, 10)});
        this.setState({page: 0})
    }
    handleChangePage(event, newPage) {
        this.setState({page: newPage})
    }

    render() {
        const {classes} = this.props;
        
        return (
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>More info</TableCell>
                            <TableCell>Student Name</TableCell>
                            <TableCell align="right">Document type</TableCell>
                            <TableCell align="right">Year</TableCell>
                            <TableCell align="right">Status</TableCell>
                            <TableCell align="right"></TableCell>
                            <TableCell align="right"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {((this.state.rowsPerPage > 0)
                        ? this.state.addresses.slice(this.state.page * this.state.rowsPerPage, this.state.page*this.state.rowsPerPage + this.state.rowsPerPage)
                        : this.state.addresses)
                        .map(address => (
                            <Row address={address} user={this.state.user}></Row>
                        ))}
                        {this.emptyRows > 0 && (
                            <TableRow style={{ height: 53 * this.emptyRows }}>
                            <TableCell colSpan={6} />
                            </TableRow>
                        )}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TablePagination
                            rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                            colSpan={3}
                            count={this.state.addresses.length}
                            rowsPerPage={this.state.rowsPerPage}
                            page={this.state.page}
                            SelectProps={{
                                inputProps: { 'aria-label': 'rows per page' },
                                native: true,
                            }}
                            onChangePage={this.handleChangePage}
                            onChangeRowsPerPage={this.handleChangeRowsPerPage}
                            ActionsComponent={TablePaginationActions}
                            />
                        </TableRow>
                    </TableFooter>
                </Table>
            </TableContainer>
        );
    }
}


export default withStyles(useStyles)(RegistrarDashboard);