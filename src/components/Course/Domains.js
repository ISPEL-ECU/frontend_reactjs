import React, { useEffect, useState } from 'react';

import Card from '../UI/Card';

import Domain from './Domain'
import './IngredientForm.css';

import axios from 'axios';

const Domains = React.memo(props => {
  const [domains, setDomains] = useState([]);

  useEffect(()=>{
    axios.get('http://localhost:3000/react/get-domains')
        .then(domains =>{
          
            setDomains(domains.data);
            onDomainChange(domains.data[0].id);
           
        });
  },[]);
  const onDomainChange = domainId => {
    props.onChangeDomain(domainId);
    
    //event.preventDefault();
    // ...
  };

  const domainsToDisplay = domains.map(domain =>{
   
    return <Domain id={domain.id} name={domain.name} key={domain.id} />
});

  return (
    <section className="ingredient-form">
      <Card>
      <div>
                <select  style={{display:"inline"}}  onChange={(event)=>onDomainChange(event.target.value)}>
                 {domainsToDisplay}
                 </select> Select domain
               
            </div>
      </Card>
    </section>
  );
});

export default Domains;
