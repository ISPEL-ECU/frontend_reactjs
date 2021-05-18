import React, { useState, useRef, useEffect } from "react";
import axios from "axios";

import Menu from "../UI/Menu";
import Navbar from "../UI/Navbar";
import { useAuth } from "../../context/auth";

import Domains from "./Domains";
import Areas from "./Areas";
import Topics from "./Topics";
import Display from "./Display";
import Tree from "./topicTree";
import CourseOverview from "./CourseOverwiew";
import TreeGraph from "./Tree";
import Name from "./CourseName";

import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Redirect } from "react-router";

import { SERVER_ADDRESS } from "../../constants/constants";

function CourseBuilder(props) {
  const color_original = "#4c72ff";
  const color_root_node = "#ff0000";

  const [selectedDomain, setSelectedDomain] = useState("");
  const [selectedArea, setSelectedArea] = useState("");
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState("");
  const [topics, setTopics] = useState([]);
  const [treeData, setTreeData] = useState([]);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [processedTopics, setProcessedTopics] = useState([]);
  const [processedEdges, setProcessedEdges] = useState([]);
  const [topicsForCourse, setTopicsForCourse] = useState([]);
  const [showSearch, setShowSearch] = useState(false);
  const [courseName, setCourseName] = useState("");
  const [submitForm, setSubmitForm] = useState(false);
  const { authToken } = useAuth();
  const [tocWidth, setTocWidth] = useState("700");
  const [tocHeight, setTocHeight] = useState("700");
  const tocRef = useRef(null);

  useEffect(() => {
    setTocWidth(tocRef.current.offsetWidth);
    setTocHeight(tocRef.current.offsetHeight);
  }, []);

 
  const changeAreaHandler = (areaId) => {
    setSelectedArea(areaId);
  };

 


  const treeNodeClickHandler = (nodeId) => {
    console.log(nodeId);
    console.log("content");
    let topic;
    if (typeof nodeId === "number") {
      topic = topics.find((element) => element.id === nodeId);
    } else {
      console.log(nodeId);
      topic = topics.find((element) => element.id.toString() === nodeId);
    }
    console.log(topics);
    setSelectedTopic(topic.contentHtml);
  };

  const processTreeData = () => {
    let nodes = [
      {
        name: courseName === "" ? "noname" : courseName,
        id: 0,
        color: color_root_node,
      },
    ];
    let edges = [];
    const processChildren = (currentNode, rootPosition, parentI) => {
      if (currentNode.children) {
        for (let i = 0; i < currentNode.children.length; i++) {
          const childPosition = nodes.push({
            name: parentI + (i + 1) + ". " + currentNode.children[i].title,
            url:
              "http://38.123.149.95:3000/author/topic/" +
              currentNode.children[i].id,
            teaser: currentNode.subtitle,
            id: currentNode.children[i].id,
            color: color_original,
          });
          edges.push({
            source: currentNode.id,
            target: +currentNode.children[i].id,
          });
          if (currentNode.children[i].children) {
            processChildren(
              currentNode.children[i],
              childPosition,
              parentI + (i + 1) + "."
            );
          }
        }
      }
    };
    for (let i = 0; i < treeData.length; i++) {
      const currentNode = treeData[i];
      edges.push({ source: 0, target: currentNode.id });
      const currentPosition = nodes.push({
        name: i + 1 + "." + currentNode.title,
        url: "http://38.123.149.95:3000/author/topic/" + currentNode.id,
        id: currentNode.id,
        teaser: currentNode.subtitle,
        color: color_original,
      });
      processChildren(currentNode, currentPosition, i + 1 + ".");
    }
    setProcessedTopics(nodes);
    setProcessedEdges(edges);
  };

  

  const saveCourseHandler = (event) => {
    console.log("saving");
    axios
      .post(SERVER_ADDRESS + "save-course", null, {
        params: {
          courseName: courseName,
          topics: JSON.stringify(processedTopics),
          nodes: JSON.stringify(processedTopics),
          edges: JSON.stringify(processedEdges),
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

  const HandleAreaSearch = () => {
    if (!showSearch) {
      return (
        <Areas
          selectedDomain={selectedDomain}
          onChangeArea={changeAreaHandler}
          showSearch={showSearch}
        />
      );
    }
    setSelectedArea("%");
    return null;
  };

  const fileInputHandler = (event) =>{
    if (event.target.files[0]) {
      const reader = new FileReader();
      let file;
      reader.onload = async (e) =>{
        file = e.target.result;
        console.log(file);
      const strings = file.split(/\n+/);
      if (strings.length>0){
        setCourseName(strings[0].trim());
        const resultTopics = [];
        let currentMeta;
        let currentTopics = [];
        for (let i=1; i<strings.length; i++){
          if (strings[i].trim().startsWith("#")){
            if (currentMeta) resultTopics.push({name:currentMeta, topics: currentTopics});
            currentMeta=strings[i].trim().substring(1);
            currentTopics = [];
            } else {
              currentTopics.push(strings[i].trim());
          }
        }
        setTopics(resultTopics);
        console.log("resultTopics");
        console.log(resultTopics);

      }
      }
      console.log(event.target.files[0]);
      reader.readAsText(event.target.files[0])
      
      
    
    }
  }

  return (
    <div className="App" style={{ height: 100 + "%" }}>
      <Container className="wrappedContainer" fluid>
        <Menu isAuth={props.isAuth} setIsAuth={props.setIsAuth} />
        <Navbar />
        {submitForm ? <Redirect to="/browse-courses" /> : null}
        <Row style={{ height: 95 + "%" }}>
          <Col sm={2} style={{ height: 100 + "%" }}>
            <Form style={{ height: 100 + "%" }}>
              <Card style={{ height: 85 + "%" }}>
                <Card.Title>Instructions:</Card.Title>
                <Card.Body>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.
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
                  />
                </div>
                <div
                  style={{ height: 50 + "%", width: 100 + "%" }}
                  ref={tocRef}
                >
                  <TreeGraph
                    nodes={processedTopics}
                    edges={processedEdges}
                    nodeClick={treeNodeClickHandler}
                    width={tocWidth}
                    height={tocHeight}
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
              <Button variant="primary" size="sm" onClick={saveCourseHandler}>
                Save course
              </Button>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default CourseBuilder;
