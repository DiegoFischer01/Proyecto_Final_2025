"use strict";

import {
  fetchAlojamientos,
  filtrarAlojamientosPorPresupuesto,
} from "./utils/alojamientos-utils.js";

let presupuesto = 0;

document.addEventListener("DOMContentLoaded", () => {
  const llegadaInput = $("#fecha-llegada");
  const regresoInput = $("#fecha-regreso");
  const hoy = new Date();

  llegadaInput
    .datepicker({
      format: "dd/mm/yyyy",
      autoclose: true,
      todayHighlight: true,
      startDate: hoy,
    })
    .on("changeDate", function (e) {
      validarFecha();

      // Actualizar el mínimo de fecha de regreso
      const nuevaLlegada = e.date;
      $("#fecha-regreso").datepicker("setStartDate", nuevaLlegada);
    });

  // Inicializar campo de fecha de regreso correctamente
  regresoInput
    .datepicker({
      format: "dd/mm/yyyy",
      autoclose: true,
      todayHighlight: true,
      startDate: hoy,
    })
    .on("changeDate", function () {
      validarFecha(); // También puede validar al cambiar
    });

  document.getElementById("btn-continuar").addEventListener("click", () => {
    //Actualiza la variable global presupuesto
    actualizarPresupuesto();

    const alojamientosContainer = document.querySelector(
      "#seccion-alojamientos .row"
    );

    scrollToAlojamiento();
  });

  document
    .getElementById("btn-ver-actividades")
    .addEventListener("click", verActividades);

  // Verificación automática
  document
    .getElementById("ciudad")
    .addEventListener("change", verificarDatosCompletos);
  document
    .getElementById("fecha-llegada")
    .addEventListener("change", verificarDatosCompletos);
  document
    .getElementById("fecha-regreso")
    .addEventListener("change", verificarDatosCompletos);
});

//Función que recibe un objeto alojamiento por parametro y devuelve una card.
function createAlojamientoCard(alojamiento) {
  const card = document.createElement("div");
  card.classList.add("col-md-4", "col-sm-6", "mb-4");
  card.innerHTML = `
      <div class="card">
        <img src="${alojamiento.imagen[0].url}" class="card-img-top" alt="${alojamiento.nombre}" />
        <div class="card-body">
          <h5 class="card-title">${alojamiento.nombre}</h5>
          <p class="card-text">${alojamiento.descripcion}</p>
          <div class="d-flex justify-content-between">
            <a href="detalle.html?id=${alojamiento.id}" class="btn btn-warning mb-0">Ver más</a>
            <button class="btn btn-sm btn-outline-success btn-seleccionar">Seleccionar</button>
          </div>
        </div>
      </div>
  `;
  return card;
}

function scrollToAlojamiento() {
  const ciudad = document.getElementById("ciudad").value;
  const fechaLlegada = document.getElementById("fecha-llegada").value;
  const seccionAlojamientos = document.getElementById("seccion-alojamientos");

  //Verificar campos
  if (ciudad === "Olavarria" && fechaLlegada) {
    const alojamientosContainer = document.querySelector(
      "#seccion-alojamientos .row"
    );

    //Limpiar DOM
    alojamientosContainer.innerHTML = "";

    //Cargar DOM con alojamientos filtrados.
    fetchAlojamientos().then((alojamientos) => {
      if (!alojamientos) {
        alert("No se pudieron cargar los alojamientos.");
        return;
      }

      if (presupuesto > 0) {
        const filtrados = filtrarAlojamientosPorPresupuesto(
          alojamientos,
          presupuesto
        );
        cargarAlojamientos(filtrados);
      } else {
        cargarAlojamientos(alojamientos);
      }
    });

    seccionAlojamientos.scrollIntoView({ behavior: "smooth" });
  } else {
    alert(
      "Por favor, completá todos los campos: seleccioná una ciudad y una fecha válida."
    );
  }
}

// Carga los alojamientos dinamicamente en el DOM
async function cargarAlojamientos(alojamientosArr) {
  const contenedor = document.querySelector("#seccion-alojamientos .row");

  alojamientosArr.forEach((aloj) => {
    contenedor.appendChild(createAlojamientoCard(aloj));
  });

  document.getElementById("seccion-alojamientos").style.display = "block";
}

// Botones "Seleccionar" en tarjetas
document
  .querySelector("#seccion-alojamientos .row")
  .addEventListener("click", function (e) {
    if (e.target.classList.contains("btn-seleccionar")) {
      const boton = e.target;
      const seleccionado = boton.classList.contains("seleccionado");

      if (seleccionado) {
        boton.classList.remove("seleccionado", "btn-success");
        boton.classList.add("btn-outline-success");
        boton.textContent = "Seleccionar";
        boton.closest(".card").classList.remove("seleccionada");
      } else {
        document.querySelectorAll(".btn-seleccionar").forEach((b) => {
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
    }
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

function actualizarPresupuesto() {
  //Obtiene el presupuesto ingresado por el usuario
  const presupuestoInputValue = document.querySelector(".presupuesto").value;

  //Asegura que el presupuesto contenga solo digitos (no decimales ni signos)
  if (/^\d+$/.test(presupuestoInputValue)) {
    //actualiza el presupuesto
    presupuesto = Number(presupuestoInputValue);
  } else {
    presupuesto = 0;
  }
}

function validarFecha() {
  const llegadaInput = document.getElementById("fecha-llegada");
  const regresoInput = document.getElementById("fecha-regreso");
  const llegada = llegadaInput.value.split("/").reverse().join("-");
  const regreso = regresoInput.value
    ? regresoInput.value.split("/").reverse().join("-")
    : null;
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

function verActividades() {
  const estaLogueado = localStorage.getItem("usuarioLogueado") === "true";

  if (!estaLogueado) {
    alert("Necesitás estar registrado para ver las actividades.");
    window.location.href = "/paginas/registrarse.html";
    return;
  }

  // Si está logueado, almacenar los datos elegidos y redirigir a la pagina actividades:
  const ciudad = document.getElementById("ciudad").value;
  const fechaLlegada = document.getElementById("fecha-llegada").value;
  const hotelSeleccionado = document.querySelector(
    ".btn-seleccionar.seleccionado"
  );
  const fechaRegreso = document.getElementById("fecha-regreso").value; // 🔧 NUEVO

  if (!ciudad || !fechaLlegada || !hotelSeleccionado) {
    alert(
      "Completá todos los campos y seleccioná un hotel antes de continuar."
    );
    return;
  }

  const tarjetaSeleccionada = hotelSeleccionado.closest(".card");
  const imagen = tarjetaSeleccionada.querySelector("img").getAttribute("src");

  const datosUsuario = {
    ciudad,
    fechaLlegada,
    fechaRegreso,
    hotel: tarjetaSeleccionada.querySelector(".card-title").textContent,
    imagen: imagen,
  };

  localStorage.setItem("datosReserva", JSON.stringify(datosUsuario));
  window.location.href = "actividades.html";
}
