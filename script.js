const dino = document.querySelector(".dino");

let dinoMove = 120;
const speed = 5;
let dinoBottom = 50;
let gravity = 3;
let movingLeft = false;
let movingRight = false;
let isJumping = false;

const obstacleImages = [
  "imgs/Building-1.png",
  "imgs/Building-2.png",
  "imgs/Building-3.png",
  "imgs/Car-1.png",
  "imgs/Taxi.png",
  "imgs/Truck.png"
];

function update(){
  if(movingLeft){
    dinoMove = Math.max(0, dinoMove - speed);
  }
  if(movingRight){
    dinoMove = Math.min(window.innerWidth - dino.offsetWidth, dinoMove + speed);
  }

  dino.style.left = dinoMove + "px";

  requestAnimationFrame(update);
}

function jump(){
  if(isJumping){
    dinoBottom += 10;
    if(dinoBottom >= 200){
      isJumping = false;
    }
  } else if(dinoBottom > 50){
    dinoBottom -= gravity;
  }

  dino.style.bottom = dinoBottom + "px";


  requestAnimationFrame(jump);
}

function spawnObstacles(){
  const game = document.getElementById("game");
  const img = document.createElement("img");

  img.src = obstacleImages[Math.floor(Math.random() * obstacleImages.length)];
  img.classList.add("obstacle");
  if(img.src.includes("Building")){
    img.classList.add("building");
  } else {
    img.classList.add("Car");
  }

  img.style.position = "absolute";
  const ground = 75;
  img.style.bottom = ground + "px";

  let left = game.clientWidth + 50;
  img.style.left = left + "px";

  game.appendChild(img);

  const timer = setInterval(()=>{
    left -= 5;
    img.style.left = left + "px";

    if(left < -550){
      clearInterval(timer)
      img.remove();
    }
  }, 20);
}

function startSpawning(){
  spawnObstacles();
  const delay = 2000 + Math.random() * 2000;
  setTimeout(startSpawning, delay);
}

update();
jump();
/*startSpawning();
*/

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