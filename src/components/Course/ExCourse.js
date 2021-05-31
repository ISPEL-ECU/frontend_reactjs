import React, { useCallback, useState, useRef, useEffect } from "react";
import axios from "axios";

import Menu from "../UI/Menu";
import Navbar from "../UI/Navbar";
import { useAuth } from "../../context/auth";

import Domains from "./Domains";
import Areas from "./Areas";
import Topics from "./Topics";
import Display from "./Display";
import Tree from "./topicTree";
import CourseOverview from "./ExCourseOverwiew";
import TreeGraph from "./Tree";
import Name from "./CourseName";

import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Redirect } from "react-router";

import {
  SERVER_ADDRESS,
  SERVER_ADDRESS_CONTENT,
} from "../../constants/constants";

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
  }, [tocRef]);

  const changeDomainHandler = (domainId) => {
    setSelectedDomain(domainId);
  };

  const changeAreaHandler = (areaId) => {
    setSelectedArea(areaId);
  };

  const extractTopicsHandler = (selectedTopics) => {
    axios
      .get(SERVER_ADDRESS + "get-selected-topics", {
        params: {
          id:
            selectedTopics && selectedTopics.length > 0
              ? selectedTopics
              : ["-1"],
        },
        headers: {
          Authorization: "Bearer " + authToken,
        },
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
        name: topics[i].name,
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
    var win = window.open(
      SERVER_ADDRESS_CONTENT + "author/topic/" + topic.contentHtml,
      "_blank"
    );
    win.focus();
  };

  const processTreeData = () => {
    let nodes = [
      {
        name: courseName === "" ? "noname" : courseName,
        id: 0,
        color: color_root_node,
        y: 50,
      },
    ];
    let edges = [];
    const processChildren = (currentNode, rootPosition, parentI, ind) => {
      if (currentNode.children) {
        for (let i = 0; i < currentNode.children.length; i++) {
          const childPosition = nodes.push({
            name: parentI + (i + 1) + ". " + currentNode.children[i].title,
            url:
              SERVER_ADDRESS_CONTENT +
              "author/topic/" +
              currentNode.children[i].id,
            id: currentNode.children[i].id,
            color: color_original,
            y: (ind + 1) * 100 + 150,
          });
          edges.push({
            source: currentNode.id,
            target: +currentNode.children[i].id,
          });
          if (currentNode.children[i].children) {
            processChildren(
              currentNode.children[i],
              childPosition,
              parentI + (i + 1) + ".",
              ind + 1
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
        url: SERVER_ADDRESS_CONTENT + "author/topic/" + currentNode.id,
        id: currentNode.id,
        teaser: currentNode.subtitle,
        color: color_original,
        y: 150,
        x: i * 200,
      });
      processChildren(currentNode, currentPosition, i + 1 + ".", i);
    }
    setProcessedTopics(nodes);
    setProcessedEdges(edges);
  };

  const applyCourseHandler = (event) => {
    // setTocWidth(tocRef.current.offsetWidth);
    // setTocHeight(tocRef.current.offsetHeight);
    // console.log('ref');
    // console.log(tocRef);
    setTopicsForCourse(topics);
    processTreeData();
  };

  const saveCourseHandler = (event) => {
    console.log("saving");
    axios
      .post(
        SERVER_ADDRESS + "save-excourse",
        {
          courseName: courseName,
          topics: processedTopics,
          nodes: processedTopics,
          edges: processedEdges,
        },
        {
          headers: {
            Authorization: "Bearer " + authToken,
          },
        }
      )
      .then((response) => {
        if (response.status !== 200) {
          console.log("error!!!!");
        }
        setSubmitForm(true);
        console.log(response.status);
      })
      .catch((err) => console.log(err));
  };

  const HandleAreaSearch = useCallback(() => {
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
  }, [selectedDomain, showSearch]);

  return (
    <div className="App" style={{ height: 100 + "%" }}>
      <Container className="wrappedContainer" fluid>
        <Menu isAuth={props.isAuth} setIsAuth={props.setIsAuth} />
        <Navbar />
        {submitForm ? <Redirect to="/browse-excourses" /> : null}
        <Row style={{ height: 95 + "%", maxHeight: 95 + "%" }}>
          <Col sm={2} style={{ height: 100 + "%" }}>
            <Form style={{ height: 100 + "%", maxHeight: 95 + "%" }}>
              <Card style={{ height: 100 + "%", maxHeight: 95 + "%" }}>
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
              </Card>
            </Form>
          </Col>
          <Col sm={5} style={{ height: 100 + "%" }}>
            <Card style={{ height: 100 + "%" }}>
              <Row style={{ height: 95 + "%", width: 100 + "%" }}>
                <div
                  style={{
                    height: 95 + "%",
                    overflow: "auto",
                    maxHeight: 95 + "%",
                    width: 100 + "%",
                  }}
                >
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
                </div>
                <div style={{ height: 5 + "%", width: 100 + "%" }}>
                  <Button
                    variant="primary"
                    onClick={applyCourseHandler}
                    disabled={buttonDisabled}
                  >
                    Apply
                  </Button>
                </div>
              </Row>
            </Card>
          </Col>
          <Col sm={5} style={{ height: 100 + "%" }}>
            <Row style={{ height: 90 + "%" }} ref={tocRef}>
              <TreeGraph
                nodes={processedTopics}
                edges={processedEdges}
                nodeClick={treeNodeClickHandler}
                width={tocWidth}
                height={tocHeight}
              />
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
