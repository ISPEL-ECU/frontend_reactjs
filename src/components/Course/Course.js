import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

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

function CourseBuilder(props) {
  const history = useHistory();
  const color_original = "#4c72ff";
  const color_root_node = "#ff0000";

  const [selectedDomain, setSelectedDomain] = useState("");
  const [selectedArea, setSelectedArea] = useState("");
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState([]);
  const [topics, setTopics] = useState([]);
  const [treeData, setTreeData] = useState([]);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [processedTopics, setProcessedTopics] = useState([]);
  const [processedEdges, setProcessedEdges] = useState([]);
  const [topicsForCourse, setTopicsForCourse] = useState([]);
  const [showSearch, setShowSearch] = useState(false);
  const [courseName, setCourseName] = useState("");
  const { authToken } = useAuth();

  const changeDomainHandler = (domainId) => {
    setSelectedDomain(domainId);
  };

  const changeAreaHandler = (areaId) => {
    setSelectedArea(areaId);
  };

  const extractTopicsHandler = (selectedTopics) => {
    axios
      .get("http://localhost:3000/react/get-selected-topics", {
        params: {
          id:
            selectedTopics && selectedTopics.length > 0
              ? selectedTopics
              : ["-1"],
        },
        headers: {
          Authorization: 'Bearer ' + authToken,
        }
      })
      .then((topics) => {
        setTopics(topics.data);
        if (topics.data.length > 0) {
          setButtonDisabled(false);
        } else {
          setButtonDisabled(true);
        }
      });
  };

  const changeTopicHandler = (topics) => {
    setSelectedTopics(selectedTopics.concat(topics));
    extractTopicsHandler(selectedTopics.concat(topics));
  };

  const selectTopicHandler = (topicId) => {
    setSelectedTopic(topicId);
  };

  const buildTree = () => {
    if (topics.length < 1) return [{ title: "empty" }];
    let treeData = [];
    for (let i = 0; i < topics.length; i++) {
      treeData.push({
        title: topics[i].name,
        id: topics[i].id,
        subtitle: topics[i].teaser,
        url: topics[i].contentHtml,
      });
    }

    return treeData;
  };

  const onNameHandler = (value) => {
    setCourseName(value);
  };

  const treeNodeClickHandler = (nodeId) => {
    setSelectedTopic(nodeId);
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
              "http://localhost:3000/author/topic/" +
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
        url: "http://localhost:3000/author/topic/" + currentNode.id,
        id: currentNode.id,
        teaser: currentNode.subtitle,
        color: color_original,
      });
      processChildren(currentNode, currentPosition, i + 1 + ".");
    }
    setProcessedTopics(nodes);
    setProcessedEdges(edges);
  };

  const applyCourseHandler = (event) => {
    setTopicsForCourse(topics);
    processTreeData();
  };

  const saveCourseHandler = (event) => {
    axios.post("http://localhost:3000/react/save-course", null, {
      params: {
        courseName: courseName,
        topics: JSON.stringify(topics),
        nodes: JSON.stringify(processedTopics),
        edges: JSON.stringify(processedEdges)
      },
      headers: {
        Authorization: 'Bearer ' + authToken,
      }
    }).then((response)=>{
       console.log(response.status);
    });
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

  return (
    <div className="App" style={{ height: 100 + "%" }}>
      <Container fluid style={{ height: 100 + "%" }}>
        <Menu isAuth={props.isAuth} setIsAuth={props.setIsAuth} />
        <Navbar />

        <Row style={{ height: 95 + "%" }}>
          <Col sm={2} style={{ height: 100 + "%" }}>
            <Form style={{ height: 100 + "%" }}>
              <Card style={{ height: 100 + "%" }}>
                <Name onNameHandler={onNameHandler} />
                <h6>Course content:</h6>

                <Domains
                  onChangeDomain={changeDomainHandler}
                  showSearch={setShowSearch}
                />
                <HandleAreaSearch />
                <Topics
                  selectedArea={selectedArea}
                  showSearch={showSearch}
                  onSelectedTopics={changeTopicHandler}
                />
                <Tree
                  key={buildTree()}
                  treeData={buildTree()}
                  treeFunction={buildTree}
                  setTreeData={setTreeData}
                  setButtonDisabled={setButtonDisabled}
                  selectedTopics={selectedTopics}
                  onTopicExtracted={setTopics}
                  onSelectedTopic={selectTopicHandler}
                />
                <Button
                  variant="primary"
                  onClick={applyCourseHandler}
                  disabled={buttonDisabled}
                >
                  Apply
                </Button>
              </Card>
            </Form>
          </Col>
          <Col sm={5} style={{ height: 100 + "%" }}>
            <Card style={{ height: 100 + "%" }}>
            <Row style={{ height: 95 + "%", overflow: "auto", width: 100 + "%" }}>
              <CourseOverview
                topics={processedTopics}
                courseName={courseName}
                nodeClick={treeNodeClickHandler}
              />
             
                <TreeGraph
                  nodes={processedTopics}
                  edges={processedEdges}
                  nodeClick={treeNodeClickHandler}
                />
            </Row>  
            </Card>
          </Col>
          <Col sm={5} style={{ height: 100 + "%" }}>
            <Row style={{ height: 90 + "%" }}>
              <Display selectedTopic={selectedTopic} />
            </Row>
            <Row style={{ height: 10 + "%" }}>
              <Button variant="primary" href='/browse-courses' size="sm" onClick={saveCourseHandler}>
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
