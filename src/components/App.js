import React, { useState, useEffect } from 'react';
import { Route, Routes, useNavigate, Navigate } from 'react-router-dom';

import ProtectedRoute from './ProtectedRoute';

import CurrentUserContext from '../contexts/CurrentUserContext';
import api from '../utils/Api';

import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import EditAvatarPopup from './EditAvatarPopup';
import EditProfilePopup from './EditProfilePopup';
import ImagePopup from './ImagePopup';
import AddPlacePopup from './AddPlacePopup';
import DeletePlacePopup from './DeletePlacePopup';

import Register from './Register';
import Login from './Login';
// import InfoTooltip from './InfoTooltip';

import '../index.css';

function App() {

	// Задаем переменные через хуки для отслеживания их состояния на странице
	const [isEditAvatarPopupOpen, setEditAvatarPopupOpened] = useState(false);
	const [isAddPlacePopupOpen, setAddPlacePopupOpened] = useState(false);
	const [isEditProfilePopupOpen, setEditProfileOpened] = useState(false);

	const [deletePlace, setDeletePlace] = useState(null)
	const [isDeletePlacePopupOpen, setDeletePlacePopupOpened] = useState(false);

	const [selectedCard, setSelectedCard] = useState(null);

	const [currentUser, setCurrentUser] = useState({});

	const [cards, setCards] = useState([]);

	const [isLoading, setIsLoading] = useState(false);

	const [loggedIn, setLoggedIn] = useState(false);

	const [userEmail, setUserEmail] = useState('');

	const navigate = useNavigate();

	useEffect(() => {
		api.getUserData()
			.then((userData) => setCurrentUser(userData))
			.catch(() => console.error(`Получение данных пользователя, App`))
	}, []);

	useEffect(() => {
		api.getInitialCards()
			.then((cards) => setCards(cards))
			.catch(() => console.error(`Получение карточек, App`))
	}, []);

	function handleEditAvatarClick() {
		setEditAvatarPopupOpened(true)
	};

	function handleAddPlaceClick() {
		setAddPlacePopupOpened(true)
	};

	function handleEditProfileClick() {
		setEditProfileOpened(true)
	};

	function handleCardClick(card) {
		setSelectedCard(card)
	};

	function handleDeletePlaceClick(card) {
		setDeletePlace(card)
		setDeletePlacePopupOpened(true)
	}

	function handleUpdateUser(userData) {
		setIsLoading(true)
		api.updateUserData(userData)
			.then(setCurrentUser)
			.then(closeAllPopups)
			.catch(() => console.error(`Обновление данных профиля, App`))
			.finally(() => setIsLoading(false))
	};

	function handleUpdateAvatar(userData) {
		setIsLoading(true)
		api.updateUserAvatar(userData)
			.then(setCurrentUser)
			.then(closeAllPopups)
			.catch(() => console.error(`Обновление аватара профиля, App`))
			.finally(() => setIsLoading(false))
	};

	function closeAllPopups() {
		setEditAvatarPopupOpened(false);
		setAddPlacePopupOpened(false);
		setDeletePlacePopupOpened(false)
		setEditProfileOpened(false);
		setSelectedCard(null);
	};

	function handleCardLike(card) {
		// Проверяем, есть ли уже лайк на этой карточке
		const isLiked = card.likes.some(i => i._id === currentUser._id);

		// Отправляем запрос в API и получаем обновлённые данные карточки
		api.changeLikeCardStatus(card._id, !isLiked)
			.then((newCard) => {
				setCards((state) => state.map((c) => c._id === card._id ? newCard : c))
			})
			.catch(() => console.error(`Получение данных по лайкам, App`))
	};

	function handleDeletePlaceSubmit(card) {
		api.deleteCard(card._id)
			.then(() => {
				setCards((state) => state.filter((c) => c._id !== card._id));
			})
			.then(closeAllPopups)
			.catch(() => console.error(`Удаление карточки, App`))
			.finally(() => setIsLoading(false))
	};

	function handleAddPlaceSubmit(userData) {
		setIsLoading(true)
		api.sendingCard(userData)
			.then((newCard) => setCards([newCard, ...cards]))
			.then(closeAllPopups)
			.catch(() => console.error(`Добавление новой карточки, App`))
			.finally(() => setIsLoading(false))
	};

	const handleLogin = ({ username, email }) => {
    setLoggedIn(true);
    setUserData({ username, email });
  }

	function handleSignOut() {
		localStorage.removeItem('jwt');
		setLoggedIn(false);
		navigate('/sign-in');
	};

	return (
		// todo: <AppContext.Provider value={{ isLoading, closeAllPopups }}>
		<CurrentUserContext.Provider value={currentUser}>
			<div className="page">

				<div className="page__content">

					<Header
						loggedIn={loggedIn}
						userEmail={userEmail}
						handleSignOut={handleSignOut}
					/>

					<Routes>

						<Route
							path="/"
							element={loggedIn ? <Navigate to="/mesto" /> : <Navigate to="/sign-in" replace />}
						/>

						<Route
							path="sign-up"
							element={<Register />}
						/>

						<Route
							path="sign-in"
							element={<Login handleLogin={handleLogin}/>}
						/>

						<Route path="mesto" element={
							<ProtectedRoute element={Main}
								cards={cards}
								onEditAvatar={handleEditAvatarClick}
								onEditProfile={handleEditProfileClick}
								onAddPlace={handleAddPlaceClick}
								onCardDelete={handleDeletePlaceClick}
								onCardClick={handleCardClick}
								onCardLike={handleCardLike}
							/>}
						/>

					</Routes>

					<Footer
						loggedIn={loggedIn}
					/>

				</div>

				{/* <----     POPUP редактирования аватара    ----> */}
				<EditAvatarPopup
					isOpen={isEditAvatarPopupOpen}
					onClose={closeAllPopups}
					onUpdateAvatar={handleUpdateAvatar}
					isLoading={isLoading}
				/>

				{/* <----     POPUP редактирования профиля    ----> */}
				<EditProfilePopup
					isOpen={isEditProfilePopupOpen}
					onClose={closeAllPopups}
					onUpdateUser={handleUpdateUser}
					isLoading={isLoading}
				/>

				{/* <----     POPUP добавления карточки    ----> */}
				<AddPlacePopup
					isOpen={isAddPlacePopupOpen}
					onClose={closeAllPopups}
					onAddPlace={handleAddPlaceSubmit}
					isLoading={isLoading}
				/>

				{/* <----     POPUP подтвержения удаления карточки    ----> */}
				<DeletePlacePopup
					card={deletePlace}
					isOpen={isDeletePlacePopupOpen}
					onClose={closeAllPopups}
					onCardDelete={handleDeletePlaceSubmit}
					isLoading={isLoading}
				/>

				{/* <----     POPUP открытия карточки    ----> */}
				<ImagePopup
					card={selectedCard}
					onClose={closeAllPopups}
				/>

			</div>
		</CurrentUserContext.Provider>
		// </AppContext.Provider>
	);

};

export default App;
