import React, { useCallback, useEffect, useState } from 'react';

import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import FormGroup from 'react-bootstrap/esm/FormGroup';

const Name = React.memo((props) => {


    const NameHandler = useCallback ((event)=>{
    props.onNameHandler(event.target.value);
  })
    
 


  return (
  <FormGroup>
    <InputGroup size="sm" className="mb-3">
      <InputGroup.Prepend>
        <InputGroup.Text id="inputGroup-sizing-sm">Course Name:</InputGroup.Text>
      </InputGroup.Prepend>
      <FormControl aria-label="Small" onBlur={NameHandler}  aria-describedby="inputGroup-sizing-sm" />
    </InputGroup>
  </FormGroup>


);

})

export default Name;
