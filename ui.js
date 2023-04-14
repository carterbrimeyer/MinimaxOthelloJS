const Tile = {
    blank:{symbol:"&#9744", class:"td"},
    black:{symbol:"&#9899", class:"black"},
    white:{symbol:"&#9898", class:"white"}
  }
function processClick(game, r, c){
    game.processMove(r,c);
}
class UserInterface{
    constructor(size){
        this.size = size;
        this.grid = new Array(size);
        for (var i = 0; i < size; i++) {
          this.grid[i] = new Array(size);
        }
    }
    
    initBoard(game){
        var initGrid = document.createElement('table');
        initGrid.id = 'gridTable';
        initGrid.className = 'grid';
        for (var r=0;r<this.size;++r){
        var tr = initGrid.appendChild(document.createElement('tr'));
            for (var c=0;c<this.size;++c){
                var cell = tr.appendChild(document.createElement('td'));
                cell.addEventListener('click',(function(r,c){
                return function(){ processClick(game, r,c); }
                })(r,c),false);

                this.grid[r][c] = cell;
            }
        }
        const child = document.getElementById("grid");
        child.appendChild(initGrid);
    }
    updateBoard(game)
    {
        for(var r = 0; r < game.boardSize; r++){
            for(var c = 0; c < game.boardSize; c++){
                this.grid[r][c].innerHTML = game.board[r][c].symbol;
                this.grid[r][c].className = game.board[r][c].class;
            }
        }
        var score = document.getElementById("score");
        score.innerHTML = "Black: " + game.blackScore + " White: " + game.whiteScore;
    }
    updateBanner(str, seconds){
        var banner = document.getElementById("banner");
        banner.innerText = str;
        setTimeout(()=>{
            banner.innerText = "";
        }, seconds * 1000);
    }
}