import React, { useState } from 'react';

import Domains from './Domains';
import Areas from './Areas';
import Topics from './Topics';
import Results from './Results';
import Display from './Display';

import Tree from './topicTree';

function Ingredients() {

  const [selectedDomain, setSelectedDomain] = useState('');
  const [selectedArea, setSelectedArea] = useState('');
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState([]);
  const [topics, setTopics] = useState([]);

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
    if (topics.length<1) return (
      [{title:'empty'}]
    );
    let treeData = [];
    for (let i = 0; i<topics.length; i++){
      console.log('t');
      console.log(topics);
      treeData.push({title:topics[i].name, id:topics[i].id});
    }
    console.log('treeData');
    console.log(treeData);
    return treeData;
  
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
                <Topics selectedArea={selectedArea} onSelectedTopics={changeTopicHandler} />
                {/* Need to add list here! */}
              </section>

              <section>
              <Tree treeData={buildTree()} treeFunction = {buildTree} onSelectedTopic={selectTopicHandler}/>
                <Results selectedTopics={selectedTopics} onSelectedTopic={selectTopicHandler} onTopicExtracted = {setTopics} />
                {/* Need to add list here! */}
              </section>
            </td>
            <td className="second-td">

              <Display selectedTopic={selectedTopic} />
              {/* Need to add list here! */}

            </td>
          </tr>
         
        </tbody>
      </table>
    </div>
  );
}

export default Ingredients;
