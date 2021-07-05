import React from 'react';
import { Graph } from "react-d3-graph";


const Tree = React.memo(props => {
  
  let nodes = props.nodes;
  let edges = props.edges;

  const data = {
    nodes: nodes,
    links: edges,
   
  };


  // define links as edges, e.g. if you have 5 topics
  // then these topics index are 0, 1, 2, 3, 4

  // the graph configuration, just override the ones you need
  const myConfig = {
    automaticRearrangeAfterDropNode: false,
    collapsible: false,
    directed: true,
    focusAnimationDuration: 0.75,
    focusZoom: 10,
    freezeAllDragEvents: false,
    height: props.height,
    highlightDegree: 1,
    highlightOpacity: 1,
    linkHighlightBehavior: false,
    maxZoom: 8,
    minZoom: 0.1,
    initialZoom: 0.5,
    nodeHighlightBehavior: false,
    panAndZoom: false,
    staticGraph: false,
    staticGraphWithDragAndDrop: false,
    width: props.width,
    d3: {
      alphaTarget: 0.05,
      gravity: -1200,
      linkLength: 25,
      linkStrength: 1,
      disableLinkForce: false
    },
    node: {
      color: "#d3d3d3",
      fontColor: props.textColor,
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
    <Graph
      id="graph-id" // id is mandatory
      data={data}
      config={myConfig}
      onClickNode={onClickNode}
      //onClickLink={onClickLink}

    />
  )

})

export default Tree;