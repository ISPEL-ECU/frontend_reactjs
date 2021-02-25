import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';


const course = (props) =>(
    <ListGroup.Item action={true} id={props.id} onClick={props.selectCourse}>
        {props.name}
    </ListGroup.Item>

);

export default course;