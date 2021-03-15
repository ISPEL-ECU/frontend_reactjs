import React, { useCallback, useState } from "react";

import axios from "axios";

import {SERVER_ADDRESS} from "../../constants/constants";

import Menu from "../UI/Menu";
import Navbar from "../UI/Navbar";

import Domains from "./Domains";
import Areas from "./Areas";
import Topics from "./BrowsedTopics";
import Display from "./Display";


import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";


function TopicBrowser(props) {
  const [selectedDomain, setSelectedDomain] = useState("");
  const [selectedArea, setSelectedArea] = useState("");
  const [selectedTopic, setSelectedTopic] = useState('');
  const [showSearch, setShowSearch] = useState(false);

  const changeDomainHandler = (domainId) => {
    setSelectedDomain(domainId);
  };

  const changeAreaHandler = (areaId) => {
    console.log('change handler');
    setSelectedArea(areaId);
  };

  
  const changeTopicHandler = (topic) => {
    console.log("selected " + topic);
    axios
      .get(SERVER_ADDRESS+"get-content", {
        params: {
          id: topic,
        }
      })
      .then((topicContent) => {
        console.log("selected topic content");
        console.log(topicContent.data);
    setSelectedTopic(topicContent.data);})
  };

  const HandleAreaSearch = useCallback( () => {
    console.log('area search handler');
    if (!showSearch) {
      return (
        <Areas
          selectedDomain={selectedDomain}
          onChangeArea={changeAreaHandler}
          showSearch={showSearch}
        />
      );
    };
    setSelectedArea("%");
    return null;
  }, [selectedDomain, showSearch]);

  return (
    <div className="App" style={{ height: 100 + "%", maxHeight: 100 + "%" }}>
      <Container className="wrappedContainer" fluid >
        <Menu isAuth={props.isAuth} setIsAuth={props.setIsAuth} />
        <Navbar />

        <Row style={{ height: 95 + "%" }}>
          <Col sm={2} style={{ height: 95 + "%" }}>
            <Form style={{ height: 95 + "%" }}>
              <Card style={{ height: 95 + "%" }}>
                <Row>
                  <Domains
                    onChangeDomain={changeDomainHandler}
                    showSearch={setShowSearch}
                  />
                </Row>
                <Row>
                  <HandleAreaSearch />
                </Row>
                <Row style={{ height: 80 + "%" }}>
                  <Topics
                    style={{ height: 95 + "%" }}
                    selectedArea={selectedArea}
                    showSearch={showSearch}
                    onSelectedTopic={changeTopicHandler}
                    SelectSize="20"
                  />
                </Row>
              </Card>
            </Form>
          </Col>

          <Col sm={10} style={{ overflow: "auto" }}>
            <Display selectedTopic={selectedTopic} />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default TopicBrowser;
