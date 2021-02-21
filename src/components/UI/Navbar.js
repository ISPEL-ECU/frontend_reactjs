import React from 'react';

import Navbar from "react-bootstrap/esm/Navbar";


const TopNavbar = (props) => {

return(
<Navbar bg="ecu" style={{ textAlign: 'center', height: 5 + "%" }}>
<Navbar.Brand style={{ paddingLeft: '5rem', color: "#FFFFFF", weight: 'bold' }} >ISPEL</Navbar.Brand>
</Navbar>
);

}


export default TopNavbar;