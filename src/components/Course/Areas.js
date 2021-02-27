import React, { useEffect, useState } from "react";

import "./IngredientList.css";
import Area from "./Area";
import axios from "axios";
import Form from "react-bootstrap/Form";
import FormGroup from "react-bootstrap/FormGroup";

import { useAuth } from "../../context/auth";

const Areas = (props) => {
  const [areas, setAreas] = useState([]);
  const { authToken } = useAuth();

  useEffect(() => {
    if (!props.showSearch) {
      axios
        .get("http://38.123.149.95:3000/react/get-areas", {
          params: {
            domainId:
              props.selectedDomain && props.selectedDomain !== ""
                ? props.selectedDomain
                : "-1",
          },
          headers: {
            Authorization: 'Bearer ' + authToken,
          }
        })
        .then((areas) => {
          console.log("i am here " + props.showSearch);
          setAreas(areas.data);
          if (areas.data.length > 0) onAreaChange(areas.data[0].id);
          // console.log(domains);
        });
    }
  }, [props.selectedDomain]);

  const onAreaChange = (areaId) => {
    props.onChangeArea(areaId);
    //event.preventDefault();
    // ...
  };

  const areasToDisplay = areas.map((area) => {
    return <Area id={area.id} name={area.name} key={area.id + area.name} />;
  });

  return (
    <section className="ingredient-list">
      <FormGroup>
        <label htmlFor="areaSelect">Select Area</label>
        <Form.Control
          as="select"
          id="areaSelect"
          style={{ display: "inline" }}
          onChange={(event) => onAreaChange(event.target.value)}
        >
          {areasToDisplay}
        </Form.Control>
      </FormGroup>
    </section>
  );
};

export default Areas;
