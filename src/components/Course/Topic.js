import React from 'react';

const topic = (props) =>(
    <option value={props.id}>
        {props.name}
    </option>

);

export default topic;