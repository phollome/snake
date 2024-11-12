const pixelSize = 16;
const worldWidth = 20;
const worldHeight = 20;

function createWorld() {
  const appContainer = document.getElementById('app');

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

createWorld();