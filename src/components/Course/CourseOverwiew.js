import React, { useEffect } from "react";
import TopicForOverview from "./TopicForOverview";

const CourseOverview = React.memo((props) => {

  useEffect(() => {}, []);
  console.log("courseoverview");
  console.log(props.topics);
  let topicCount = 0;

  const handleTopic = (topic) => {
    
    if (topic.type === "header") {
      topicCount = 0;
      const count = topic.value.split("#").length - 1;
      const HeaderTag = `h${count + 2}`;
      const header = topic.value.replaceAll("#", "");
      return <HeaderTag>{header}</HeaderTag>;
    } else {
      topicCount++;
      if (!topic.value){
        props.setSaveDisable(true);
        return (<h1 style={{color:"red"}}>Provided topic ID is wrong</h1>);
      }
      return (
        <TopicForOverview
          key={topic.value.id}
          topic={topic.value}
          nodeClick={() => props.nodeClick(topic.value.contentHtml)}
          topicCount={topicCount}
        />
      ); //<Topic topic={topic} />
    }
  };

  const topicsToDisplay = props.topics.map((topic) => {
    return <div>{handleTopic(topic)}</div>;
  });

  return (
    <div>
      <h2 style={{ textDecoration: "underline" }}>{props.courseName}</h2>
      <hr />
      
      {topicsToDisplay}
    </div>
  );
});

export default CourseOverview;
