import React from 'react';

const domain = (props) =>(
    <option value={props.id}>
        {props.name}
    </option>

);

export default domain;