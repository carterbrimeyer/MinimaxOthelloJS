function getAIMove(game)
{
    return minimax(game.board, true, game.aidepth, true, -Infinity, Infinity);
}

function getBestPlayerMove(game){
    return minimax(game.board, true, game.aidepth, false, -Infinity, Infinity);
}

function evaluateBoard(board) {
    let numBlackTiles = 0;
    let numWhiteTiles = 0;
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board.length; j++) {
        if (board[i][j] === Tile.black) {
          numBlackTiles++;
        } else if (board[i][j] === Tile.white) {
          numWhiteTiles++;
        }
      }
    }
    return numBlackTiles - numWhiteTiles;
}

function altevaluateBoard(board, isPlayerTurn) {
    let numBlackTiles = 0;
    let numWhiteTiles = 0;
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board.length; j++) {
        if (board[i][j] === Tile.black) {
          numBlackTiles++;
        } else if (board[i][j] === Tile.white) {
          numWhiteTiles++;
        }
      }
    }
    var possibleTileFlip = 0;
    getValidMoves(board, isPlayerTurn).forEach((m)=>{
        possibleTileFlip = Math.max(possibleTileFlip, m.value);
    });
    return (numBlackTiles - numWhiteTiles) + (isPlayerTurn ? -possibleTileFlip : possibleTileFlip);
}

function checkValue(board, r, c, x, y, isPlayerTurn) {
    const currentPlayerTile = isPlayerTurn ? Tile.black : Tile.white;
    const otherPlayerTile = isPlayerTurn ? Tile.white : Tile.black
    var toFlipNum = 0;
    var i = r + y, j = c + x;
    while(i >= 0 && j >= 0 && i < board.length && j < board.length){
        if(board[i][j] == otherPlayerTile){
            toFlipNum++;
        }
        if(board[i][j] == currentPlayerTile){
            return toFlipNum;
        }
        if(board[i][j] == Tile.blank){
            return 0;
        }
        i += y;
        j += x;
        if(i >= board.length || i < 0 || j > board.length || j < 0)
        {
            return 0;
        }
    }
    return toFlipNum;
  }

function getValidMoves(board, isPlayerTurn) {
    let moves = [];
    for (let r = 0; r < board.length; r++) {
      for (let c = 0; c < board.length; c++) {
        if(isValidMove(board, new move(r, c), !isPlayerTurn)){
            var m = new move(r, c);
            for (let i = -1; i <= 1; i++) {
                for (let j = -1; j <= 1; j++) {
                  if (i === 0 && j === 0) {
                    continue;
                  }
                  m.value += checkValue(board, m.row, m.col, i, j, false);
                }
              }
            moves.push(m);
        }
      }
    }
    return moves;
}

function isGameOver(board, isPlayerTurn){
    for(var i = 0; i < board.length; i++){
        for(var j = 0; j < board.length; j++){
          if(isValidMove(board, new move(i, j), isPlayerTurn))
          {
            return false;
          }
        }
      }
      return true;
}

function minimax(board, maxPlayer, depth, isPlayerTurn, a, b) {
    var bestMove = {value: altevaluateBoard(board, isPlayerTurn), move: getValidMoves(board, isPlayerTurn)[0] };
    if (depth == 0 || isGameOver(board, isPlayerTurn)) {
            return bestMove;
    }
    var moves = getValidMoves(board, isPlayerTurn);
    if(maxPlayer){
        bestMove.value = -Infinity;
        moves.forEach(m => {
            var value = 0;
            var n = minimax(makeMove(board, m, isPlayerTurn), false, depth -1, !isPlayerTurn, a, b);
            value += n.value;
            if(value > bestMove.value || bestMove.move == null)
            {
                bestMove.move = m;
                bestMove.value = value;
            }
            a = Math.max(a, value);
            if(value >= b) {
                return bestMove;
            }
        });
    }
    else{
        bestMove.value = Infinity;
        moves.forEach(m => {
            var value = 0;
            var n = minimax(makeMove(board, m, isPlayerTurn), true, depth -1, !isPlayerTurn, a, b);
            value += n.value;
            if(value < bestMove.value || bestMove.move == null)
            {
                bestMove.move = m;
                bestMove.value = value;
            }
            b = Math.min(b, value);
            if(value <= a){
                return bestMove;
            }
        });
    }
    return bestMove;
  }