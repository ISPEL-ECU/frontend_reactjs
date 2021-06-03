import React, { useEffect, useState } from "react";
import axios from "axios";

//bootstrap components

import ListGroup from "react-bootstrap/ListGroup";

import User from "./User";

import { useAuth } from "../../context/auth";

import { SERVER_ADDRESS } from "../../constants/constants";

import {
  LIST_FONT_COLOR,
  LIST_BACKGROUND_COLOR,
} from "../../constants/constants";

const Topics = React.memo((props) => {
  const [users, setUsers] = useState([]);

  const [prevUser, setPrevUser] = useState();

  const { authToken } = useAuth();

  useEffect(() => {
    props.setUpdateUsers(false);
    axios
      .get(SERVER_ADDRESS + "users", {
        headers: {
          Authorization: "Bearer " + authToken,
        },
      })
      .then((users) => {
        console.log(users);
        setUsers(users.data);
      });
  }, [authToken, props.updateUsers]);

  const selectedUserHandler = (event) => {
    const clickedUser = users.find(
      (element) => element.id.toString() === event.target.id
    );
    props.selectedUserHandler(clickedUser);
    if (prevUser) {
      prevUser.style.backgroundColor = "initial";
      prevUser.style.color = "initial";
    }
    event.target.style.backgroundColor = LIST_BACKGROUND_COLOR;
    event.target.style.color = LIST_FONT_COLOR;
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
