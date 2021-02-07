import React, { useEffect, useState } from 'react';

import Card from '../UI/Card';

import Result from './Result'
import './IngredientForm.css';

import axios from 'axios';

const Results = React.memo(props => {
    const [topics, setTopics] = useState([]);
    const [buttonDisabled, setButtonDisabled] = useState(true);

    useEffect(() => {
        console.log('output');
        console.log(props.selectedTopics.length);
        axios.get('http://localhost:3000/react/get-selected-topics', { params: { id: ((props.selectedTopics.length>0)?props.selectedTopics:['-1']) } })
            .then(topics => {
                console.log('topics1');
                console.log(topics);
                setTopics(topics.data);
                console.log('length='+topics.data.length);
                if (topics.data.length>0){
                    setButtonDisabled(false);
                } else {
                    setButtonDisabled(true);
                }
                props.onTopicExtracted(topics.data);
            });
    }, [props.selectedTopics]);
    // const onTopicChange = domainId => {
    //   props.onChangeDomain(domainId);
    //   console.log('domainId='+domainId);
    //   //event.preventDefault();
    //   // ...
    // };

    const onTopicClick = (topicId) =>{
        props.onSelectedTopic(topicId);
        console.log(topicId);

    }

    const topicsToDisplay = topics.map(topic => {

        return <Result par={topic.teaser} name={topic.name} key={topic.id} topicId = {topic.id} contentHtml={topic.contentHtml} onClick={onTopicClick}/>
    });

    const saveCourseHandler = event =>{
        console.log(topics);
    }


    return (
        <section className="ingredient-form">
            <Card>
                <h3 style={{display:"inline"}}>Selected topics</h3> (Press to see preview)
               
                
                
                            {topicsToDisplay}
                            <button type="button" onClick={saveCourseHandler} disabled={buttonDisabled}>Save</button>
                           
            </Card>
        </section>
    );
});

export default Results;
