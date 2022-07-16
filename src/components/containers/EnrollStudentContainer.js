/*==================================================
EnrollStudentContainer.js

The Container component is responsible for stateful logic and data fetching, and
passes data (if any) as props to the corresponding View component.
If needed, it also defines the component's "connect" function.
================================================== */
import Header from './Header';
import { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import EnrollStudentView from '../views/EnrollStudentView';
import { addStudentThunk } from '../../store/thunks';

class EnrollStudentContainer extends Component {
  // Initialize state
  constructor(props){
    super(props);
    this.state = {
      firstname: "", 
      lastname: "",
      imageUrl: "",
      email: "",
      gpa: 0.0,
      campusId: null, 
      redirect: false, 
      redirectId: null
    };
  }

  // Capture input data when it is entered
  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  // Take action after user click the submit button
  handleSubmit = async event => {
    event.preventDefault();  // Prevent browser reload/refresh after submit.
    const path = window.location.pathname;
    const id = path.slice(15, path.length); // Capture campus id of the current page by getting it from the URL path
    let student = {
        firstname: this.state.firstname,
        lastname: this.state.lastname,
        imageUrl: this.state.imageUrl,
        email: this.state.email,
        gpa: this.state.gpa,
        campusId: id
    };
    console.log("campusId: " + student.campusId);

    // Add enroll student in back-end database
    await this.props.addStudent(student);

    // Update state, and trigger redirect to show the enroll student
    this.setState({
      firstname: "", 
      lastname: "",
      imageUrl: "",
      email: "",
      gpa: 0.0, 
      campusId: null, 
      redirect: true, 
      redirectId: student.campusId
    });
  }

  // Unmount when the component is being removed from the DOM:
  componentWillUnmount() {
      this.setState({redirect: false, redirectId: null});
  }

  // Render enroll student input form
  render() {
    // Redirect to enroll student's page after submit
    if(this.state.redirect) {
      return (<Redirect to={`/campus/${this.state.redirectId}`}/>)
    }

    // Display the input form via the corresponding View component
    return (
      <div>
        <Header />
        <EnrollStudentView 
          campus={this.props.campus} 
          handleChange = {this.handleChange} 
          handleSubmit={this.handleSubmit}      
        />
      </div>          
    );
  }
}

// The following 2 input arguments are passed to the "connect" function used by "CampusContainer" component to connect to Redux Store.
// 1. The "mapState" argument specifies the data from Redux Store that the component needs.
// The "mapState" is called when the Store State changes, and it returns a data object of "campus".
const mapState = (state) => {
    return {
      campus: state.campus,  // Get the State object from Reducer "campus"
    };
}

// The following input argument is passed to the "connect" function used by "EnrollStudentContainer" component to connect to Redux Store.
// The "mapDispatch" argument is used to dispatch Action (Redux Thunk) to Redux Store.
// The "mapDispatch" calls the specific Thunk to dispatch its action. The "dispatch" is a function of Redux Store.
const mapDispatch = (dispatch) => {
    return({
        addStudent: (student) => dispatch(addStudentThunk(student)),
    })
}

// Export store-connected container by default
// EnrollStudentContainer uses "connect" function to connect to Redux Store and to read values from the Store 
// (and re-read the values when the Store State updates).
export default connect(mapState, mapDispatch)(EnrollStudentContainer);
