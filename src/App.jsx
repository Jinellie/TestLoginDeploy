import { useState, useEffect } from "react";
import "./App.css";
import Notification from "./components/Notificactions";
import loginService from "./services/login";
import axios from "axios";

function App() {
	const [Id_Credencial, setUsername] = useState("");
	const [Password, setPassword] = useState("");
	const [errorMessage, setErrorMessage] = useState(null);
	const [user, setUser] = useState(null);

	const handleLogout = () => {
		setUser(null);
		setUsername("");
		setPassword("");
		window.localStorage.removeItem("loggedAppUser");
	};

	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem("loggedAppUser");
		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON);
			setUser(user);
		}
	}, []);

	const handleLogin = async (event) => {
		event.preventDefault();
		const users = await axios.get(
			"https://autenticacion-global-dreamlab.azurewebsites.net/api/user"
		);
		console.log(users);

		try {
			const user = await loginService.login({
				Id_Credencial,
				Password,
			});

			window.localStorage.setItem("loggedAppUser", JSON.stringify(user));

			setUser(user);
			setUsername("");
			setPassword("");
		} catch (exception) {
			setErrorMessage("Credenciales incorrectas");
			setUsername("");
			setPassword("");
			setTimeout(() => {
				setErrorMessage(null);
			}, 3000);
		}
	};

	const loginForm = () => (
		<section className="text-gray-600 body-font">
			<div className="container px-5 py-24 mx-auto flex flex-wrap items-center">
				<div className="lg:w-3/5 md:w-1/2 md:pr-16 lg:pr-0 pr-0">
					<h1 className="title-font font-medium text-3xl text-gray-900">
						Módulo 2: Prueba de inicio de sesión
					</h1>
					<p className="leading-relaxed mt-4"></p>
				</div>
				<form
					onSubmit={handleLogin}
					className="lg:w-2/6 md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0"
				>
					<h2 className="text-gray-900 text-lg font-medium title-font mb-5">
						Iniciar sesión
					</h2>
					<div className="relative mb-4">
						<label
							htmlFor="Username"
							className="leading-7 text-sm text-gray-600"
						>
							Usuario
						</label>
						<input
							type="text"
							value={Id_Credencial}
							name="Username"
							onChange={({ target }) => setUsername(target.value)}
							className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
						/>
					</div>
					<div className="relative mb-4">
						<label
							htmlFor="password"
							className="leading-7 text-sm text-gray-600"
						>
							Contraseña
						</label>
						<input
							type="password"
							value={Password}
							name="Password"
							onChange={({ target }) => setPassword(target.value)}
							className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
						/>
					</div>
					<button
						type="submit"
						className="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
					>
						Iniciar sesión
					</button>
					<Notification mensaje={errorMessage} />
				</form>
			</div>
		</section>
	);

	return (
		<>
			{/*{user === null && loginForm()}
      {user !== null && productsForm()} */}

			{user === null ? (
				loginForm()
			) : (
				<div className="container mx-auto py-6">
					{" "}
					{/* Added container with `mx-auto` for centering */}
					<div className="flex justify-between items-center">
						{" "}
						{/* Flex container for logout button */}
						<h1 className="title-font font-medium text-3xl text-gray-900">
							Bienvenid@, {user.Nombre}!
						</h1>
						<button
							onClick={handleLogout}
							className="text-white bg-indigo-500 border-0 py-2 px-4 focus:outline-none hover:bg-indigo-600 rounded text-lg"
						>
							Cerrar sesión
						</button>
					</div>
				</div>
			)}
		</>
	);
}

export default App;
