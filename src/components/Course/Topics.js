import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';

//bootstrap components
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import FormGroup from 'react-bootstrap/esm/FormGroup';

import Topic from './Topic'




const Topics = React.memo(props => {
  const [topics, setTopics] = useState([]);
  const [selectedTopics, setSelectedTopics] = useState([]);
  const searchValueRef = useRef('');
  const inputRef = useRef();
  useEffect(() => {
    
    axios.get('http://localhost:3000/react/get-topics', 
    { params:
       { areaId: (props.selectedArea && props.selectedArea !== '') ? props.selectedArea : "-1",
       } })
      .then(topics => {
        setTopics(topics.data);
      });
  }, [props.selectedArea]);

  useEffect(() =>{
    if (props.showSearch){
    inputRef.current.focus();
    }
  }, [props.showSearch,topics]);

  const searchHandler = (event) =>{
    searchValueRef.current =  event.target.value;
    axios.get('http://localhost:3000/react/get-topics-search', 
    { params:
       { name:searchValueRef.current,
       } })
      .then(tops => {
        setTopics(tops.data);
      });
  }

  const Search = (() => {

    if (props.showSearch){

    return (
      <FormGroup>
        <InputGroup size="sm" className="mb-3">
          <InputGroup.Prepend>
            <InputGroup.Text id="inputGroup-sizing-sm">Search:</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl aria-label="Small" onChange={searchHandler} value={searchValueRef.current} ref={inputRef} aria-describedby="inputGroup-sizing-sm" />
        </InputGroup>
      </FormGroup>


    );
    }
    else {
      searchValueRef.current = '';
      return null}

  })

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
    <Form  >
      <Search/>
      <Form.Control onChange={onChangeHandler} as="select" size='5' multiple>
        {topicsToDisplay}
      </Form.Control>
      < Button variant="primary" onClick={selectTopics} >
        Submit
      </ Button>
    </Form>
  );
});

export default Topics;
