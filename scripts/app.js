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
const ball = new Ball(300, 250, 4, 0, Math.PI * 2, false);

function renderPaddle(paddle) {
  context.beginPath();
  context.fillStyle = paddle.color;
  context.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);
}

function Paddle(c, x, y, w, h) {
  this.color = c;
  this.x = x;
  this.y = y;
  this.width = w;
  this.height = h;
  this.speed = 5;
}
Paddle.prototype.move = function(key) {
  if (key === 'l' && this.x > 10) {
    context.clearRect(this.x, this.y, this.width, this.height);
    this.x = this.x - this.speed;
  } else if (key === 'r' && this.x < 490) {
    context.clearRect(this.x, this.y, this.width, this.height);
    this.x = this.x + this.speed;
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
  context.strokeStyle = '#ddd';
  context.lineWidth = 7;
  context.arc(ball.x, ball.y, ball.radius, ball.startAngle, ball.endAngle, ball.direction);
  context.stroke();
}

function Ball(x, y, r, sa, ea, d) {
  this.x = x;
  this.y = y;
  this.radius = r;
  this.startAngle = sa;
  this.endAngle = ea;
  this.direction = d;
}
Ball.prototype.render = function() {
  return renderBall(ball);
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
}

function step() {
  render();
  animate(step);
}

window.onload = function() {
  animate(step);
}
