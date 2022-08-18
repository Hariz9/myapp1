import logo from './logo.svg';
import './ChangePassword.css';

import "primereact/resources/themes/lara-light-indigo/theme.css";  //theme
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";                                //icons

import { InputText } from 'primereact/inputtext';
import { useRef, useState } from 'react';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function ChangePassword () {
      
    const [data, setData] = useState({ userId: "", newpassword: "" });
	const [error, setError] = useState("");
    const toastRef = useRef();
    const navigate = useNavigate();

	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const url = "http://localhost:3000/api/v1/users/changepassword";
			const { data: res } = await axios.patch(url, data); 
            console.log("Password changed successfully");
            toastRef.current.show({severity: 'info', summary: 'Success', detail:"You have successfully changed your password"});
            navigate("/login");
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
          <h1>Change Password</h1>
          <InputText id ='in' placeholder='User ID' name='userId' value={data.userId} onChange={handleChange} /><br></br>
          <InputText id ='in' placeholder='**********' name='newpassword' value={data.newpassword} onChange={handleChange} /><br></br><br></br>
          {error && <div className="error_msg">{error}</div>}
          <Button label="Submit" icon="pi pi-check"/>{' '}
          <Link to="/login">
          <Button label="Login"/>
          </Link>
          </form>  
        </header>
      </div>
    );
  }
  
  export default ChangePassword;