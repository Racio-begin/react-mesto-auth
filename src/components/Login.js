import { useState } from "react";
import AuthForm from "./AuthForm";
import * as Auth from "../utils/Auth";

function Login({ handleLogin }) {

	const [formValue, setFormValue] = useState({
		email: '',
		password: ''
	});

	const handleChange = (event) => {
		const { name, value } = event.target;
		setFormValue({ ...formValue, [name]: value });
	};

	const handleSubmit = (event) => {
		event.preventDefault();

		const { email, password } = formValue;

		Auth.login(email, password)
			.then(data => {
				if (data.jwt) {
					localStorage.setItem('jwt', data.jwt);
					handleLogin(data.user);
					navigate('/mesto');
				}
			})
			.catch(err => setErrorMessage(err));
	};

	return (
		<div className="auth">
			<AuthForm
				name={"login"}
				title={"Вход"}
				buttonText={"Войти"}
				onSubmit={handleSubmit}
			>

				<input
					className="auth__input auth__input_type_email"
					type="email"
					name="email"
					id="user-email"
					value={formValue.email || ''}
					onChange={handleChange}
					placeholder="Email"
					minLength={5}
					maxLength={40}
					required=""
				/>
				<span
					className="email-error popup__input-error"
				/>

				<input
					className="auth__input auth__input_type_password"
					type="password"
					name="password"
					id="user-password"
					value={formValue.password || ''}
					onChange={handleChange}
					placeholder="Пароль"
					minLength={5}
					maxLength={30}
					required=""
				/>
				<span
					className="password-error popup__input-error"
				/>

			</AuthForm>
		</div>
	);

};

export default Login