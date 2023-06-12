import { useState } from "react";
import AuthForm from "./AuthForm"

function Login({ onLogin }) {

	const [userInfo, setUserInfo] = useState({
		email: '',
		password: ''
	});
	
	const handleChange = (event) => {
		const {value, name} = event.target;
		setUserInfo({...values, [name]: value});
	};
	
	function handleSubmit(e) {
		e.preventDefault();
	
		onLogin({
			email: userInfo.email,
			password: userInfo.password
		});
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
					value={userInfo.email || ''}
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
					value={userInfo.password || ''}
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