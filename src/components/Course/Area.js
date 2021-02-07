import React from 'react';

const area = (props) =>(
    <option value={props.id}>
        {props.name}
    </option>

);

export default area;