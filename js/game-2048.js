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
  this.boardHasChanged = false;

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
    console.log('current Score: ' + this.score + ' great job!');
  };

  Game2048.prototype.moveLeft = function() { /// MOVE LEFT
    var updatedBoard = [];
    var theGame = this;


    this.board.forEach(function(row){
        //1. Remove Empties from row
        var newRow = [];

        row.forEach(function (cell){
          if (cell !== null) {
            newRow.push(cell);
          }
        });

        //2. Merge tiles that are together & the same number
        for(var i = 0; i < newRow.length; i += 1) { // INCREMENTAL LOOP
            if(newRow[i] === newRow[i+1]) {
              newRow[i] *= 2;
              newRow[i+1] = null;

              theGame._updateScore(newRow[i]);
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

        if (moved.length !== row.length){
          theGame.boardHasChanged = true;
        }


        //4. If row has 4, don't do anything
        while (moved.length < 4) {
          moved.push(null);
        }
        updatedBoard.push(moved);
      });
      this.board = updatedBoard;
    };

    Game2048.prototype.moveRight = function() { /// MOVE Right
      var updatedBoard = [];
      var theGame = this;


      this.board.forEach(function(row){
          //1. Remove Empties from row
          var newRow = [];

          row.forEach(function (cell){
            if (cell !== null) {
              newRow.push(cell);
            }
          });

          //2. Merge tiles that are together & the same number
          for(var i = (newRow.length - 1); i >= 0 ; i -= 1) { //Decremental Loop
              if(newRow[i] === newRow[i-1]) {
                newRow[i] *= 2;
                newRow[i-1] = null;
                theGame._updateScore(newRow[i]);
              }
          }
          //3. Remvoe new empties in the middle
          // e.g [8,8,4]->[16,null,4]
          var moved = [];

          newRow.forEach(function (cell){
            if (cell !== null) {
              moved.push(cell); //[16,null,4] -> [16,4] Removing Nulls
            }
          });

          if (moved.length !== row.length){
            theGame.boardHasChanged = true;
          }


          //4. If row has 4, don't do anything
          while (moved.length < 4) {
            moved.unshift(null); // PUTS nulls in the front instead of the back w unshift
          }

          updatedBoard.push(moved);
        });
        this.board = updatedBoard;
      };

      Game2048.prototype._transposeMatrix = function () {
  for (var row = 0; row < this.board.length; row++) {
    for (var column = row+1; column < this.board.length; column++) {
      var temp = this.board[row][column];
      this.board[row][column] = this.board[column][row];
      this.board[column][row] = temp;
    }
  }
};

      Game2048.prototype.moveUp = function () {
        this._transposeMatrix();
        this.moveLeft();
        this._transposeMatrix();

      };

      Game2048.prototype.moveDown = function () {
        this._transposeMatrix();
        this.moveRight();
        this._transposeMatrix();

      };


      Game2048.prototype.move = function (direction){
        if (this.hasWon || this.hasLost) {
          return;
        }

        switch (direction) {
          case 'up':
          this.moveUp();
            break;
            case 'down':
            this.moveDown();
            break;
            case 'left':
            this.moveLeft();
            break;
            case 'right':
            this.moveRight();
            break;

        }
        if (this.boardHasChanged ){
          this._generateTile();
          this._isGameLost();
          this.boardHasChanged = false;
        }
      };

      Game2048.prototype._updateScore = function (points) {
        this.score += points;

        if (points === 2048 ) {
          this.hasWon = true;
        }
      };

      Game2048.prototype._isGameLost = function () {
        if(this._getAvailablePosition() !== null) {
          return;
        }

        var theGame = this;

        this.board.forEach(function (row, rowIndex) {
          row.forEach(function (row, rowIndex) {
            var current = theGame.board[rowIndex][colIndex];
            var top, bottom, left, right;

               if (theGame.board[rowIndex][colIndex - 1]) {
                 left  = that.board[rowIndex][colIndex - 1];
               }
               if (theGame.board[rowIndex][colIndex + 1]) {
                 right = that.board[rowIndex][colIndex + 1];
               }
               if (theGame.board[rowIndex - 1]) {
                 top    = that.board[rowIndex - 1][colIndex];
               }
               if (theGame.board[rowIndex + 1]) {
                 bottom = that.board[rowIndex + 1][colIndex];
               }
              if (current === top || current === bottom || current === left || current === right) {
                theGame.hasLost = true;
             }
          });
        });
      };
