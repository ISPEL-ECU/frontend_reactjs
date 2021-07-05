import React, { useEffect, useState } from "react";
import axios from "axios";

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

const ManageTopic = (props) => {
  const [id, setId] = useState(props.selectedTopic);
  const [topicId, setTopicId] = useState("");
  const [topicName, setTopicName] = useState("");

  const [selectedDomain, setSelectedDomain] = useState();
  const [selectedArea, setSelectedArea] = useState();

  const [validated, setValidated] = useState(false);

  const [selectedAlias, setSelectedAlias] = useState();
  const [teaser, setTeaser] = useState();
  const [htmlContent, setHtmlContent] = useState();
  const [assets, setAssets] = useState();
  const [rmd, setRmd] = useState();
  const [privateTopic, setPrivateTopic] = useState(false);
  const { authToken, authLevel } = useAuth();
  const [submitForm, setSubmitForm] = useState(false);
  const [nameValid, setNameValid] = useState(false);
  const [teaserValid, setTeaserValid] = useState(false);
  const [htmlValid, setHtmlValid] = useState(false);
  const [originFile, setOriginFile] = useState();
  const [delTask, setDelTask] = useState(false);

  useEffect(() => {
    console.log("we are in effect");
    setId(props.selectedTopic);
    axios
      .get(SERVER_ADDRESS + "get-topic", {
        params: {
          id: props.selectedTopic,
        },
        headers: {
          Authorization: "Bearer " + authToken,
        },
      })
      .then((topicData) => {
        console.log("answer received");
        console.log(topicData.data);
        setTopicName(topicData.data.name);
        setTopicId(topicData.data.topicId);
        setTeaser(topicData.data.teaser);
        setOriginFile(topicData.data.contentHtml);
      })
      .catch((err) => console.log(err));
  }, [authToken, props.selectedTopic]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    event.stopPropagation();

    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      console.log("not valid");
      event.preventDefault();
      event.stopPropagation();
    } else {
      console.log("valid");

      const data = new FormData();
      console.log("changedId" + id);

      data.append("changedId", id);
      data.append("name", topicName);
      data.append("topicId", topicId);
      data.append("teaser", teaser);
      htmlContent
        ? data.append("contentUpload", htmlContent)
        : data.append("contentUpload", originFile);
      if (assets) data.append("assetsUpload", assets);
      if (rmd) data.append("rdmUpload", rmd);
      data.append("userId", localStorage.getItem("userId"));

      await axios
        .post(SERVER_ADDRESS + "save-topic", data, {
          headers: {
            Authorization: "Bearer " + authToken,
          },
        })
        .then((response) => {
          if (response.status !== 200) {
            event.preventDefault();
            event.stopPropagation();
          }
          setSubmitForm(true);
        })
        .catch((err) => {
          alert(err);
          console.log(err);
        });
    }
  };

  const onTopicName = (event) => {
    if (event.target.value.length > 0) {
      setNameValid(true);
    } else {
      setNameValid(false);
    }
    setTopicName(event.target.value);
    // let name = event.target.value.toLowerCase().replace(/ /g, "-");
    // let currentTopicId =
    //   selectedDomain.shortName + ":" + selectedArea.shortName + ":" + name;

    // setTopicId(currentTopicId);
  };

  const privateHandler = (event) => {
    setPrivateTopic(event.target.value === "on" ? true : false);
  };


  const teaserHandler = (event) => {
    if (event.target.value.length > 0) {
      setTeaserValid(true);
    } else {
      setTeaserValid(false);
    }
    setTeaser(event.target.value);
  };

  const htmlHandler = (event) => {
    if (event.target.files[0]) {
      setHtmlValid(true);
    } else {
      setHtmlValid(false);
    }
    setHtmlContent(event.target.files[0]);
  };

  /* if delTask is false, change the display properties of our
   * two elements and change delTask to true, so that next time
   * the function is called, the elements are hidden again
   */

  const handleConfirmationBox = (topicId) => {
    if (!delTask) {
      document.querySelector(".confirm-bg").style.display = "flex";
      document.querySelector(".alert-container").style.display = "flex";
      setDelTask(true);
    } else {
      document.querySelector(".confirm-bg").style.display = "none";
      document.querySelector(".alert-container").style.display = "none";
      setDelTask(false);
    }
  };

  const handleDeleteTask = () => {
    axios
      .post(SERVER_ADDRESS + "delete-topic", null, {
        params: {
          id: props.selectedTopic,
        },
        headers: {
          Authorization: "Bearer " + authToken,
        },
      })
      .then((response) => {
        if (response.status === 200) setSubmitForm(true);
      })
      .catch((err) => {
        alert(err);
        console.log(err);
      });
  };

  const rmdHandler = (event) => {
    setRmd(event.target.files[0]);
  };

  const assetsHandler = (event) => {
    setAssets(event.target.files);
  };

  const DeleteButton = () => (
        <Form.Group as={Col} sm={1} className="float-right">
          <Button
            type="button"
            variant="primary"
            size="lg"
            className="float-right"
            onClick={handleConfirmationBox}
          >
            Delete
          </Button>
        </Form.Group>
      );
    


  return id ? (
    <div style={{ height: 100 + "%" }}>
      <div className="confirm-bg" onClick={handleConfirmationBox}></div>
      <div className="alert-container">
        <div className="confirmation-text">
          Do you really want to delete this topic?
        </div>
        <div>
          <Button
            type="button"
            variant="primary"
            size="lg"
            onClick={handleConfirmationBox}
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="primary"
            size="lg"
            onClick={handleDeleteTask}
          >
            Delete
          </Button>
        </div>
      </div>
      <div className="confirm-bg">onClick={handleConfirmationBox}</div>

      {submitForm ? <Redirect to={"/browse-topics/"+id} /> : null}
      <Container
        className="wrappedContainer"
        fluid
        style={{ height: 100 + "%" }}
      >
        <Form validated={validated} onSubmit={handleSubmit}>
          <Form.Row>
            <Form.Group as={Col} sm={4}>
              <Form.Label>Domain Name</Form.Label>
              <Form.Control
                as="input"
                id="domain"
                style={{ display: "inline" }}
                defaultValue={selectedDomain}
                readOnly={true}
              />
            </Form.Group>

            <Form.Group
              as={Col}
              sm={4}
              controlId="validationCustom01"
              className="required"
            >
              <Form.Label>Topic Name</Form.Label>
              <Form.Control
                className={nameValid ? "is-valid" : "is-invalid"}
                required
                type="text"
                key="topicNameInputKey"
                defaultValue={topicName}
                onBlur={onTopicName}
              />
            </Form.Group>

            <Form.Group as={Col} sm={4}>
              <Form.Label>Topic ID | to be auto-generated</Form.Label>
              <Form.Control value={topicId} readOnly />
            </Form.Group>
          </Form.Row>
          <Row>
            <Col sm={4}>
              <Form.Group>
                <Form.Label>Area Name</Form.Label>
                <Form.Control
                  as="select"
                  id="AreaSelect"
                  style={{ display: "inline" }}
                  readOnly={true}
                  defaultValue={selectedArea}
                />
              </Form.Group>
              <Form.Group id="formGroupCheckbox">
                <Form.Check
                  type="checkbox"
                  onChange={privateHandler}
                  label="Private topic"
                />
              </Form.Group>
            </Col>

            <Col sm={4}>
              <Form.Group>
                <Form.Label>Keyword</Form.Label>
                <Form.Control
                  as="select"
                  id="keywords"
                  style={{ display: "inline" }}
                />
              </Form.Group>
            </Col>

            <Col sm={4}>
              <Form.Group>
                <Form.Label>Alias</Form.Label>
                <Form.Control
                  as="select"
                  id="aliases"
                  style={{ display: "inline" }}
                  readOnly={true}
                ></Form.Control>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col sm={12}>
              <Form.Group className="required">
                <Form.Label>
                  Teaser paragraph
                  <OverlayTrigger
                    key="right"
                    placement="right"
                    overlay={
                      <Tooltip id="paragraphTooltip">
                        Please enter 1-2 sentences about your topic
                      </Tooltip>
                    }
                  >
                    <Button variant="secondary" className="circle-tooltip">
                      ?
                    </Button>
                  </OverlayTrigger>
                </Form.Label>
                <Form.Control
                  className={teaserValid ? "is-valid" : "is-invalid"}
                  as="textarea"
                  rows={10}
                  required
                  defaultValue={teaser}
                  onBlur={teaserHandler}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col sm={4}>
              <Form.Group>
                <Form.File
                  id="htmlContent"
                  label="HTML File"
                  onChange={htmlHandler}
                  accept=".html"
                />
              </Form.Group>
            </Col>

            <Col sm={4}>
              <Form.Group>
                <Form.File
                  id="assetsContent"
                  label="Assets File(s)"
                  multiple
                  onChange={assetsHandler}
                />
              </Form.Group>
            </Col>

            <Col sm={4}>
              <Form.Group>
                <Form.File
                  id="rmdContent"
                  label="RMD File"
                  onChange={rmdHandler}
                  accept=".rmd"
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col sm={12} className="asterix-caption">
              indicates required fields
            </Col>
          </Row>
          <Row>&nbsp;</Row>
          <Form.Row className="justify-content-md-right">
            {authLevel==='1'?<DeleteButton/>:null}
            <Form.Group as={Col} sm={10} className="float-right">
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
  ) : null;
};

export default ManageTopic;
