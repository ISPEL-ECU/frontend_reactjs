import React, { useEffect, useState, useRef } from "react";

import Menu from "../UI/Menu old";
import Navbar from "../UI/Navbar";

import Container from "react-bootstrap/Container";

import "./IngredientList.css";

import axios from "axios";

import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import ToggleButton from "react-bootstrap/ToggleButton";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import Alert from "react-bootstrap/Alert";



import "katex/dist/katex.min.css";
import Latex from "react-latex-next";


import { SERVER_ADDRESS } from "../../constants/constants";

const Questions = (props) => {
  const [source, setSource] = useState([]);
  const [answers, setAnswers] = useState([]);

  const [questionId, setQuestionId] = useState();
  const [currentAnswer, setCurrentAnswer] = useState();
  const answersRef = useRef(null);
  
  const [answerIsCorrect, setAnswerIsCorrect] = useState();
  const [displayMessage, setDisplayMessage] = useState(false);
  const [submitEnabled, setSubmitEnabled] = useState(false);
  const [forbidAnswerClick, setForbidAnswerClick] = useState(false);

  const refresh = () => {
    setAnswers([]);
    axios
      .get(SERVER_ADDRESS + "get-questions", {
        params: {
          quizId: props.quizId,
        },
      })
      .then((response) => {
        setDisplayMessage(false);
        setForbidAnswerClick(false);
        setSubmitEnabled(false);
        console.log(response.data);
        const value = response.data;
        setSource(value.initialSets);
        setAnswers(value.results);
        setQuestionId(value.id);
        // setTitle(value.title);
        // const firstSet = new Set(value.initialSets[0]);
        // const secondSet = new Set(value.initialSets[1]);
        // const res = Array.from(new Set([...firstSet, ...secondSet])).sort(
        //   (a, b) => a - b
        // );
        // setResult(res);
        // console.log(res);
        console.log(value.results);
      });
  };

  // useEffect(()=>{
  //   questionRef.current.style.width = answersRef.current.offsetWidth;
  // }, [answersRef]);

  useEffect(refresh, []);

  const onRadioClickHandler = (event) => {
    console.log("status is " + event.target.disabled);
    if (!event.target.disabled) {
      const answer = event.target.value;
      console.log(answer);
      setCurrentAnswer(answer);
      setSubmitEnabled(true);
    }
  };

  const handleAnswers = answers.map((answer, ind) => {
    return (
      <ToggleButton
        className={ind % 2 === 0 ? "AnswersGroup-even" : "AnswersGroup-odd"}
        value={answer.toString()}
        type="radio"
        onClick={onRadioClickHandler}
        variant="outline-dark"
        name="groupOptions"
        key={(answer + ind).toString()}
        id={answer.toString()}
        disabled={forbidAnswerClick}
        border={0}
        block
      >
        <Latex>
         
            {answer.toString().replaceAll("\\$", "$")}
        </Latex>
      </ToggleButton>
    );
  });

  const sendResults = () => {
    const data = new FormData();
    data.append("id", questionId);
    data.append("answer", currentAnswer);

    axios
      .get(SERVER_ADDRESS + "check-results", {
        params: {
          id: questionId,
          answer: currentAnswer,
        },
      })
      .then((response) => {
        const correctAnswer = response.data.correctAnswer;
        setAnswerIsCorrect(response.data.correct);
        setDisplayMessage(true);
        setSubmitEnabled(false);
        setForbidAnswerClick(true);
        Array.from(answersRef.current.children).forEach((element) => {
          if (currentAnswer === element.id) element.style.border = "solid";
          if (correctAnswer !== element.id) element.style.color = "red";
          else element.style.color = "green";
        });
      });
  };

  return (
    <Container style={{ height: 100 + "%", maxHeight: 100 + "%", overflowY:"auto" }}>
      <Col lg="auto">
        {/* <Card className="card-question" ref={questionRef}>
        <Card.Body>
          <Card.Title> */}
        <h3 className="question-title">Practice question</h3>
        {/* </Card.Title> */}
        <Row className="justify-content-md-center">
          <Col lg="auto" className="question-body">
            <Card className="card-question-text">
              {source.map((sourceString) => {
                return (
                  <p>
                    {/* <MathComponent
                        tex={String.raw`${sourceString.toString()}`}
                        display={false}
                      /> */}
                    <Latex>
                      {sourceString.toString().replaceAll("\\$", "$")}
                    </Latex>
                  </p>
                );
              })}
            </Card>
          </Col>
        </Row>
        <Row className="justify-content-md-center">
          <Col lg="auto">
            <Card className="card-question-answers">
              <ToggleButtonGroup
                ref={answersRef}
                size="lg"
                // border="solid"
                name="answers"
                vertical="true"
              >
                {answers && answers !== null ? handleAnswers : null}
              </ToggleButtonGroup>
            </Card>
            <Row>
              <Col className="submit-button-placeholder">
                <Button
                  className="quiz-button"
                  variant={submitEnabled?"primary":"secondary"}
                  onClick={sendResults}
                  disabled={!submitEnabled}
                >
                  Submit Answer
                </Button>
              </Col>
              <Col className="next-question-button quiz-button">
                <Button
                  variant="primary"
                  className="quiz-button"
                  onClick={refresh}
                >
                  Next Question
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>

        <Row className="justify-content-md-center">
          <Col md="auto">
            {displayMessage && answerIsCorrect ? (
              <Alert key="alertKey" variant="success">
                "Your answer is correct"
              </Alert>
            ) : null}
            {displayMessage && !answerIsCorrect ? (
              <Alert key="alertKey" variant="danger">
                "Your answer is wrong"
              </Alert>
            ) : null}
          </Col>
        </Row>
        {/* </Card.Body>
      </Card> */}
      </Col>
    </Container>
  );
};

export default Questions;
