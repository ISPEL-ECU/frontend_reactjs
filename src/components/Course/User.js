import React from 'react';

import ListGroup from 'react-bootstrap/ListGroup';

const user = (props) =>(
    <ListGroup.Item id={props.id} value={props.id} onClick={props.onSelectedUser}>
        {props.name+' '+props.lname}
    </ListGroup.Item>

);

export default user;