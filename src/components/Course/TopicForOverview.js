import React from 'react';

const TopicForOverview = (props) =>(
    <tr >
        <td>
            <div key={props.topic.id} onClick={()=>props.nodeClick(props.topic.id)}>
                <h3>{props.topic.name}</h3>
                <p>
                    {props.topic.teaser}
                </p>
            </div>
        </td>
    </tr>

);

export default TopicForOverview;