const player = document.getElementById("player");
const gameArea = document.getElementById("gameArea");
const scoreDisplay = document.getElementById("score");

let score = 0;
let playerX = 280;
let playerY = 180;

document.addEventListener("keydown", (e) => {
  const step = 10;
  if (e.key === "ArrowLeft" && playerX > 0) playerX -= step;
  if (e.key === "ArrowRight" && playerX < 560) playerX += step;
  if (e.key === "ArrowUp" && playerY > 0) playerY -= step;
  if (e.key === "ArrowDown" && playerY < 360) playerY += step;
  player.style.left = playerX + "px";
  player.style.top = playerY + "px";
});

function createItem(type) {
  const item = document.createElement("div");
  item.classList.add(type);
  item.style.left = Math.random() * 570 + "px";
  item.style.top = "-30px";
  gameArea.appendChild(item);
  moveItem(item, type);
}

function moveItem(item, type) {
  let pos = -30;
  const interval = setInterval(() => {
    pos += 3;
    item.style.top = pos + "px";

    if (pos > 400) {
      item.remove();
      clearInterval(interval);
    }

    // colisão
    const rect1 = item.getBoundingClientRect();
    const rect2 = player.getBoundingClientRect();

    if (
      rect1.left < rect2.right &&
      rect1.right > rect2.left &&
      rect1.top < rect2.bottom &&
      rect1.bottom > rect2.top
    ) {
      if (type === "trash") {
        score++;
        scoreDisplay.textContent = "Plásticos Coletados: " + score;
      } else if (type === "fish") {
        alert("Você atingiu um peixe! Fim de jogo.\nPlásticos coletados: " + score);
        location.reload();
      }
      item.remove();
      clearInterval(interval);
    }
  }, 30);
}

// Geração de lixo e peixes
setInterval(() => createItem("trash"), 1500);
setInterval(() => createItem("fish"), 3000);
