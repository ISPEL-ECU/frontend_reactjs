import React, { Component } from 'react';

import SortableTree from 'react-sortable-tree';
import 'react-sortable-tree/style.css'; // This only needs to be imported once in your app
import FormGroup from 'react-bootstrap/FormGroup';

export default class Tree extends Component {
  constructor(props) {

    super(props);

    this.state = {
      treeData: props.treeData,
      treeFunction: props.treeFunction
    };
  }

  handleTreeOnChange = treeData => {
    this.setState({ treeData });
    this.props.setTreeData(treeData);
    if (treeData.lenght < 1) {
      this.props.setButtonDisabled(true);
    } else {
      if (treeData.length === 1 && treeData[0].title === "empty") {
        this.props.setButtonDisabled(true);
      } else {

        this.props.setButtonDisabled(false);
      }
    }
  };

  componentDidMount() {


    this.setState({ treeData: this.props.treeData });
    this.props.setTreeData(this.props.treeData);
  
    if (this.props.treeData.lenght < 1) {
      this.props.setButtonDisabled(true);
    } else {
      if (this.props.treeData.length === 1 && this.props.treeData[0].title === "empty") {
        this.props.setButtonDisabled(true);
      } else {

        this.props.setButtonDisabled(false);
      }
     
    }

  }

  lineClick(id, treeData) {
    console.log(id);

    this.props.onSelectedTopic(id);
  }

  saveCourseHandler(event) {
    //console.log(topics);
  }


  render() {
    return (
      
        <FormGroup style={{ height: 100+"%", minHeight:50+"%" }}>
          <SortableTree
            treeData={this.state.treeData}
            onChange={this.handleTreeOnChange}
            getNodeKey={({ node }) => node.id}
            // generateNodeProps={rowInfo => ({
            //   onClick: () => this.lineClick(rowInfo.node.id)
            // })}
          />

        </FormGroup>
      
    );
  }
}