import React, { useState, useEffect } from "react";
import axios from "axios";

import Menu from "../UI/Menu";
import Navbar from "../UI/Navbar";

import CourseList from './BrowsedCourses';
import CourseOverview from "./CourseOverwiew";
import TreeGraph from "./Tree";

import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useAuth } from "../../context/auth";




function CourseBuilder(props) {
   const [courses, setCourses] = useState([]);
   const [topics, setTopics] = useState([]);
   const [nodes, setNodes] = useState([]);
   const [edges, setEdges] = useState([]);
   const [courseName, setCourseName] = useState([]);
   const { authToken } = useAuth();

  
  useEffect(() => {
   
    axios
      .get("http://38.123.149.95:3000/react/get-courses",  {headers: {
        Authorization: "Bearer " + authToken,
      },})
      .then((crses) => {
        
        setCourses(crses.data);
        console.log(crses.data);
        })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const courseClickHandler = (id) =>{
    
    console.log(courses);
    console.log(id);
    const currentCourse = courses.find(element=>element.id.toString()===id);
    console.log('course clicked');
    console.log(currentCourse);
    setCourseName(currentCourse.courseName);
    setTopics(JSON.parse(currentCourse.topics));
    setNodes(JSON.parse(currentCourse.nodes));
    setEdges(JSON.parse(currentCourse.edges));
    
  }

  const treeNodeClickHandler = (nodeId) => {
  
  };

  return (
    <div className="App" style={{ height: 100 + "%" }}>
      <Container fluid style={{ height: 100 + "%" }}>
        <Menu isAuth={props.isAuth} setIsAuth={props.setIsAuth} />
        <Navbar />

        <Row style={{ height: 95 + "%" }}>
          <Col sm={4} style={{ height: 100 + "%" }}>
            <CourseList courses={courses} onCourseClick={courseClickHandler}/>
          </Col>
          <Col sm={8} style={{ height: 100 + "%" }}>
            <Card style={{ height: 100 + "%" }}>
            <Row style={{ height: 95 + "%", overflow: "auto", width: 100 + "%" }}>
              <CourseOverview
                topics={topics}
                courseName={courseName}
                nodeClick={treeNodeClickHandler}
              />
            
                <TreeGraph
                  nodes={nodes}
                  edges={edges}
                  nodeClick={treeNodeClickHandler}
                />
            </Row>  
            </Card>
          </Col>
         
        </Row>
      </Container>
    </div>
  );
}

export default CourseBuilder;
