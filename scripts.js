//global variable
let doorImage1 = document.getElementById('door1');
let doorImage2 = document.getElementById('door2');
let doorImage3 = document.getElementById('door3');

let startButton = document.getElementById('start');

let currentlyPlaying = true;

let closedDoorPath = 'https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/closed_door.svg';


//create to store result from random function
let openDoor1 = '';
let openDoor2 = '';
let openDoor3 = '';

let isBot = door => {
  if(door.src === botDoorPath){
    return true;
  } else {
    return false;
  }
}

//logic to make each door clickable only once
let isClicked = door => {
  //use that door element to make the determination.
  if(door.src === closedDoorPath){
    return false;
  } else {
    return true;
  }
}

let numClosedDoors = 3;

//check game-winning conditions
let playDoor = door =>{
  numClosedDoors--;
  if(numClosedDoors === 0){
    gameOver('win');
  } else if (isBot(door)){
    gameOver();
  }
}

//random door before refresh the game
let randomChoreDoorGenerator = () => {
  let choreDoor = Math.floor(Math.random() * numClosedDoors);
  if(choreDoor === 0 ){
    openDoor1 = botDoorPath;
    openDoor2 = beachDoorPath;
    openDoor3 = spaceDoorPath;
  } else if(choreDoor === 1){
    openDoor2 = botDoorPath;
    openDoor1 = beachDoorPath;
    openDoor3 = spaceDoorPath;   
  } else {
    openDoor3 = botDoorPath;
    openDoor1 = beachDoorPath;
    openDoor2 = spaceDoorPath;
  }
};

//indicate pic of each door
let beachDoorPath = "https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/beach.svg";
let botDoorPath = "https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/robot.svg";
let spaceDoorPath = "https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/space.svg";


//function created to open the door upon click
door1.onclick = () => {
  //Adding this logic now protects your game from shortcut victories by making each closed door clickable only once. 
  if(currentlyPlaying && !isClicked(doorImage1)){
  doorImage1.src = openDoor1;
  playDoor(doorImage1); //If the numClosedDoors variable decreases, that means that a door has been opened.
  }
};

door2.onclick = () => {
  if(currentlyPlaying && !isClicked(doorImage2)){
  doorImage2.src = openDoor2;
  playDoor(doorImage2); //If the numClosedDoors variable decreases, that means that a door has been opened.
  }
};

door3.onclick = () => {
  if(currentlyPlaying && !isClicked(doorImage3)){
  doorImage3.src = openDoor3;
  playDoor(doorImage3); //If the numClosedDoors variable decreases, that means that a door has been opened.
  }
};

startButton.onclick = () => {
  if(!currentlyPlaying){
  startRound();
  }
}

//not only has to start a new game; it also has to reset the values from the previous game.
let startRound = () => {
  numClosedDoors = 3;
  doorImage1.src = closedDoorPath;
  doorImage2.src = closedDoorPath;
  doorImage3.src = closedDoorPath;
  startButton.innerHTML = "Good luck!";
  currentlyPlaying = true;
  randomChoreDoorGenerator();
}


let gameOver = status => {
  if(status === 'win'){
    startButton.innerHTML = 'You win! Play again?';
  } else {
    startButton.innerHTML = 'Game over! Play again?';
  };
  currentlyPlaying = false;
};

startRound();