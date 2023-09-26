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

// canvas.addEventListener('mousemove', (e) => {
//   for (let x = 0; x < 20; x++) {
//     atoms.push(new Atom(e.x, e.y));
//   }
// });

const animate = () => {
  atoms.forEach((a, index) => {
    ctx.fillStyle = 'white';
    a.draw();
    a.updateSize();
    a.updateSpeed();

    if (a.radius < 0.3) {
      atoms.splice(index, 1);
    }
  });
  ctx.save();
  //   ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
  ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.restore();
  requestAnimationFrame(animate);
};

animate();

class Atom {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.radius = Math.random() * 2 + 2;
    this.speedX = Math.random() * 4 - 2;
    this.speedY = Math.random() * 4 - 2;
  }

  updateSpeed() {
    this.x += this.speedX;
    this.y += this.speedY;
  }

  updateSize() {
    this.radius -= 0.1;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, degToRad(360));
    ctx.fill();
  }
}

const point = {
  x: 0,
  y: 0,
};

let degree = 0;
const generateAtoms = () => {
  atoms.push(new Atom(canvas.width / 2 + point.x * 200, canvas.height / 2 + point.y * 200));
  point.x = Math.cos(degToRad(degree));
  point.y = point.x * point.x;
  degree++;
  requestAnimationFrame(generateAtoms);
};

generateAtoms();
