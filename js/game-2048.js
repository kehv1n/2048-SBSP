// Start with generating a tile that chooses two random positions in the array
// and fills them with 2's && It also have to figure out:
// - only add values to available positions
// kevsGame = new Game2048()

function Game2048 (name) {  //pass in name bc every game will have a new player
  // Anything that the constructor cant figure out on its own
  this.score = 0; // Because All games start at 0..
  this.board = [
  [null, null, null, null], // Since its a 4x4 Board Game with
  [null, null, null, null], // 16 Tiles in total
  [null, null, null, null], // Index's Represent the tiles
  [null, null, null, null]
];
  this.hasWon = false; // Easier to check to see if these Booleans are true
  this.hasLost = false; // Or false

  this._generateTile();
  this._generateTile();

}

// What does the user do directly?? Vs Indirectly..
// The user doesn't have to know how the game works.. Only has to use it

  Game2048.prototype._generateTile = function () {
    // We dont want the user to interact directly with it
    // Must happen "behind the scenes"
    var tileValue;

    if (Math.random() < 0.8) {
      tileValue = 2;
    } else {
      tileValue = 4;
    }
    var emptyTiles = this._getAvailablePosition();

    if (emptyTiles !== null ) {
      var row = emptyTiles.x;
      var col = emptyTiles.y;
      this.board[row][col] = tileValue;
    }
  };

  Game2048.prototype._getAvailablePosition = function ( ) {
    var emptyTiles = [];

    this.board.forEach(function (row, rowIndex ){
      row.forEach (function (colum, colIndex){
        if (colum === null) {
         emptyTiles.push({x:rowIndex, y:colIndex}); // Pushes empty tile Index into EmptyTile Array
        }
      });
    });

    if (emptyTiles.length === 0) {
      return null;
    }

    var randomIndex = Math.floor(Math.random() * emptyTiles.length); // Generates random number
    return emptyTiles[randomIndex]; // based off the amount of emptyTiles (length)
    //pushes that into functuion above
  };

  Game2048.prototype._renderBoard = function () {
    this.board.forEach(function(row) {
      console.log(row);
    });
  };

  Game2048.prototype.moveLeft = function() {
    var updatedBoard = [];


    this.board.forEach(function(row){
        //1. Remove Empties from row
        var newRow = [];

        row.forEach(function (cell){
          if (cell !== null) {
            newRow.push(cell);
          }
        });

        //2. Merge tiles that are together & the same number
        for(var i = 0; i < newRow.length; i += 1) {
            if(newRow[i] === newRow[i+1]) {
              newRow[i] *= 2;
              newRow[i+1] = null;
            }
        }
        //3. Remvoe new empties in the middle
        // e.g [8,8,4]->[16,null,4]
        var moved = [];

        newRow.forEach(function (cell){
          if (cell !== null) {
            moved.push(cell); //[16,null,4] -> [16,4] Removig Nulls
          }
        });


        //4. If row has 4, don't do anything
        while (moved.length < 4) {
          moved.push(null);
        }
        updatedBoard.push(moved);
      });
      this.board = updatedBoard;
    };
