import React, { useState, useEffect, useRef } from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import axios from "axios";

import Questions from "./Questions";
import Display from "./Display";
import TopicForOverview from "./TopicForExOverview";
import Navbar from "../UI/Navbar";
import TreeGraph from "./Tree";

import { slide as Menu } from "react-burger-menu";
import Burger from "./Burger_svg";

import { SERVER_ADDRESS } from "../../constants/constants";

import Button from "react-bootstrap/Button";

import {
  LIST_FONT_COLOR,
  LIST_BACKGROUND_COLOR,
} from "../../constants/constants";

const Course = (props) => {
  const [course, setCourse] = useState();
  const [selectedTopic, setSelectedTopic] = useState([]);
  const [topics, setTopics] = useState([]);
  const [quizDisabled, setQuizDisabled] = useState("true");
  const [quizId, setQuizId] = useState();
  const [showQuiz, setShowQuiz] = useState(false);
  const [topicContent, setTopicContent] = useState("");
  const [prevTopic, setPrevTopic] = useState();
  const [processedTopics, setProcessedTopics] = useState([]);
  const [processedEdges, setProcessedEdges] = useState([]);
  const [tocWidth, setTocWidth] = useState();
  const [tocHeight, setTocHeight] = useState();
  const [areMenusOpen, setMenusOpen] = useState(true);
  const tocRef = useRef(null);

  useEffect(() => {
    const id = props.match.params.courseId;
    console.log('corseId='+id);
    setTocWidth(tocRef.current.offsetWidth);
    setTocHeight(tocRef.current.offsetHeight);
    axios
      .get(SERVER_ADDRESS + "get-excourse", {
        params: { courseId: id },
      })
      .then((crs) => {
        console.log(crs);
        const topcs = (crs.data.topics);
        setCourse(crs.data);
        setTopics(topcs);
        const nodes = crs.data.nodes;
        const edges = crs.data.edges;
        setProcessedTopics(nodes);
        setProcessedEdges(edges);
        console.log('topics');
        console.log(topcs);
      })
      .catch((err) => console.log(err));
  }, [props.match.params.courseId]);

  useEffect(() => {
    if (selectedTopic){
    axios
      .get(SERVER_ADDRESS + "quiz-exist", {
        params: { topicId: selectedTopic },
      })
      .then((response) => {
        console.log(response.data);
        if (!response.data) {
          setQuizDisabled(true);
        } else {
          setQuizDisabled(false);
          setQuizId(response.data.quizId);
        }
      })
      .catch((err) => console.log(err));
  }}, [selectedTopic]);

  const onQuizClick = (event) => {
    setQuizDisabled(true);
    setShowQuiz(true);
  };

  const ManagePreviewArea = () => {
    if (showQuiz) {
      console.log("questions");
      return <Questions quizId={quizId} />;
    } else {
      console.log("display");
      return <Display selectedTopic={topicContent} />;
    }
  };

  const onClickedTopic = async (event) => {
    if (prevTopic) {
      prevTopic.style.backgroundColor = "initial";
      prevTopic.style.color = "initial";
    }
    event.target.parentNode.style.backgroundColor = LIST_BACKGROUND_COLOR;
    event.target.parentNode.style.color = LIST_FONT_COLOR;
    setPrevTopic(event.target.parentNode);
    setSelectedTopic(event.target.parentNode.id);
    await axios
      .get(SERVER_ADDRESS + "get-content", {
        params: {
          id: event.target.parentNode.id,
        },
      })
      .then((topicContent) => {
        console.log("selected topic content");
        console.log(topicContent.data);
        setTopicContent(topicContent.data);
      });
    
    if (showQuiz) setShowQuiz(false);
  };

  const onClickedNode = (id) => {
    axios
      .get(SERVER_ADDRESS + "get-content", {
        params: {
          id: id,
        },
      })
      .then((topicContent) => {
        console.log("selected topic content");
        console.log(topicContent.data);
        setTopicContent(topicContent.data);
        setMenusOpen(false);
      });
    setSelectedTopic(id);
    if (showQuiz) setShowQuiz(false);
  };

  

  return (
    <div style={{ height: 100 + "%" }}>
      <Container className="wrappedContainer" fluid>
        <Navbar />
        <Menu isOpen={areMenusOpen} customBurgerIcon={<Burger />} width={'100%'} onOpen={()=>setMenusOpen(true)}>
        <div style={{ height: 95 + "%" }} ref={tocRef}>
            <TreeGraph
                  nodes={processedTopics}
                  edges={processedEdges}
                  nodeClick={onClickedNode}
                  width = {tocWidth}
                  height = {tocHeight}
                  textColor = "white"
                />
            </div>
        </Menu>
        <Row style={{ height: 95 + "%", maxHeight: 95 + "%"}}>
          <Col md={12} style={{ height: 95 + "%" }}>
            <Row style={{ height: 98 + "%" }}>
              <ManagePreviewArea />
            </Row>
            <Row className="justify-content-md-center">
              <Col md="auto">
                <Button
                  className="float-center"
                  hidden={quizDisabled}
                  onClick={onQuizClick}
                >
                  Practice
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Course;
