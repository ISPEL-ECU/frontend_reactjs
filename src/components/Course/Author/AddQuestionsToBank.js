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
import QuestionBank from "../QuestionBank";



import { useAuth } from "../../../context/auth";
import { Redirect } from "react-router";

import { SERVER_ADDRESS } from "../../../constants/constants";
import AddQuestionToBank from "./AddQuestionToBank";

const AddQuestionsToBank = (props) => {
    const [currentQuestionBank, setCurrentQuestionBank] = useState();
    const [QuestionBanks, setQuestionBanks] = useState([]);
    const [Questions, setQuestions] = useState([]);
    const [selectedQuestions, setSelectedQuestions] = useState([]);
    const { authToken } = useAuth();
    const [submitForm, setSubmitForm] = useState(false);
    const [validated, setValidated] = useState(false);
    const [isOverlayActive, setOverlayActive] = useState(false);
    const [displayErrorAlert, setDisplayErrorAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [submitDisabled, setSubmitDisabled] = useState(true);

 
useEffect(() => {
    axios
      .get(SERVER_ADDRESS + "get-questionbanks", {
        headers: {
          Authorization: "Bearer " + authToken,
        },
      })
      .then((dmns) => {
        setCurrentQuestionBank(dmns.data[0].id.toString());
        setQuestionBanks(dmns.data);
        console.log(dmns.data);
      })
    axios
      .get(SERVER_ADDRESS + "get-questionslist", {
        headers: {
          Authorization: "Bearer " + authToken,
        },
      })
      .then((dmns) => {
        setQuestions(dmns.data);
        console.log(dmns.data);
      })
},[])
const onChangeHandler = event => {
  right
    setQuestions(Array.from(event.target.selectedOptions, option => option.value));

  }
const onSelectedQuestions = event => {
  
    if (event.target.selectedOptions){
      
      setSubmitDisabled(false);
    } else{
      
      setSubmitDisabled(true);
    }

    setSelectedQuestions(Array.from(event.target.selectedOptions, option => option.value));
    
}
const onQuestionBankSelect = event => {
    const currentQuestionBank = QuestionBanks.find(

        (q) => q.id.toString() === event.target.value
    
    );
}
const questionBanksToDisplay = QuestionBanks.map((qb) => {
    return <QuestionBank id={qb.id} name={qb.name}/>

        
})
const questionsToDisplay = Questions.map((q) => {
    return (<option value={q.id}>

        {q.question_name}

    </option>)
}
)

const SubmitButton = (props) =>{

  if (submitDisabled){
    return (
      <Button
      type="submit"
      variant="primary"
      size="lg"
      className="float-right"
      disabled
     
    >
      Submit
    </Button>
    )
  }
  return (
    <Button
    type="submit"
    variant="primary"
    size="lg"
    className="float-right"
    onClick = {onSubmitHandler}
     >
    Submit
  </Button>
  )
}

const onSubmitHandler = () =>{
  
    const data = new FormData();
    console.log("submiting");
    data.append("questionBank", currentQuestionBank);
    data.append("questions", selectedQuestions);
    data.append("userId", localStorage.getItem("userId"));

    axios
      .post(SERVER_ADDRESS + "save-qbq", data, {
        headers: {
          Authorization: "Bearer " + authToken,
        },
      })
      .then((response) => {
        if (response.status !== 200) {
          console.log(response.status);
        }
     
      })
      .catch((err) => {
        
     
        console.log(err);
      });
  


}


return (
    <div style={{ height: 100 + "%" }}>
            <Container
              className="wrappedContainer"
              fluid
              style={{ height: 100 + "%" }}
            >

            <Navbar />
            <Form validated={validated} onSubmit = {onSubmitHandler} ></Form>
            <Form.Row>
            <Form.Group as={Col} sm={4}>
                  <Form.Label>Question Banks</Form.Label>
                  <Form.Control
                  as="select"
                  id="questionBankSelect"
                  style={{ display: "inline" }}
                  onChange={onQuestionBankSelect}
                >
                  {questionBanksToDisplay}
                </Form.Control>
            </Form.Group>  
            
            <Form.Group as={Col} sm={8}>
                <Form.Label>Questions</Form.Label>
                <Form.Control onChange={onSelectedQuestions} as="select" htmlSize={28}   multiple>
                {questionsToDisplay}
                </Form.Control>
            </Form.Group>
            </Form.Row>

            <Form.Row className="justify-content-md-right">
                  <Form.Group as={Col} sm={10} className="float-right">
                    <SubmitButton dis = {submitDisabled} ></SubmitButton>
                  </Form.Group>
            </Form.Row>
            </Container>
    </div>
)
}
export default AddQuestionsToBank
