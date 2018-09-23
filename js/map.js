'use strict';

var MIN_OFFER_QUANTITY = 1;
var OFFER_QUANTITY = 8;
var OFFER_TITLES = [
  'Большая уютная квартира',
  'Маленькая неуютная квартира',
  'Огромный прекрасный дворец',
  'Маленький ужасный дворец',
  'Красивый гостевой домик',
  'Некрасивый негостеприимный домик',
  'Уютное бунгало далеко от моря',
  'Неуютное бунгало по колено в воде'
];
var OFFER_PRICES_RANGE = {
  min: 1000,
  max: 1000000
};
var OFFER_TYPES = [
  'palace',
  'flat',
  'house',
  'bungalo'
];
var OFFER_TYPE_NAMES = {
  flat: 'Квартира',
  bungalo: 'Бунгало',
  house: 'Дом'
};
var OFFER_TYPE_MIN_COST = {
  flat: 0,
  bungalo: 1000,
  house: 5000,
  palace: 10000
};
var OFFER_ROOMS_RANGE = {
  min: 1,
  max: 5
};
var OFFER_GUESTS_RANGE = {
  min: 1,
  max: 10
};
var OFFER_CHECKIN_TIMES = [
  '12:00',
  '13:00',
  '14:00'
];
var OFFER_CHECKOUT_TIMES = [
  '12:00',
  '13:00',
  '14:00'
];
var OFFER_FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
];
var OFFER_PHOTOS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];
var MAP_PIN_POSITION_Y_RANGE = {
  min: 130,
  max: 630
};

var map = document.querySelector('.map');
var mapPinsContainer = map.querySelector('.map__pins');
var mapPinMain = mapPinsContainer.querySelector('.map__pin--main');

var getXRange = function () {
  var mapPinPositionXRange = {};

  return mapPinPositionXRange = {
    min: Math.round(mapPinMain.offsetWidth / 2),
    max: Math.round(mapPinsContainer.offsetWidth - mapPinMain.offsetWidth / 2)
  };
};

var getRandomInt = function (min, max) {
  return Math.floor(Math.random() * (max + 1 - min)) + min;
};

var getRandomIndex = function (arrayLength) {
  return Math.floor(Math.random() * arrayLength);
};

var getOffersAvatars = function (offerQuantity) {
  var offersAvatars = [];
  var offerAvatarIndex;
  var offerAvatarImage = '';

  while (offersAvatars.length < offerQuantity) {
    offerAvatarIndex = getRandomInt(MIN_OFFER_QUANTITY, offerQuantity);
    offerAvatarImage = 'img/avatars/user0' + offerAvatarIndex + '.png';

    if (offersAvatars.indexOf(offerAvatarImage) === -1) {
      offersAvatars.push(offerAvatarImage);
    }
  }

  return offersAvatars;
};

var getOffersTitles = function (offerQuantity) {
  var offersTitles = [];
  var offerTitle;

  while (offersTitles.length < offerQuantity) {
    offerTitle = OFFER_TITLES[getRandomIndex(OFFER_TITLES.length)];

    if (offersTitles.indexOf(offerTitle) === -1) {
      offersTitles.push(offerTitle);
    }
  }

  return offersTitles;
};

var getOfferFeatures = function () {
  var offerFeatures = [];
  var featuresQuantity;
  var offerFeature;

  featuresQuantity = getRandomInt(1, OFFER_FEATURES.length);

  while (offerFeatures.length < featuresQuantity) {
    offerFeature = OFFER_FEATURES[getRandomIndex(OFFER_FEATURES.length)];

    if (offerFeatures.indexOf(offerFeature) === -1) {
      offerFeatures.push(offerFeature);
    }
  }

  return offerFeatures;
};

var getOfferPhotos = function () {
  var offerPhotos = [];
  var offerPhotoIndex;
  var offerPhotoLink;

  while (offerPhotos.length < OFFER_PHOTOS.length) {
    offerPhotoIndex = getRandomIndex(OFFER_PHOTOS.length);
    offerPhotoLink = OFFER_PHOTOS[offerPhotoIndex];

    if (offerPhotos.indexOf(offerPhotoLink) === -1) {
      offerPhotos.push(offerPhotoLink);
    }
  }

  return offerPhotos;
};

