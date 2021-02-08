import React, { useState } from 'react';

import Domains from './Domains';
import Areas from './Areas';
import Topics from './Topics';
import Results from './Results';
import Display from './Display';

import Tree from './topicTree';
import CourseOverview from './CourseOverwiew';

function Ingredients() {

  const color_original = '#4c72ff';
  const color_root_node = '#ff0000';

  const [selectedDomain, setSelectedDomain] = useState('');
  const [selectedArea, setSelectedArea] = useState('');
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState([]);
  const [topics, setTopics] = useState([]);
  const [treeData, setTreeData] = useState([]);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [showPreview, setShowPreview] = useState(true);
  const [processedTopics, setProcessedTopics] = useState([]);

  const changeDomainHandler = domainId => {
    setSelectedDomain(domainId);
  };

  const changeAreaHandler = areaId => {

    setSelectedArea(areaId);

  };

  const changeTopicHandler = areaIds => {
    console.log('i am here', areaIds);
    setSelectedTopics(areaIds);
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
      console.log('t');
      console.log(topics);
      treeData.push({ title: topics[i].name, id: topics[i].id, subtitle: topics[i].teaser, url: topics[i].contentHtml });
    }
    console.log('treeData');
    console.log(treeData);
    return treeData;

  }

  const processTreeData = () => {
    let nodes = [];
    let edges = [];
    const processChildren = (currentNode, rootPosition) =>{
      if (currentNode.children){
          for (let i=0; i<currentNode.children.length; i++){
            const childPosition = nodes.push({name : currentNode.children[i].title, url : "http://localhost:3000/author/topic/"+currentNode.children[i].id, color: color_original });
            edges.push({source: rootPosition-1, target: childPosition-1});
            if (currentNode.children[i].children){
              processChildren(currentNode.children[i], childPosition);
            }
          }
      }
    }
    for (let i=0; i<treeData.length; i++){
      const currentNode = treeData[i];
      const currentPosition = nodes.push({name : currentNode.title, url : "http://localhost:3000/author/topic/"+currentNode.id, teaser:currentNode.subtitle, color: ((i===0)?color_root_node:color_original) });
      processChildren(currentNode, currentPosition);
    }
    console.log("nodes and edges");
    setProcessedTopics(nodes);
    console.log(nodes);
    console.log(edges);
  }

  const saveCourseHandler = event => {
    console.log('button clicked');
    console.log(treeData);
    setShowPreview(false);
    processTreeData();
  }

  const PreviewArea = props => {
    if (props.ShowPreview) {
      return (<Display selectedTopic={selectedTopic} />)
    }
    else {
      console.log('processed topics');
      console.log(processedTopics);
      return (<CourseOverview topics={processedTopics}/>);
    }
  }


  return (
    <div className="App" >
      <table >
        <tbody >
          <tr >
            <td className="first-td">
              <Domains onChangeDomain={changeDomainHandler} />

              <section>
                <Areas selectedDomain={selectedDomain} onChangeArea={changeAreaHandler} />
                {/* Need to add list here! */}
              </section>

              <section>
                <Topics selectedArea={selectedArea} onSelectedTopics={changeTopicHandler} onShowPreview = {setShowPreview} />
                {/* Need to add list here! */}
              </section>

              <section>
                <Tree key={buildTree()}
                  treeData={buildTree()}
                  treeFunction={buildTree}
                  setTreeData={setTreeData}
                  setButtonDisabled={setButtonDisabled}
                  setShowPreview={setShowPreview}
                  selectedTopics={selectedTopics}
                  onTopicExtracted={setTopics}
                  onSelectedTopic={selectTopicHandler} />
                <Results selectedTopics={selectedTopics} onSelectedTopic={selectTopicHandler} onTopicExtracted={setTopics} visibility="hidden" />

              </section>
            </td>
            <td className="second-td">
              
                <PreviewArea ShowPreview={showPreview} />
              

            </td>
          </tr>
          <tr>
            <td colSpan="2">
              <button type="button" onClick={saveCourseHandler} disabled={buttonDisabled}>Save</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Ingredients;
