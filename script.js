let girando = false;

function girar() {
  if (girando) return;
  girando = true;

  const ruleta = document.getElementById("ruleta");
  const resultado = document.getElementById("resultado");

  const grados = Math.floor(Math.random() * 360) + 1440;
  ruleta.style.transform = `rotate(${grados}deg)`;

  setTimeout(() => {
    const angulo = grados % 360;
    let premio = "";

    if (angulo < 60) premio = "5% de descuento";
    else if (angulo < 120) premio = "10% de descuento";
    else if (angulo < 180) premio = "15% de descuento";
    else if (angulo < 240) premio = "20% de descuento";
    else if (angulo < 300) premio = "Sigue participando";
    else premio = "Descuento sorpresa";

    resultado.innerText = `Ganaste: ${premio}`;
    girando = false;
  }, 4000);
}