var getOfferParameters = function (offerQuantity) {
  var offers = [];
  var offerAvatars = getOffersAvatars(offerQuantity);
  var offerTitles = getOffersTitles(offerQuantity);
  var xRange = getXRange();

  for (var i = 0; i < offerQuantity; i++) {
    var locationX = getRandomInt(xRange.min, xRange.max);
    var locationY = getRandomInt(MAP_PIN_POSITION_Y_RANGE.min, MAP_PIN_POSITION_Y_RANGE.max);

    offers.push({
      author: {
        avatar: offerAvatars[i]
      },
      offer: {
        title: offerTitles[i],
        address: locationX + ', ' + locationY,
        price: getRandomInt(OFFER_PRICES_RANGE.min, OFFER_PRICES_RANGE.max),
        type: OFFER_TYPES[getRandomIndex(OFFER_TYPES.length)],
        rooms: getRandomInt(OFFER_ROOMS_RANGE.min, OFFER_ROOMS_RANGE.max),
        guests: getRandomInt(OFFER_GUESTS_RANGE.min, OFFER_GUESTS_RANGE.max),
        checkin: OFFER_CHECKIN_TIMES[getRandomIndex(OFFER_CHECKIN_TIMES.length)],
        checkout: OFFER_CHECKOUT_TIMES[getRandomIndex(OFFER_CHECKOUT_TIMES.length)],
        features: getOfferFeatures(),
        description: '',
        photos: getOfferPhotos()
      },
      location: {
        x: locationX,
        y: locationY
      }
    });
  }

  return offers;
};

var remvoeMapFade = function () {
  map.classList.remove('map--faded');
};

remvoeMapFade();

var renderMapPins = function (offers) {
  var mapPins = [];
  var mapPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  for (var i = 0; i < offers.length; i++) {
    var mapPin = mapPinTemplate.cloneNode(true);
    mapPin.style.top = String(offers[i].location.y) + 'px';
    mapPin.style.left = String(offers[i].location.x) + 'px';
    mapPin.style.transform = 'translate(-50%, -100%)';
    mapPin.querySelector('img').src = offers[i].author.avatar;
    mapPin.setAttribute('alt', offers[i].offer.title);

    mapPins.push(mapPin);
  }

  return mapPins;
};

var injectMapPinsToDOM = function (mapPins) {
  var mapPinsList = document.querySelector('.map__pins');
  var mapPinsContainer = document.createDocumentFragment();

  for (var i = 0; i < mapPins.length; i++) {
    mapPinsContainer.appendChild(mapPins[i]);
  }

  mapPinsList.appendChild(mapPinsContainer);
};

var offersParameters = getOfferParameters(OFFER_QUANTITY);
var mapPins = renderMapPins(offersParameters);
injectMapPinsToDOM(mapPins);

var renderMapCard = function (offers, offerNumber) {
  var mapCardTemplate = document.querySelector('#card').content.querySelector('.map__card');
  var mapCard = mapCardTemplate.cloneNode(true);

  mapCard.querySelector('.popup__avatar').src = offers[offerNumber].author.avatar;
  mapCard.querySelector('.popup__title').textContent = offers[offerNumber].offer.title;
  mapCard.querySelector('.popup__text--address').textContent = offers[offerNumber].location.x + ', ' + offers[offerNumber].location.y;
  mapCard.querySelector('.popup__text--price').textContent = offers[offerNumber].offer.price + ' \u20BD/ночь';
  var mapCardType = mapCard.querySelector('.popup__type');
  mapCardType.textContent = OFFER_TYPE_NAMES[offers[offerNumber].offer.type];
  mapCard.querySelector('.popup__text--capacity').textContent = offers[offerNumber].offer.rooms + ' комнаты для ' + offers[offerNumber].offer.guests + ' гостей';
  mapCard.querySelector('.popup__text--time').textContent = 'Заезд после ' + offers[offerNumber].offer.checkin + ', выезд до ' + offers[offerNumber].offer.checkout;
  var mapCardFeatures = mapCard.querySelector('.popup__features');
  while (mapCardFeatures.firstChild) {
    mapCardFeatures.removeChild(mapCardFeatures.firstChild);
  }
  for (var i = 0; i < offers[offerNumber].offer.features.length; i++) {
    var feature = document.createElement('li');
    feature.classList.add('feature', 'feature--' + offers[offerNumber].offer.features[i]);
    mapCard.querySelector('.popup__features').appendChild(feature);
  }
  mapCard.querySelector('.popup__description').textContent = offers[offerNumber].offer.description;

  var mapCardPhotosContainer = mapCard.querySelector('.popup__photos');
  var mapCardPhotoTemplate = mapCard.querySelector('.popup__photo');

  for (var i = 0; i < offers[offerNumber].offer.photos.length; i++) {
    if (i === 0) {
      mapCardPhotoTemplate.src = offers[offerNumber].offer.photos[i];
    } else {
      var mapCardPhoto = mapCardPhotoTemplate.cloneNode(true);
      mapCardPhoto.src = offers[offerNumber].offer.photos[i];
      mapCardPhotosContainer.appendChild(mapCardPhoto);
    }
  }

  return mapCard;
};

var injectMapCardToDOM = function (mapCard) {
  var map = document.querySelector('.map');
  var mapFilter = document.querySelector('.map__filters-container');
  var mapCardContainer = document.createDocumentFragment();
  mapCardContainer.appendChild(mapCard);
  map.insertBefore(mapCardContainer, mapFilter);
};

var mapCard = renderMapCard(offersParameters, MIN_OFFER_QUANTITY);
injectMapCardToDOM(mapCard);
