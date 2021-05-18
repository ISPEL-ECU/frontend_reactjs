import React from "react";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";





const buildTable = (props) => {
  return (
    <Row>
      <Col sm={{offset:1}}>
        <div className="table-of-content"
          key={props.topic.id}
          id={props.topic.id}
          onClick={props.nodeClick}
        >
          <b>{props.topic.name}</b>
          <p>{props.topic.teaser}</p>
        </div>
      </Col>
    </Row>
  );
};

const TopicForOverview = (props) => <div style={{ width: 100+"%" }}>{buildTable(props)}</div>;

export default TopicForOverview;
