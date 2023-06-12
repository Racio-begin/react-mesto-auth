import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import logo from '../images/logo.svg';

function Header({ userEmail, handleSignOut }) {
	return (
		<header className="header page__header">
			<img
				className="header__logo"
				src={logo}
				alt="Логотип сайта Mesto Russia"
			/>

			<Routes>
				<Route path="/" element={
					<>
						<p className="header__email">{userEmail}</p>
						<button
							className="header__signout"
							type="button"
							onClick={handleSignOut}
						>Выйти</button>
					</>
				} />

				<Route
					path="/sign-up"
					element={
						<Link className="header__link button" to="/sign-in">Войти</Link>
					} />

				<Route
					path="/sign-in"
					element={
						<Link className="header__link button" to="/sign-up">Регистрация</Link>
					} />

			</Routes>

		</header>
	);
};

export default Header