import { useState } from "react";
import AuthForm from "./AuthForm";

function Register({ handleRegister }) {

	const [formValue, setFormValue] = useState({
		email: '',
		password: ''
	});

	const handleChange = (event) => {
		const { name, value } = event.target;
		setFormValue({ ...formValue, [name]: value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		handleRegister(formValue);
	}

	return (
		<div className="auth">
			<AuthForm
				name={"register"}
				title={"Регистрация"}
				buttonText={"Зарегстироваться"}
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

export default Register