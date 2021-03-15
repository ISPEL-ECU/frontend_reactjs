import React from 'react';

import Navbar from "react-bootstrap/esm/Navbar";


const TopNavbar = (props) => {

return(
<Navbar bg="ecu" style={{ textAlign: 'center', height: 5 + "%" }}>
<Navbar.Brand style={{ paddingLeft: '5rem', color: "#FFFFFF", fontWeight: 'bold', paddingRight: 0  }} >Programmers to Professional Software Engineers (PPSE) Project</Navbar.Brand>
</Navbar>
);

}


export default TopNavbar;