let rotacionActual = 0;
let girando = false;

/* IMAGEN BILLETE */
const imagenBillete = new Image();
imagenBillete.src = "https://grupospazi.mx/wp-content/uploads/2026/01/bllete-temp.webp";

const premios = [
  "5% DE DESCUENTO",
  "10% DE DESCUENTO",
  "15% DE DESCUENTO",
  "20% DE DESCUENTO",
  "DESCUENTO SORPRESA",
  "ENVÍO GRATIS",
  "25% DE DESCUENTO",
  "REGALO ESPECIAL"
];

const ruleta = document.getElementById("ruleta");
const labels = document.getElementById("labels");
const resultado = document.getElementById("resultado");

/* CREAR TEXTOS CENTRADOS */
premios.forEach((texto, i) => {
  const label = document.createElement("div");
  label.className = "label";

  const angulo = i * 45 + 22.5;

  label.style.transform = `
    rotate(${angulo}deg)
    translate(80px, -8px)
  `;

  label.innerText = texto;
  labels.appendChild(label);
});

/* GIRAR RULETA */
ruleta.addEventListener("click", () => {
  if (girando) return;
  girando = true;

  const vueltas = Math.floor(Math.random() * 3) + 5;
  const anguloExtra = Math.floor(Math.random() * 360);

  rotacionActual += vueltas * 360 + anguloExtra;
  ruleta.style.transform = `rotate(${rotacionActual}deg)`;

  setTimeout(() => {
    const anguloFinal = rotacionActual % 360;
    const index = Math.floor((360 - anguloFinal) / 45) % premios.length;

    resultado.innerText = `🎉 FELICIDADES GANASTE: ${premios[index]}`;
    lanzarConfetti();
    girando = false;
  }, 4000);
});

/* CONFETI / BILLETES */
const canvas = document.getElementById("confetti");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

function lanzarConfetti() {
  const billetes = [];
  const rect = ruleta.getBoundingClientRect();
  // const centroY = canvas.height / 2;
  const centroY = rect.top + rect.height / 2;
  let contador = 0;
  const total = 90;

  function disparar(lado) {
    const origenX = lado === "izq" ? -30 : canvas.width + 30;
    const anguloBase = lado === "izq" ? 0 : Math.PI;
    const angulo = anguloBase + (Math.random() * 0.8 - 0.4);
    const velocidad = Math.random() * 9 + 7;

    billetes.push({
      x: origenX,
      y: centroY + Math.random() * 120 - 60,
      vx: Math.cos(angulo) * velocidad,
      vy: Math.sin(angulo) * velocidad - 10,
      gravity: 0.3,
      rot: Math.random() * 360,
      rotSpeed: Math.random() * 18 - 9,
      w: 42,
      h: 22
    });
  }

  function animar() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (contador < total) {
      disparar("izq");
      disparar("der");
      contador++;
    }

    billetes.forEach(b => {
      ctx.save();
      ctx.translate(b.x, b.y);
      ctx.rotate(b.rot * Math.PI / 180);
      ctx.drawImage(imagenBillete, -b.w / 2, -b.h / 2, b.w, b.h);
      ctx.restore();

      b.vy += b.gravity;
      b.x += b.vx;
      b.y += b.vy;
      b.rot += b.rotSpeed;
    });

    requestAnimationFrame(animar);
  }

  animar();
}

