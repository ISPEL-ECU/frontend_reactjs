import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";

import axios from 'axios';

import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

import Menu from '../UI/Menu'
import Navbar from '../UI/Navbar';
import history from '../../history';

import { Redirect } from "react-router-dom";

function Logout(props)  {


    const useEffect = () =>{
        props.setIsAuth(false);
        history.push('/login');
    };
     
    
    
    return (
    null
    )
}

export default Logout;