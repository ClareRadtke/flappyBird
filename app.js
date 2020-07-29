document.addEventListener("DOMContentLoaded", () => {
  const bird = document.querySelector(".bird");
  const gameDisplay = document.querySelector(".game-container");
  const ground = document.querySelector(".ground");

  /* setting the gravity (move bird down grid) and 
moving bird to starting position */
  let birdLeft = 220;
  let birdBottom = 100;
  let gravity = 2;
  let isGameOver = false;
  let gap = 450;

  function startGame() {
    birdBottom -= gravity;
    bird.style.bottom = birdBottom + "px";
    bird.style.left = birdLeft + "px";
  }
  let gameTimerId = setInterval(startGame, 20);
  // clearInterval(timerId);

  //adding jump control and assigning to spacebar (keyCode 32)
  function control(e) {
    if (e.keyCode === 32) jump();
  }
  function jump() {
    if (birdBottom < 490) birdBottom += 50;
    bird.style.bottom = birdBottom + "px";
    console.log(birdBottom);
  }

  document.addEventListener("keydown", control);

  /*  creating bottom obstacle - above ground at random heights and
out of grid to the right (500px from left) */
  function generateObstacle() {
    let obstacleLeft = 500;
    let randomHeight = Math.random() * 60;
    let obstacleBottom = randomHeight;
    const obstacle = document.createElement("div");
    const topObstacle = document.createElement("div");
    if (!isGameOver) {
      obstacle.classList.add("obstacle");
      topObstacle.classList.add("topObstacle");
    }
    gameDisplay.appendChild(obstacle);
    gameDisplay.appendChild(topObstacle);
    obstacle.style.left = obstacleLeft + "px";
    topObstacle.style.left = obstacleLeft + "px";
    obstacle.style.bottom = obstacleBottom + "px";
    topObstacle.style.bottom = obstacleBottom + gap + "px";

    //move obstacle from right to left
    function moveObstacle() {
      if (isGameOver) return;
      obstacleLeft -= 2;
      obstacle.style.left = obstacleLeft + "px";
      topObstacle.style.left = obstacleLeft + "px";

      //remove obstacle once it is off grid
      if (obstacleLeft === -60) {
        clearInterval(timerId);
        gameDisplay.removeChild(obstacle);
        gameDisplay.removeChild(topObstacle);
      }
      //stop the bird when game over occurs
      if (
        (obstacleLeft > 160 &&
          obstacleLeft < 280 &&
          birdLeft === 220 &&
          (birdBottom < obstacleBottom + 153 ||
            birdBottom > obstacleBottom + gap - 203)) ||
        birdBottom === 0
      ) {
        gameOver();
        clearInterval(timerId);
      }
    }
    // stop generating obstacles when isGameOver is true
    let timerId = setInterval(moveObstacle, 20);
    if (!isGameOver) setTimeout(generateObstacle, 3000);
  }
  generateObstacle();

  //stop the bird when game over function
  function gameOver() {
    clearInterval(gameTimerId);
    isGameOver = true;
    document.removeEventListener("keydown", control);
  }
});
