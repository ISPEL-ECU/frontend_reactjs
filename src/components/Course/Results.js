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
        axios.get('http://38.123.149.95:3000/react/get-selected-topics', { params: { id: ((props.selectedTopics && props.selectedTopics.length > 0) ? props.selectedTopics : ['-1']) } })
            .then(topics => {
                setTopics(topics.data);
                if (topics.data.length > 0) {
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

    const onTopicClick = (topicId) => {
        props.onSelectedTopic(topicId);
        console.log(topicId);

    }

    const topicsToDisplay = topics.map(topic => {

        return <Result par={topic.teaser} name={topic.name} key={topic.id} topicId={topic.id} contentHtml={topic.contentHtml} onClick={onTopicClick} />
    });

    const saveCourseHandler = event => {
        console.log(topics);
    }


    return (null
    );
});

export default Results;
