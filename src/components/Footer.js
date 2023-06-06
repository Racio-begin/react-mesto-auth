import React from 'react';

function Footer() {
	return (
		<footer className="footer page__footer">
			<p className="footer__copyright" lang="en">
				©{new Date().getFullYear()}&nbsp;Mesto&nbsp;Russia
			</p>
		</footer>
	);
};

export default Footer