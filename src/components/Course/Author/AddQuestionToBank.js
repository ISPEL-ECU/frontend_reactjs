import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";

import Domain from "../Domain";
import Area from "../Area";
import Menu from "../../UI/Menu";
import Navbar from "../../UI/Navbar";
import ErrorAlert from "../../UI/ErrorAlert";

import LoadingOverlay from "react-loading-overlay";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Tooltip from "react-bootstrap/Tooltip";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";



import { useAuth } from "../../../context/auth";
import { Redirect } from "react-router";

import { SERVER_ADDRESS } from "../../../constants/constants";

const AddQuestionToBank = (props) => {
    const [QuestionText, setQuestionText] = useState("");
    const [correct, setCorrect] = useState("");
    const [distractor1, setDistractor1] = useState("");
    const [distractor2, setDistractor2] = useState("");
    const [distractor3, setDistractor3] = useState("");
    const [questionName, setQuestionName] = useState("");
    const { authToken } = useAuth();
    const [submitForm, setSubmitForm] = useState(false);
    const [validated, setValidated] = useState(false);
    const [isOverlayActive, setOverlayActive] = useState(false);
    const [displayErrorAlert, setDisplayErrorAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [teaser, setTeaser] = useState();
    const [teaserValid, setTeaserValid] = useState(false);
    const [fields, setFields] = useState([{
      id:1,
      questionText: "",
      correctAnswer: "",
      distractor1: "",
      distractor2: "",
      distractor3: "", 
    }])

    const handleSubmit = async (event) => {
        event.preventDefault();
        event.stopPropagation();
    
        const form = event.currentTarget;
    
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        } else {
          setOverlayActive(true);
          const data = new FormData();
    
          data.append("QuestionText", QuestionText);
          data.append("QuestionName", questionName);
          data.append("correct", correct);
          data.append("distractor1", distractor1);
          data.append("distractor2", distractor2);
          data.append("distractor3", distractor3);
          data.append("userId", localStorage.getItem("userId"));
    
          await axios
            .post(SERVER_ADDRESS + "save-bankquestions", data, {
              headers: {
                Authorization: "Bearer " + authToken,
              },
            })
            .then((response) => {
              if (response.status !== 200) {
                event.preventDefault();
                event.stopPropagation();
              }
              setOverlayActive(false);
              setSubmitForm(true);
            })
            .catch((err) => {
              setOverlayActive(false);
              if (err.response.status === 500) {
                setDisplayErrorAlert(true);
                setAlertMessage("The questionbank with BankName already exist!");
              } else alert(err);
              console.log(err);
            });
        }

      };

      const handleAdd = (id) => {
        setFields([...fields, {id:id + 2, qestionName: "", questionText: "", correctAnswer: "", distractor1: "", distractor2: "", distractor3: ""}])
      }

      const handleSubtract = (i) => {
        const values = [...fields]
        values.splice(i, 1)
        setFields([...values])
      }

      const distractor1Handler = (event) => {
        if (event.target.value.length > 0) {
          setTeaserValid(true);
        } else {
          setTeaserValid(false);
        }
        setDistractor1(event.target.value);
      }

      const distractor2Handler = (event) => {
        if (event.target.value.length > 0) {
          setTeaserValid(true);
        } else {
          setTeaserValid(false);
        }
        setDistractor2(event.target.value);
      }
      
      const teaserHandler = (event) => {
        if (event.target.value.length > 0) {
          setTeaserValid(true);
        } else {
          setTeaserValid(false);
        }
        setTeaser(event.target.value);
      };

      const distractor3Handler = (event) => {
        if (event.target.value.length > 0) {
          setTeaserValid(true);
        } else {
          setTeaserValid(false);
        }
        setDistractor3(event.target.value);
      }


      const correctHandler = (event) => {
        if (event.target.value.length > 0) {
          setTeaserValid(true);
        } else {
          setTeaserValid(false);
        }
        setCorrect(event.target.value);
      }

      const questionTextHandler = (event) => {
        if (event.target.value.length > 0) {
          setTeaserValid(true);
        } else {
          setTeaserValid(false);
        }
        setQuestionText(event.target.value);
      };

      const questionNameHandler = (event) => {
        if (event.target.value.length > 0) {
          setTeaserValid(true);
        } else {
          setTeaserValid(false);
        }
        setQuestionName(event.target.value);
      };


    const handleChangeInput = (i, e) => {
      console.log(e.target.value)
      const values = [...fields]
      values[i][e.target.name] = e.target.value
      setFields(values)
    }

      return (
        <LoadingOverlay
          active={isOverlayActive}
          spinner
          text="Uploading your content..."
        >
          <div style={{ height: 100 + "%" }}>
            <Container
              className="wrappedContainer"
              fluid
              style={{ height: 100 + "%" }}
            >
              
              <Navbar />
    
              <Form validated={validated} onSubmit={handleSubmit}>
                {fields.map((field, i) => (
                  //<div key={field.id}></div>
                  <div key={field.id}>
                <Form.Row className="justify-content-md-center">
                  <ErrorAlert
                    showAlert={displayErrorAlert}
                    AlertMessage={alertMessage}
                  ></ErrorAlert>
                </Form.Row>

                <Form.Row>
                <Form.Group
                   as={Col}
                   sm={11}
                   controlId="questionNameValidation"
                   className="required"
                  >
                  <Form.Label>Question Name</Form.Label>
                  <Form.Control
                      required
                      placeholder="enter question name here..."
                      type="text"
                      key="topicNameInputKey"
                      onBlur={questionNameHandler}
                      name="questionName"
                      value={field.questionName}
                      onChange={e => handleChangeInput(i, e)}
                    />
                    
                  </Form.Group>
                </Form.Row>



                <Form.Row>
                <Form.Group
                   as={Col}
                   sm={11}
                   controlId="validationCustom01"
                   className="required"
                  >
                  <Form.Label>Question Text</Form.Label>
                  <Form.Control
                      required
                      placeholder="enter question here..."
                      type="text"
                      key="topicNameInputKey"
                      onBlur={questionTextHandler}
                      name="questionText"
                      value={field.questionText}
                      onChange={e => handleChangeInput(i, e)}
                    />
                    
                  </Form.Group>
                </Form.Row>

                <Form.Row>
                <Form.Group
                    as={Col}
                    sm={11}
                    controlId="validationCustom01"
                    className="required"
                  >
                    <Form.Label>correct answer</Form.Label>
                    <Form.Control
                      required
                      placeholder="enter correct answer..."
                      type="text"
                      key="topicNameInputKey"
                      onBlur={correctHandler}
                      name="correctAnswer"
                      value={field.correctAnswer}
                      onChange={e => handleChangeInput(i, e)}
                    />
                  </Form.Group>
                </Form.Row>
                 
                 <Form.Row>
                  <Form.Group 
                    as={Col} 
                    sm={11}
                    controlId="validationCustom01"
                    className="required">
                  <Form.Label>distractor 1</Form.Label>
                  <Form.Control
                      required
                      placeholder="enter first distractor..."
                      type="text"
                      key="topicNameInputKey"
                      onBlur={distractor1Handler}
                      name="distractor1"
                      value={field.distractor1}
                      onChange={e => handleChangeInput(i, e)}
                    />
                  </Form.Group>
                </Form.Row>
              
                <Form.Row>
                  <Form.Group 
                    as={Col} 
                    sm={11}
                    controlId="validationCustom01"
                    className="required">
                  <Form.Label>distractor 2</Form.Label>
                  <Form.Control
                      required
                      placeholder="enter second distractor..."
                      type="text"
                      key="topicNameInputKey"
                      onBlur={distractor2Handler}
                      name="distractor2"
                      value={field.distractor2}
                      onChange={e => handleChangeInput(i, e)}
                    />
                  </Form.Group>
                </Form.Row>
                <Form.Row>
                  <Form.Group 
                    as={Col} 
                    sm={11}
                    controlId="validationCustom01"
                    className="required">
                  <Form.Label>distractor 3</Form.Label>
                  <Form.Control
                      required
                      placeholder="enter third distractor..."
                      type="text"
                      key="topicNameInputKey"
                      onBlur={distractor3Handler}
                      name="distractor3"
                      value={field.distractor3}
                      onChange={e => handleChangeInput(i, e)}
                    />
                  </Form.Group>
                </Form.Row>
                <Row>&nbsp;</Row>
                </div>
                ))}


                <Form.Row className="justify-content-md-right">
                  <Form.Group as={Col} sm={3 } className="float-right">
                    <Button
                      onClick = {handleAdd}
                      size="lg"
                      className="float-right"
                    >
                      <i className = "fas fa-plus"></i>
                    </Button>
                  </Form.Group>
                  <Form.Group as={Col} sm={3} className="float-right">
                    <Button
                      onClick = {handleSubtract}
                      size="lg"
                      className="float-right"
                    >
                      <i className = "fas fa-minus"></i>
                    </Button>
                  </Form.Group>
                  <Form.Group as={Col} sm={3} className="float-right">
                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      className="float-right"
                    >
                      Submit  
                    </Button>
                  </Form.Group>

                </Form.Row>
              </Form>
            </Container>
          </div>
        </LoadingOverlay>
      );
    };
    
    export default AddQuestionToBank;
    