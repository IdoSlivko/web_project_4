

const editBtn = document.querySelector('.profile__edit-profile');
const addImgBtn = document.querySelector('.profile__add-photo');
const closePopBtn = document.querySelector('.popup__close-button');

const popDisplay = document.querySelector('.popup');

const formElement = document.querySelector('.popup__form');

const popTitle = document.querySelector('.popup__title');
const firstInput = document.querySelector('.popup__input_content_full-name');
const secondInput = document.querySelector('.popup__input_content_about');
const popSubmit = document.querySelector('.popup__submit');

let name = document.querySelector('.profile__name');
name.textContent = 'Jacques Cousteau';

let about = document.querySelector('.profile__occupation');
about.textContent = 'Explorer';

const initialCards = [
	{
		name: 'Lago di Braies',
		link: 'https://code.s3.yandex.net/web-code/lago.jpg'
	},
	{
		name: 'but most of all, samy is my hero',
		link: 'https://code.s3.yandex.net/web-code/vanoise.jpg'
	},
	{
		name: 'Latemar',
		link: 'https://code.s3.yandex.net/web-code/latemar.jpg'
	},
	{
		name: 'Bald Mountains',
		link: 'https://code.s3.yandex.net/web-code/bald-mountains.jpg'
	},
	{
		name: 'Lake Louise',
		link: 'https://code.s3.yandex.net/web-code/lake-louise.jpg'
	},
  {
    name: 'Yosemite Valley',
    link: 'https://code.s3.yandex.net/web-code/yosemite.jpg'
  }
];

const elementsContainer = document.querySelector('.elements');
const imageTemplate = document.querySelector('#image-template').content;



function openPopup(identifier, title, firstHolder, secondHolder, submitText)
{
	popDisplay.classList.add('popup_opened');

	popTitle.textContent = title;
	firstInput.focus();
	firstInput.placeholder = firstHolder;
	secondInput.placeholder= secondHolder;
	popSubmit.textContent = submitText;
	
	if (identifier == 1)
	{
		firstInput.value = name.textContent;
		secondInput.value = about.textContent;
	}
	else
	{
		firstInput.value = '';
		secondInput.value = '';
	}
}


function closePopup()
{
	popDisplay.classList.remove('popup_opened');
}


function handleSubmit(evt)
{
	evt.preventDefault();

	if (popSubmit.textContent === 'Save')
	{
		name.textContent = firstInput.value;
		about.textContent = secondInput.value;
		firstInput.name = 'fullName';
		secondInput.name = 'about';
	}
	else
	{
		elementsContainer.prepend(renderImg(firstInput.value, secondInput.value));
	}

	popDisplay.classList.remove('popup_opened');
}


function renderImg(imgTitle, link)
{
	const imageItem = imageTemplate.querySelector('.elements__item').cloneNode(true);

	imageItem.querySelector('.elements__title').textContent = imgTitle;
	imageItem.querySelector('.elements__image').src = link;

	imageItem.querySelector('.elements__delete-button').addEventListener('click', () => {
			imageItem.remove();
	});

	imageItem.querySelector('.elements__like-button').addEventListener('click', () => {
		imageItem.querySelector('.elements__like-button').classList.toggle('elements__like-button_active');
	});

	imageItem.querySelector('.elements__image').addEventListener('click', () => {
		document.querySelector('.pic-popup').classList.add('pic-popup_opened');
		document.querySelector('.pic-popup__image').src = link;
		document.querySelector('.pic-popup__caption').textContent = imgTitle;
	});

	return imageItem;
}



initialCards.forEach(item => {
	elementsContainer.prepend(renderImg(item.name, item.link));
});

editBtn.addEventListener('click', () => {
	openPopup(1, 'Edit profile', 'Full name', 'About me', 'Save');
});

addImgBtn.addEventListener('click', () => {
	openPopup(0, 'New place', 'Title', 'Image link', 'Create');
});

formElement.addEventListener('submit', handleSubmit);

closePopBtn.addEventListener('click', closePopup);

document.querySelector('.pic-popup__close-button').addEventListener('click', ()=> {
	document.querySelector('.pic-popup').classList.remove('pic-popup_opened');
});