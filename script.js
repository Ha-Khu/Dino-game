const dino = document.querySelector(".dino");

let dinoMove = 120;
const speed = 5;
let movingLeft = false;
let movingRight = false;

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

update();

document.addEventListener("keydown", (event)=>{
  const key =  event.key
  if(key === "ArrowLeft"){
    movingLeft = true;
  } else if(key === "ArrowRight"){
    movingRight = true;
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