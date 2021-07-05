import React, { useEffect, useState } from "react";

import "./IngredientList.css";
import Area from "./Area";
import axios from "axios";
import Form from "react-bootstrap/Form";
import FormGroup from "react-bootstrap/FormGroup";

import { useAuth } from "../../context/auth";

import {SERVER_ADDRESS} from "../../constants/constants";

const Areas = React.memo((props) => {
  const [areas, setAreas] = useState([]);
  const [preselectedArea, setPreselectedArea] = useState();
  const { authToken } = useAuth();

  // const onAreaChange = useCallback((areaId) => {
  //   console.log('AreaID = '+areaId);
  //   props.onChangeArea(areaId);
  //   //event.preventDefault();
  //   // ...
  // }, [props]);

 
  useEffect(() => {
    console.log('areas effect');
    if (!props.showSearch) {
      axios
        .get(SERVER_ADDRESS+"get-areas", {
          params: {
            domainId:
              props.selectedDomain && props.selectedDomain !== ""
                ? props.selectedDomain
                : "-1",
          },
          headers: {
            Authorization: "Bearer " + authToken,
          },
        })
        .then((areas) => {
          console.log("i am here " + props.showSearch);
          setAreas(areas.data);
          if (props.preselectedArea){
            props.onChangeArea(props.preselectedArea);
          } else
          if (areas.data.length > 0 ) props.onChangeArea(areas.data[0].id);
          // console.log(domains);
        });
    }
  }, [authToken]);

useEffect(()=>{
setPreselectedArea(props.preselectedArea);
},[props.preselectedArea]);
  const areasToDisplay = areas.map((area) => {
    return <Area id={area.id} name={area.name} key={area.id + area.name} />;
  });
  if (preselectedArea){
    return (
      <FormGroup>
        <Form.Label className="side-menu-label">Select Area</Form.Label>
        <Form.Control
          as="select"
          id="areaSelect"
          className="side-menu-form-control"
          style={{ display: "inline" }}
          onChange={(event) => {
            setPreselectedArea(null);
            props.onChangeArea(event.target.value)}}
          value = {props.preselectedArea}
          >
          {areasToDisplay}
        </Form.Control>
      </FormGroup>
    );
  }
  return (
    <FormGroup>
      <Form.Label className="side-menu-label">Select Area</Form.Label>
      <Form.Control
        as="select"
        id="areaSelect"
        className="side-menu-form-control"
        style={{ display: "inline" }}
        onChange={(event) => props.onChangeArea(event.target.value)}
        >
        {areasToDisplay}
      </Form.Control>
    </FormGroup>
  );
});

export default Areas;
