import "./Main.css";

import { Button } from 'primereact/button';

const Main = () => {
	const handleLogout = () => {
		localStorage.removeItem("token");
		window.location.reload();
	};

	return (
		<div>
			<nav className={"navbar"}>
				<h1>fakebook</h1>
				<Button label="Logout" icon="pi pi-check" onClick={handleLogout}/>
			</nav>
		</div>
	);
};

export default Main;