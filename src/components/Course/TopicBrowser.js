import React, { useState } from 'react';
import axios from 'axios';

import Menu from '../UI/Menu';
import Navbar from '../UI/Navbar';

import Domains from './Domains';
import Areas from './Areas';
import Topics from './BrowsedTopics';
import Display from './Display';
import Tree from './topicTree';
import CourseOverview from './CourseOverwiew';
import TreeGraph from './Tree';
import Name from './CourseName';

import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';




function TopicBrowser(props) {

  const color_original = '#4c72ff';
  const color_root_node = '#ff0000';

  const [selectedDomain, setSelectedDomain] = useState('');
  const [selectedArea, setSelectedArea] = useState('');
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState([]);
  const [topics, setTopics] = useState([]);
  const [treeData, setTreeData] = useState([]);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [processedTopics, setProcessedTopics] = useState([]);
  const [processedEdges, setProcessedEdges] = useState([]);
  const [topicsForCourse, setTopicsForCourse] = useState([]);
  const [showSearch, setShowSearch] = useState(false);
  const [courseName, setCourseName] = useState('');


  const changeDomainHandler = domainId => {
    setSelectedDomain(domainId);
  };

  const changeAreaHandler = areaId => {
    setSelectedArea(areaId);
  };

  const extractTopicsHandler = (selectedTopics) => {
    axios.get('http://localhost:3000/react/get-selected-topics',
      {
        params: {
          id: ((selectedTopics && selectedTopics.length > 0) ?
            selectedTopics :
            ['-1'])
        }
      })
      .then(topics => {
        setTopics(topics.data);
        if (topics.data.length > 0) {
          setButtonDisabled(false);
        } else {
          setButtonDisabled(true);
        }

      });
  }

  const changeTopicHandler = (topic) => {
    console.log('selected ' + topic);
    setSelectedTopic(topic);

  };




  const HandleAreaSearch = () => {
    if (!showSearch) {
      return (
        <Areas selectedDomain={selectedDomain} onChangeArea={changeAreaHandler} showSearch={showSearch} />
      )
    }
    setSelectedArea('%');
    return (
      null
    );
  }


  return (
    <div className="App" style={{ height: 100 + "%" }}>

      <Container fluid style={{ height: 100 + "%" }}>

        <Menu isAuth={props.isAuth} setIsAuth={props.setIsAuth} />
        <Navbar />

        <Row style={{ paddingLeft: 60, paddingRight: 50, height: 95 + "%" }}>

          <Col sm={2} style={{ height: 100 + "%" }}>
            <Form style={{ height: 100 + "%" }}>
              <Card style={{ height: 100 + "%" }}>
                <Row>
                  <Domains
                    onChangeDomain={changeDomainHandler}
                    showSearch={setShowSearch}
                  />
                </Row>
                <Row>
                  <HandleAreaSearch />
                </Row>
                <Row style={{ height: 100 + "%" }}>
                  <Topics style={{ height: 100 + "%" }}
                    selectedArea={selectedArea}
                    showSearch={showSearch}
                    onSelectedTopic={changeTopicHandler}
                    SelectSize='20'

                  />
                </Row>

              </Card>
            </Form>
          </Col>

          <Col sm={10} style={{ overflow: "auto" }}>
            <Display selectedTopic={selectedTopic} />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default TopicBrowser;
