import React, { useEffect, useState } from "react";

import axios from "axios";
import { useAuth } from "../../context/auth";

import { SERVER_ADDRESS_CONTENT } from "../../constants/constants";

const Display = React.memo((props) => {
  const [topic, setTopic] = useState("");
  const { authToken } = useAuth();

  // useEffect(() => {
  //   console.log("ST " + props.selectedTopic);
  //   axios
  //     .get(SERVER_ADDRESS+"get-content", {
  //       params: {
  //         id: props.selectedTopic.length !== "" ? props.selectedTopic : "-1",
  //       },
  //       headers: {
  //         Authorization: 'Bearer ' + authToken,
  //       }
  //     })
  //     .then((topic) => {
  //       console.log("selected topic content");
  //       console.log(topic.data);
  //       setTopic(topic.data);
  //     });
  // }, [props.selectedTopic, authToken]);

  return (
    <div
      id="displayDiv"
      style={{ maxHeight: 95 + "%", width: 100 + "%", overflow: "auto" }}
    >
      <iframe
        title="Preview"
        style={{ maxHeight: 95 + "%", width: 100 + "%", overflow: "auto" }}
        src={
          props.selectedTopic && props.selectedTtopic !== ""
            ? SERVER_ADDRESS_CONTENT + "author/topic/" + props.selectedTopic
            : SERVER_ADDRESS_CONTENT + "author/topic/rmdhtml/preview.html"
        }
        id="frame"
        frameBorder="0"
      ></iframe>
    </div>
  );
});

export default Display;
