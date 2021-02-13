import React, { useEffect, useState } from 'react';
import axios from 'axios';

//bootstrap components
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import Topic from './Topic'




const Topics = React.memo(props => {
  const [topics, setTopics] = useState([]);
  const [selectedTopics, setSelectedTopics] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:3000/react/get-topics', { params: { areaId: (props.selectedArea && props.selectedArea !== '') ? props.selectedArea : "-1" } })
      .then(topics => {
        setTopics(topics.data);
      });
  }, [props.selectedArea]);


  const topicsToDisplay = topics.map(topic => {
    return <Topic id={topic.id} name={topic.name} key={topic.id} />
  });

  const selectTopics = event => {
    props.onSelectedTopics(selectedTopics);
    event.preventDefault();
  };

  const onChangeHandler = event => {
    setSelectedTopics(Array.from(event.target.selectedOptions, option => option.value));
  }
  return (
    <Form onChange={onChangeHandler} >
      <Form.Control as="select" size='5' multiple>
        {topicsToDisplay}
      </Form.Control>
      < Button variant="primary" onClick={selectTopics} >
        Submit
      </ Button>
    </Form>
  );
});

export default Topics;
