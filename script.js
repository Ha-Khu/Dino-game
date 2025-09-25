const dino = document.querySelector(".dino");
const resetBtn = document.getElementById("resetBtn");

let dinoMove = 120;
const speed = 5;
let dinoBottom = 50;
let gravity = 3;
let movingLeft = false;
let movingRight = false;
let isJumping = false;
let spawnTimeout;
let gameOver = false;
let scoreCounter = 0;

const obstacleImages = [
  "imgs/Building-1.png",
  "imgs/Building-2.png",
  "imgs/Building-3.png",
  "imgs/Car-1.png",
  "imgs/Taxi.png",
  "imgs/Truck.png"
];

function update(){
  if(!gameOver){
    if(movingLeft){
      dinoMove = Math.max(0, dinoMove - speed);
    }
    if(movingRight){
      dinoMove = Math.min(window.innerWidth - dino.offsetWidth, dinoMove + speed);
    }

    dino.style.left = dinoMove + "px";
  }
  requestAnimationFrame(update);
}

function jump(){
  if(!gameOver){
    if(isJumping){
      dinoBottom += 10;
      if(dinoBottom >= 200){
        isJumping = false;
      }
    } else if(dinoBottom > 50){
      dinoBottom -= gravity;
    }

    dino.style.bottom = dinoBottom + "px";
  }
  requestAnimationFrame(jump);
}

function spawnObstacles(){
  const game = document.getElementById("game");
  const img = document.createElement("img");
  const dino = document.getElementById("dino");

  img.src = obstacleImages[Math.floor(Math.random() * obstacleImages.length)];
  img.classList.add("obstacle");
  if(img.src.includes("3")){
    img.classList.add("building");
    img.classList.add("building3")
  } else if(img.src.includes("Building")){
    img.classList.add("building");
  } else {
    img.classList.add("Car");
  }

  img.style.position = "absolute";
  const ground = 45;
  img.style.bottom = ground + "px";

  let left = game.clientWidth + 50;
  img.style.left = left + "px";

  game.appendChild(img);

  const speed = 5 + Math.floor(scoreCounter / 500);

  const timer = setInterval(()=>{
    if(gameOver){
      clearInterval(timer);
      img.remove();
      return;
    }

    left -= speed;
    img.style.left = left + "px";

    const dinoRect = dino.getBoundingClientRect();
    const obstacleRect = img.getBoundingClientRect();
    
    if(collision(dinoRect, obstacleRect)){
      gameOver = true;
      endGame()
      clearInterval(timer);
    }

    if(left < -550){
      clearInterval(timer)
      img.remove();
    }
  }, 20);
}

function startSpawning(){
  if(gameOver) return;

  spawnObstacles();
  const delay = 2000 + Math.random() * 2000;
  spawnTimeout = setTimeout(startSpawning, delay);
}

function collision(aRect, bRect){
  if (
        ((aRect.top + aRect.height) < (bRect.top)) ||
        (aRect.top > (bRect.top + bRect.height)) ||
        ((aRect.left + aRect.width) < bRect.left) ||
        (aRect.left > (bRect.left + bRect.width))
    ){
      return false;
    } else {
      return true;
    }
}

function scoreAdd(){
  const game = document.getElementById("game");
  const score = document.querySelector(".score");
  score.textContent = "SCORE: " + scoreCounter;

  scoreInterval = setInterval(()=>{
    if(!gameOver){
      scoreCounter++;
      score.textContent = "SCORE: " + scoreCounter;
    }

    if(scoreCounter >= 1500){
      score.style.color = "white";
      game.style.background = "linear-gradient(to bottom, #141e30, #243b55)";
    } else {
      score.style.color = "black";
      game.style.background = "linear-gradient(to bottom, #f6d365, #fda085)";
    }
  }, 50)
}

function stopScore(){
  clearInterval(scoreInterval);
}

function endGame(){
  gameOver = true;
  resetBtn.style.display = "block";
  clearTimeout(spawnTimeout);
}

function resetGame(){
  resetBtn.style.display = "none";

  gameOver = false;
  dinoMove = 120;
  dinoBottom = 50;
  dino.style.left = dinoMove + "px";
  dino.style.bottom = dinoBottom + "px";

  const obstacles = document.querySelectorAll(".obstacle");
  obstacles.forEach(obs => obs.remove());

  scoreCounter = 0;

  startSpawning();
}


update();
jump();
scoreAdd();
startSpawning();

resetBtn.addEventListener("click", resetGame);

document.addEventListener("keydown", (event)=>{
  const key =  event.key
  if(key === "ArrowLeft"){
    movingLeft = true;
  } else if(key === "ArrowRight"){
    movingRight = true;
  } else if(key === "ArrowUp" && dinoBottom === 50){
    isJumping = true;
  }
});

document.addEventListener("keyup", (event)=>{
  const key = event.key;
  if(key === "ArrowLeft"){
    movingLeft = false;
  } else if(key === "ArrowRight"){
    movingRight = false;
  }
});