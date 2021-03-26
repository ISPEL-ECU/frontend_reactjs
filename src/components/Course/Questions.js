import React, { useEffect, useState, useRef } from "react";

import Menu from "../UI/Menu";
import Navbar from "../UI/Navbar";

import Container from "react-bootstrap/Container";

import "./IngredientList.css";
import Area from "./Area";
import axios from "axios";
import Form from "react-bootstrap/Form";
import FormGroup from "react-bootstrap/FormGroup";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import ToggleButton from "react-bootstrap/ToggleButton";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import Alert from "react-bootstrap/Alert";

import { useAuth } from "../../context/auth";

import { SERVER_ADDRESS } from "../../constants/constants";

const Areas = (props) => {
  const [source, setSource] = useState([]);
  const [answers, setAnswers] = useState([]);

  const [result, setResult] = useState([]);
  const [questionId, setQuestionId] = useState();
  const [currentAnswer, setCurrentAnswer] = useState();
  const answersRef = useRef(null);
  const [answerIsCorrect, setAnswerIsCorrect] = useState();
  const [displayMessage, setDisplayMessage] = useState(false);
  const [submitEnabled, setSubmitEnabled] = useState(false);
  const [forbidAnswerClick, setForbidAnswerClick] = useState(false);
  const [title, setTitle] = useState("");

  const refresh = () => {
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
        setTitle(value.initialSets[0]);
        const firstSet = new Set(value.initialSets[1]);
        const secondSet = new Set(value.initialSets[2]);
        const res = Array.from(new Set([...firstSet, ...secondSet])).sort(
          (a, b) => a - b
        );
        setResult(res);
        console.log(res);
        console.log(value.results);
      });
  };

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
        className="AnswersGroup"
        value={answer.toString()}
        type="radio"
        onClick={onRadioClickHandler}
        variant="outline-dark"
        name="groupOptions"
        key={answer.toString()}
        id={answer.toString()}
        disabled={forbidAnswerClick}
        block
      >
        {String.fromCharCode(ind + 97) + ". " +
                          "{" + answer.toString()+"}"}
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
          if (currentAnswer=== element.id) element.style.border = "solid";
          if (correctAnswer !== element.id) element.style.color = "red";
          else element.style.color = "green";
        });
      });
  };

  return (
    <Container fluid style={{ height: 100 + "%", maxHeight: 100 + "%" }}>
      <Form>
        <Row>
          <Col md={{ span: 4, offset: 4 }}>
            <Card className="QuestionBody">
            <Card.Body className="QuestionMain">
                <Card.Title>
                <h3>Practice question</h3>
                
              
                {title}
                </Card.Title>
                <Card.Text>
                {source.map((initValue, ind) => {
                  if (ind > 0)
                    return (
                      <p>
                        {String.fromCharCode(ind + 64) +
                          " = " +
                          "{" +
                          initValue.toString()+"}"}
                      </p>
                    );
                  return <p></p>;
                })}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row className="justify-content-md-center">
          <Col md="auto">
          <h4>Choose your answer:</h4>
            <ToggleButtonGroup
              ref={answersRef}
              size="lg"
              name="answers"
              vertical="true"
            >
              
              {answers ? handleAnswers : null}
            </ToggleButtonGroup>
          </Col>
        </Row>

        <Row className="justify-content-md-center">
          <Col md="auto">
            <Row>
              <Col md="auto">
                <Button
                  variant="primary"
                  onClick={sendResults}
                  disabled={!submitEnabled}
                >
                  Submit answer
                </Button>
              </Col>
              <Col md="auto">
                <Button variant="primary" onClick={refresh}
                
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
      </Form>
    </Container>
  );
};

export default Areas;
