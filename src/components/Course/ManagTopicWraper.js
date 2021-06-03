import React, { useState } from "react";


import Menu from "../UI/Menu";
import Navbar from "../UI/Navbar";


import ManageTopic from "./ManageTopics";
import Display from "../Course/Author/ManageTopic";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";





function UserBrowser(props) {
 
  const [selectedTopic, setSelectedTopic] = useState(null);


  const onSelectedTopic = (id) =>{
    console.log("id is "+id);
    setSelectedTopic(id);

  }
 
  const HandleTopicView = () =>{
    if (selectedTopic&&selectedTopic!== 'undefined')
    {
      console.log('topic');
      console.log(selectedTopic);
      return (<Display selectedTopic={selectedTopic} />);
    }
    return null;
  }

  
  return (
    <div className="App" style={{ height: 100 + "%", maxHeight: 100 + "%" }}>
       
      <Container className="wrappedContainer" fluid >
        <Menu isAuth={props.isAuth} setIsAuth={props.setIsAuth} />
        <Navbar />

        <Row style={{ height: 95 + "%" }}>
          <Col sm={2} style={{ height: 95 + "%" }}>
             {<ManageTopic onSelectedTopic={onSelectedTopic}/>}
          </Col>

          <Col sm={10} style={{ overflow: "auto" }}>
            <HandleTopicView/>
          </Col>
        </Row>




      </Container>
    </div>
  );
}

export default UserBrowser;
