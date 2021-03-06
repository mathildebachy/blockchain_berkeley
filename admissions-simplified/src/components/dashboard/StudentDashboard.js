import React from 'react';
import { getStudentContractAddresses, getAllFilesFromContractAddress } from '../../back-end/functions'
import { getContractData } from '../../back-end/taquito_functions'
import { UserContext } from '../../providers/UserProvider'

import PropTypes from 'prop-types';
import { withStyles, makeStyles, useTheme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import './dashboard.css'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
import IconButton from '@material-ui/core/IconButton';
import TableFooter from '@material-ui/core/TableFooter';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import { green } from '@material-ui/core/colors';
import { Tooltip } from '@material-ui/core';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Collapse from '@material-ui/core/Collapse';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';


const useStyles1 = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
}));

function TablePaginationActions(props) {
  const classes = useStyles1();
  const theme = useTheme();
  const { count, page, rowsPerPage, onChangePage } = props;

  const handleFirstPageButtonClick = (event) => {
    onChangePage(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onChangePage(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
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
    console.log(data)

    return (
        <React.Fragment>
            <TableRow className={classes.root}>
                <TableCell>
                    <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell>{data.send_to.join(", ") || 'none'}</TableCell>
                <TableCell align="right">{data.doc_description || 'none'}</TableCell>
                <TableCell align="right">{data.student_school_name || 'none'}</TableCell>
                <TableCell align="right">{data.graduation_year || 'none'}</TableCell>
                <TableCell align="right">{data.doc_status || 'none'}</TableCell>
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

const useStyles = {
  table: {
    minWidth: 650,
  },
};
class StudentDashboard extends React.Component {
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
        let contractAddresses = await getStudentContractAddresses(userId)
        let contractData = [];
        for (const address of contractAddresses) {
          const data = await getContractData(address);
          const files = await getAllFilesFromContractAddress(address);
          contractData.push({...data, address, files});
        }
        this.setState(({data: contractData}))
        this.setState({emptyRows: this.state.rowsPerPage - Math.min(this.state.rowsPerPage, contractData.length - this.state.page*this.state.rowsPerPage)})
    }
    componentDidMount() {
        this.setState({user: this.context})
        if (!this.context) this.props.history.push('/sign-in')
        else if (!this.context.userType || this.context.userType !== "student") this.props.history.push('/')
        else {
          this.fetchData(this.context.uid);
        }
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
                            <TableCell>University</TableCell>
                            <TableCell align="right">Description</TableCell>
                            <TableCell align="right">Registrar</TableCell>
                            <TableCell align="right">Graduation Year</TableCell>
                            <TableCell align="right">Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {(this.state.rowsPerPage > 0
                        ? this.state.data.slice(this.state.page * this.state.rowsPerPage, this.state.page*this.state.rowsPerPage + this.state.rowsPerPage)
                        : this.state.data)
                        .map(data => (
                          <Row data={data} key={data.address}></Row>
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


export default withStyles(useStyles)(StudentDashboard);