/*==================================================
CampusView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display a single campus and its students (if any).
================================================== */
import { Link } from "react-router-dom";

// Take in props data to construct the component
const CampusView = (props) => {
  const {campus} = props;

  // Count total number of students 
  let count = Object.keys(campus.students).length;

  // Render a single Campus view with list of its students
  return (
    <div>
      <img src={campus.imageUrl} alt={campus.name}/>
      <h1>{campus.name}</h1>
      <p>{campus.address}</p>
      <p>{campus.description}</p>

      <h2>Total Students: {count}</h2>

      {campus.students.map( student => {
        let name = student.firstname + " " + student.lastname;
        return (
          <div key={student.id}>
            <Link to={`/student/${student.id}`}>
              <h2>{name}</h2>
            </Link>             
          </div>
        );
      })}
    </div>
  );
};

export default CampusView;