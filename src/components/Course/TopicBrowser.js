import React, { useCallback, useState, useEffect, useRef } from "react";

import axios from "axios";

import { SERVER_ADDRESS } from "../../constants/constants";

//import Menu from "../UI/Menu";
import Navbar from "../UI/Navbar";

import { slide as Menu } from "react-burger-menu";

import Domains from "./Domains";
import Areas from "./Areas";
import Topics from "./BrowsedTopics";
import Display from "./Display";
import Burger from "./Burger_svg";
import { useAuth } from "../../context/auth";

import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";

function TopicBrowser(props) {
  const [selectedDomain, setSelectedDomain] = useState("");
  const [selectedArea, setSelectedArea] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [preselectedTopic, setPreselectedTopic] = useState();
  const [preselectedDomain, setPreselectedDomain] = useState();
  const [preselectedArea, setPreselectedArea] = useState();
  const { authLevel } = useAuth();
  const menuRef = useRef();
  const bodyRef = useRef();
  const [bodyHeight, setBodyHeight] = useState("95%");

  useEffect(() => {
    const topicId = props.match.params.topicId;
    if (topicId) {
      axios
        .get(SERVER_ADDRESS + "get-topic", {
          params: {
            id: topicId,
          },
        })
        .then((topic) => {
          // console.log("selected topic");
          // console.log(topic.data);
          setPreselectedTopic(topic.data);
          axios
            .get(SERVER_ADDRESS + "get-domainId", {
              params: {
                areaId: topic.data.areaId,
              },
            })
            .then((domain) => {
              setPreselectedDomain(domain.data);
              setPreselectedArea(topic.data.areaId);
              //setPreselectedArea(topic.data.areaId);
              setSelectedDomain(domain.data);
              setSelectedArea(topic.data.areaId);
              setSelectedTopic(topic.data.contentHtml);
              //changeTopicHandler(topic.data.contentHtml);
              // console.log(domains);
            });
        })
        .catch((err) => console.log(err));
    }
  }, [props.match.params.topicId]);

 const resizeBody = ()=>{
  setBodyHeight(
    99 -
      Math.floor((menuRef.current.offsetHeight / window.innerHeight) * 100) +
      "%"
  );
 }

  useEffect(() => {
   resizeBody();
  }, []);

  const changeDomainHandler = (domainId) => {
    setSelectedDomain(domainId);
    setPreselectedDomain(null);
    setPreselectedArea(null);
    //setPreselectedTopic(null);
  };

  const changeAreaHandler = (areaId) => {
    console.log("change handler");
    //setPreselectedTopic(null);
    setSelectedArea(areaId);
    setPreselectedArea(null);
  };

  const changeTopicHandler = (topic) => {
    console.log("selected " + topic);
    axios
      .get(SERVER_ADDRESS + "get-content", {
        params: {
          id: topic,
        },
      })
      .then((topicContent) => {
        console.log("selected topic content");
        console.log(topicContent.data);
        setSelectedTopic(topicContent.data);
      });
  };

  const HandleAreaSearch = useCallback(() => {
    console.log("area search handler");
    if (!showSearch) {
      return (
        <Areas
          selectedDomain={
            preselectedDomain ? preselectedDomain : selectedDomain
          }
          onChangeArea={changeAreaHandler}
          showSearch={showSearch}
          preselectedArea={preselectedArea}
        />
      );
    }
    setSelectedArea("%");
    return null;
  }, [selectedDomain, showSearch]);

  return (
    <Container className="wrappedContainer" fluid>
      {/* <Menu isAuth={props.isAuth} setIsAuth={props.setIsAuth} /> */}
      {/* <Row style={{ height: 5 + "%" }}> */}
      <div ref={menuRef}>
        <Navbar onClick={resizeBody}/>
      </div>
      {/* </Row> */}
      <Row style={{ height: bodyHeight }}>
        {/* <Menu isAuth={props.isAuth} setIsAuth={props.setIsAuth} /> */}
        <Menu isOpen customBurgerIcon={<Burger />}>
          <Form ref={bodyRef} style={{ height: bodyHeight }}>
            <Card className="side-menu-card" style={{ height: 95 + "%" }}>
              <Row>
                <Domains
                  onChangeDomain={changeDomainHandler}
                  showSearch={setShowSearch}
                  preselectedDomain={preselectedDomain}
                  setSelectedDomain={setSelectedDomain}
                  preselectedTopic={preselectedTopic}
                />
              </Row>
              <Row>
                <HandleAreaSearch preselectedArea={preselectedArea} />
              </Row>
              <Row style={{ height: 80 + "%" }}>
                <Topics
                  style={{ height: 95 + "%" }}
                  selectedArea={selectedArea}
                  showSearch={showSearch}
                  onSelectedTopic={changeTopicHandler}
                  SelectSize="20"
                  preselectedTopic={preselectedTopic}
                />
              </Row>
            </Card>
          </Form>
        </Menu>

        <Col sm={10} style={{ height: 95 + "%", overflow: "auto" }}>
          <Display selectedTopic={selectedTopic} />
        </Col>
      </Row>
    </Container>
  );
}

export default TopicBrowser;
