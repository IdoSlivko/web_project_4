

let editBtn = document.querySelector('.profile__edit-profile');
let closePopBtn = document.querySelector('.popup__close-button');

let popDisplay = document.querySelector('.popup_opened');

let nameInput = document.querySelector('.popup__input_full-name');
let aboutInput = document.querySelector('.popup__input_about');

let name = document.querySelector('.profile__name');
let about = document.querySelector('.profile__occupation');

let popContain = document.querySelector('.popup__container');

function openEditProfile()
{
	popDisplay.style.display = 'flex';

	nameInput.focus();
	nameInput.value = name.textContent;
	aboutInput.value = about.textContent;
}

function closeEditProfile(evt)
{
	evt.preventDefault();

	popDisplay.style.display = 'none';
}

function handleSubmit(evt)
{
	evt.preventDefault();

	name.textContent = nameInput.value;
	about.textContent = aboutInput.value;

	popDisplay.style.display = 'none';
}

editBtn.addEventListener('click', openEditProfile);
closePopBtn.addEventListener('click', closeEditProfile);
popContain.addEventListener('submit', handleSubmit);