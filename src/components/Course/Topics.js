import React, { useEffect, useState } from 'react';

import Card from '../UI/Card';

import Topic from './Topic'
import './IngredientForm.css';

import axios from 'axios';

const Topics = React.memo(props => {
  const [topics, setTopics] = useState([]);
  const [selectedTopics, setSelectedTopics] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:3000/react/get-topics', { params: { areaId: props.selectedArea } })
      .then(topics => {
        console.log(topics);
        setTopics(topics.data);

      });
  }, [props.selectedArea]);
  // const onTopicChange = domainId => {
  //   props.onChangeDomain(domainId);
  //   console.log('domainId='+domainId);
  //   //event.preventDefault();
  //   // ...
  // };

  const topicsToDisplay = topics.map(topic => {

    return <Topic id={topic.id} name={topic.name} key={topic.id} />
  });

  const selectTopics = event => {
    console.log('topics');
    console.log(selectedTopics);
    props.onSelectedTopics(selectedTopics);
    props.onShowPreview(true);
    event.preventDefault();
  };

  const onChangeHandler = event =>{
    console.log('topicss');
    setSelectedTopics(Array.from(event.target.selectedOptions, option => option.value));
    console.log(Array.from(event.target.selectedOptions, option => option.value));
  }

  return (
    <section className="ingredient-form">
      <Card>
        <div>
          <form  style={{display:"inline"}} onChange={onChangeHandler} onSubmit={selectTopics}>
            <select size='5' multiple>
              {topicsToDisplay}
            </select> Chose topic(s) 

            <input type="submit" value="Submit" />
          </form>
        </div>
      </Card>
    </section>
  );
});

export default Topics;
