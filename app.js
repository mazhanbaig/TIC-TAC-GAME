let boxes=document.querySelectorAll(".game-btn");
let player1=prompt("Enter your player 1 name (O)");
let player2=prompt("Enter your player 2 name (X)");
let resetbtn=document.querySelector("#restart-btn");
let new_game_btn=document.querySelector("#new-game-btn");
let msg=document.querySelector("#msg");
let turnO=true;
let winPattern = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [3,5,8],
    [0,4,8],
    [2,4,6],
];
// PUTTING VALUE INSIDE THE BUTTONS
boxes.forEach((box)=>{
    box.addEventListener("click",()=>{
        if(turnO===true){
            box.innerText='O';
            turnO=false;
        }
        else{
            box.innerText='X';
            turnO=true;
        }
        box.disabled=true;
        checkwinner();
        if(isBoardFull()===true){
            msg.innerText="IT'S A TIE"
        }
        restartgame();
        newgame();
    });
});
// This function checks if all boxes are filled
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
    }
}); 
}

// WINNER CHECKING FUNCTION 
let checkwinner=()=>{
    for (let pattern of winPattern) {
        pos1=boxes[pattern[0]].innerText;
        pos2=boxes[pattern[1]].innerText;
        pos3=boxes[pattern[2]].innerText;
        if (pos1!="" && pos2!="" && pos3!="") {
            if(pos1 === pos2 && pos2 === pos3){
                if(pos1==='O' && pos2==='O' && pos3==='O' ){
                    msg.innerText=`PLAYER ${player1} (O) WON THE GAME`;
                    for (let box of boxes) {
                        box.disabled=true;
                        
                    }
                    new_game_btn.style.display="block";
                } else if (pos1==='X' && pos2==='X' && pos3==='X'){
                     msg.innerText=`PALYER ${player2} (X) WON THE GAME`;
                     for (let box of boxes) {
                        box.disabled=true;
                        
                    }
                    new_game_btn.style.display="block";
                }
    }
}
}
};

