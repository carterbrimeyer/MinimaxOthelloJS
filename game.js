
class othello {
  constructor(size, aidepth) {
    this.aidepth = aidepth;
    this.isOver = false;
    this.isPlayerTurn = true;
    this.boardSize = size;
    this.board = new Array(size);
    for (var i = 0; i < size; i++) {
      this.board[i] = new Array(size);
      for(var j = 0; j < size; j++)
      {
        this.board[i][j] = Tile.blank;
      }
    }
    this.UI = new UserInterface(size);
    this.UI.initBoard(this);
    this.board[size/2][size/2] = Tile.white;
    this.board[(size/2)-1][(size/2)-1] = Tile.white;
    this.board[(size/2)-1][size/2] = Tile.black;
    this.board[size/2][(size/2)-1] = Tile.black;

    this.whiteScore = 2;
    this.blackScore = 2;
    
    this.UI.updateBoard(this);
  }
  processMove(r, c)
  {
    if(!this.isPlayerTurn){
      this.UI.updateBanner("Not your turn!", 3);
      return;
    }
    if(!isValidMove(this.board, new move(r, c), this.isPlayerTurn) || this.isOver)
    {
      this.UI.updateBanner("Invalid Move!", 3);
      return;
    }
    this.board = makeMove(this.board, new move(r, c), this.isPlayerTurn);
    this.isPlayerTurn = !this.isPlayerTurn;
    this.getScore();
    if(this.checkWinner()){
      return;
    }


    var aimove = getAIMove(this);
    this.UI.grid[aimove.move.row][aimove.move.col].className = "picked";
    setTimeout(()=>{
        if(!this.isPlayerTurn ){
          this.board = makeMove(this.board, aimove.move, this.isPlayerTurn);
          this.isPlayerTurn = !this.isPlayerTurn;
          if(this.checkWinner()){
            return;
          }
          var playerMove = getBestPlayerMove(this);
          this.UI.grid[playerMove.move.row][playerMove.move.col].className = "playerBest";
        }
      }, 500);
  }

  getScore(){
    this.blackScore = 0;
    this.whiteScore = 0;
    for(var i = 0; i < this.boardSize; i++){
      for(var j = 0; j < this.boardSize; j++){
        switch(this.board[i][j]){
          case Tile.black:
            this.blackScore++;
            break;
          case Tile.white:
            this.whiteScore++;
            break;
        }
      }
    }
  }

  hasMoves(){
    for(var i = 0; i < this.boardSize; i++){
      for(var j = 0; j < this.boardSize; j++){
        if(isValidMove(this.board, new move(i, j), this.isPlayerTurn))
        {
          return true;
        }
      }
    }
    return false;
  }

  checkWinner(){
    this.getScore();
    this.UI.updateBoard(this);
    if(!this.hasMoves())
    {
      this.isOver = true;
      if(this.blackScore > this.whiteScore)
      {
        setTimeout(()=>{alert("Black Wins!")}, 500);
      }
      else if(this.blackScore < this.whiteScore)
      {
        setTimeout(()=>{alert("White Wins!")}, 500);
      }
      else
      {
        setTimeout(()=>{alert("Tie!")}, 500);
      }
      this.UI.updateBanner("Game Over!", 500);
      document.getElementById("replayButton").style.display='block';
      return true;
    }
    return false;
  }
}
function restartGame(game)
{
  document.getElementById("replayButton").style.display='none';
  document.getElementById("gridTable").outerHTML = "";
  game = new othello(game.boardSize, game.aidepth);
}