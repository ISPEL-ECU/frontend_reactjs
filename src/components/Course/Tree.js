import React, { useEffect } from 'react';
import * as d3 from 'd3';
import * as forceModule from "d3-force";


const Tree = React.memo(props => {
  var w = 500;
  var h = 400;

  var color_original = '#4c72ff';
  var color_root_node = '#ff0000';
  var color_hover = '#93de94';

  let myRef = React.createRef();


  // define links as edges, e.g. if you have 5 topics
  // then these topics index are 0, 1, 2, 3, 4

  useEffect(() => {

    

    let nodes = props.nodes;
    let edges = props.edges;

    

    let svg = d3.select(myRef.current)
    .append('svg')
    .attr('width', w)
    .attr('height', h);

    let rect_width = 95;
   svg.selectAll("rect")
      .data(nodes)
      .enter()
      .append("rect")
      .attr("x", (d, i) => 5 + i*(rect_width + 5))
      .attr("y", d => (500 - d))
      .attr("width", rect_width)
      .attr("height", d => d)
      .attr('fill', "teal");

    let force = d3.forceSimulation(nodes)
      .force("charge", d3.forceManyBody().strength([-60]))
      .force("link", d3.forceLink(edges))
      .force("x", d3.forceX(w / 2))
      .force("y", d3.forceY(h / 2))


    // force.on('tick', ()=> {
    //   edges.attr("x1", function (d) { return d.source.x; })
    //     .attr("y1", function (d) { return d.source.y; })
    //     .attr("x2", function (d) { return d.target.x; })
    //     .attr("y2", function (d) { return d.target.y; });
    //   nodes.attr("cx", function (d) { return d.x; })
    //     .attr("cy", function (d) { return d.y; });



    // })

  }, []);




  return (
    <div ref={myRef}>
    </div>

    // <svg width={w} height={h}>
    //   {props.edges.map((link, index) => (
    //     <line
    //       x1={link.source.x}
    //       y1={link.source.y}
    //       x2={link.target.x}
    //       y2={link.target.y}
    //       key={`line-${index}`}
    //       stroke="black" />
    //   ))}
    //   {props.nodes.map((node, index) => (
    //     <circle r={node.r} cx={node.x} cy={node.y} fill="red" key={index} />
    //   ))}
    // </svg>
  )

})

export default Tree;