import React from 'react';

function Header({ logo }) {
	return (
		<header className="header page__header">
			<img
				className="header__logo"
				src={logo}
				alt="Логотип сайта Mesto Russia"
			/>
		</header>
	);
};

export default Header