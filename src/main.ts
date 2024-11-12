const pixelSize = 16;
const worldWidth = 20;
const worldHeight = 20;
const snake = [
  { x: 4, y: 4 },
  { x: 3, y: 4 },
  { x: 2, y: 4 },
];

let direction: "top" | "right" | "bottom" | "left" = "right";

document.onkeyup = (event) => {
  if (event.key.startsWith("ArrowUp") && direction !== "bottom") {
    direction = "top";
  } else if (event.key.startsWith("ArrowRight") && direction !== "left") {
    direction = "right";
  } else if (event.key.startsWith("ArrowDown") && direction !== "top") {
    direction = "bottom";
  } else if (event.key.startsWith("ArrowLeft") && direction !== "right") {
    direction = "left";
  }
}

function createWorld() {
  const appContainer = document.getElementById("app");

  if (appContainer === null) {
    throw new Error("App container not found");
  }

  const world = document.createElement("div");
  world.style.width = `${worldWidth * pixelSize}px`;
  world.style.height = `${worldHeight * pixelSize}px`;
  world.style.border = "2px solid black";

  for (let i = 0; i < worldHeight; i++) {
    for (let j = 0; j < worldWidth; j++) {
      const pixel = document.createElement("div");
      pixel.id = `pixel-${j}-${i}`;
      pixel.style.width = `${pixelSize}px`;
      pixel.style.height = `${pixelSize}px`;
      pixel.style.backgroundColor = "lightgray";
      pixel.style.border = "2px solid white";
      pixel.style.boxSizing = "border-box";
      pixel.style.float = "left";
      world.appendChild(pixel);
    }
  }

  appContainer.appendChild(world);
}

function placeApple() {
  const x = Math.floor(Math.random() * worldWidth);
  const y = Math.floor(Math.random() * worldHeight);
  const apple = document.getElementById(`pixel-${x}-${y}`);

  if (apple === null) {
    throw new Error("Apple not found");
  }

  if (apple.style.backgroundColor === "green") {
    placeApple();
    return;
  }

  apple.style.backgroundColor = "red";
}

function drawSnake() {
  for (let i = 0; i < snake.length; i++) {
    const { x, y } = snake[i];
    const snakePixel = document.getElementById(`pixel-${x}-${y}`);

    if (snakePixel === null) {
      throw new Error("Snake pixel not found");
    }

    snakePixel.style.backgroundColor = "green";
  }
}

function getNewHHeadPosition():{x:number,y:number} {
  const head = snake[0];
  let newHead = { x: head.x, y: head.y };

  if (direction === "right") {
    newHead = { x: head.x + 1, y: head.y };
  } else if (direction === "left") {
    newHead = { x: head.x - 1, y: head.y };
  } else if (direction === "top") {
    newHead = { x: head.x, y: head.y - 1 };
  } else if (direction === "bottom") {
    newHead = { x: head.x, y: head.y + 1 };
  }

  return newHead;
}


function moveSnake() {

  const newHead = getNewHHeadPosition();
  snake.unshift(newHead);

  const headPixel = document.getElementById(`pixel-${newHead.x}-${newHead.y}`);
  if (headPixel !== null && headPixel.style.backgroundColor === "red") {
    placeApple();
  } else {
    const tail = snake.pop();
    
    if (typeof tail === "undefined") {
      throw new Error("Tail not found");
    }
    
    const tailPixel = document.getElementById(`pixel-${tail.x}-${tail.y}`);
    if (tailPixel === null) {
      throw new Error("Tail pixel not found");
    }
    
    tailPixel.style.backgroundColor = "lightgray";
  }

  drawSnake();
}

createWorld();
placeApple();
drawSnake();

setInterval(() => {
  moveSnake();
}, 200);
