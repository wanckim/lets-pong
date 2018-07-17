var table = document.getElementById('pong-table');
var context = table.getContext('2d');

context.rect(0, 0, table.width, table.height);
context.strokeStyle = '#26afff';
context.lineWidth = 20;
context.stroke();

function Paddle(c, x, y, w, h) {
  context.beginPath();
  context.fillStyle = c;
  context.fillRect(x, y, w, h);
}

function Arc(x, y, r, sa, ea, d) {
  context.beginPath();
  context.fillStyle = '#ddd';
  context.arc(x, y, r, sa, ea, d);
  context.fill();
}

function Ball(x, y, radius, startAngle, endAngle, direction) {
  this.x = x;
  this.y = y;
  this.radius = radius;
  this.startAngle = startAngle;
  this.endAngle = endAngle;
  this.direction = direction;
}
Ball.prototype.render = function() {
  return new Arc(this.x, this.y, this.radius, this.startAngle, this.endAngle, this.direction);
}

function Player(color, x, y, width, height) {
  this.color = color;
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
}
Player.prototype.render = function() {
  return new Paddle(this.color, this.x, this.y, this.width, this.height);
}

function Computer(color, x, y, width, height) {
  this.color = color;
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
}
Computer.prototype.render = function() {
  return new Paddle(this.color, this.x, this.y, this.width, this.height);
}

function render() {
  var paddle1 = new Player('#26afff', 260, 450, 80, 10);
  var paddle2 = new Computer('#f22', 260, 30, 80, 10);
  var ball = new Ball(300, 250, 5, 0, Math.PI * 2, false);
  paddle1.render();
  paddle2.render();
  ball.render();
}

window.onload = function() {
  render();
}
