import React from 'react';
import './Student_request.css';

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
        this.setState({semester: 'Fall'})
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
    console.log('submited with '+this.state.first_name +this.state.transcript_year+this.state.semester);
    
    // Reset the fields of this.state
    for (const key of Object.keys(this.state)) {
      this.setState({[key]: ''})
    }
    this.setState({isTranscript: false})

    event.preventDefault();
  }

    render() {

      return (
        <div className="student_request">
          <div class="border">
            <h1>
              Student request form
            </h1>
            <form onSubmit={this.handleSubmit}>
              <label >
                First Name:
                <input type="text" name="first_name" class="form_containter" value={this.state.first_name} onChange={this.handleChange} />
              </label>

              <label >
                Last Name:
                <input type="text" name="last_name" class="form_containter" value={this.state.last_name} onChange={this.handleChange} />
              </label>

              <label >
                Date of birth:
                <input type="date" name="date_of_birth" class="form_containter" value={this.state.date_of_birth} onChange={this.handleChange} />
              </label>

              <label >
                Document to certify:
                <select value={this.state.doc_type} name="doc_type" class="form_containter" onChange={this.handleChange}>
                    <option value="degree">Degree</option>
                    <option value="transcript">Transcript</option>
                    <option value="certification">Certification</option>
                </select>
              </label>
              {this.state.isTranscript &&
              <div>
                <label>
                  Season:
                  <select class="form_containter" value={this.state.semester} name="semester" onChange={this.handleChange}>
                    <option value="fall ">Fall</option>
                    <option value="spring">Spring</option>
                  </select>
                </label>
                <label>
                  Year:
                  <input class="form_containter" type="text" name="transcript_year" value={this.state.transcript_year} onChange={this.handleChange} />
                </label>
              </div>
              }
              <input type="submit" value="Submit" class="submit"/>
            </form>
          </div>
        </div>
      );
    }
  }
  
  export default Student_request;
