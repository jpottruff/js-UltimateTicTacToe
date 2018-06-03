
/* variable declarations */


var largeBoard = document.getElementsByClassName("largeTile"); 		//largeBoard array created based on td elements with ID largeTile
var largeSelected; //used as variable to idenitfy which large cell the player is currently working in - see smallCellClicked
var currentBoard = document.getElementsByClassName("smallBoard"); //array of small boards


var player = "X"; //representation of current player

var smallEmptyCells = [9, 9, 9, 9, 9, 9, 9, 9, 9]; //array of empty cells - one index per small board, correpsonds with large cell index (ie. smallEmptyCells[0] is the number that corresponds with the small board at largeBoard[0])
var smallGameOver = [false, false, false, false, false, false, false, false, false]; //keeps track of which smallBoards are still in progress, similar logic to smallEmptyCells
var largeEmptyCells = 9;	//keeps track of large empty cells, used to evaluate overall game status

var largeGameOver = false;	//game status of large board

var winningCombos = [[0, 1, 2], [3, 4, 5], [6, 7, 8],
				    [0, 3, 6], [1, 4, 7], [2, 5, 8],
				    [0, 4, 8], [2, 4, 6]
				    ];								//2d array of winning combinations - horizontal, vertical, diagonal



/* functions */

var largeTokens;["", "", "", "", "", "", "", "", ""]; //array to keep track of winning tokens on board - IMPROVE LATER

function clickLarge(cell){

		//highlights currently selected large cell, clears others of any previous highlighting
		//also assigns a number to the largeSelected variable (used in functions that follow)
		for (var i = 0; i < largeBoard.length; i++){
			if (cell === largeBoard[i]) {
				largeBoard[i].style.backgroundColor = "rgba(190, 190, 190, 0.5)"; //highlighting current large cell
				largeSelected = i;
			} else {
				largeBoard[i].style.backgroundColor = "white";
			}

		}

	//FIXME: need to add somethign that ensures when user clicks on a large cell that has previously been clicked, the small cell will not be selected automatically, find work around for this...or
		//OR ensure user is sent to largecell that correpsonds with last user's move (Option chosen depends on which rules are being followed)

	currentBoard = largeBoard[largeSelected].getElementsByTagName("td"); //referencing the smallBoard in current large cell clicked, creates an array of "td" elements


	//event listener for currentBoard (in this large cell)
	for (var i = 0; i < currentBoard.length; i++){
		currentBoard[i].addEventListener("click", function() {smallCellClicked(this);})
	}
	//note: will now go to smallCellclicked

}


function smallCellClicked(cell){
	//checks to see if space clicked is open
	if (cell.innerHTML === "") {

		smallEmptyCells[largeSelected] -= 1; 					//removes one empty cell from emptycell counter; see smallEmptyCells array
		cell.innerHTML = player;								//changes cell clicked to player's token
		smallCheckWin();										//checks to see if this small board has a winner; see smallCheckWin function
		player = (player == "X") ? "O" : "X";					//changes player token
		document.getElementById("player").innerHTML = player;	//change player display in HTML

	}

}

function smallCheckWin(){

	//outcome for wins
	for ( i = 0; i < winningCombos.length; i++) {
        if (currentBoard[winningCombos[i][0]].innerHTML == currentBoard[winningCombos[i][1]].innerHTML
            && currentBoard[winningCombos[i][1]].innerHTML == currentBoard[winningCombos[i][2]].innerHTML
            && currentBoard[winningCombos[i][0]].innerHTML != "") {
				largeBoard[largeSelected].innerHTML = '<span class="largeToken">' + player + '</span>'; //changes large board to winning player token
					//FIXME IDEA: maybe try adding in a parentElement.removeChild (smallGame) here (see personal notes) - could maybe use same ceck win for large cells later on ??
				smallGameOver[largeSelected] = true;

				//largeCheckWin();			/*PUT IN WHEN FUNCTION FIXED*/
				break;				// no longer need to evaluate
			}
	}

	//outcome for draws
	if (smallEmptyCells[largeSelected] === 0 && smallGameOver[largeSelected] == false) {
		largeBoard[largeSelected].innerHTML = '<span class="largeToken">-</span>';	// changes large board to blocked square
		smallGameOver[largeSelected] = true;
		//largeCheckWin();					/*PUT IN WHEN FUNCTION FIXED*/
		}
}



/*FIXME - won't pick up winning combos/draws on largeBoard - displays message at wrong time*/

function largeCheckWin(){
	//NOTE: clarify logic for this 'for statement' taken from: http://codepen.io/ProfWendi/pen/MJyRyB?editors=0110 , modified to fit exisitng code
    console.log("in large check win");
	for ( i = 0; i < winningCombos.length; i++) {
        if (largeBoard[winningCombos[i][0]].innerHTML == largeBoard[winningCombos[i][1]].innerHTML
            && largeBoard[winningCombos[i][1]].innerHTML == largeBoard[winningCombos[i][2]].innerHTML
            && largeBoard[winningCombos[i][0]].innerHTML != '') {
				document.getElementById("winner").innerHTML = "Game Over! Player " + player + " wins!";
				largeGameOver = true;
				break;				// no longer need to evaluate
			}
	}

	//outcome for draws
	if (largeEmptyCells === 0 && largeGameOver == false) {
		document.getElementById("winner").innerHTML = "Game over. It's a draw!"; /*MODIFY*/

		largeGameOver[largeSelected] = true;

		}
}



/* events */

//listens for click on large cells - shows which large cell was selected via function
	for (var i = 0; i < largeBoard.length; i++){
			largeBoard[i].addEventListener("click", function() {clickLarge(this);});	//note: passing in this object(ie. cell clicked) to anonymous function that passes it into the clickLarge function
	}
