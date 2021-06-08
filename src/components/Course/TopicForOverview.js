import React, { useEffect } from "react";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useAuth } from "../../context/auth";


import {
  LIST_FONT_COLOR,
  LIST_BACKGROUND_COLOR,
} from "../../constants/constants";



const TopicForOverview = (props) => {
  const { authLevel } = useAuth();
  useEffect(() => {
    if (props.preselectedTopic) {
      props.setInitialTopic(props.preselectedTopic);
    } else if (props.firstTopic) {
      props.setInitialTopic(props.topic.id);
    }
  }, []);

  const buildTable = (props) => {
  
  
    if (!props.topic)
    return (
      <Row>
        <Col sm={{ offset: 1 }}>
          <div style={{fontStyle:"italic", color: "red"}}>
            <b>Topic {authLevel&&parseInt(authLevel)<3?'"'+props.topicID+'"':null} was deleted</b>
            <p>{authLevel&&parseInt(authLevel)<3?"Please restore the topic with this id":null}</p>
          </div>
        </Col>
      </Row>
    );  
    return (
      <Row>
        <Col sm={{ offset: 1 }}>
          <div
            className="table-of-content"
            key={props.topic.id}
            id={props.topic.id}
            onClick={(e) => props.nodeClick(props.topic.contentHtml, e)}
            style={{
              backgroundColor:
                props.firstTopic || props.preselectedTopic === props.topic.id.toString()
                  ? LIST_BACKGROUND_COLOR
                  : "initial",
              color:
                props.firstTopic || props.preselectedTopic === props.topic.id.toString()
                  ? LIST_FONT_COLOR
                  : "initial",
            }}
          >
            <b>{props.topic.name}</b>
            <p>{props.topic.teaser}</p>
          </div>
        </Col>
      </Row>
    );
  };

  return <div style={{ width: 100 + "%" }}>{buildTable(props)}</div>;
};

export default TopicForOverview;
