import React, { useCallback, useEffect, useState } from 'react';

import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import FormGroup from 'react-bootstrap/esm/FormGroup';

const Search = React.memo((props) => {


  const [searchValue, setSearchValue] = useState('');
  const SearchHandler = useCallback ((event)=>{
    props.onSearchHandler(event.target.value);
  })
    
 


  return (
  <FormGroup>
    <InputGroup size="sm" className="mb-3">
      <InputGroup.Prepend>
        <InputGroup.Text id="inputGroup-sizing-sm">Search:</InputGroup.Text>
      </InputGroup.Prepend>
      <FormControl aria-label="Small" onChange={SearchHandler} value={searchValue} aria-describedby="inputGroup-sizing-sm" />
    </InputGroup>
  </FormGroup>


);

})

export default Search;
