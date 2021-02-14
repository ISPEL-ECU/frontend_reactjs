import React, { useState } from 'react';
import axios from 'axios';

import Domains from './Domains';
import Areas from './Areas';
import Topics from './Topics';
import Display from './Display';
import Tree from './topicTree';
import CourseOverview from './CourseOverwiew';
import TreeGraph from './Tree';

import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';


function CourseBuilder() {

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

  const changeTopicHandler = topics => {
    setSelectedTopics(selectedTopics.concat(topics));
    extractTopicsHandler(topics);
  };

  const selectTopicHandler = topicId => {
    setSelectedTopic(topicId);
  };

  const buildTree = () => {
    if (topics.length < 1) return (
      [{ title: 'empty' }]
    );
    let treeData = [];
    for (let i = 0; i < topics.length; i++) {
      treeData.push({ title: topics[i].name, id: topics[i].id, subtitle: topics[i].teaser, url: topics[i].contentHtml });
    }

    return treeData;

  }

  const treeNodeClickHandler = (nodeId) => {
    setSelectedTopic(nodeId);
  }

  const processTreeData = () => {
    let nodes = [];
    let edges = [];
    const processChildren = (currentNode, rootPosition) => {
      if (currentNode.children) {
        for (let i = 0; i < currentNode.children.length; i++) {
          const childPosition = nodes.push({ name: currentNode.children[i].title, url: "http://localhost:3000/author/topic/" + currentNode.children[i].id, id: currentNode.children[i].id, color: color_original });
          edges.push({ source: currentNode.id, target: +currentNode.children[i].id });
          if (currentNode.children[i].children) {
            processChildren(currentNode.children[i], childPosition);
          }
        }
      }
    }
    for (let i = 0; i < treeData.length; i++) {
      const currentNode = treeData[i];
      const currentPosition = nodes.push({ name: currentNode.title, url: "http://localhost:3000/author/topic/" + currentNode.id, id: currentNode.id, teaser: currentNode.subtitle, color: ((i === 0) ? color_root_node : color_original) });
      processChildren(currentNode, currentPosition);
    }
    setProcessedTopics(nodes);
    setProcessedEdges(edges);
  }

  const saveCourseHandler = event => {
    setTopicsForCourse(topics);
    processTreeData();
  }


  const HandleAreaSearch = () => {
    if (!showSearch) {
      return (
        <Areas selectedDomain={selectedDomain} onChangeArea={changeAreaHandler} />
      )
    }
    setSelectedArea('%');
    return (
      null
    );
  }


  return (
    <div className="App" >
      <Container fluid>
        <Row>
          <Col sm={2}>
            <Form>
              <Card>
                <Domains
                  onChangeDomain={changeDomainHandler}
                  showSearch={setShowSearch}
                />
                <HandleAreaSearch />
                <Topics
                  selectedArea={selectedArea}
                  showSearch = {showSearch}
                  onSelectedTopics={changeTopicHandler}
                  
                />
                <Tree key={buildTree()}
                  treeData={buildTree()}
                  treeFunction={buildTree}
                  setTreeData={setTreeData}
                  setButtonDisabled={setButtonDisabled}
                  selectedTopics={selectedTopics}
                  onTopicExtracted={setTopics}
                  onSelectedTopic={selectTopicHandler}
                />
                <Button
                  variant="primary"
                  onClick={saveCourseHandler}
                  disabled={buttonDisabled}>
                  Save
                </Button>
              </Card>
            </Form>
          </Col>
          <Col sm={5}>
            <Card>
              <CourseOverview topics={topicsForCourse} nodeClick={treeNodeClickHandler} />
              <TreeGraph nodes={processedTopics} edges={processedEdges} nodeClick={treeNodeClickHandler} />
            </Card>
          </Col>
          <Col sm={5}>
            <Display selectedTopic={selectedTopic} />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default CourseBuilder;
