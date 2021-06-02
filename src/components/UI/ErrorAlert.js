import React from 'react';

import Alert from "react-bootstrap/Alert";

const processAlert = (message) =>{
    return (
    <Alert key="alertKey" variant="danger">
    {message}
  </Alert>)
}

const ErrorModal = React.memo(props => {
    return (
        <div>
     {props.showAlert?processAlert(props.AlertMessage):null}
     </div>
    );
  });
  
  export default ErrorModal;
  