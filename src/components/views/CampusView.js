/*==================================================
CampusView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display a single campus and its students (if any).
================================================== */
import { Link } from "react-router-dom";
import Button from '@material-ui/core/Button';

// Take in props data to construct the component
const CampusView = (props) => {
  const {campus, deleteCampus, unenrollStudent} = props;

  // Count total number of students 
  let count = Object.keys(campus.students).length;

  // Render a single Campus view with list of its students
  return (
    <div>
      <img src={campus.imageUrl} alt={campus.name}/>
      <h1>{campus.name}</h1>
      <p> <b>Address: </b> {campus.address}</p>
      <p> <b>Description: </b> {campus.description}</p>

      <Link to={`/editcampus/${campus.id}`}>
        <Button variant="contained" style={{marginRight: '50px'}} color="primary">Edit Campus Information</Button>
      </Link>

      <Link to="/campuses">
        <Button margin-right = "50px" variant="contained" color="primary" style={{marginRight: '50px'}} onClick={() => deleteCampus(campus.id)}>Delete Campus</Button>
      </Link>

      <h2>Total Students: {count}</h2>
      {campus.students.map( student => {
        let name = student.firstname + " " + student.lastname;
        return (
          <div key={student.id}>
            <Link to={`/student/${student.id}`}>
              <h2>
                {name}
                <button style={{marginLeft: '50px'}} onClick={() => unenrollStudent(student.id)}>
                  Unenroll
                </button>
              </h2>
            </Link>
          </div>
        );
      })}

      <Link to={`/enrollstudent/${campus.id}`}>
        <Button variant="contained" color="primary">Enroll Student</Button>
      </Link>

    </div>
  );
};

export default CampusView;