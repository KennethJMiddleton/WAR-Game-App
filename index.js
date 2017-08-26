const cardsUrl = 'https://deckofcardsapi.com/api/deck/new/draw/?count=52';
/*const CARD_VALUES = {
  '2': 2,
  '3': 3,
  '4': 4,
  '5': 5,
  '6': 6,
  '7': 7,
  '8': 8,
  '9': 9,
  '10': 10,
  'JACK': 11,
  'QUEEN': 12,
  'KING': 13,
  'ACE': 14
};*/

var fullDeck = [];
var deck1 = [];
var deck2 = [];

function start() {
  $('.start-button').on('click', event => {
    event.preventDefault();
    getDeck(data => {
      fixDeck(data);
      //console.log('deck :',fullDeck);
      splitDeck(fullDeck);
      renderPlayScreen();
    });
  });
}

function getDeck(callback) {
  const deck = {
    url: cardsUrl,
    dataType: 'json',
      type: 'GET',
      success: callback
  };
  $.ajax(deck);
}

function fixDeck(data) {
  var shoe = data.cards;
  //console.log('shoe:',shoe);
  fullDeck = shoe.map(normalizeValue);
  //console.log('full fixed deck:',fullDeck);
}

function normalizeValue (card){
  switch(card.value) {
    case 'JACK':
      card.value = 11;
      break;
    case 'QUEEN':
      card.value = 12;
      break;
    case 'KING':
      card.value = 13;
      break;
    case 'ACE':
      card.value = 14;
      break;
    default:
      card.value = parseInt(card.value, 10);
      break;
  }
  return card;
}

function splitDeck(deck) {
  for (i = 0; i < 52; i++){
    if (i%2 === 0) {
      deck1.push(deck[i]);
    }
    else {
      deck2.push(deck[i]);
    }
  }
  //console.log("deck 1:", deck1);
  //console.log("deck 2:", deck2);
}

function renderPlayScreen() {
   event.preventDefault();
    $('.Start-Page').addClass("hidden");
    $('.Game-Board').removeClass('hidden');
}

















function showCard(data) {
  console.log('showCard: ', data);
  return `
    <div>
      <img src='${data.image}'/> 
    </div>
  `;
}

function showDeck(data) {
  console.log('showDeck:', data);
  const deck = data.cards.map((item, index) => showCard(item));
  $('.js-play-space').html(deck);
}


$(start);