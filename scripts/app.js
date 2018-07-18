var table = document.getElementById('pong-table');
var context = table.getContext('2d');

var animate = window.requestAnimationFrame ||
              function(callback) { window.setTimeout(callback, 1000/60) }

context.rect(0, 0, table.width, table.height);
context.strokeStyle = '#26afff';
context.lineWidth = 20;
context.stroke();

const player = new Player('#26afff', 260, 450, 80, 10);
const computer = new Computer('#f22', 260, 40, 80, 10);
const ball = new Ball(300, 250, 7, 0, Math.PI * 2, false);

var speed = generateSpeed();
var v_direction = Math.random() >= 0.5;
var h_direction = Math.random() >= 0.5;

function renderPaddle(paddle) {
  context.beginPath();
  context.fillStyle = paddle.color;
  context.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);
  context.closePath();
}

function Paddle(c, x, y, w, h) {
  this.color = c;
  this.x = x;
  this.y = y;
  this.width = w;
  this.height = h;
  this.speed = 10;
}
Paddle.prototype.move = function(key) {
  if (key === 'l' && this.x > 10) {
    context.clearRect(this.x, this.y, this.width, this.height);
    this.x -= this.speed;
  } else if (key === 'r' && this.x < 490) {
    context.clearRect(this.x, this.y, this.width, this.height);
    this.x += this.speed;
  }
}

function movePlayerPaddle(e) {
  switch(e.keyCode) {
    case 37:
      player.p_paddle.move('l');
      break;
    case 39:
      player.p_paddle.move('r');
      break;
  }
}

function renderBall(ball) {
  context.beginPath();
  context.fillStyle = '#ddd';
  context.lineWidth = 1;
  context.arc(ball.x, ball.y, ball.radius, ball.startAngle, ball.endAngle, ball.counterClockwise);
  context.fill();
  context.closePath();
}

function Ball(x, y, r, sa, ea, cc) {
  this.x = x;
  this.y = y;
  this.radius = r;
  this.startAngle = sa;
  this.endAngle = ea;
  this.counterClockwise = cc;
  this.x_speed = 0;
  this.y_speed = 0;
}
Ball.prototype.render = function() {
  return renderBall(ball);
}

function moveBall() {
  context.clearRect(ball.x - 8, ball.y - 8, 16, 16);
  if (v_direction) {
    ball.y += ball.y_speed;
  } else {
    ball.y -= ball.y_speed;
  }
  if (h_direction) {
    ball.x += ball.x_speed;
  } else {
    ball.x -= ball.x_speed;
  }
  renderBall(ball);
  ballCollide();
}

function ballCollide() {
  if (player.p_paddle.y > ball.y - 8 || computer.c_paddle.y + computer.c_paddle.height < ball.y + 9) {
    if ( (player.p_paddle.y < ball.y + 8 && (player.p_paddle.x < ball.x + 8 && player.p_paddle.x + player.p_paddle.width > ball.x - 8))
        || computer.c_paddle.y + computer.c_paddle.height > ball.y - 9 && (computer.c_paddle.x < ball.x + 8 && computer.c_paddle.x + computer.c_paddle.width > ball.x - 8) ) {
      v_direction = !v_direction;
    }
  }
  if (11 > ball.x - 8 || table.width - 11 < ball.x + 9) {
    if (11 < ball.x + 8 || table.width - 11 > ball.x - 8) {
      h_direction = !h_direction;
    }
  }
}

function generateSpeed() {
  var dx = Math.floor((Math.random() * 3) + 1)
  var dy = 4 - dx;
  var arr = [dx, dy];
  return arr;
}

function serveBall() {
  ball.x_speed = speed[0];
  ball.y_speed = speed[1];

  moveBall();
}

function Player(color, x, y, width, height) {
  this.p_paddle = new Paddle(color, x, y, width, height);
}
Player.prototype.render = function() {
  return renderPaddle(this.p_paddle);
}

function Computer(color, x, y, width, height) {
  this.c_paddle = new Paddle(color, x, y, width, height)
}
Computer.prototype.render = function() {
  return renderPaddle(this.c_paddle);
}

function render() {
  player.render();
  computer.render();
  ball.render();

  window.addEventListener("keydown", movePlayerPaddle, false);
  moveBall();
}

function step() {
  render();
  animate(step);
}

window.onload = function() {
  serveBall();
  animate(step);
}
