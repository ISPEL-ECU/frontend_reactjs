import React, { useEffect, useState } from "react";
import axios from "axios";

//bootstrap components
import Form from "react-bootstrap/Form";
import ListGroup from "react-bootstrap/ListGroup";

import User from "./User";

import { useAuth } from "../../context/auth";

import {SERVER_ADDRESS} from "../../constants/constants";

const Topics = React.memo((props) => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState();
  const [prevUser, setPrevUser] = useState();

  const { authToken } = useAuth();
  //
  //http://38.123.149.95:3000/react/users
  
  //
  useEffect(() => {
    axios
      .get(SERVER_ADDRESS+"users", {
        headers: {
          Authorization: "Bearer " + authToken,
        },
      })
      .then((users) => {
        console.log(users);
        setUsers(users.data);
      });
  }, []);

  const selectedUserHandler = (event) => {
    const clickedUser = users.find((element) => element.id.toString() === event.target.id);
    props.selectedUserHandler(clickedUser);
    setSelectedUser(clickedUser);

    if (prevUser) {
      prevUser.style.backgroundColor = "initial";
      prevUser.style.color = "initial";
    }
    event.target.style.backgroundColor = "#582c83";
    event.target.style.color = "#ffffff";
    setPrevUser(event.target);
  };

  const usersToDisplay = users.map((user) => {
    return (
      <User
        id={user.id}
        name={user.firstName}
        lname={user.lastName}
        key={user.id}
        onSelectedUser={selectedUserHandler}
      />
    );
  });

  return (
    <ListGroup
      style={{ overflow: "auto", maxHeight: 100 + "%", height: 100 + "%" }}
    >
      {usersToDisplay}
    </ListGroup>
  );
});

export default Topics;
