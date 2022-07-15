/*==================================================
StudentView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display the single student view page.
================================================== */
import { Link } from "react-router-dom";
import Button from '@material-ui/core/Button';

const StudentView = (props) => {
  const { student, deleteStudent } = props;

  // Render a single Student view 
  return (
    <div>
      <img src={student.imageUrl} alt={student.name}/>
      <p> <b>First Name: </b> {student.firstname}</p>
      <p> <b>Last Name: </b> {student.lastname}</p>
      <p> <b>Email: </b> {student.email}</p>
      <p> <b>GPA: </b> {student.gpa}</p>
      <p> <b>Attends: </b> {student.campus.name}</p>

      <Link to={`/editstudent/${student.id}`}>
        <Button variant="contained" style={{marginRight: '50px'}} color="primary">Edit Student Information</Button>
      </Link>

      <Link to="/students">
        <Button margin-right = "50px" variant="contained" style={{marginRight: '50px'}} color="primary" onClick={() => deleteStudent(student.id)}>Delete Student</Button>
      </Link>

    </div>
  );

};

export default StudentView;