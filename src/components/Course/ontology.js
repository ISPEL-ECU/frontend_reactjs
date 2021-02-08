var w = 500;
var h = 400;

var color_original = '#4c72ff';
var color_root_node = '#ff0000';
var color_hover = '#93de94';

// define links as edges, e.g. if you have 5 topics
// then these topics index are 0, 1, 2, 3, 4

var base_url = 'http://127.0.0.1:7000';
var dataset = {
  nodes:[

//start count at 0
      {name:"URL and HTML", url:base_url+"/ISPeL-content-machine-learning/web-apps/URL_and_HTML/",color:color_root_node},
      {name:"Design", url:base_url+"/ISPeL-content-machine-learning/web-apps/design/",color:color_original},
      {name:"MVC and JavaScript", url:base_url+"/ISPeL-content-machine-learning/web-apps/MVC_JavaScript/",color:color_original},
      {name:"Software Design and JavaScript", url:base_url+"/ISPeL-content-machine-learning/web-apps/software_design_and_javaScript/",color:color_original},
      {name:"jQuery", url:base_url+"/ISPeL-content-machine-learning/web-apps/jQuery/",color:color_original},
      {name:"Webservice and Flask", url:base_url+"/ISPeL-content-machine-learning/web-apps/web_service_and_flask/",color:color_original},
      {name:"Database and Flask", url:base_url+"/ISPeL-content-machine-learning/web-apps/database_and_flask/",color:color_original},
      {name:"Message and Flask", url:base_url+"/ISPeL-content-machine-learning/web-apps/message_and_flask/",color:color_original},
      
  
      
  ],
  edges:[
      {source: 0, target: 1},
      {source: 1, target: 2},
      {source: 1, target: 3},
      {source: 2, target: 3},
      {source: 2, target: 4},
      {source: 3, target: 4},
      {source: 4, target: 5},
      {source: 5, target: 6},
      {source: 5, target: 7},
      {source: 6, target: 7}
    
  ]
};

var force = d3.layout.force()
            .nodes(dataset.nodes)
            .links(dataset.edges)
            .size([w, h])
            .linkDistance([100])
            .charge([-750])
            .start();

// var colors = d3.scale.category10();
// var svg = d3.select("div#ontology_div")
// var svg = d3.select("div")
var svg = d3.select("body")
        .append("svg")
        .attr("width", w)
        .attr("height", h);
var edges = svg.selectAll("line")
        .data(dataset.edges)
        .enter()
        .append("line")
        .style("stroke", "#ccc")
        .style("stroke-width", 1);
// var nodes = svg.selectAll("circle")
//         .data(dataset.nodes)
//         .enter()
//         .append("circle")
//         .attr("r", 10)
//         .style("fill", function(d, i){
//           return colors(i);
//         })
//         .call(force.drag);


var nodes = svg.selectAll("circle")
        .data(dataset.nodes)
        .enter()
        .append("circle")
        .attr("r", 10)
        .style("fill", color_original)
        .call(force.drag);
        
var label = svg.selectAll(".mytext")
        .data(dataset.nodes)
        .enter()
        .append("text")
          .text(function (d) { return d.name; })
          .style("text-anchor", "middle")
          .style("fill", function (d) { return d.color; })
          .style("font-family", "Arial")
          .style("font-size", 12);

 
nodes
      .on('mouseover', function (d) {
        // Highlight the nodes: every node is green except of him
        nodes.style('fill', color_original)
        d3.select(this).style('fill', color_hover)
        // Highlight the connections
        edges
          .style('stroke', function (link_d) { return link_d.source === d.id || link_d.target === d.id ? '#69b3b2' : '#b8b8b8';})
          .style('stroke-width', function (link_d) { return link_d.source === d.id || link_d.target === d.id ? 4 : 1;})
      })
      .on('mouseout', function (d) {
        nodes.style('fill', color_original)
        edges
          .style('stroke', 'black')
          .style('stroke-width', '1')
      })
      .on('click',function(d, i){
        window.location.href = d.url;
        // console.log(d.url);
        // d3.select(this).attr('r', 25)
        //         .style("fill","lightcoral")
        //         .style("stroke","red");
      });



force.on("tick", function(){
  edges.attr("x1", function(d){ return d.source.x; })
     .attr("y1", function(d){ return d.source.y; })
     .attr("x2", function(d){ return d.target.x; })
     .attr("y2", function(d){ return d.target.y; });
  nodes.attr("cx", function(d){ return d.x; })
     .attr("cy", function(d){ return d.y; });
  label.attr("x", function(d){ return d.x; })
       .attr("y", function (d) {return d.y - 10; });

  
});

