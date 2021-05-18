import React from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import ListGroup from 'react-bootstrap/ListGroup';
import { useAuth } from "../../context/auth";



function Topic(props) {
  const { authLevel } = useAuth(); 
return (
  
    <OverlayTrigger
      key={'top'+props.id}
      placement='right'
      overlay={
        <Tooltip id={`tooltip-top`}>
         {props.teaser}
        </Tooltip>
      }
    >
    <ListGroup.Item action={true} id={props.id} onClick={props.selectTopic}>
        {props.name}
        <br></br> 
        {authLevel?(props.topicId):null}
    </ListGroup.Item>
    </OverlayTrigger>

);
    }
export default Topic;