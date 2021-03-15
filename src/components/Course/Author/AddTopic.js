import React, { useEffect, useState } from "react";
import axios from "axios";

import Domain from "../Domain";
import Area from "../Area";
import Menu from "../../UI/Menu";
import Navbar from "../../UI/Navbar";

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

const AddTopic = (props) => {
  const [topicId, setTopicId] = useState("");
  const [topicName, setTopicName] = useState("");
  const [domains, setDomains] = useState([]);
  const [selectedDomain, setSelectedDomain] = useState();
  const [selectedArea, setSelectedArea] = useState();
  const [areas, setAreas] = useState([]);
  const [validated, setValidated] = useState(false);
  const [keywords, setKeywords] = useState([]);
  const [selectedKeyword, setSelectedkeyword] = useState();
  const [aliases, setAliases] = useState([]);
  const [selectedAlias, setSelectedAlias] = useState();
  const [teaser, setTeaser] = useState();
  const [htmlContent, setHtmlContent] = useState();
  const [assets, setAssets] = useState();
  const [rmd, setRmd] = useState();
  const [privateTopic, setPrivateTopic] = useState(false);
  const { authToken } = useAuth();
  const [submitForm, setSubmitForm] = useState(false);
  const [nameValid, setNameValid] = useState(false);
  const [teaserValid, setTeaserValid] = useState(false);
  const [htmlValid, setHtmlValid] = useState(false);

  const setAreasForDomain = (domainId) => {
    if (!domainId) return [];
    axios
      .get(SERVER_ADDRESS + "get-areas", {
        params: { domainId: domainId },
        headers: {
          Authorization: "Bearer " + authToken,
        },
      })
      .then((areas) => {
        setAreas(areas.data);
        setSelectedArea(areas.data[0]);
        const currentDomain = domains.find((d) => d.id.toString() === domainId);
        const name = topicName.toLowerCase().replace(/ /g, "-");
        setTopicId(
          currentDomain.shortName + ":" + areas.data[0].shortName + ":" + name
        );
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    console.log("effect");
    let initialTopicId = "";
    axios
      .get(SERVER_ADDRESS + "get-domains", {
        headers: {
          Authorization: "Bearer " + authToken,
        },
      })
      .then((dmns) => {
        setDomains(dmns.data);
        console.log(dmns.data[0].id);
        setSelectedDomain(dmns.data[0]);
        initialTopicId = dmns.data[0].shortName;
        return dmns.data[0].id;
      })
      .then((id) => {
        axios
          .get(SERVER_ADDRESS + "get-areas", {
            params: { domainId: id },
            headers: {
              Authorization: "Bearer " + authToken,
            },
          })
          .then((areas) => {
            console.log(areas.data);
            setAreas(areas.data);
            initialTopicId += ":" + areas.data[0].shortName;
            setSelectedArea(areas.data[0]);
            setTopicId(initialTopicId);
          });
      });
    axios
      .get(SERVER_ADDRESS + "get-keywords", {
        headers: {
          Authorization: "Bearer " + authToken,
        },
      })
      .then((keywords) => {
        setKeywords(keywords.data);
        setSelectedkeyword(keywords.data[0].id);
      });
    axios
      .get(SERVER_ADDRESS + "get-aliases", {
        headers: {
          Authorization: "Bearer " + authToken,
        },
      })
      .then((aliases) => {
        setAliases(aliases.data);
        setSelectedAlias(aliases.data[0].id);
      });
  }, []);

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
      console.log("area");
      console.log(selectedArea.id);
      data.append("domain", selectedDomain);
      data.append("area", selectedArea.id);
      data.append("name", topicName);
      data.append("topicId", topicId);
      data.append("keyword", selectedKeyword);
      data.append("alias", selectedAlias);
      data.append("private", privateTopic);
      data.append("teaser", teaser);
      data.append("contentUpload", htmlContent);
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

  const domainsToDisplay = domains.map((domain) => {
    return <Domain id={domain.id} name={domain.name} key={domain.id} />;
  });

  const areasToDisplay = areas.map((area) => {
    return <Area id={area.id} name={area.name} key={area.id + area.name} />;
  });

  const keywordsToDisplay = keywords.map((keyword) => {
    return (
      <option value={keyword.id} key={keyword.id + keyword.value}>
        {keyword.value}
      </option>
    );
  });

  const onKeywordChange = (event) => {
    setSelectedkeyword(event.target.value);
  };

  const aliasesToDisplay = aliases.map((alias) => {
    return (
      <option value={alias.id} key={alias.id + alias.value}>
        {alias.value}
      </option>
    );
  });

  const onDomainChange = (event) => {
    setAreasForDomain(event.target.value);
    const currentDomain = domains.find(
      (d) => d.id.toString() === event.target.value
    );

    setSelectedDomain(currentDomain);
    const name = topicName.toLowerCase().replace(/ /g, "-");
    setTopicId(
      currentDomain.shortName + ":" + selectedArea.shortName + ":" + name
    );
  };

  const onTopicName = (event) => {
    if (event.target.value.length > 0) {
      setNameValid(true);
    } else {
      setNameValid(false);
    }
    setTopicName(event.target.value);
    let name = event.target.value.toLowerCase().replace(/ /g, "-");
    let currentTopicId =
      selectedDomain.shortName + ":" + selectedArea.shortName + ":" + name;

    setTopicId(currentTopicId);
  };

  const onAreaChange = (event) => {
    const currentArea = areas.find(
      (a) => a.id.toString() === event.target.value
    );
    setSelectedArea(currentArea);
    const name = topicName.toLowerCase().replace(/ /g, "-");
    setTopicId(
      selectedDomain.shortName + ":" + currentArea.shortName + ":" + name
    );
  };

  const privateHandler = (event) => {
    setPrivateTopic(event.target.value === "on" ? true : false);
  };

  const onAliasChange = (event) => {
    setSelectedAlias(event.target.value);
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

  const rmdHandler = (event) => {
    setRmd(event.target.files[0]);
  };

  const assetsHandler = (event) => {
    setAssets(event.target.files);
  };

  return (
    <div style={{ height: 100 + "%" }}>
      {submitForm ? <Redirect to="/browse-topics" /> : null}
      <Container className="wrappedContainer" fluid style={{ height: 100 + "%" }}>
        <Menu isAuth={props.isAuth} setIsAuth={props.setIsAuth} />
        <Navbar />

        <Form  validated={validated} onSubmit={handleSubmit}>
          <Form.Row>
            <Form.Group as={Col} sm={4}>
              <Form.Label>Domain Name</Form.Label>
              <Form.Control
                as="select"
                id="domainSelect"
                style={{ display: "inline" }}
                onChange={onDomainChange}
              >
                {domainsToDisplay}
              </Form.Control>
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
                  onChange={onAreaChange}
                >
                  {areasToDisplay}
                </Form.Control>
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
                <Form.Label>Keywords</Form.Label>
                <Form.Control
                  as="select"
                  id="keywords"
                  style={{ display: "inline" }}
                  onChange={onKeywordChange}
                >
                  {keywordsToDisplay}
                </Form.Control>
              </Form.Group>
            </Col>

            <Col sm={4}>
              <Form.Group>
                <Form.Label>Aliases</Form.Label>
                <Form.Control
                  as="select"
                  id="aliases"
                  style={{ display: "inline" }}
                  onChange={(event) => onAliasChange(event.target.value)}
                >
                  {aliasesToDisplay}
                </Form.Control>
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
                  onBlur={teaserHandler}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col sm={4}>
              <Form.Group>
                <Form.File
                  className={htmlValid ? "is-valid" : "is-invalid"}
                  required
                  id="htmlContent"
                  label="HTML File"
                  onChange={htmlHandler}
                  accept=".html"
                  className="required"
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
  );
};

export default AddTopic;
