const dino = document.querySelector(".dino");

let dinoMove = 120;
const speed = 5;
let dinoBottom = 50;
let gravity = 2;
let movingLeft = false;
let movingRight = false;
let isJumping = false;

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
    dinoBottom += 5;
    if(dinoBottom >= 150){
      isJumping = false;
    }
  } else if(dinoBottom > 50){
    dinoBottom -= gravity;
  }

  dino.style.bottom = dinoBottom + "px";


  requestAnimationFrame(jump);
}

update();
jump();

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