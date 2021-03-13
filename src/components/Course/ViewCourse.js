import React, { useState, useEffect } from "react";

import ListGroup from "react-bootstrap/ListGroup";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import axios from "axios";

import Questions from "./Questions";
import Display from "./Display";
import TopicForOverview from "./TopicForOverview";
import Menu from "../UI/Menu";
import Navbar from "../UI/Navbar";

import { SERVER_ADDRESS } from "../../constants/constants";
import ContentsTable from "./ContentsTable";
import Button from "react-bootstrap/Button";

import {LIST_FONT_COLOR, LIST_BACKGROUND_COLOR} from "../../constants/constants";


const Course = (props) => {
  const [course, setCourse] = useState();
  const [selectedTopic, setSelectedTopic] = useState([]);
  const [topics, setTopics] = useState([]);
  const [quizDisabled, setQuizDisabled] = useState("true");
  const [quizId, setQuizId] = useState();
  const [showQuiz, setShowQuiz] = useState(false);
  const [topicContent, setTopicContent] = useState("");
  const [prevTopic, setPrevTopic] = useState();
  

  useEffect(() => {
    const id = props.match.params.courseId;
    axios
      .get(SERVER_ADDRESS + "get-course", {
        params: { courseId: id },
      })
      .then((crs) => {
        console.log(crs);
        setCourse(crs.data);
        setTopics(JSON.parse(crs.data.topics));
      })
      .catch((err) => console.log(err));
  }, [props.match.params.courseId]);

  useEffect(()=>{

    axios
      .get(SERVER_ADDRESS + "quiz-exist", {
        params: { topicId: selectedTopic },
      })
      .then( response => {
        console.log(response.data);
        if (!response.data){
          setQuizDisabled(true);
        } else {
          setQuizDisabled(false);
          setQuizId(response.data.quizId);
        }
      }
      )
      .catch(err=>console.log(err));

  }, [selectedTopic]);


  const onQuizClick = (event) =>{
    setQuizDisabled(true);
    setShowQuiz(true);

  }

  const ManagePreviewArea = () =>{

    if (showQuiz) {
      console.log('questions');
      return(<Questions quizId={quizId}/>);
    }
    else {
      console.log('display');
      return ( <Display selectedTopic={topicContent} />)
    }
  }

  const onClickedTopic = (event) =>{
    if (prevTopic){
      prevTopic.style.backgroundColor = "initial";
      prevTopic.style.color = "initial";
    } 
    event.target.style.backgroundColor =LIST_BACKGROUND_COLOR;
    event.target.style.color = LIST_FONT_COLOR;
    setPrevTopic(event.target);
    axios
      .get(SERVER_ADDRESS+"get-content", {
        params: {
          id: event.target.id,
        }
      })
      .then((topicContent) => {
        console.log("selected topic content");
        console.log(topicContent.data);
        setTopicContent(topicContent.data);
      });
    setSelectedTopic(event.target.id);
    if (showQuiz)
    setShowQuiz(false);
  }

  const topicsToDisplay = topics.map((topic) => {
    if (topic.id === 0) return null;

    return (
      <TopicForOverview
        key={topic.id}
        topic={topic}
        nodeClick={onClickedTopic}
      />
    ); //<Topic topic={topic} />
  });

  return (
    <div style={{ height: 100 + "%" }}>
      <Container fluid style={{ height: 100 + "%" }}>
        <Menu isAuth={props.isAuth} setIsAuth={props.setIsAuth} />
        <Navbar />
        <Row style={{ height: 95 + "%" }}>
          <Col md={2}>
            <h3>Table of Content</h3>
            {topicsToDisplay}
          </Col>
          <Col md={10} style={{ height: 95 + "%" }}>
            <Row style={{ height: 98 + "%" }}>
              <ManagePreviewArea/>
            </Row>
            <Row className="justify-content-md-center">
              <Col md="auto">
                <Button className="float-center" hidden={quizDisabled} onClick={onQuizClick}>Take a quiz</Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Course;
