import React, { useState, useEffect, useRef } from "react";
import { generatePath } from "react-router";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { useAuth } from "../../context/auth";

import axios from "axios";

import Questions from "./Questions";
import Display from "./Display";
import TopicForOverview from "./TopicForOverview";
import Menu from "../UI/Menu";
import Navbar from "../UI/Navbar";

import { SERVER_ADDRESS } from "../../constants/constants";

import Button from "react-bootstrap/Button";

import {
  LIST_FONT_COLOR,
  LIST_BACKGROUND_COLOR,
} from "../../constants/constants";

const Course = (props) => {
  const [selectedTopic, setSelectedTopic] = useState([]);
  const [topics, setTopics] = useState([]);
  const [quizDisabled, setQuizDisabled] = useState("true");
  const [quizId, setQuizId] = useState();
  const [showQuiz, setShowQuiz] = useState(false);
  const [topicContent, setTopicContent] = useState("");
  const [prevTopic, setPrevTopic] = useState();
  const [courseName, setCourseName] = useState();

  const { authToken } = useAuth();

  useEffect(() => {
    const id = props.match.params.courseId;
    const topicId = props.match.params.topicId;
    console.log("corseId=" + id);

    axios
      .get(SERVER_ADDRESS + "get-course", {
        params: { courseId: id },
      })
      .then((crs) => {
        setCourseName(crs.data.name);
        axios
          .get(SERVER_ADDRESS + "get-topic-complex", {
            params: {
              ids: JSON.parse(crs.data.topics),
            },
            headers: {
              Authorization: "Bearer " + authToken,
            },
          })
          .then((completeTopics) => {
            if (topicId){
              checkExistingQuiz(topicId);
              console.log( completeTopics.data);
              const currentTopic = completeTopics.data.find(element=>element.type==="topic"&&element.value.id.toString()===topicId);
              console.log(currentTopic);
              if (currentTopic)
                setTopicContent(currentTopic.value.contentHtml);
              setSelectedTopic(topicId);
              
            } else 
            if (completeTopics.data.length > 0) {
              var BreakException = {};
              try {
                  completeTopics.data.forEach((element) => {
                    if (element.type === "topic") {
                    checkExistingQuiz(element.value.id);
                    setTopicContent(element.value.contentHtml);
                    setSelectedTopic(element.value.id);
                    // document.getElementById(element.value.id).style.backgroundColor =
                    //   LIST_BACKGROUND_COLOR;
                    //   document.getElementById(element.value.id.toString()).style.color = LIST_FONT_COLOR;
                    // setPrevTopic(document.getElementById(element.value.id));

                    throw BreakException;
                  }
                });
              } catch (e) {
                if (e !== BreakException) throw e;
              }

              console.log(completeTopics.data);

              if (showQuiz) setShowQuiz(false);
            }

            console.log("completeTopics");
            console.log(completeTopics.data);
            setTopics(completeTopics.data);
            
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  }, [authToken, props.match.params.courseId]);

  const checkExistingQuiz = (id) => {
    console.log("quiz check");
    console.log(selectedTopic);
    if (id) {
      console.log("quiz check");
      axios
        .get(SERVER_ADDRESS + "quiz-exist", {
          params: { topicId: id },
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
    }
  };

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

  const onClickedTopic = (content, event) => {
    checkExistingQuiz(event.target.parentNode.id);
    if (prevTopic) {
      prevTopic.style.backgroundColor = "initial";
      prevTopic.style.color = "initial";
    }
    event.target.parentNode.style.backgroundColor = LIST_BACKGROUND_COLOR;
    event.target.parentNode.style.color = LIST_FONT_COLOR;
    setPrevTopic(event.target.parentNode);
    setTopicContent(content);
    setSelectedTopic(event.target.parentNode.id);
    console.log("id=" + event.target.parentNode.id);
    if (showQuiz) setShowQuiz(false);
    const path = generatePath("/course/"+props.match.params.courseId+"/:topic_id/", {
      topic_id: event.target.parentNode.id
    });
    window.history.replaceState({'topic_id':event.target.parentNode.id},'', path);
    //window.history.replace({'topic_id':event.target.parentNode.id},'', window.location.href+'?topic_id:'+event.target.parentNode.id);
  };

  let topicCount = 0;
  let count;
  let firstTopic = true;
  const handleTopic = (topic) => {
    if (topic.type === "header") {
      topicCount = 0;
      count = topic.value.split("#").length - 1;
      const HeaderTag = `h${count + 1}`;
      const header = topic.value.replaceAll("#", "");
      return (
        <Col md={{ offset: count - 1 }}>
          <HeaderTag>{header}</HeaderTag>
        </Col>
      );
    } else {
      topicCount++;
      if (firstTopic&&!props.match.params.topicId) {
        firstTopic=false;
      return (
        <Col md={{ offset: count - 1 }}>
          {<TopicForOverview
            key={topic.value.id}
            topic={topic.value}
            nodeClick={onClickedTopic}
            topicCount={topicCount}
            firstTopic={true}
            setInitialTopic={setInitialTopic}
          />}
        </Col>
      ); //<Topic topic={topic} />
      } else 
      {
        return (
          <Col md={{ offset: count - 1 }}>
            {topic.value?<TopicForOverview
              key={topic.value.id}
              topic={topic.value}
              nodeClick={onClickedTopic}
              topicCount={topicCount}
              firstTopic={false}
              preselectedTopic = {props.match.params.topicId}
              setInitialTopic={setInitialTopic}
            />:<TopicForOverview
            key={"deleted topic"}
            topic={null}
            topicID={topic.id}
            nodeClick={null}
            topicCount={topicCount}
            firstTopic={false}
            //preselectedTopic = {props.match.params.topicId}
            setInitialTopic={false}
          />}
          </Col>
        ); //<Topic topic={topic} />
        }
    }
  };

  const setInitialTopic = (firstTopicId) =>{
    setPrevTopic(document.getElementById(firstTopicId));
  }

  const topicsToDisplay = topics.map((topic) => {
    return <div>{handleTopic(topic)}</div>; //<Topic topic={topic} />
  });

  return (
    <div style={{ height: 100 + "%", maxHeight: 100 + "%" }}>
      <Container className="wrappedContainer" fluid>
        <Menu isAuth={props.isAuth} setIsAuth={props.setIsAuth} />
        <Navbar />
        <Row style={{ height: 95 + "%" }}>
          <Col md={3} style={{ overflowY: "auto", maxHeight: 95 + "%" }}>
            <div className="topicNav" style={{ height: 50 + "%" }}>
              <h1>{courseName}</h1>
              <br></br>
              {topicsToDisplay}
            </div>
          </Col>
            {setInitialTopic}
          <Col md={9} style={{ height: 95 + "%" }}>
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
