import React, { Component } from 'react';
import SortableTree from 'react-sortable-tree';
import 'react-sortable-tree/style.css'; // This only needs to be imported once in your app


export default class Tree extends Component {
  constructor(props) {
    console.log('tree');
    console.log(props.treeData);
    super(props);
    
    this.state = {
      treeData: props.treeData,
      treeFunction: props.treeFunction
    };
  }

  componentDidUpdate (prevProps) {
      console.log("did update");
      if (this.props.treeData!==prevProps.treeData){
        this.setState({treeData: this.props.treeData});
      }
  }

  lineClick(id) {
      console.log(id);
      this.props.onSelectedTopic(id);
  }

 

  render() {
    return (
      <div style={{ height: 400 }}>
        <SortableTree
          treeData={this.state.treeData}
          onChange={treeData => this.setState({ treeData })
            }
            getNodeKey = {({ node }) => node.id}
            generateNodeProps = {rowInfo =>({
                onClick: () => this.lineClick(rowInfo.node.id)
            })}
        />
      </div>
    );
  }
}