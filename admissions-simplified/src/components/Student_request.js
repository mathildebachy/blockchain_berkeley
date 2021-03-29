import React from 'react';
import ReactDOM from 'react-dom';
import './Student_request.css';
import digital_icon from './../assets/digital_icon.png'

class Student_request extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      first_name: '',
      last_name: '',
      date_of_birth: '',
      doc_type: '',
      semester: '',
      transcript_year: '',
      isTranscript: false,

    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    //Listen to the doctype variable to see if the student selected a transcript
    if (event.target.name === 'doc_type'){
      if (event.target.value === 'transcript') {
        this.setState({isTranscript: true})
        this.setState({semester:'Fall'})
      }
      else {
        this.setState({isTranscript: false})
        this.setState({semester: ''})
        this.setState({transcript_year: ''})
      }
    } 
    this.setState({[event.target.name]: event.target.value})
  }

  handleSubmit(event) {
    // Connection avec la DB
    console.log('submited with '+this.state.first_name +this.state.transcript_year+this.state.semester)
    event.preventDefault();
  }

    render() {

      return (
        <div className="student_request">
          <form onSubmit={this.handleSubmit}>
            <label class="main_input">
              First Name:
              <input type="text" name="first_name" value={this.state.first_name} onChange={this.handleChange} />
            </label>

            <label class="main_input">
              Last Name:
              <input type="text" name="last_name" value={this.state.last_name} onChange={this.handleChange} />
            </label>

            <label class="main_input">
              Date of birth:
              <input type="date" name="date_of_birth" value={this.state.date_of_birth} onChange={this.handleChange} />
            </label>

            <label class="main_input">
              Document to certify:
              <select value={this.state.doc_type} name="doc_type" onChange={this.handleChange}>
                  <option value="degree">Degree</option>
                  <option value="transcript">Transcript</option>
                  <option value="certification">Certification</option>
              </select>
            </label>
            {this.state.isTranscript &&
            <div>
              <label>
                Season:
                <select value={this.state.semester} name="semester" onChange={this.handleChange}>
                  <option value="fall">Fall</option>
                  <option value="spring">Spring</option>
                </select>
              </label>
              <label>
                Year:
                <input type="text" name="transcript_year" value={this.state.transcript_year} onChange={this.handleChange} />
              </label>
            </div>
            }
            <input type="submit" value="Submit" class="main_input"/>
          </form>
        </div>
      
      );
    }
  }
  
  export default Student_request;
