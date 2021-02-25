import React, { useEffect, useState } from "react";


//bootstrap components
import Form from "react-bootstrap/Form";

import ListGroup from "react-bootstrap/ListGroup";

import Course from "./BrowsedCourse";

const BrowsedCourses = React.memo((props) => {
  const [courses, setCourses] = useState([]);
  const [prevCourse, setPrevCourse] = useState();

  useEffect(() => {
    console.log('here again');
    setCourses(props.courses);
  }, [props.courses]);

  const selectCourse = (event) => {
    event.preventDefault();
    
    props.onCourseClick(event.target.id);
      if (prevCourse) {
      prevCourse.style.backgroundColor = "initial";
      prevCourse.style.color = "initial";
    }
    event.target.style.backgroundColor = "#582c83";
    event.target.style.color = "#ffffff";
    setPrevCourse(event.target);
    
  };

  const coursesToDisplay = courses.map((course) => {
    return (
      <Course
        id={course.id}
        name={course.name}
        key={course.id + course.name}
        selectCourse={selectCourse}
      />
    );
  });

  return (
    <Form style={{ height: 100 + "%", width: 100 + "%" }}>
      <ListGroup
        style={{ overflow: "auto", maxHeight: 100 + "%", height: 100 + "%" }}
      >
        {coursesToDisplay}
      </ListGroup>
    </Form>
  );
});

export default BrowsedCourses;
