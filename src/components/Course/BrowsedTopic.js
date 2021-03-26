import React from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import ListGroup from 'react-bootstrap/ListGroup';


const topic = (props) =>(
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
    </ListGroup.Item>
    </OverlayTrigger>

);

export default topic;