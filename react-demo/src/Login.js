import logo from './logo.svg';
import './App.css';

import "primereact/resources/themes/lara-light-indigo/theme.css";  //theme
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";                                //icons

import { InputText } from 'primereact/inputtext';
import { useRef, useState } from 'react';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import axios from 'axios';

function Login () {
      
    const [data, setData] = useState({ email: "", password: "" });
	const [error, setError] = useState("");
    const toastRef = useRef();

	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const url = "http://localhost:3000/api/v1/users/login";
			const { data: res } = await axios.post(url, data); 
			localStorage.setItem("token", res.data);
			//window.location = "/";
            console.log("Login successful");
            toastRef.current.show({severity: 'info', summary: 'Success', detail:"You have successfully logged in"});
		} catch (error) {
			if (
				error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
			) {
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
          <h1>Login</h1>
          <InputText id ='in' placeholder='example@gmail.com' name='email' value={data.email} onChange={handleChange} /><br></br>
          <InputText id ='in' placeholder='**********' name='password' value={data.password} onChange={handleChange} /><br></br><br></br>
          {error && <div className="error_msg">{error}</div>}
          <Button label="Login" icon="pi pi-check"/>
          </form>  
        </header>
      </div>
    );
  }
  
  export default Login;