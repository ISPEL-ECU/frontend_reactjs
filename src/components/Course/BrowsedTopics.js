import React, { useEffect, useState, useRef } from "react";
import axios from "axios";

//bootstrap components
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import FormGroup from "react-bootstrap/esm/FormGroup";
import ListGroup from "react-bootstrap/ListGroup";

import { SERVER_ADDRESS } from "../../constants/constants";

import Topic from "./BrowsedTopic";
import { useAuth } from "../../context/auth";

import {
  LIST_FONT_COLOR,
  LIST_BACKGROUND_COLOR,
} from "../../constants/constants";

const BrowsedTopics = React.memo((props) => {
  const [topics, setTopics] = useState([]);
  const [prevTopic, setPrevTopic] = useState();
  const searchValueRef = useRef("");
  const inputRef = useRef();
  const { authToken } = useAuth();
  useEffect(() => {
    console.log("useEffect topics");
    axios
      .get(SERVER_ADDRESS + "get-topics", {
        params: {
          areaId:
            props.selectedArea && props.selectedArea !== ""
              ? props.selectedArea
              : "-1",
        },
        headers: {
          Authorization: "Bearer " + authToken,
        },
      })
      .then((topics) => {
        console.log("topics");
        if (topics.data.length > 0) {
          props.onSelectedTopic(topics.data[0].id);
        }
        console.log(topics.data);
        setTopics(topics.data);
      });
  }, [props.selectedArea, props.showSearch, authToken]);

  useEffect(() => {
    if (props.showSearch) {
      inputRef.current.focus();
    }
  }, [props.showSearch, topics]);

  const searchHandler = (event) => {
    searchValueRef.current = event.target.value;
    axios
      .get(SERVER_ADDRESS + "get-topics-search", {
        params: { name: searchValueRef.current },
      })
      .then((tops) => {
        props.onSelectedTopic(tops.data[0]);
        setTopics(tops.data);
      });
  };

  const Search = () => {
    if (props.showSearch) {
      return (
        <FormGroup>
          <InputGroup size="sm" className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text id="inputGroup-sizing-sm">
                Search:
              </InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              aria-label="Small"
              onChange={searchHandler}
              value={searchValueRef.current}
              ref={inputRef}
              aria-describedby="inputGroup-sizing-sm"
            />
          </InputGroup>
        </FormGroup>
      );
    } else {
      searchValueRef.current = "";
      return null;
    }
  };

  const selectTopics = (event) => {
    props.onSelectedTopic(event.target.id);
    if (prevTopic) {
      prevTopic.style.backgroundColor = "initial";
      prevTopic.style.color = "initial";
    }
    event.target.style.backgroundColor = LIST_BACKGROUND_COLOR;
    event.target.style.color = LIST_FONT_COLOR;
    setPrevTopic(event.target);
    event.preventDefault();
  };

  const topicsToDisplay = topics.map((topic) => {
    return (
      <Topic
        id={topic.id}
        name={topic.name}
        key={topic.id + topic.name}
        teaser={topic.teaser}
        topicId={topic.topicId}
        selectTopic={selectTopics}
      />
    );
  });

  return (
    <Form style={{ height: 100 + "%", width: 100 + "%" }}>
      <Search />
      <ListGroup
        style={{ overflow: "auto", maxHeight: 100 + "%", height: 100 + "%" }}
      >
        {topicsToDisplay}
      </ListGroup>
    </Form>
  );
});

export default BrowsedTopics;
