/*==================================================
HomePageView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display the home page.
================================================== */
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

// Define styling for the home page
const useStyles = makeStyles(theme => ({
  flex_child: {
    flex: "1",
    border: '2px solid black',
    //background: '#fcb6bb',
    background: '#94B49F',
    padding: '50px',
    height: '300px'
  },
  grid_container: {
    display: "grid",
    'grid-template-columns': '1fr 1fr',
    'grid-gap': '50px',
    'margin-left': '100px',
    'margin-right': '100px'
  },
  links:{
    textDecoration: 'none',
  }
}));

const HomePageView = () => {
  // Render Home page view
  const classes = useStyles();
  return (
    <body>
      <div>
        <h1>Home Page</h1>
      </div>
      <div className={classes.grid_container}>
        <div className={classes.flex_child}>
          <img src="https://picsum.photos/id/193/450/300" width = '300' height = '200' alt="school"/>
          <h2>View Campuses</h2>
          <Link className={classes.links} to={'/campuses'} >
            <Button variant="contained" color="primary">
              All Campuses
            </Button>
          </Link>
        </div>
        <div className={classes.flex_child}>
          <img src="https://picsum.photos/id/180/450/300" width = '300' height = '200' alt="desk"/>
          <h2>View Students</h2>
          <Link className={classes.links} to={'/students'} >
            <Button variant="contained" color="primary">
              All Students
            </Button>
          </Link>
        </div>
      </div>
    </body>
  );    
}

export default HomePageView;