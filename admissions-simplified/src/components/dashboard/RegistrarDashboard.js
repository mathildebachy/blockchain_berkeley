import React from 'react';
import { getAllRequestFromRegistar, getRegistrarContractAdress } from '../../back-end/functions'
import { getContractData } from '../../back-end/taquito_functions'
import { UserContext } from '../../providers/UserProvider'
import { TablePaginationActions} from './tablePagination'

import { withStyles } from '@material-ui/core/styles';
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
import { Tooltip } from '@material-ui/core';
import { ContactsOutlined } from '@material-ui/icons';


const useStyles = {
  table: {
    minWidth: 650,
  },
};
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
        for (const adress of contractAdresses) {
          const data = await getContractData(adress);
          contractData.push(data);
        }
        console.log("contractData", contractData);
        console.log("adresses", contractAdresses);
        this.setState(({data: contractData}))
        this.setState({emptyRows: this.state.rowsPerPage - Math.min(this.state.rowsPerPage, contractData.length - this.state.page*this.state.rowsPerPage)})
        // let data = await getAllRequestFromRegistar('Lycee La Nativite');
        // if (data) {
        //     this.setState({data: data})
        //     this.setState({emptyRows: this.state.rowsPerPage - Math.min(this.state.rowsPerPage, data.length - this.state.page*this.state.rowsPerPage)})
        // }
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
                            <TableCell>Student Name</TableCell>
                            <TableCell align="right">Document type</TableCell>
                            <TableCell align="right">Year</TableCell>
                            <TableCell align="right">Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {((this.state.rowsPerPage > 0)
                        ? this.state.data.slice(this.state.page * this.state.rowsPerPage, this.state.page*this.state.rowsPerPage + this.state.rowsPerPage)
                        : this.state.data)
                        .map(data => (
                            <TableRow>
                                <TableCell>{data.student_last_name + ", "+ data.student_first_name || 'none'}</TableCell>
                                <TableCell align="right">{data.doc_type || 'none'}</TableCell>
                                <TableCell align="right">{data.graduation_year || 'none'}</TableCell>
                                <TableCell align="right">
                                    {!data.doc_status 
                                    ? <Tooltip title="none">
                                            <FiberManualRecordIcon style={{color: 'black'}}/>
                                        </Tooltip>
                                    : (data.status==="approved"
                                        ? <Tooltip title="approved">
                                                <FiberManualRecordIcon style={{color: green[500]}}/>
                                            </Tooltip>
                                        : (data.status==="rejected")
                                            ? <Tooltip title="rejected">
                                                <FiberManualRecordIcon style={{color: 'red'}}/>
                                            </Tooltip>
                                            : <Tooltip title="pending">
                                                <FiberManualRecordIcon style={{color: 'orange'}}/>
                                            </Tooltip>
                                    )
                                }
                                </TableCell>
                            </TableRow>
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