'use strict';

document.addEventListener("DOMContentLoaded", () => {
  const llegadaInput = $('#fecha-llegada');
  const regresoInput = $('#fecha-regreso');
  const hoy = new Date();

  llegadaInput.datepicker({
    format: 'dd/mm/yyyy',
    autoclose: true,
    todayHighlight: true,
    startDate: hoy
  }).on('changeDate', function (e) {
    validarFecha();

    // Actualizar el mínimo de fecha de regreso
    const nuevaLlegada = e.date;
    $('#fecha-regreso').datepicker('setStartDate', nuevaLlegada);
  });

  // Inicializar campo de fecha de regreso correctamente
  regresoInput.datepicker({
    format: 'dd/mm/yyyy',
    autoclose: true,
    todayHighlight: true,
    startDate: hoy
  }).on('changeDate', function () {
    validarFecha(); // También puede validar al cambiar
  });
});

// Botón "Continuar"
function scrollToAlojamiento() {
  const ciudad = document.getElementById("ciudad").value;
  const fechaLlegada = document.getElementById("fecha-llegada").value;
  const seccionAlojamientos = document.getElementById("seccion-alojamientos");

  if (ciudad === "Olavarria" && fechaLlegada) {
    seccionAlojamientos.style.display = "block";
    seccionAlojamientos.scrollIntoView({ behavior: "smooth" });
  } else {
    alert("Por favor, completá todos los campos: seleccioná una ciudad y una fecha válida.");
  }
}

// Botones "Seleccionar" en tarjetas
document.querySelectorAll(".btn-seleccionar").forEach(boton => {
  boton.addEventListener("click", function () {
    const seleccionado = boton.classList.contains("seleccionado");

    if (seleccionado) {
      boton.classList.remove("seleccionado", "btn-success");
      boton.classList.add("btn-outline-success");
      boton.textContent = "Seleccionar";
      boton.closest(".card").classList.remove("seleccionada");
    } else {
      document.querySelectorAll(".btn-seleccionar").forEach(b => {
        b.classList.remove("seleccionado", "btn-success");
        b.classList.add("btn-outline-success");
        b.textContent = "Seleccionar";
        b.closest(".card").classList.remove("seleccionada");
      });

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
  const hotel = document.querySelector(".btn-seleccionar.seleccionado");
  const contenedor = document.getElementById("contenedor-actividades");

  if (ciudad === "Olavarria" && llegada && hotel) {
    contenedor.style.display = "block";
  } else {
    contenedor.style.display = "none";
  }
}

function validarFecha() {
  const llegadaInput = document.getElementById("fecha-llegada");
  const regresoInput = document.getElementById("fecha-regreso");
  const llegada = llegadaInput.value.split("/").reverse().join("-");
  const regreso = regresoInput.value ? regresoInput.value.split("/").reverse().join("-") : null;
  const hoy = new Date().toISOString().split("T")[0];

  if (llegada && new Date(llegada) < new Date(hoy)) {
    alert("No se puede seleccionar una fecha de llegada anterior a hoy.");
    llegadaInput.value = "";
  }

  if (regreso && llegada && new Date(regreso) < new Date(llegada)) {
    alert("La fecha de regreso no puede ser anterior a la fecha de llegada.");
    regresoInput.value = "";
  }

  // Validar fecha de regreso si existe
  if (regreso && new Date(regreso) < new Date(hoy)) {
    alert("No se puede seleccionar una fecha de regreso anterior a hoy.");
    regresoInput.value = "";
  }

  verificarDatosCompletos();
}

// Botón "Ver actividades"
function verActividades() {
  const ciudad = document.getElementById("ciudad").value;
  const fechaLlegada = document.getElementById("fecha-llegada").value;
  const hotelSeleccionado = document.querySelector(".btn-seleccionar.seleccionado");
  const fechaRegreso = document.getElementById("fecha-regreso").value; // 🔧 NUEVO

  if (!ciudad || !fechaLlegada || !hotelSeleccionado) {
    alert("Completá todos los campos y seleccioná un hotel antes de continuar.");
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

function verActividades() {
  const estaLogueado = localStorage.getItem("usuarioLogueado") === "true";

  if (!estaLogueado) {
    alert("Necesitás estar registrado para ver las actividades.");
    window.location.href = "/Proyecto_Final_2025/paginas/registrarse.html"; // o "login.html", según tu flujo
    return;
  }

  // Si está logueado, redirigir normalmente
  window.location.href = "actividades.html";
}

// Verificación automática
document.getElementById("ciudad").addEventListener("change", verificarDatosCompletos);
document.getElementById("fecha-llegada").addEventListener("change", verificarDatosCompletos);
document.getElementById("fecha-regreso").addEventListener("change", verificarDatosCompletos); 