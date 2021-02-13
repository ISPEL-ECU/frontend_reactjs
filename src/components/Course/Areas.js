import React, { useEffect, useState } from 'react';

import './IngredientList.css';
import Card from '../UI/Card';
import Area from './Area';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import FormGroup from 'react-bootstrap/FormGroup';


const Areas = (props) => {

  const [areas, setAreas] = useState([]);
  const [selectedArea, setSelectedArea] = useState('');

  useEffect(() => {
    console.log(props.selectedDomain);
    axios.get('http://localhost:3000/react/get-areas', { params: { domainId: ((props.selectedDomain && props.selectedDomain !== '') ? props.selectedDomain : '-1') } })
      .then(areas => {

        setAreas(areas.data);
        if (areas.data.length > 0)
          onAreaChange(areas.data[0].id);
        // console.log(domains);
      });
  }, [props.selectedDomain]);



  const onAreaChange = areaId => {
    props.onChangeArea(areaId);
    //event.preventDefault();
    // ...
  };


  const areasToDisplay = areas.map(area => {

    return <Area id={area.id} name={area.name} key={area.id} />
  });

  return (
    <section className="ingredient-list">


      <FormGroup>
        <label htmlFor="areaSelect">Select Area</label>
        <Form.Control as="select" id="areaSelect" style={{ display: "inline" }} value={selectedArea} onChange={(event) => onAreaChange(event.target.value)}>
          {areasToDisplay}
        </Form.Control>

      </FormGroup>


    </section>
  );
};

export default Areas;
