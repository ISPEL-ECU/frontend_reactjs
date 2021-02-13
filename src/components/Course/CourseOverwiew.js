import React, { useState } from 'react';
import Topic from './TopicForOverview';
import axios from 'axios';
import TopicForOverview from './TopicForOverview';
import Card from '../UI/Card';


const CourseOverview = React.memo(props => {


    console.log("courseoverview");
    console.log(props.topics);

const topicsToDisplay = props.topics.map(topic => {

    console.log("topic");
    console.log(topic);
      return <TopicForOverview key={topic.id} topic={topic} nodeClick={props.nodeClick}/>;//<Topic topic={topic} />
  });

 

    const processCourses = () => {
      
        return (
          
            <table>
                <tbody>
                    {topicsToDisplay}
                </tbody>
            </table>
         
        );
    }


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
