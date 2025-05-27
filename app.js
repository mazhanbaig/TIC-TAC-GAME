// DATA FROM USER:
let player1=prompt("Enter your player 1 name (O)");
let player2="AI";
// ACCESS TO ELEMENTS:
let boxes=document.querySelectorAll(".game-btn");
let resetbtn=document.querySelector("#restart-btn");
let new_game_btn=document.querySelector("#new-game-btn");
let msg=document.querySelector("#msg");
const playButton = document.querySelector("#play");
const playInfo = document.querySelector("#play-info");
//  CONDITION:
let turnO=true;
new_game_btn.style.display="none"
// WIN PATTERN: 
let winPattern = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
];
// PUTTING VALUE INSIDE THE BUTTONS
boxes.forEach((box)=>{
    box.addEventListener("click",()=>{
        if(turnO===true && box.innerText===""){
            box.innerText='O';
            turnO=false;
        }
        else{
            box.innerText='X';
            turnO=true;
        }
        box.disabled=true;
        checkwinner();
        if(isBoardFull()===true && checkwinner()===false){
            msg.innerText="IT'S A TIE,GOOD LUCK NEXT TIME";
        }
       // === CALL AI MOVE HERE ===
        setTimeout(aiMove, 300); // slight delay for realism
        restartgame();
        newgame();
    });
});
// AI move for player X:
// AI FUNCTION:
function aiMove() {
    if (!turnO && !checkwinner() && !isBoardFull()) {
        let emptyBoxes = Array.from(boxes).filter(box => box.innerText === '');

        // Step 1: Try to win
        for (let pattern of winPattern) {
            let [a, b, c] = pattern;
            let values = [boxes[a].innerText, boxes[b].innerText, boxes[c].innerText];
            if (values.filter(v => v === "X").length === 2 && values.includes("")) {
                let emptyIndex = [a, b, c][values.indexOf("")];
                boxes[emptyIndex].innerText = "X";
                boxes[emptyIndex].disabled = true;
                turnO = true;
                checkwinner();
                return;
            }
        }

        // Step 2: Block opponent (O)
        for (let pattern of winPattern) {
            let [a, b, c] = pattern;
            let values = [boxes[a].innerText, boxes[b].innerText, boxes[c].innerText];
            if (values.filter(v => v === "O").length === 2 && values.includes("")) {
                let emptyIndex = [a, b, c][values.indexOf("")];
                boxes[emptyIndex].innerText = "X";
                boxes[emptyIndex].disabled = true;
                turnO = true;
                checkwinner();
                return;
            }
        }

        // Step 3: Random move
        if (emptyBoxes.length > 0) {
            let randomBox = emptyBoxes[Math.floor(Math.random() * emptyBoxes.length)];
            randomBox.innerText = "X";
            randomBox.disabled = true;
            turnO = true;
            checkwinner();
        }

        // Step 4: Tie check
        if (isBoardFull() && checkwinner()===false) {
            msg.innerText = "IT'S A TIE, GOOD LUCK NEXT TIME";
        }
    }
}

//THIS FUNCTION CHECKS IF ALL BOXES ARE FILLED 
function isBoardFull() {
    for (let box of boxes) {
        if (box.innerText === "") {
            return false; // found an empty box, so board is not full
        }
    }
    return true; // all boxes filled
}

// restart function 
 let restartgame=()=>{
    resetbtn.addEventListener("click",()=>{
    for (let box of boxes) {
        box.innerText='';
        box.disabled=false; 
        turnO=true;   
        msg.innerText="";    
    }
}); 
}   
// new game function 
 let newgame=()=>{
    new_game_btn.addEventListener("click",()=>{
    for (let box of boxes) {
        box.innerText='';
        box.disabled=false;  
        turnO=true;  
        msg.innerText="";
        new_game_btn.style.display="none";    
    }
}); 
};
// paly button function event 
playButton.addEventListener("click", () => {
  playInfo.classList.toggle("hidden");
});

// WINNER CHECKING FUNCTION 
let checkwinner = () => {
  for (let pattern of winPattern) {
    let pos1 = boxes[pattern[0]].innerText;
    let pos2 = boxes[pattern[1]].innerText;
    let pos3 = boxes[pattern[2]].innerText;

    if (pos1 !== "" && pos2 !== "" && pos3 !== "") {
      if (pos1 === pos2 && pos2 === pos3) {
        if (pos1 === "O") {
          msg.innerText = `PLAYER ${player1} (O) WON THE GAME`;
        } else if (pos1 === "X") {
          msg.innerText = `${player2} (X) WON THE GAME`;
        }

        // Disable all boxes after a win
        for (let box of boxes) {
          box.disabled = true;
        }

        new_game_btn.style.display = "block";

        return true;  // Winner found
      }
    }
  }
  return false; // No winner found
};
