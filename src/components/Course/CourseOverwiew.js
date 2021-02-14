import React from 'react';
import TopicForOverview from './TopicForOverview';

const CourseOverview = React.memo(props => {


    console.log("courseoverview");
    console.log(props.topics);

    const topicsToDisplay = props.topics.map(topic => {

        console.log("topic");
        console.log(topic);
        return <TopicForOverview key={topic.id} topic={topic} nodeClick={props.nodeClick} />;//<Topic topic={topic} />
    });

    return (
        <div>
            <table>
                <tbody>
                    {topicsToDisplay}
                </tbody>
            </table>
        </div>
    );
});

export default CourseOverview;
