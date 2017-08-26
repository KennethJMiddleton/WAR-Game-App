const cardsUrl = 'https://deckofcardsapi.com/api/deck/new/draw/?count=52';

function getDeck(callback) {
	const deck = {
		url: cardsUrl,
		dataType: 'json',
    	type: 'GET',
   		success: callback
	};
	$.ajax(deck);
}

function showCard(data) {
  console.log(data);
	return `
    <div>
      <img src='${data.image}'/> 
    </div>
  `;
}

function showDeck(data) {
  console.log(data);
  const deck = data.cards.map((item, index) => showCard(item));
  $('.js-play-space').html(deck);
}

function start() {
  $('.start-button').on('click', event => {
    event.preventDefault();
    getDeck(showDeck);
  });
}

$(start);