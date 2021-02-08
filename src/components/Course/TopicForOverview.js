import React from 'react';

const TopicForOverview = (props) =>(
    <tr >
        <td>
            <div key={props.topic.id}>
                <a href={props.topic.url}><h3>{props.topic.name}</h3></a>
                <p>
                    {props.topic.teaser}
                </p>
            </div>
        </td>
    </tr>

);

export default TopicForOverview;