

let editBtn = document.querySelector('.profile__edit-profile');
let closePopBtn = document.querySelector('.popup__close-button');

let popDisplay = document.querySelector('.popup');

let nameInput = document.querySelector('.popup__input_content_full-name');
let aboutInput = document.querySelector('.popup__input_content_about');

let name = document.querySelector('.profile__name');
let about = document.querySelector('.profile__occupation');

let formElement = document.querySelector('.popup__form');


function openEditProfile()
{
	popDisplay.classList.add('popup_opened');
	
	nameInput.focus();
	nameInput.value = name.textContent;
	aboutInput.value = about.textContent;
}

function closeEditProfile()
{
	popDisplay.classList.remove('popup_opened');
}

function handleSubmit(evt)
{
	evt.preventDefault();
	
	name.textContent = nameInput.value;
	about.textContent = aboutInput.value;
	
	popDisplay.classList.remove('popup_opened');
}


editBtn.addEventListener('click', openEditProfile);
closePopBtn.addEventListener('click', closeEditProfile);
formElement.addEventListener('submit', handleSubmit);