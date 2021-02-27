import React, { useEffect, useState } from "react";

import Card from "react-bootstrap/Card";

import axios from "axios";
import { useAuth } from "../../context/auth";

const Display = React.memo((props) => {
  const [topic, setTopic] = useState("");
  const { authToken } = useAuth();

  useEffect(() => {
    console.log("ST " + props.selectedTopic);
    axios
      .get("http://38.123.149.95:3000/react/get-content", {
        params: {
          id: props.selectedTopic.length !== "" ? props.selectedTopic : "-1",
        },
        headers: {
          Authorization: 'Bearer ' + authToken,
        }
      })
      .then((topic) => {
        console.log("selected topic content");
        console.log(topic);
        setTopic(topic.data);
      });
  }, [props.selectedTopic]);
  

  return (
    <div
      id="displayDiv"
      style={{ maxHeight: 90 + "%", width: 100 + "%", overflow: "auto" }}
    >
      <iframe
        title="Preview"
        style={{ maxHeight: 90 + "%", width: 100 + "%", overflow: "auto" }}
        src={
          topic !== ""
            ? "http://38.123.149.95:3000/author/topic/" + topic
            : "http://38.123.149.95:3000/author/topic/rmdhtml/preview.html"
        }
        id="frame"
        frameBorder="0"
      ></iframe>
    </div>
  );
});

export default Display;
