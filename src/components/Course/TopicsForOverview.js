import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
const TopicsForOverview = (props) =>{
  const buildTable =  props.topics.map((topic, ind) => {
   
    return (
      <Row>
        <Col sm={{offset:1}}>
          <div className="table-of-content noselect"
            key={topic.id}
            id = {topic.id}
            onClick={(e)=>props.nodeClick(topic.contentHtml, e)}
          >
            <b>{(ind+1)+". "+topic.name}</b>
            <p>{topic.teaser}</p>
          </div>
        </Col>
      </Row>
    );
  }
  )
  
  return (
  <div style={{ width: 100+"%" }}>{(props.topics&&props.topics.length>0)?buildTable:null}</div>
  );
}

export default TopicsForOverview;
