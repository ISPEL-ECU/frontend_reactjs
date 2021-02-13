import React, { Component, useState, useEffect } from 'react';
import axios from 'axios';

import SortableTree from 'react-sortable-tree';
import 'react-sortable-tree/style.css'; // This only needs to be imported once in your app
import FormGroup from 'react-bootstrap/FormGroup';

const Tree = React.memo(props => {

  const [treeData, setTreeData] = useState(props.treeData);
  const [topics, setTopics] = useState([]);
  
  // treeFunction: props.treeFunction,
  // selectedTopics: props.selectedTopics

  const handleTreeOnChange = tData => {
    setTreeData( tData.concat([]) );
    props.setTreeData(tData);
    if (treeData.lenght < 1) {
      props.setButtonDisabled(true);
    } else {
      if (treeData.length === 1 && treeData[0].title === "empty") {
        props.setButtonDisabled(true);
      } else {
        props.setButtonDisabled(false);
      }
    }
  };

  useEffect(() => {
    console.log('output');
    console.log(props.selectedTopics.length);
    axios.get('http://localhost:3000/react/get-selected-topics', { params: { id: ((props.selectedTopics && props.selectedTopics.length > 0) ? props.selectedTopics : ['-1']) } })
        .then(topics => {
            setTopics(topics.data);
            if (topics.data.length > 0) {
              props.setButtonDisabled(false);
            } else {
              props.setButtonDisabled(true);
            }
            props.onTopicExtracted(topics.data);
        });
        if (treeData.lenght < 1) {
          props.setButtonDisabled(true);
        } else {
          if (treeData.length === 1 && treeData[0].title === "empty") {
            props.setButtonDisabled(true);
          } else {
    
            props.setButtonDisabled(false);
          }
    
        }
}, [props.selectedTopics]);



//  const lineClick = (id, treeData) => {
//     console.log(id);

//     this.props.onSelectedTopic(id);
//   }

 

 
    return (

      <FormGroup style={{ height: 400 }}>
        <SortableTree
          treeData={treeData}
          onChange={handleTreeOnChange}
          getNodeKey={({ node }) => node.id}
        // generateNodeProps={rowInfo => ({
        //   onClick: () => this.lineClick(rowInfo.node.id)
        // })}
        />

      </FormGroup>

    );
 
});

export default Tree;