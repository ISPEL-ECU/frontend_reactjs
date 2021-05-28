import React, { useEffect } from "react";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import {
  LIST_FONT_COLOR,
  LIST_BACKGROUND_COLOR,
} from "../../constants/constants";


const buildTable = (props) => {
  return (
    <Row>
      <Col sm={{ offset: 1 }}>
        <div
          className="table-of-content"
          key={props.topic.id}
          id={props.topic.id}
          onClick={(e) => props.nodeClick(props.topic.contentHtml, e)}
          style={{
            backgroundColor: props.firstTopic
              ? LIST_BACKGROUND_COLOR
              : "initial",
            color: props.firstTopic ? LIST_FONT_COLOR : "initial",
          }}
        >
          <b>{props.topic.name}</b>
          <p>{props.topic.teaser}</p>
        </div>
      </Col>
    </Row>
  );
};

const TopicForOverview = (props) => {
  useEffect(()=>{
    if (props.setInitialTopic){
      props.setInitialTopic(props.topic.id);
    }
    
  
  }, [])
return (  
  <div style={{ width: 100 + "%" }}>{buildTable(props)}</div>);
}

export default TopicForOverview;
