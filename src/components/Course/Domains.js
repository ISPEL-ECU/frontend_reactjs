import React, { useEffect, useState } from "react";

import Domain from "./Domain";

import Form from "react-bootstrap/Form";
import FormGroup from "react-bootstrap/FormGroup";

import {Redirect} from 'react-router-dom';

import axios from "axios";

import { useAuth } from "../../context/auth";

import {SERVER_ADDRESS} from "../../constants/constants";

const Domains = React.memo((props) => {
  const [domains, setDomains] = useState([]);
  const [showDomains, setShowDomains] = useState(true);
  const { authToken } = useAuth();

  useEffect(() => {
    axios
      .get(SERVER_ADDRESS+"get-domains", {
        headers: {
          Authorization: "Bearer " + authToken,
        },
      })
      .then((domains) => {
        setDomains(domains.data);
        if (!props.preselectedDomain&&!props.preselectedTopic)
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

  if (props.preselectedDomain){
    return (
      <FormGroup>
        <Form.Check
          type="checkbox"
          label="Advanced Search"
          id="advancedSearch"
          className="side-menu-label"
          onChange={handleSearchCheck}
        />
        <Form.Label className="side-menu-label" hidden={!showDomains}>
          Select Domain
        </Form.Label>
        <Form.Control
          as="select"
          className="side-menu-form-control"
          hidden={!showDomains}
          id="domainSelect"
          style={{ display: "inline" }}
          onChange={(event) => onDomainChange(event.target.value)}
          value={props.preselectedDomain}
        >
          {domainsToDisplay}
        </Form.Control>
      </FormGroup>
    );
  }

  return (
    <FormGroup>
      <Form.Check
        type="checkbox"
        label="Advanced Search"
        id="advancedSearch"
        className="side-menu-label"
        onChange={handleSearchCheck}
      />
      <Form.Label className="side-menu-label" hidden={!showDomains}>
        Select Domain
      </Form.Label>
      <Form.Control
        as="select"
        hidden={!showDomains}
        className="side-menu-form-control"
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
