import React from "react";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

let tabCount = 0;
const countMoves = (name) => {
  if (/^\d.\d/.test(name)) {
    tabCount++;
    console.log("tab " + tabCount);
    const newName = name.substring(2);
    console.log(newName);
    countMoves(newName);
  }
};



const buildTable = (props) => {
  tabCount = 0;
  countMoves(props.topic.name);
  console.log(tabCount);
  return (
    <Row>
      <Col sm={{offset:tabCount}}>
        <div className="table-of-content"
          key={props.topic.id}
          id={props.topic.id}
          onClick={props.nodeClick}
        >
          {props.topic.name}
        </div>
      </Col>
    </Row>
  );
};

const TopicForOverview = (props) => <div>{buildTable(props)}</div>;

export default TopicForOverview;
