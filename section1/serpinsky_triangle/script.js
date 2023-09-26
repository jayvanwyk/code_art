const canvas = document.getElementById('mainCanvas');
const ctx = canvas.getContext('2d');
canvas.width = 500;
canvas.height = 500;
const padding = 10;
const radius = 1;

class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.radius = radius;
  }

  draw() {
    ctx.beginPath();
    ctx.save();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = 'black';
    ctx.fill();
  }
}

const triangleTop = new Point(canvas.width / 2, padding);
const triangleBottomLeft = new Point(padding, canvas.height - padding);
const triangleBottomRight = new Point(canvas.width - padding, canvas.height - padding);

const triangle = [triangleTop, triangleBottomLeft, triangleBottomRight];

triangle.forEach((t) => t.draw());

const drawRest = (prevPoint) => {
  let randomCorner, middlePoint;
  for (let i = 0; i < 100000; i++) {
    randomCorner = triangle[getRandomInt(0, 3)];
    middlePoint = new Point((prevPoint.x + randomCorner.x) / 2, (prevPoint.y + randomCorner.y) / 2);
    middlePoint.draw();
    prevPoint = middlePoint;
  }
};

const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

canvas.addEventListener(
  'click',
  (e) => {
    const firstPoint = new Point(e.offsetX, e.offsetY);
    firstPoint.draw();
    drawRest(firstPoint);
  },
  { once: true }
);
