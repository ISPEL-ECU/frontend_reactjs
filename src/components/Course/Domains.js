import React, { useEffect, useState } from "react";

import Domain from "./Domain";

import Form from "react-bootstrap/Form";
import FormGroup from "react-bootstrap/FormGroup";

import {Redirect} from 'react-router-dom';

import axios from "axios";

import { useAuth } from "../../context/auth";

const Domains = React.memo((props) => {
  const [domains, setDomains] = useState([]);
  const [showDomains, setShowDomains] = useState(true);
  const { authToken } = useAuth();

  useEffect(() => {
    axios
      .get("http://localhost:3000/react/get-domains", {
        headers: {
          Authorization: "Bearer " + authToken,
        },
      })
      .then((domains) => {
        setDomains(domains.data);
        onDomainChange(domains.data[0].id);
      })
      .catch((err)=>{
       
            return (
            <Redirect to="/login" />
        )
        
      });
  }, []);
  const onDomainChange = (domainId) => {
    props.onChangeDomain(domainId);

    //event.preventDefault();
    // ...
  };

  const handleSearchCheck = (event) => {
    if (event.target.checked) {
      props.showSearch(true);
      console.log("showing search");
      setShowDomains(false);
    } else {
      props.showSearch(false);
      setShowDomains(true);
    }
  };

  const domainsToDisplay = domains.map((domain) => {
    return <Domain id={domain.id} name={domain.name} key={domain.id} />;
  });

  return (
    <FormGroup>
      <Form.Check
        type="checkbox"
        label="Advanced Search"
        id="advancedSearch"
        onChange={handleSearchCheck}
      />
      <label htmlFor="domainSelect" hidden={!showDomains}>
        Select Domain
      </label>
      <Form.Control
        as="select"
        hidden={!showDomains}
        id="domainSelect"
        style={{ display: "inline" }}
        onChange={(event) => onDomainChange(event.target.value)}
      >
        {domainsToDisplay}
      </Form.Control>
    </FormGroup>
  );
});

export default Domains;
