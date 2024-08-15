const canvas = document.getElementById("snakeGame");  
const ctx = canvas.getContext("2d");  

const box = 20;  
let snake = [{ x: 6 * box, y: 6 * box }];  
let direction = "";  
let food = createFood();  
let score = 0;  

document.addEventListener("keydown", changeDirection);  

function createFood() {  
    return {  
        x: Math.floor(Math.random() * (canvas.width / box)) * box,  
        y: Math.floor(Math.random() * (canvas.height / box)) * box,  
    };  
}  

function changeDirection(event) {  
    if (event.keyCode === 37 && direction !== "RIGHT") {  
        direction = "LEFT";  
    } else if (event.keyCode === 38 && direction !== "DOWN") {  
        direction = "UP";  
    } else if (event.keyCode === 39 && direction !== "LEFT") {  
        direction = "RIGHT";  
    } else if (event.keyCode === 40 && direction !== "UP") {  
        direction = "DOWN";  
    }  
}  

function collision(head, array) {  
    for (let i = 0; i < array.length; i++) {  
        if (head.x === array[i].x && head.y === array[i].y) {  
            return true;  
        }  
    }  
    return false;  
}  

function draw() {  
    ctx.clearRect(0, 0, canvas.width, canvas.height);  

    for (let i = 0; i < snake.length; i++) {  
        ctx.fillStyle = (i === 0) ? "green" : "lightgreen";  
        ctx.fillRect(snake[i].x, snake[i].y, box, box);  
        ctx.strokeStyle = "darkgreen";  
        ctx.strokeRect(snake[i].x, snake[i].y, box, box);  
    }  

    ctx.fillStyle = "red";  
    ctx.fillRect(food.x, food.y, box, box);  

    let snakeX = snake[0].x;  
    let snakeY = snake[0].y;  

    if (direction === "LEFT") snakeX -= box;  
    if (direction === "UP") snakeY -= box;  
    if (direction === "RIGHT") snakeX += box;  
    if (direction === "DOWN") snakeY += box;  

    if (snakeX === food.x && snakeY === food.y) {  
        score++;  
        document.getElementById("score").innerText = score;  
        food = createFood();  
    } else {  
        snake.pop();  
    }  

    let newHead = { x: snakeX, y: snakeY };  

    if (snakeX < 0 || snakeX >= canvas.width || snakeY < 0 || snakeY >= canvas.height || collision(newHead, snake)) {  
        clearInterval(game);  
        alert("Game Over! Your score was: " + score);  
        document.location.reload();  
    }  

    snake.unshift(newHead);  
}  

let game = setInterval(draw, 100);  
