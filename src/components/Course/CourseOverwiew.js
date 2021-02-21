import React from 'react';
import TopicForOverview from './TopicForOverview';

import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';

const CourseOverview = React.memo(props => {


    console.log("courseoverview");
    console.log(props.topics);

    const topicsToDisplay = props.topics.map(topic => {

        console.log("topic");
        console.log(topic);
        return <TopicForOverview key={topic.id} topic={topic} nodeClick={props.nodeClick} />;//<Topic topic={topic} />
    });

    return (

        <Row style={{ height: 70 + "%", overflow: "auto", width: 100 + "%" }}>
            <h2>{props.courseName}</h2>
            <hr></hr>
            <table id="topicsOverview">
                <tbody>
                    {topicsToDisplay}
                </tbody>
            </table>
        </Row>

    );
});

export default CourseOverview;
