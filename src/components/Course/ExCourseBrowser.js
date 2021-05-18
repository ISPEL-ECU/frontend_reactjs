import React, { useState, useEffect } from "react";
import axios from "axios";

import Menu from "../UI/Menu";
import Navbar from "../UI/Navbar";

import CourseList from "./BrowsedCourses";
import CourseOverview from "./CourseOverwiew";
import TreeGraph from "./Tree";

import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";

import { useAuth } from "../../context/auth";

import { SERVER_ADDRESS } from "../../constants/constants";

function CourseBuilder(props) {
  const [courses, setCourses] = useState([]);
  const [topics, setTopics] = useState([]);
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [courseName, setCourseName] = useState([]);
  const { authToken } = useAuth();

  useEffect(() => {
    axios
      .get(SERVER_ADDRESS + "get-excourses", {
        headers: {
          Authorization: "Bearer " + authToken,
        },
      })
      .then((crses) => {
        setCourses(crses.data);
        console.log(crses.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const courseClickHandler = (event) => {
    console.log(courses);
    console.log(event.target.id);
    const currentCourse = courses.find(
      (element) => element.id.toString() === event.target.id
    );
    console.log("course clicked");
    console.log(currentCourse);
    setCourseName(currentCourse.courseName);
    setTopics(JSON.parse(currentCourse.topics));
    setNodes(JSON.parse(currentCourse.nodes));
    setEdges(JSON.parse(currentCourse.edges));
  };

  

  const coursesToDisplay = courses.map((course) => {
    return (
     <li
        
        id={course.id}
        name={course.name}
        key={course.id + course.name}
        //onClick={courseClickHandler}
        className="no-border"        
      >
        <a className="courses" href={"/excourse/"+course.id}>{course.name}</a>
        </li>
    );
  });

  return (
    <div style={{ height: 100 + "%" }}>
      <Container className="wrappedContainer" fluid >
        <Menu isAuth={props.isAuth} setIsAuth={props.setIsAuth} />
        <Navbar />

        <Row style={{ height: 95 + "%", overflow: "auto" }}>
          <Col md={{ span: 8, offset: 2 }} style={{ height: 100 + "%" }}>
            <Card className="no-border courses-browser" style={{ height: 100 + "%" }}>
              <Row>
                <p>
                  <span>This Collection</span> of learning materials is
                  constructed to provide a flexible network of theory and
                  examples for various areas of{" "}
                  <strong>
                    computer science, data science, and mathematics
                  </strong>
                  . They can be explored in a linear fashion using{" "}
                  <strong>PeLDS</strong> (
                  <em>Pre-sequenced Learning Delivery System</em>) or through{" "}
                  <strong>ISPeL</strong>(
                  <em>Interactive System for Personalized Learning</em>).
                </p>

                <p>
                  This web application is designed to be a reference for
                  essential definitions, concepts, examples and practice
                  problems in an environment that allows each learner to
                  personalize their experience within a non-course-centric
                  curriculum. Your collaboration is welcomed with the aim to
                  make this site a valuable learning resource.{" "}
                </p>

                <p>
                  This project is a work in progress. Currently, learning
                  content is available for the following areas:
                </p>
              </Row>
              <Row>
                <ul>
                  {coursesToDisplay}
                </ul>
              </Row>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default CourseBuilder;
