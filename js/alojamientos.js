'use strict';

// Calendario
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".datepicker").forEach(input => {
    $(input).datepicker({
      format: 'dd/mm/yyyy',
      autoclose: true,
      todayHighlight: true
    });
  });
});

// Botón "Continuar"
function scrollToAlojamiento() {
  const ciudad = document.getElementById("ciudad").value;
  const fechaLlegada = document.getElementById("fecha-llegada").value;
  const fechaRegreso = document.getElementById("fecha-regreso").value;
  const seccionAlojamientos = document.getElementById("seccion-alojamientos");

  if (ciudad === "Olavarria" && fechaLlegada && fechaRegreso) {
    seccionAlojamientos.style.display = "block";
    seccionAlojamientos.scrollIntoView({ behavior: "smooth" });
  } else {
    alert("Por favor, completá todos los campos, debes seleccionar la ciudad y completar ambas fechas.");
  }
}

// Botones "Seleccionar" en tarjetas
document.querySelectorAll(".btn-seleccionar").forEach(boton => {
  boton.addEventListener("click", function () {
    const seleccionado = boton.classList.contains("seleccionado");

    if (seleccionado) {
      // Desseleccionar
      boton.classList.remove("seleccionado", "btn-success");
      boton.classList.add("btn-outline-success");
      boton.textContent = "Seleccionar";
      boton.closest(".card").classList.remove("seleccionada");
    } else {
      // Desseleccionar todos los demás
      document.querySelectorAll(".btn-seleccionar").forEach(b => {
        b.classList.remove("seleccionado", "btn-success");
        b.classList.add("btn-outline-success");
        b.textContent = "Seleccionar";
        b.closest(".card").classList.remove("seleccionada");
      });

      // Seleccionar este
      boton.classList.add("seleccionado", "btn-success");
      boton.classList.remove("btn-outline-success");
      boton.textContent = "Seleccionado ✅";
      boton.closest(".card").classList.add("seleccionada");
    }

    verificarDatosCompletos();
  });
});

// Mostrar botón "Ver actividades"
function verificarDatosCompletos() {
  const ciudad = document.getElementById("ciudad").value;
  const llegada = document.getElementById("fecha-llegada").value;
  const regreso = document.getElementById("fecha-regreso").value;
  const hotel = document.querySelector(".btn-seleccionar.seleccionado");
  const contenedor = document.getElementById("contenedor-actividades");

  if (ciudad === "Olavarria" && llegada && regreso && hotel) {
    contenedor.style.display = "block";
  } else {
    contenedor.style.display = "none";
  }
}

// Botón "Ver actividades"
function verActividades() {
  const ciudad = document.getElementById("ciudad").value;
  const fechaLlegada = document.getElementById("fecha-llegada").value;
  const fechaRegreso = document.getElementById("fecha-regreso").value;
  const hotelSeleccionado = document.querySelector(".btn-seleccionar.seleccionado");

  if (!ciudad || !fechaLlegada || !fechaRegreso || !hotelSeleccionado) {
    alert("Por favor, completá todos los campos y seleccioná un hotel antes de continuar.");
    return;
  }

  const tarjetaSeleccionada = hotelSeleccionado.closest(".card");
  const imagen = tarjetaSeleccionada.querySelector("img").getAttribute("src");

  const datosUsuario = {
    ciudad,
    fechaLlegada,
    fechaRegreso,
    hotel: tarjetaSeleccionada.querySelector(".card-title").textContent,
    imagen: imagen
  };

  localStorage.setItem("datosReserva", JSON.stringify(datosUsuario));
  window.location.href = "actividades.html";
}

// Escuchas para verificar datos
document.getElementById("ciudad").addEventListener("change", verificarDatosCompletos);
document.getElementById("fecha-llegada").addEventListener("change", verificarDatosCompletos);
document.getElementById("fecha-regreso").addEventListener("change", verificarDatosCompletos);
