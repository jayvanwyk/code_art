const canvas = document.getElementById('mainCanvas');
const ctx = canvas.getContext('2d');
canvas.width = innerWidth;
canvas.height = innerHeight;

console.log(ctx);

const degToRad = (deg) => {
  return (deg / 180) * Math.PI;
};

// canvas.addEventListener('mousemove', (e) => {
//   ctx.beginPath();
//   ctx.arc(e.x, e.y, 50, 0, degToRad(360));
//   ctx.stroke();
// });

let atoms = [];

canvas.addEventListener('click', (e) => {
  for (let x = 0; x < 20; x++) {
    atoms.push(new Atom(e.x, e.y));
  }
});

const animate = () => {
  atoms.forEach((a) => {
    a.draw();
    a.update();
  });
  requestAnimationFrame(animate);
};

class Atom {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.radius = Math.random() * 8 + 2;
    this.speedX = Math.random() * 4 - 2;
    this.speedY = Math.random() * 4 - 2;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, degToRad(360));
    ctx.fill();
  }
}

animate();
