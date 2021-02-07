import React from 'react';

const result = (props) => (
    <div onClick={()=>props.onClick(props.topicId)}>
         <hr />
        <p><strong>{props.name}</strong></p>
        <p>{props.par}</p>
        <hr />
    </div>

);

export default result;