import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';


const topic = (props) =>(
    <ListGroup.Item action={true} id={props.id} onClick={props.selectTopic}>
        {props.name}
    </ListGroup.Item>

);

export default topic;