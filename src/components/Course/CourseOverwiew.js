import React, { useState } from 'react';
import Topic from './TopicForOverview';
import axios from 'axios';
import TopicForOverview from './TopicForOverview';
import Card from '../UI/Card';


const CourseOverview = React.memo(props => {



const topicsToDisplay = props.topics.map(topic => {

      return <TopicForOverview key={topic.id} topic={topic}/>;//<Topic topic={topic} />
  });

 

    const processCourses = () => {
      
        return (
            <section className="ingredient-form">
      <Card>
            <table>
                <tbody>
                    {topicsToDisplay}
                </tbody>
            </table>
            </Card>
            </section>
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
