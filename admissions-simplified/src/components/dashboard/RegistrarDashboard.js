import React from 'react';

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
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';

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
      });
      setOpen(false);
  }

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
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
          <Button onClick={uploadFiles} color="primary">
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
    const { data } = props;
    const [open, setOpen] = React.useState(false);
    const classes = useRowStyles();

    const sendToUniversity = async () => {
        const contract = await getContract(data.address);
        console.log("contract", contract)
        const newStorage = await updateContractStatus(contract, "approved");
        console.log("new storage", newStorage)
    }

    return (
        <React.Fragment>
            <TableRow className={classes.root}>
                <TableCell>
                    <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell>{data.student_last_name + ", "+ data.student_first_name || 'none'}</TableCell>
                <TableCell align="right">{data.doc_type || 'none'}</TableCell>
                <TableCell align="right">{data.graduation_year || 'none'}</TableCell>
                <TableCell align="right">
                    {!data.doc_status 
                    ? <Tooltip title="none">
                            <FiberManualRecordIcon style={{color: 'black'}}/>
                        </Tooltip>
                    : (data.doc_status==="approved"
                        ? <Tooltip title="approved">
                                <FiberManualRecordIcon style={{color: green[500]}}/>
                            </Tooltip>
                        : (data.doc_status==="rejected")
                            ? <Tooltip title="rejected">
                                <FiberManualRecordIcon style={{color: 'red'}}/>
                            </Tooltip>
                            : <Tooltip title="pending">
                                <FiberManualRecordIcon style={{color: 'orange'}}/>
                            </Tooltip>
                    )
                }
                </TableCell>
                {data.doc_status==="pending"
                ? 
                <>
                    <TableCell><UploadDocument contracAddress={data.address}></UploadDocument></TableCell>
                    <TableCell><Button onClick={sendToUniversity}>Send to university</Button></TableCell>
                </>
                :<></>
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
                                    {data.files
                                    ? data.files.map(file => (
                                        <TableRow key={file.downloadUrl}>
                                            <TableCell component="th" scope="row">
                                                {file.name || "no name file"}
                                            </TableCell>
                                            <TableCell><Button href={file.downloadUrl}><InsertDriveFileIcon color="primary"></InsertDriveFileIcon>Download File</Button></TableCell>
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
            data: [],
            page: 0,
            rowsPerPage: 5,
            emptyRows: 5,
            user: {},
        }
        this.handleChangePage = this.handleChangePage.bind(this);
        this.handleChangeRowsPerPage = this.handleChangeRowsPerPage.bind(this);

    }
    fetchData = async (userId) => {
        // TO DO Hook the registrar name
        let contractAdresses = await getRegistrarContractAdress(userId)
        let contractData = [];
        for (const address of contractAdresses) {
          const data = await getContractData(address);
          const files = await getAllFilesFromContractAddress(address);
          contractData.push({...data, address, files});
        }
        console.log("contractData", contractData);
        console.log("adresses", contractAdresses);
        this.setState(({data: contractData}))
        this.setState({emptyRows: this.state.rowsPerPage - Math.min(this.state.rowsPerPage, contractData.length - this.state.page*this.state.rowsPerPage)})
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
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {((this.state.rowsPerPage > 0)
                        ? this.state.data.slice(this.state.page * this.state.rowsPerPage, this.state.page*this.state.rowsPerPage + this.state.rowsPerPage)
                        : this.state.data)
                        .map(data => (
                            <Row data={data}></Row>
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
                            count={this.state.data.length}
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