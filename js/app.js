//1. create game object

var myGlobalGame;

$(document).ready(function(){
  myGlobalGame = new Game2048();

//2. take the inital tiles and put them on the screen

renderTiles();
loadSounds();

$(document).keydown(function (ev){
  var acceptableKeys = [37,65,38,67,39,68,40,40,83, 87,27];
  if (!acceptableKeys.includes(ev.keyCode)) {
    return;
  }
  //prevent arrow key from scrolling
  ev.preventDefault();
  switch (ev.keyCode) {
    case 37: //left arrow
    case 65: //a
      myGlobalGame.move('left');
      break;
    case 38: //up arrow
    case 87: //w
      myGlobalGame.move('up');
      break;
    case 39: //right arrow
    case 68: //d
      myGlobalGame.move('right');
      break;
    case 40: //down arrow
    case 83: //s
      myGlobalGame.move('down');
      break;
    case 27: //esc key (h4ks)
      myGlobalGame.hasWon = true;
      break;
  }
  renderTiles();
  updateScore();
  checkIfDone();
});


//3. handle keyboard events
//4. move the board in object based on keypresses (up,down.left, right, and s)
//5. updating the screen based on the new board state
//6. win or lose (maybe)


});

function renderTiles() {
  $('#tile-container').empty();
  myGlobalGame.board.forEach(function (row, rowIndex) {
    // console.log('row is:' + row);
    row.forEach(function (row, colIndex){
      if (row === null) {
        return;
      }

      // console.log('Tile Value ' + row);
      // console.log('Row ' + rowIndex);
      // console.log('Column ' + colIndex);

      var tileHTML = '<div class="tile tile-position-'+rowIndex+'-'+colIndex+' val-'+row+'"> '+row+'</div>';
      // console.log(tileHTML);
      $('#tile-container').append(tileHTML);

    });
  });
}

function updateScore() {
  $('#score').html(myGlobalGame.score);
}

function checkIfDone () {
  if(myGlobalGame.hasWon) {
    $('#game-board').remove();
    var winnerHTML = '<img src="https://media.giphy.com/media/ya3hdxTPypMBi/giphy.gif" alt = "winner">';
    ion.sound.play('goofygoober');
    $('body').append(winnerHTML);
  } else if (myGlobalGame.hasLost) {
    $('#game-board').remove();
    var loserHTML = '<img src= "https://media.giphy.com/media/BpXaE6d32x344/giphy.gif" alt = "loser">';
    ion.sound.play('loser');
    $('body').append(loserHTML);
  }
}

function loadSounds () {
  ion.sound ({
    sounds: [{name: 'goofygoober'}, {name: 'loser'}],
    path: 'lib/ion-sound/sounds/',
    preload: true,
    volume: 1.0
  });
}
