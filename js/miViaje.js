const btnOrdenar = document.getElementById("btnOrdenar");
const menuOrdenar = document.getElementById("menuOrdenar");
const btnCerrarOrdenar = document.getElementById("btnCerrarOrdenar");

btnOrdenar.addEventListener("click", () => {
  menuOrdenar.classList.toggle("oculto");
});

btnCerrarOrdenar.addEventListener("click", () => {
  menuOrdenar.classList.add("oculto");
});
