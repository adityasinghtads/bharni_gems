const container = document.getElementById("container");
const numPiles = 5;           // number of piles around circle
const radius = 450;           // circle radius
const dropInterval = 800;     // ms between new images
const images = [
  "https://picsum.photos/200/200?random=1",
  "https://picsum.photos/200/200?random=2",
  "https://picsum.photos/200/200?random=3",
  "https://picsum.photos/200/200?random=4",
  "https://picsum.photos/200/200?random=5",
  "https://picsum.photos/200/200?random=6"
];

const centerX = 450, centerY = 450;
let imageIndex = 0;
let piles = [];

function createPile(angle) {
  piles.push({ angle, items: [] });
}

// Create piles around circle
for (let i = 0; i < numPiles; i++) {
  const angle = (i / numPiles) * 2 * 3.5;
  createPile(angle);
}

function addImage(pile) {
  const stackOffset = pile.items.length * 0.01; // minimal spacing
  const angle = pile.angle + stackOffset;

  const img = document.createElement("img");
  img.src = images[(imageIndex++) % images.length];
  img.style.position = "absolute";
  img.style.width = "120px";
  img.style.borderRadius = "10px";
  container.appendChild(img);

  pile.items.push({ el: img, t: 0, angle });
}

function animate() {
  piles.forEach(pile => {
    pile.items.forEach(item => {
      item.t += 0.003; // speed
      if (item.t >= 1.2) {
        item.el.remove();
      } else {
        const curveRadius = radius - item.t * 180;
        const offsetAngle = item.angle - (item.t - 0.5) * 1.5;
        const x = centerX + curveRadius * Math.cos(offsetAngle);
        const y = centerY + curveRadius * Math.sin(offsetAngle);

        item.el.style.transform =
          `translate(${x}px, ${y}px) scale(${1 - item.t * 0.2})`;
        item.el.style.opacity = `${1 - item.t}`;
      }
    });
    pile.items = pile.items.filter(item => item.t < 1.2);
  });
  requestAnimationFrame(animate);
}

animate();

// Drop new images continuously into each pile
setInterval(() => {
  piles.forEach(pile => addImage(pile));
}, dropInterval);
