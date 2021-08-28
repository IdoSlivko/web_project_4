


const editBtn = document.querySelector('.profile__edit-profile');
const addImgBtn = document.querySelector('.profile__add-photo');

const closeProfileBtn = document.querySelector('.popup__close-profile');
const closeImageBtn = document.querySelector('.popup__close-add-image');
const closeLargeImageBtn = document.querySelector('.popup__close-large-image');

const popProfileDisplay = document.querySelector('.popup_profile');
const popImageDisplay = document.querySelector('.popup_add-image');
const popLargeImageDisplay = document.querySelector('.popup_large-image');

const formProfile = document.querySelector('.popup__profile-form');
const formImage = document.querySelector('.popup__add-image-form');

const popProfileTitle = document.querySelector('.popup__profile-title');
const popImageTitle = document.querySelector('.popup__add-image-title');

const userNameInput = document.querySelector('.popup__input_content_full-name');
const userAboutInput = document.querySelector('.popup__input_content_about');

const imageTitleInput = document.querySelector('.popup__input_content_add-image-title');
const imageLinkInput = document.querySelector('.popup__input_content_add-image-link');

const popProfileSubmit = document.querySelector('.popup__profile-submit');
const popImageSubmit = document.querySelector('.popup__add-image-submit');

const name = document.querySelector('.profile__name');
name.textContent = 'Jacques Cousteau';

const about = document.querySelector('.profile__occupation');
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



function openPopup(popup) { popup.classList.add('popup_opened'); }
function closePopup(popup) { popup.classList.remove('popup_opened'); }

function editProfile(title, submit)
{
	openPopup(popProfileDisplay);

	popProfileTitle.textContent = title;
	userNameInput.focus();
	userNameInput.value = name.textContent;
	userAboutInput.value = about.textContent;
	popProfileSubmit.textContent = submit;
}

function handleProfileSubmit(evt)
{
	evt.preventDefault();

	name.textContent = userNameInput.value;
	about.textContent = userAboutInput.value;

	closePopup(popProfileDisplay);
}

function editImage(title, submit)
{
	openPopup(popImageDisplay);

	popImageTitle.textContent = title;
	imageTitleInput.focus();
	imageTitleInput.value = '';
	imageLinkInput.value = '';
	popImageSubmit.textContent = submit;
}

function handleImageSubmit(evt)
{
	evt.preventDefault();

	elementsContainer.prepend(renderImg(imageTitleInput.value, imageLinkInput.value));
	
	closePopup(popImageDisplay);
}

function renderImg(imgTitle, link)
{
	const imageItem = imageTemplate.querySelector('.elements__item').cloneNode(true);

	imageItem.querySelector('.elements__title').textContent = imgTitle;
	imageItem.querySelector('.elements__image').src = link;
	imageItem.querySelector('.elements__image').alt = imgTitle;

	imageItem.querySelector('.elements__delete-button').addEventListener('click', () => {
			imageItem.remove();
	});

	imageItem.querySelector('.elements__like-button').addEventListener('click', () => {
		imageItem.querySelector('.elements__like-button').classList.toggle('elements__like-button_active');
	});

	imageItem.querySelector('.elements__image').addEventListener('click', () => {
		openPopup(popLargeImageDisplay);
		document.querySelector('.popup__image').src = link;
		document.querySelector('.popup__caption').textContent = imgTitle;
	});

	return imageItem;
}



initialCards.forEach(item => { elementsContainer.prepend(renderImg(item.name, item.link)); });

editBtn.addEventListener('click', () => {	editProfile('Edit profile', 'Save'); });
closeProfileBtn.addEventListener('click', () => {	closePopup(popProfileDisplay); });
formProfile.addEventListener('submit', handleProfileSubmit);

addImgBtn.addEventListener('click', () => {	editImage('New place', 'Create'); });
closeImageBtn.addEventListener('click', () => {	closePopup(popImageDisplay); });
formImage.addEventListener('submit', handleImageSubmit);

closeLargeImageBtn.addEventListener('click', () => {	closePopup(popLargeImageDisplay); });