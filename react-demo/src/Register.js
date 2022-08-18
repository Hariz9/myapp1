import logo from './logo.svg';
import './App.css';

import "primereact/resources/themes/lara-light-indigo/theme.css";  //theme
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";                                //icons

import { InputText } from 'primereact/inputtext';
import {useRef, useState} from 'react';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import axios from 'axios';
//import { useNavigate } from "react-router-dom";

//function Register() {
  
    
  // const onButtonClick = () =>{
  //   // setText("Saved")
  //   if(data)
  //     toastRef.current.show({severity: 'info', summary: 'Success', detail:data});
  //   else
  //     toastRef.current.show({severity: 'error', summary: 'Error', detail:data});
  // }

    // const axios_getUserList = () =>{
    //   console.log("8888888888")
    //   axios.get(`http://localhost:3000/api/v1/users/getall`)
    //   .then(res => {
    //     const persons = res.data;
    //     console.log(persons.data)
    //   })
    //   .catch(e=>{})
    // }

function Register () {
      
      const toastRef = useRef();
      const [data, setData] = useState({
        name:"",
        email:"",
        password:""
      });

      const [error, setError] = useState("");
      //const navigate = useNavigate();
    
      const handleChange = ({ currentTarget: input}) => {
        setData({ ...data, [input.name]:input.value});
      };

      const handleSubmit = async (e) => {
        e.preventDefault();
        try{
          const url = "http://localhost:3000/api/v1/users/register";
          const {data: res} = await axios.post(url, data);
          toastRef.current.show({severity: 'info', summary: 'Success', detail:"Your account has been registered"});
          //navigate("/login");
        } catch (error) {
            if(error.response &&
               error.response >= 400 &&
               error.response.status <=500){
                setError(error.response.data.message);
               }
        }
      };
      
    return (
      <div className="App">
        <Toast ref={toastRef} />
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <form onSubmit={handleSubmit}>
          <h1>Registration</h1>
          <InputText id ='in' placeholder='Name' name='name' value={data.name} onChange={handleChange} /><br></br>
          <InputText id ='in' placeholder='example@gmail.com' name='email' value={data.email} onChange={handleChange} /><br></br>
          <InputText id ='in' placeholder='**********' name='password' value={data.password} onChange={handleChange} /><br></br><br></br>
          <Button label="Register" icon="pi pi-check"/>
          </form>  
        </header>
      </div>
    );
  }
  
  export default Register;