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
var cValue = 0;
var pValue = 0;
var cCard;
var pCArd;
var warCards = [];

function start() {
  $('.start-button').on('click', event => {
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
    $('.Start-Page').addClass("hidden");
    $('.Game-Board').removeClass('hidden');
    $('.C-Counter').html(deck1.length);
    $('.P-Counter').html(deck2.length);
    handleFlipButtonClick();
    handleWarButtonClick();
}

function handleFlipButtonClick() {
   $('.Flip-Button').on('click', function(event){
    flipComputerCard(deck1);
    flipPlayerCard(deck2);
    evaluate();
  });  
}

function flipComputerCard(pile) {
  cValue = pile[0].value;
  cCard = pile[0];
  const display = showCard(pile.shift());
  $('.Computer-Play').html(display);
}

function flipPlayerCard(pile) {
  pValue = pile[0].value;
  pCard = pile[0];
  const display = showCard(pile.shift());
  $('.Player-Play').html(display);
}

function evaluate() {
  if (cValue === pValue) {
    $('.C-Status').html("TIE");
    $('.P-Status').html("TIE");
    instigate();
  }
  else if (cValue > pValue) {
    $('.C-Status').html("WINNER");
    $('.P-Status').html("");
    deck1.push(cCard);
    deck1.push(pCard);
  }
  else {
    $('.P-Status').html("WINNER");
    $('.C-Status').html("");
    deck2.push(cCard);
    deck2.push(pCard);
  }
  $('.C-Counter').html(deck1.length);
  $('.P-Counter').html(deck2.length);
}

function instigate () {
  $('.Flip-Button').addClass("hidden");
  $('.War-Button').removeClass('hidden');
}

function handleWarButtonClick() {
  $('.War-Button').on('click', function(event) {
    warCards.push(deck1.shift());
    warCards.push(deck2.shift());
    console.log('down cards:',warCards);
    flipComputerCard(deck1);
    flipPlayerCard(deck2);
    evaluateWAR();
  });
    
}

function evaluateWAR() {
  if (cValue === pValue) {
    $('.C-Status').html("THE WAR CONTINUES");
    $('.P-Status').html("THE WAR CONTINUES");
    instigate();
  }
  else if (cValue > pValue) {
    $('.C-Status').html("WINNER");
    $('.P-Status').html("");
    deck1.push(warCards);
    warCards = [];
    deck1.push(cCard);
    deck1.push(pCard);
    console.log(deck1);
  }
  else {
    $('.P-Status').html("WINNER");
    $('.C-Status').html("");
    deck2.push(warCards);
    warCards = [];
    deck2.push(cCard);
    deck2.push(pCard);
    console.log(deck2);
  }
  deescalate();
  $('.C-Counter').html(deck1.length);
  $('.P-Counter').html(deck2.length);
}

function deescalate() {
  $('.War-Button').addClass("hidden");
  $('.Flip-Button').removeClass('hidden');
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