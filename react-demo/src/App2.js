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

function App2() {

  const [text, setText] = useState('');
  const toastRef = useRef();

  const onButtonClick = () =>{
    setText("new text by clicking")
    if(text)
      toastRef.current.show({severity: 'info', summary: 'Success', detail:text});
    else
      toastRef.current.show({severity: 'error', summary: 'Error', detail:text});
  }

  const axios_getUserList = () =>{
    console.log("8888888888")
    axios.get(`http://localhost:3000/api/v1/users/getall`)
    .then(res => {
      const persons = res.data;
      console.log(persons.data)
    })
    .catch(e=>{})
  }

  return (
    <div className="App">
      <Toast ref={toastRef} />
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <input type="text" />
        <button>Save</button>
        <br></br>
        <InputText id ='in' value={text} onChange={(e) => setText(e.target.value)} />
        <Button label="Click" icon="pi pi-check" onClick={onButtonClick}/>
        <br />
        {text}
        <br />
        <Button label="Get User List" icon="pi pi-check" onClick={axios_getUserList}/>

        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App2;
