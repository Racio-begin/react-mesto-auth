import React from 'react';
import usePopupClose from '../hooks/usePopupClose';

import iconSuccess from '../images/success.png';
import iconNotSuccess from '../images/not-success.png';

function InfoTooltip({ isOpen, onClose, ifSuccess }) {

	usePopupClose(isOpen, onClose);

	return (
		<div className={`popup ${isOpen ? 'popup_opened' : ''}`}>
			<div className="popup__container">

				<button
					className="button popup__button-close"
					name="popupCloseButton"
					type="button"
					aria-label="Закрыть окно"
					onClick={onClose}
				/>

				<img
					className="popup__info-icon"
					src={`${ifSuccess
						? iconSuccess
						: iconNotSuccess}`}
					alt={`${ifSuccess
						? "Вы успешно зарегистрировались!"
						: "Что-то пошло не так! Попробуйте ещё раз."}`}
				/>

				<h2
					className="popup__info-title">{`${ifSuccess
						? "Вы успешно зарегистрировались!"
						: "Что-то пошло не так! Попробуйте ещё раз."}`}
				</h2>

			</div>
		</div>
	);

};

export default InfoTooltip