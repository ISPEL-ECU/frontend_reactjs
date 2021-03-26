import React from 'react';
import TopicForOverview from './TopicForOverview';

const CourseOverview = React.memo(props => {


    console.log("courseoverview");
    console.log(props.topics);

    const topicsToDisplay = props.topics.map(topic => {
        if (topic.id===0) return null;
        
        return <TopicForOverview key={topic.id} topic={topic} nodeClick={()=>props.nodeClick(topic.id)} />;//<Topic topic={topic} />
    });

    return (

            <div>
            <h2 style={{textDecoration:'underline'}}>{props.courseName}</h2>
            <hr/>
            
                    {topicsToDisplay}
               
            </div>

    );
});

export default CourseOverview;
