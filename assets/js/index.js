const clock = document.getElementById("clock");
const gameCell = document.getElementsByClassName("cell");
const player1 = document.getElementById("player1");
const player2 = document.getElementById("player2");
const imgPlayer1 = document.getElementById("imgPlayer1");
const imgPlayer2 = document.getElementById("imgPlayer2");
let scorePlayer1 = 0;
let scorePlayer2 = 0;
let secondTour = false;
player2.innerHTML = scorePlayer2;
player1.innerHTML = scorePlayer1;
let timerGame = setInterval(countTimer, 1000);
let totalSeconds = 180;
let currentPlayer = 1;
let gameState = resetGameState();
drawArrow();
function countTimer() {
  totalSeconds--;
  var hour = Math.floor(totalSeconds / 3600);
  var minute = Math.floor((totalSeconds - hour * 3600) / 60);
  var seconds = totalSeconds - (hour * 3600 + minute * 60);
  let suffix = "";
  if (seconds < 10) suffix = 0;
  clock.innerHTML = "0" + minute + ":" + suffix + seconds;
  if (minute === 0 && seconds === 0) {
    if (scorePlayer1 > scorePlayer2) {
      alert("Fin du game Player 1 a gagné");
    } else if (scorePlayer1 < scorePlayer2) {
      alert("Fin du game Player 2 a gagné");
    } else {
      alert("Fin du game Personne n'a gagné");
    }
    gameState = resetGameState();
    resetBoard();
    scorePlayer1 = 0;
    scorePlayer2 = 0;
    player2.innerHTML = scorePlayer2;
    player1.innerHTML = scorePlayer1;
    totalSeconds = 180;
  }
}

function clickOnCell() {
  for (let i = 0; i < 9; i++) {
    const cell = document.getElementById(i);
    cell.onclick = function () {
      let coordinateXY = cell.getAttribute("data-coordinates");
      coordinateXY = coordinateXY.split(",");
      if (cell.hasChildNodes()) {
        alert("Il y a déjà un élément sur cette case");
      } else {
        if (currentPlayer === 1) {
          let img = document.createElement("img");
          img.src = "../assets/img/rond.png";
          cell.appendChild(img);
          //file gamestate to check victory
          gameState[Number(coordinateXY[0])][Number(coordinateXY[1])] = [1];
          checkVictory();
          drawArrow();
          currentPlayer = 2;
        } else {
          let img2 = document.createElement("img");
          img2.src = "../assets/img/croix.png";
          cell.appendChild(img2);
          //file gamestate to check victory
          gameState[Number(coordinateXY[0])][Number(coordinateXY[1])] = [2];
          checkVictory();
          drawArrow();
          currentPlayer = 1;
        }
      }
      checkGameFull();
    };
  }
}
clickOnCell();
function checkVictory() {
  //check for victory on x axis
  for (let i = 0; i <= 2; i++) {
    const line = gameState[i].flat();
    const uniqueValues = Array.from(new Set(line));
    if (uniqueValues.length === 1 && !line.includes(0)) {
      if (uniqueValues[0] === 1) {
        scorePlayer1 += 1;
        player1.innerHTML = scorePlayer1;
        gameState = resetGameState();
        resetBoard();
      } else {
        scorePlayer2 += 1;
        player2.innerHTML = scorePlayer2;
        gameState = resetGameState();
        resetBoard();
      }
    }
  }
  //check for victory on y axis
  let coordinatesY = [];
  //colonne 1
  for (let i = 0; i <= 2; i++) {
    const line = gameState[i].flat();
    coordinatesY[i] = line[0];

    //colonne 2
    for (let j = 0; j <= 2; j++) {
      const line2 = gameState[j].flat();
      coordinatesY[j + 3] = line2[1];
    }
    //colonne 3
    for (let k = 0; k <= 2; k++) {
      const line3 = gameState[k].flat();
      coordinatesY[k + 6] = line3[2];
    }
    console.log(coordinatesY);
    if (
      (coordinatesY[0] === 1 &&
        coordinatesY[2] === 1 &&
        coordinatesY[1] === 1) ||
      (coordinatesY[3] === 1 &&
        coordinatesY[4] === 1 &&
        coordinatesY[5] === 1) ||
      (coordinatesY[6] === 1 && coordinatesY[7] === 1 && coordinatesY[8] === 1)
    ) {
      scorePlayer1 += 1;
      player1.innerHTML = scorePlayer1;
      gameState = resetGameState();
      resetBoard();
    }
    if (
      (coordinatesY[0] === 2 &&
        coordinatesY[2] === 2 &&
        coordinatesY[1] === 2) ||
      (coordinatesY[3] === 2 &&
        coordinatesY[4] === 2 &&
        coordinatesY[5] === 2) ||
      (coordinatesY[6] === 2 && coordinatesY[7] === 2 && coordinatesY[8] === 2)
    ) {
      scorePlayer2 += 1;
      player2.innerHTML = scorePlayer2;
      gameState = resetGameState();
      resetBoard();
    }

    //check for victory on diagonals
    if (
      (coordinatesY[0] === 1 &&
        coordinatesY[4] === 1 &&
        coordinatesY[8] === 1) ||
      (coordinatesY[6] === 1 && coordinatesY[4] === 1 && coordinatesY[2] === 1)
    ) {
      scorePlayer1 += 1;
      player1.innerHTML = scorePlayer1;
      gameState = resetGameState();
      resetBoard();
    }
    if (
      (coordinatesY[0] === 2 &&
        coordinatesY[4] === 2 &&
        coordinatesY[8] === 2) ||
      (coordinatesY[6] === 2 && coordinatesY[4] === 2 && coordinatesY[2] === 2)
    ) {
      scorePlayer2 += 1;
      player2.innerHTML = scorePlayer2;
      gameState = resetGameState();
      resetBoard();
    }
  }
}
function resetGameState() {
  let gameState = [
    [[0], [0], [0]],
    [[0], [0], [0]],
    [[0], [0], [0]],
  ];
  return gameState;
}
function resetBoard() {
  var imagesSize = document.getElementsByTagName("img");
  //efface toutes les images sauf les flèches du tour
  let limitTableImg = imagesSize.length - 2;
  var images = [].slice.call(
    document.getElementsByTagName("img"),
    0,
    limitTableImg
  ); // get the images as array like object, and turn it into an array using slice
  images.forEach(function (img) {
    img.parentNode.removeChild(img);
  });
}
function checkGameFull() {
  // si tableau est plein
  var imagesTotal = [].slice.call(document.getElementsByTagName("img"), 0);
  if (imagesTotal.length > 10) {
    alert("Le tableau est plein sans vainqueur");
    gameState = resetGameState();
    resetBoard();
  }
}
function drawArrow() {
  if (currentPlayer === 1 && secondTour) {
    imgPlayer1.src = "";
    imgPlayer2.src = "../assets/img/arrow.png";
  } else {
    imgPlayer2.src = "";
    imgPlayer1.src = "../assets/img/arrow.png";
  }
  secondTour = true;
}
