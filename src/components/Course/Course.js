import React, { useState,  useEffect } from "react";
import axios from "axios";

import Menu from "../UI/Menu";
import Navbar from "../UI/Navbar";
import { useAuth } from "../../context/auth";


import Display from "./Display";
import CourseOverview from "./CourseOverwiew";

import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Redirect } from "react-router";


import { SERVER_ADDRESS } from "../../constants/constants";

function CourseBuilder(props) {
  
  const [selectedTopic, setSelectedTopic] = useState("");
  const [topics, setTopics] = useState([]);
  

  const [processedTopics, setProcessedTopics] = useState([]);
  const [saveDisabled, setSaveDisabled] = useState(false);
  const [saveVisible, setSaveVisible] = useState(false);


  const [courseName, setCourseName] = useState("");
  const [submitForm, setSubmitForm] = useState(false);

  const { authToken } = useAuth();

 
  useEffect(() => {
    if (topics && topics.length > 0) {
      axios
        .get(SERVER_ADDRESS + "get-topic-complex", {
          params: {
            ids: topics,
          },
          headers: {
            Authorization: "Bearer " + authToken,
          },
        })
        .then((completeTopics) => {
          console.log("completeTopics");
          console.log(completeTopics.data);
          setProcessedTopics(completeTopics.data);
          setSaveDisabled(false);
          setSaveVisible(true);
        })
        .catch((err) => console.log(err));
    } else {setSaveDisabled(true)}
  }, [authToken, topics]);

  const treeNodeClickHandler = (nodeId) => {
    console.log(nodeId);

    setSelectedTopic(nodeId);
  };

 
  const saveCourseHandler = (event) => {
    console.log("saving");
    axios
      .post(SERVER_ADDRESS + "save-course", null, {
        params: {
          courseName: courseName,
          topics: JSON.stringify(topics)
        },
        headers: {
          Authorization: "Bearer " + authToken,
        },
      })
      .then((response) => {
        if (response.status !== 200) {
          console.log("error!!!!");
        }
        setSubmitForm(true);
        console.log(response.status);
      })
      .catch((err) => console.log(err));
  };



  const fileInputHandler = (event) => {
    if (event.target.files[0]) {
     
      setSelectedTopic("");
      const reader = new FileReader();
      let file;
      reader.onload = async (e) => {
        file = e.target.result;
        console.log(file);
        const strings = file.split(/\n+/);
        if (strings.length > 0) {
          const trimedStrings = strings.map(str =>str.trim()).filter(item=>{
          return item != null && item!=='';
          });
          setCourseName(trimedStrings[0]);
          trimedStrings.shift(); 
          setTopics(trimedStrings);
        }
      };

      reader.readAsText(event.target.files[0]);
    }
  };

  return (
    <div className="App" style={{ height: 100 + "%" }}>
      <Container className="wrappedContainer" fluid>
        <Navbar />
        {submitForm ? <Redirect to="/browse-courses" /> : null}
        <Row style={{ height: 95 + "%" }}>
          <Col sm={2} style={{ height: 100 + "%" }}>
            <Form style={{ height: 100 + "%" }}>
              <Card style={{ height: 85 + "%" }}>
                <Card.Title>Instructions:</Card.Title>
                <Card.Body className="instructions-upload">
                  Please upload the course structure file using following
                  template:<br></br> First line of the file - course name <br></br> each Meta-topic
                  name should start with #<br></br> each topic should be represented by
                  topic ID.<br></br> <i>Example:</i><br></br> Discrete Structures<br></br>#Introduction<br></br>
                  &nbsp;&nbsp;ds:intro:definition-of-a-set<br></br>
                  &nbsp;&nbsp;ds:st:universal-set<br></br> #Properties of sets<br></br> &nbsp;&nbsp;ds:st:cardinality<br></br>
                  &nbsp;&nbsp;ds:st:set-equality<br></br>  #Operations on sets<br></br>
                  &nbsp;&nbsp;ds:st:set-union<br></br> &nbsp;&nbsp;ds:st:-set-intersection
                </Card.Body>
                <Form.Group>
                  <Form.File
                    required
                    id="htmlContent"
                    label="Structure file"
                    onChange={fileInputHandler}
                    accept=".txt"
                  />
                </Form.Group>
              </Card>
            </Form>
          </Col>
          <Col sm={5} style={{ height: 100 + "%" }}>
            <Card style={{ height: 100 + "%" }}>
              <Row
                style={{ height: 95 + "%", overflow: "auto", width: 100 + "%" }}
              >
                <div style={{ height: 50 + "%", width: 100 + "%" }}>
                  <CourseOverview
                    topics={processedTopics}
                    courseName={courseName}
                    nodeClick={treeNodeClickHandler}
                    setSaveDisable = {setSaveDisabled}
                  />
                </div>
              </Row>
            </Card>
          </Col>
          <Col sm={5} style={{ height: 100 + "%" }}>
            <Row style={{ height: 90 + "%" }}>
              <Display selectedTopic={selectedTopic} />
            </Row>
            <Row style={{ height: 10 + "%" }}>
              <Button variant={saveDisabled?"danger":"primary"} hidden={!saveVisible} size="sm" disabled={saveDisabled} onClick={saveCourseHandler}>
                {saveDisabled?"Error in topics":"Save course"}
              </Button>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default CourseBuilder;
