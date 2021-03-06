import React from 'react';

import { getAllFilesFromContractAddress, getUniversityContractAdress } from '../../back-end/functions'
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
import GetAppIcon from '@material-ui/icons/GetApp';

import {DropzoneArea} from 'material-ui-dropzone'



const useStyles = {
  table: {
    minWidth: 650,
  },
};

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

    return (
        <React.Fragment>
            <TableRow className={classes.root}>
                <TableCell>
                    <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell>{data.student_first_name + " "+ data.student_last_name || 'none'}</TableCell>
                <TableCell align="right">{data.doc_type || 'none'}</TableCell>
                <TableCell align="right">{data.graduation_year || 'none'}</TableCell>
                <TableCell align="right">{data.student_school_name || 'none'}</TableCell>
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
                                            <TableCell><Button variant="outlined" color="secondary" href={file.downloadUrl}><GetAppIcon color="default"></GetAppIcon>Download File</Button></TableCell>
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
            approved_contract: 0,
            page: 0,
            rowsPerPage: 5,
            emptyRows: 5,
            user: {},
        }
        this.handleChangePage = this.handleChangePage.bind(this);
        this.handleChangeRowsPerPage = this.handleChangeRowsPerPage.bind(this);

    }
    fetchData = async (userId) => {
        let contractAdresses = await getUniversityContractAdress(userId);
        let contractData = [];
        for (const address of contractAdresses) {
          const data = await getContractData(address);
          const files = await getAllFilesFromContractAddress(address);
          contractData.push({...data, address, files});
          if (data.doc_status === "approved") {
            this.setState({approved_contract: this.state.approved_contract+1});
          }
        }
        this.setState(({data: contractData}))
        this.setState({emptyRows: this.state.rowsPerPage - Math.min(this.state.rowsPerPage, contractData.length - this.state.page*this.state.rowsPerPage)})
    }

    componentDidMount() {
        this.setState({user: this.context})
        if (!this.context) this.props.history.push('/sign-in')
        else if (!this.context.userType || this.context.userType !== "university") this.props.history.push('/')
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
                            <TableCell align="right">Institution</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {((this.state.rowsPerPage > 0)
                        ? this.state.data.slice(this.state.page * this.state.rowsPerPage, this.state.page*this.state.rowsPerPage + this.state.rowsPerPage)
                        : this.state.data)
                        .map(data => {
                            if (data.doc_status === "approved") return <Row data={data}></Row>
                        })}
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
                            count={this.state.approved_contract}
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