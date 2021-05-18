import React from 'react';
import Tree from "react-d3-tree";


const TreeGraph = (props => {
  
  const data = props.data;


  // define links as edges, e.g. if you have 5 topics
  // then these topics index are 0, 1, 2, 3, 4

  // the graph configuration, just override the ones you need
  const myConfig = {
    automaticRearrangeAfterDropNode: false,
    collapsible: false,
    directed: false,
    focusAnimationDuration: 0.75,
    focusZoom: 10,
    freezeAllDragEvents: false,
    height: props.height,
    highlightDegree: 1,
    highlightOpacity: 1,
    linkHighlightBehavior: false,
    maxZoom: 8,
    minZoom: 0.1,
    initialZoom: 0.8,
    nodeHighlightBehavior: false,
    panAndZoom: false,
    staticGraph: false,
    staticGraphWithDragAndDrop: false,
    width: props.width,
    d3: {
      alphaTarget: 0.05,
      gravity: -300,
      linkLength: 25,
      linkStrength: 1,
      disableLinkForce: false
    },
    node: {
      color: "#d3d3d3",
      fontColor: "black",
      fontSize: 14,
      fontWeight: "normal",
      highlightColor: "SAME",
      highlightFontSize: 8,
      highlightFontWeight: "normal",
      highlightStrokeColor: "SAME",
      highlightStrokeWidth: "SAME",
      labelProperty: "name",
      mouseCursor: "pointer",
      opacity: 1,
      renderLabel: true,
      size: 200,
      strokeColor: "none",
      strokeWidth: 1.5,
      svg: "",
      symbolType: "circle"
    },
    link: {
      color: "#d3d3d3",
      fontColor: "black",
      fontSize: 8,
      fontWeight: "normal",
      highlightColor: "SAME",
      highlightFontSize: 8,
      highlightFontWeight: "normal",
      labelProperty: "label",
      mouseCursor: "pointer",
      opacity: 1,
      renderLabel: false,
      semanticStrokeWidth: false,
      strokeWidth: 1.5,
      markerHeight: 6,
      markerWidth: 6,
      strokeDasharray: 0,
      strokeDashoffset: 0,
      strokeLinecap: "butt"
    }

  };

  const onClickNode = function (nodeId) {
    if (nodeId!=='0')
    props.nodeClick(nodeId);
  };

  
  


  return (
    data.length>0?
    <Tree
      id="graph-id" // id is mandatory
      data={data}
      orientation= "vertical"
      PathFunc="elbow"
      //initialDepth={1}
      //config={myConfig}
      //onClickNode={onClickNode}
      //onClickLink={onClickLink}

    />:null
  )

})

export default TreeGraph;