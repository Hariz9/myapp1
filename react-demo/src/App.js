import { Route, Routes, Navigate } from "react-router-dom";
import Main from "./components/Main/Main";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import ChangePassword from "./components/ChangePassword/ChangePassword";

function App() {
	const user = localStorage.getItem("token");

	return (
		<Routes>
			{user && <Route path="/" exact element={<Main />} />}
			<Route path="/register" exact element={<Register />} />
			<Route path="/login" exact element={<Login />} />
			<Route path="/changepassword" exact element={<ChangePassword />} />
			<Route path="/" element={<Navigate replace to="/login" />} />
		</Routes>
	);
}

export default App;