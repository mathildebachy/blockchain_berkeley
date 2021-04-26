import React from 'react';
import './Student_request.css';
import { UserContext } from '../providers/UserProvider'

import CircularProgress from '@material-ui/core/CircularProgress';
import CheckIcon from '@material-ui/icons/Check';

import { getAllUniversities, createContractInDB } from '../back-end/functions'
import { contractAbstractionOrigination } from '../back-end/taquito_functions'

class Student_request extends React.Component {
  static contextType = UserContext;

  constructor(props) {
    super(props);
    this.state = {
      doc_type: '',
      semester: '',
      description: '',
      transcript_year: '',
      isTranscript: false,
      user: {},
      sendTo: [""],
      numberToSendTo: 1,
      universityList: [],
      isLoading: false,
      isFinished: false,
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    this.setState({user: this.context})
    if (!this.context) this.props.history.push('/sign-in')
    else if (!this.context.userType || this.context.userType !== "student") this.props.history.push('/')

    const universities = await getAllUniversities();
    this.setState({universityList: universities})
  }
  
  parsingParameters = (contractParams) => {
    let parsedParams = contractParams;
    for (const param in contractParams) {
      const value = contractParams[param];
      if (typeof value === "string") {
        parsedParams[param] = '"'+parsedParams[param]+'"'
      }
      else {
        parsedParams[param] = parsedParams[param].map(elem => '"'+elem+'"');
      }
    }
    return parsedParams
  }

  handleChange(event) {
    //Listen to the doctype variable to see if the student selected a transcript
    if (event.target.name === 'doc_type'){
      if (event.target.value === 'transcript') {
        this.setState({isTranscript: true})
        this.setState({semester: 'Fall'})
      }
      else {
        this.setState({isTranscript: false})
        this.setState({semester: ''})
        this.setState({transcript_year: ''})
      }
    } 
    if (event.target.name !== "sendTo") this.setState({[event.target.name]: event.target.value})    
    else {
      if (event.target.value !== "default") {
        if (event.target.id == this.state.sendTo.length-1) {
          this.setState({sendTo: [...this.state.sendTo, event.target.value]})
        }
        else {
          let currList = this.state.sendTo;
          currList[parseInt(event.target.id)+1] = event.target.value
          this.setState({sendTo: currList})
        }
      }
    }
  }

  async handleSubmit(event) {
    event.preventDefault();
    let contractParams = {
      date_of_birth: this.state.user.date_of_birth || "",
      doc_description: this.state.description,
      doc_status: "pending",
      doc_type: this.state.doc_type,
      graduation_year: this.state.transcript_year,
      send_to: this.state.sendTo.slice(1).join("; "),
      student_first_name: this.state.user.first_name || "",
      student_last_name: this.state.user.last_name || "",
      student_school_name: this.state.user.assignedHS || "",
    } 
    console.log(this.state.sendTo.slice(1))
    const parsedParams = this.parsingParameters(contractParams);
    console.log("params", contractParams)
    this.setState({isLoading: true});
    const contract = await contractAbstractionOrigination(parsedParams)
    this.setState({isLoading: false});
    this.setState({isFinished: true});
    const contractId = await createContractInDB(this.state.user.uid, this.state.user.assignedHS, this.state.sendTo.slice(1), contract.address)
    console.log(contractId)
    this.props.history.push('/payment')
  }

    render() {

      return (
        <div className="student_request">
          <div className="border">
            <h1>
              Student request form { this.state.user.first_name || ''}
            </h1>
            <form onSubmit={this.handleSubmit}>
              <label >
                Document to certify:
                <select value={this.state.doc_type} name="doc_type" className="form_containter" onChange={this.handleChange}>
                    <option value="degree">Degree</option>
                    <option value="transcript">Transcript</option>
                    <option value="certification">Certification</option>
                </select>
              </label>
              {this.state.isTranscript &&
              <div>
                <label>
                  Graduation Year:
                  <input className="form_containter" type="text" name="transcript_year" value={this.state.transcript_year} onChange={this.handleChange} />
                </label>
              </div>
              }
              <label>
                Description (optional):
                <input type="text" name="description" className="form_containter" value={this.state.description} onChange={this.handleChange} />
              </label>
              {this.state.sendTo.map((university, index) => (
              <div className="margin">
                  <label htmlFor="sendTo" className="block">
                    Send to:
                  </label>
                  <select id={index} value={this.sendTo} name="sendTo" onChange={this.handleChange}>
                    <option value="default">- Select -</option>
                    {this.state.universityList.map(university => (
                      <option value={university.displayName}>{university.displayName}</option>
                    ))}
                  </select>
                </div>
              ))}
              <input type="submit" value="Submit" className="submit"/>
              {this.state.isLoading
              ? <CircularProgress />
              : (this.state.isFinished
                ? <CheckIcon/>
                :<div></div>)
              }
            </form>
          </div>
        </div>
      );
    }
  }
  
  export default Student_request;
