import React, { useEffect, useState, useRef } from "react";

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
import Image from "react-bootstrap/Image";

import RangeSlider from "react-bootstrap-range-slider";

import "katex/dist/katex.min.css";
import Latex from "react-latex-next";

import { SERVER_ADDRESS } from "../../constants/constants";

const Questions = (props) => {
  const [source, setSource] = useState([]);
  const [answers, setAnswers] = useState([]);

  const [questionId, setQuestionId] = useState();
  const [currentAnswer, setCurrentAnswer] = useState();
  const answersRef = useRef(null);
  const clickedRef = useRef(null);

  const [answerIsCorrect, setAnswerIsCorrect] = useState();
  const [displayMessage, setDisplayMessage] = useState(false);
  const [submitEnabled, setSubmitEnabled] = useState(false);
  const [forbidAnswerClick, setForbidAnswerClick] = useState(false);
  const [questionType, setQuestionType] = useState();
  const [questionDifficulty, setQuestionDifficulty] = useState(1);

  const refresh = (difficulty) => {
    setAnswers([]);
    axios
      .get(SERVER_ADDRESS + "get-questions", {
        params: {
          quizId: props.quizId,
          difficulty: difficulty ? difficulty : questionDifficulty,
        },
      })
      .then((response) => {
        setDisplayMessage(false);
        setForbidAnswerClick(false);
        setSubmitEnabled(false);

        const value = response.data;
        setSource(value.initialSets);
        setQuestionType(value.questionFormat);
        setAnswers(value.results);
        setQuestionId(value.id);
        Array.from(answersRef.current.childNodes).forEach((element) => {
          element.childNodes[0].checked = false;
          element.childNodes[0].defaultChecked = false;
          element.attributes[2].nodeValue =
            element.attributes[2].nodeValue.replace("active", "");
        });

        // setTitle(value.title);
        // const firstSet = new Set(value.initialSets[0]);
        // const secondSet = new Set(value.initialSets[1]);
        // const res = Array.from(new Set([...firstSet, ...secondSet])).sort(
        //   (a, b) => a - b
        // );
        // setResult(res);
        // console.log(res);
      });
  };

  const handleSlider = (event) => {
    const difficulty = event.target.value;
    setQuestionDifficulty(difficulty);
    refresh(difficulty);
  };

  // useEffect(()=>{
  //   questionRef.current.style.width = answersRef.current.offsetWidth;
  // }, [answersRef]);

  useEffect(refresh, []);

  const nextQuestionHandler = () => {
    refresh();
  };

  const onRadioClickHandler = (event) => {
    if (!event.target.disabled) {
      event.target.ref = clickedRef;
      const answer = event.target.value;

      setCurrentAnswer(answer);
      setSubmitEnabled(true);
    }
  };

  const handleAnswers = answers.map((answer, ind) => {
    if (questionType === "1") {
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
          <Latex>{answer.toString().replaceAll("\\$", "$")}</Latex>
        </ToggleButton>
      );
    } else {
      return (
        <ToggleButton
          className={ind % 2 === 0 ? "AnswersGroup-even" : "AnswersGroup-odd"}
          value={answer.toString().slice(0, 256)}
          type="radio"
          variant="outline-dark"
          name="groupOptions"
          key={(answer.slice(0, 256) + ind).toString()}
          id={answer.toString().slice(0, 256)}
          disabled={forbidAnswerClick}
          border={0}
          block
          checked={false}
          onChange={onRadioClickHandler}
        >
          <Image
            src={answer}
            thumbnail
            id={answer.toString().slice(0, 256)}
            style={{ width: "150px", height: "150px" }}
          />
        </ToggleButton>
      );
    }
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

  const textQuestions = source.map((sourceString) => {
    return (
      <p>
        {/* <MathComponent
            tex={String.raw`${sourceString.toString()}`}
            display={false}
          /> */}
        <Latex>{sourceString.toString().replaceAll("\\$", "$")}</Latex>
      </p>
    );
  });

  const QuestionText = () => {
    // console.log(questionType);
    // if (questionType ==='1') {
    return textQuestions;
    // } else {
    //   return(
    //     <div>
    //     <p>{source[0]}</p>
    //     <Image src={source[1]}></Image>
    //     </div>
    //   )
    // }
  };

  const wrapperStyle = { width: 400, margin: 50 };

  return (
    <Container
      fluid
      style={{ height: 100 + "%", maxHeight: 100 + "%", overflowY: "auto" }}
    >
      <Row>
        <Col md="10">
          <Col lg="auto">
            {/* <Card className="card-question" ref={questionRef}>
        <Card.Body>
          <Card.Title> */}
            <h3 className="question-title">Practice question</h3>
            {/* </Card.Title> */}
            <Row className="justify-content-md-center">
              <Col lg="auto" className="question-body">
                <Card className="card-question-text">
                  <QuestionText />
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
                      variant={submitEnabled ? "primary" : "secondary"}
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
                      onClick={nextQuestionHandler}
                    >
                      Next Question
                    </Button>
                  </Col>
                </Row>
              </Col>
            </Row>

            <Row
              className="justify-content-md-center"
              
            >
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
          </Col>
        </Col>
        <Col md="2">
          
          <h3 className="question-title">Select difficulty level</h3>
          
              <RangeSlider
                value={questionDifficulty}
                onChange={(changeEvent) => handleSlider(changeEvent)}
                min={1}
                max={4}
                step={1}
                tooltip="on"
              />
          
        </Col>
      </Row>
    </Container>
  );
};

export default Questions;
