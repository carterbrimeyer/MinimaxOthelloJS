class move {
    constructor(row, col)
    {
        this.row = row;
        this.col = col;
        this.value = 0;
    }
}

function isValidMove(board, move, isPlayerTurn) {
  if(board[move.row][move.col] != Tile.blank){
    return false;
  }
  const currentPlayerTile = isPlayerTurn ? Tile.black : Tile.white;  
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      if (i === 0 && j === 0) {
        continue;
      }
      if(checkDirection(board, move.row, move.col, i, j, isPlayerTurn).length > 0)
      {
        return true;
      }
    }
  }
  return false;
  }
  

  function makeMove(board, move, isPlayerTurn) {
    if(!isValidMove(board, move, isPlayerTurn))
    {
        return board;
    }

    var newBoard = [];
    for (var i = 0; i < board.length; i++)
    newBoard[i] = board[i].slice();

    const currentPlayerTile = isPlayerTurn ? Tile.black : Tile.white;  
    newBoard[move.row][move.col] = currentPlayerTile;
    var toFlip = [];
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        if (i === 0 && j === 0) {
          continue;
        }
        checkDirection(newBoard, move.row, move.col, i, j, isPlayerTurn).forEach(piece => {
            toFlip.push(piece);
        });
      }
    }
    toFlip.forEach(piece => {
        newBoard[piece.row][piece.col] = currentPlayerTile;
    });
    return newBoard;
  }

  function checkDirection(board, r, c, x, y, isPlayerTurn) {
    const currentPlayerTile = isPlayerTurn ? Tile.black : Tile.white;
    const otherPlayerTile = isPlayerTurn ? Tile.white : Tile.black
    var toFlip = [];
    var i = r + y, j = c + x;
    while(i >= 0 && j >= 0 && i < board.length && j < board.length){
        if(board[i][j] == otherPlayerTile){
            toFlip.push(new piece(i, j));
        }
        if(board[i][j] == currentPlayerTile){
            return toFlip;
        }
        if(board[i][j] == Tile.blank){
            return [];
        }
        i += y;
        j += x;
        if(i >= board.length || i < 0 || j > board.length || j < 0)
        {
            return [];
        }
    }
    return [];
  }