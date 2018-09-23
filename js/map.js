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
    max: Math.round(mapPinsContainer.offsetWidth + mapPinMain.offsetWidth / 2)
  };
};

var getRandomInt = function (min, max) {
  return Math.floor(Math.random() * (max + 1 - min)) + min;
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
