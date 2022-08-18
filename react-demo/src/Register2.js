import React from 'react'
import logo from "./logo.svg";
import "./App.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";  //theme
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";                                //icons

import { InputText } from 'primereact/inputtext';
import {useRef, useState} from 'react';
import { Button } from 'primereact/button';
import {Toast} from 'primereact/toast'
import axios from "axios";


const Register2 = () => {
  const toastRef = useRef();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onButtonClick = ()=> {
    axios_post(name,email,password);
  };

  const axios_post = (name,email,password) => {
    const API_URL = "http://localhost:3000/api/v1/users"
    axios.post(`${API_URL}/register`, {
      name: `${name}`,
      email: `${email}`,
      password: `${password}`
    })
      .then((res) => {
        console.log(res.data);
      })
      .catch(err => console.log(err))
  };

  return (
    <div className="App">
      <Toast ref={toastRef} />
    <header className="App-header">  
    <img src={logo} className="App-logo" alt="logo" />  
        <div className='border'>
        <h1>Registration</h1>
          <InputText id ='in' placeholder='Name' value={name} onChange={(e) => setName(e.target.value)} /><br></br>
        <br/>
        <InputText placeholder='example@gmail.com' value={email} onChange={(e) => setEmail(e.target.value)} /><br></br>
        <br/>
        <InputText placeholder='**********' value={password} onChange={(e) => setPassword(e.target.value)} /><br></br>
        <br/>
        <Button label="Register" onClick={onButtonClick}/>
        </div>
        </header>
    </div>
  )
}

export default Register2