const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const ground = new Image();
ground.src = "square.png";

const foodImg = new Image();
foodImg.src = "food.png";

const loser = new Image();
loser.src = "loser.png";

let box = 32;

let score = 0;

let food = {
  x: Math.floor(Math.random() * 17 + 1) * box,
  y: Math.floor(Math.random() * 15 + 3) * box,
};

let snake = [];

snake[0] = {
  x: 9 * box,
  y: 10 * box,
};

document.addEventListener("keydown", direction);

let dir;

function direction(event) {
  if (event.keyCode == 37 && dir != "right") dir = "left";
  else if (event.keyCode == 38 && dir != "down") dir = "up";
  else if (event.keyCode == 39 && dir != "left") dir = "right";
  else if (event.keyCode == 40 && dir != "up") dir = "down";
}

function drawGround() {
  ctx.drawImage(ground, 0, 0);
  ctx.drawImage(foodImg, food.x, food.y);

  for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = "magenta";
    ctx.fillRect(snake[i].x, snake[i].y, box, box);
  }

  // SCORE //
  ctx.fillStyle = "white";
  ctx.font = "50px Arial";
  ctx.fillText(score, box * 2.5, box * 1.7);

  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  if (dir == "left") snakeX -= box;
  if (dir == "right") snakeX += box;
  if (dir == "up") snakeY -= box;
  if (dir == "down") snakeY += box;

  if (snakeX == food.x && snakeY == food.y) {
    food.x = Math.floor(Math.random() * 17 + 1) * box;
    food.y = Math.floor(Math.random() * 15 + 3) * box;
    score++;
  } else {
    snake.pop(); // delete the old coordinates
  }

  let NewCoordinates = {
    x: snakeX,
    y: snakeY,
  };

  if (
    snakeX < box - 16 ||
    snakeX > box * 17 + 16 ||
    snakeY < box * 3 - 16 ||
    snakeY > box * 17 + 16
  ) {
    ctx.drawImage(loser, 130, 240);
    clearInterval(game);
  }

  for (let i = 0; i < snake.length; i++) {
    if (snake[i].x == NewCoordinates.x && snake[i].y == NewCoordinates.y) {
      ctx.drawImage(loser, 130, 240);
      clearInterval(game);
    }
  }

  snake.unshift(NewCoordinates);
}

let game = setInterval(drawGround, 100);
