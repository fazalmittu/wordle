var height = 6;
var width = 5;

var row = 0; //what guess they at
var col = 0; //position that they are at int he word

var gameOver = false;
var word = "ALLOW";

window.onload = function() {
    initialize();
}

function initialize() {

    //creates initial "board" for tiles
    //separate id created for each tile based on indices in array (5x6)

    for (let i = 0; i < height; i++) {
        for (let j = 0; j < width; j++) {
           let tile = document.createElement("span");
           tile.id = i.toString() + "-" + j.toString();
           tile.classList.add("tile");
           tile.innerText = "";
           document.getElementById("board").appendChild(tile);
        }
    }

    document.addEventListener("keyup", (e) => {//register when key comes back up after press
        if (gameOver) return;

        if ("KeyA" <= e.code && e.code <= "KeyZ") {
            if (col < width) {
                var currTile = document.getElementById(row.toString() + "-" + col.toString());
                var currVal = "";
                if (currTile) {
                    currVal = currTile.value;
                }

                // let currTile = document.getElementById(row.toString() + '-' + col.toString());
                if (currTile.innerText == "") {
                    currTile.innerText = e.code[3];
                    col++;
                }
            }
        } else if (e.code == "Backspace") {
            if (0 < col && col <= width) {
                col -=1;
            }

            var currTile = document.getElementById(row.toString() + "-" + col.toString());
            var currVal = "";

            if (currTile) {
                currVal = currTile.value;
            }

            currTile.innerText = "";
        } else if (e.code == "Enter") {
            if (col == 5) {
                update();
                row += 1;
                col = 0;
            }
        }

        if (!gameOver && row == height) {
            gameOver = true;
            document.getElementById("answer").innerText = word;
        }
        
    }) 

}

function update() {
    let correct = 0;
    // let guessWord = "";
    // [A, L, L, O, W]
    let correctWordArr = [];
    for (let i = 0; i < width; i++) {
        correctWordArr.push(word[i]);
    }

    let presentWordArr = [];
    for (let i = 0; i < width; i++) {
        presentWordArr.push(word[i]);
    }

    //have an array with all the letters; have a for loop that checks
    //for correct letters first. if you get correct letters, update the 
    //correctWordArr array. then check if words are inside of the array
    //for present values



    

    for (let i = 0; i < width; i++) {
        console.log("CORRECT", correctWordArr);

        var currTile = document.getElementById(row.toString() + "-" + i.toString());
        var currVal = "";

        if (currTile) {
            currVal = currTile.value;
        }

        if (currTile.innerText == correctWordArr[i]) {
            correct++;
            currTile.classList.add("correct");

            correctWordArr[i] = "";
            presentWordArr[i] = "";
        }
    }

    for (let i = 0; i < width; i++) {

        var currTile = document.getElementById(row.toString() + "-" + i.toString());
        var currVal = "";

        if (currTile) {
            currVal = currTile.value;
        }

        if (presentWordArr.includes(currTile.innerText)) {
            currTile.classList.add("present");
            presentWordArr[presentWordArr.indexOf(currTile.innerText)] = "";
        }
    }

    for (let i = 0; i < width; i++) {
        var currTile = document.getElementById(row.toString() + "-" + i.toString());
        var currVal = "";

        if (currTile) {
            currVal = currTile.value;
        }

        if (currTile.classList.length == 0) {
            currTile.classList.add("absent");
        }
    }

    if (correct == width) {
        gameOver = true;
        document.getElementById("answer").innerText = "Solved!";
    }
}
