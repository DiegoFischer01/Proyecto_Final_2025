const btnFiltrar = document.getElementById("btnFiltrar");
const menuFiltros = document.getElementById("menuFiltros");
const btnCerrarFiltros = document.getElementById("btnCerrarFiltros");
const nuevasActividades = [
  {
    titulo: "Casa del bicentenario",
    descripcion: "Espacio cultural moderno que ofrece exposiciones, talleres y actividades para toda la comunidad. Un punto de encuentro para el arte y la historia local.",
    imagen: "../Imagenes/actividades/Casa-del-Bicentenario.jpg"
  },
  {
    titulo: "Teatro municipal",
    descripcion: "Histórico escenario de la ciudad donde se presentan obras teatrales, conciertos y eventos culturales. Un ícono de la vida artística olavarriense.",
    imagen: "../Imagenes/actividades/Teatro-Municipal.jpg"
  },
  {
    titulo: "Museo de las ciencias",
    descripcion: "Centro interactivo dedicado a la divulgación científica. Ideal para aprender jugando, con propuestas educativas para todas las edades.",
    imagen: "../Imagenes/actividades/Museo-de-Ciencias.jpg"
  },
  {
    titulo: "Centro Cultural",
    descripcion: "Espacio cultural con muestras de arte, talleres y espectáculos en un edificio histórico restaurado.",
    imagen: "../Imagenes/actividades/Centro-cultural.jpg"
  },
  {
    titulo: "Parque Mitre",
    descripcion: "Clásico parque olavarriense junto al arroyo Tapalqué, con puentes colgantes, juegos y espacios para caminar o hacer ejercicio.",
    imagen: "../Imagenes/actividades/Parque-mitre.jpg"
  },
  {
    titulo: "Museo Municipal Hermanos Emiliozzi",
    descripcion: "El Museo Municipal Hermanos Emiliozzi rinde homenaje a los mas grandes deportistas de la historia de Olavarria:Dante y Torcuato Emiliozzi.",
    imagen: "../Imagenes/actividades/Museo-HE.jpg"
  },
  {
    titulo: "Museo Damaso Arce",
    descripcion: "Museo de artes plásticas y orfebrería en el centro de Olavarría, con colección permanente de piezas del orfebre Dámaso Arce y obras de artistas como Quinquela Martín y Raúl Soldi ",
    imagen: "../Imagenes/actividades/Museo-DA.jpg"
  },
  {
    titulo: "Cine Paris",
    descripcion: "Histórico cine olavarriense renovado, con salas modernas, proyección digital y candy bar. Un punto cultural emblemático del centro, que combina tradición y tecnología para una experiencia completa.",
    imagen: "../Imagenes/actividades/Cine-LP.png"
  },
  {
    titulo: "Cine Flix",
    descripcion: "Moderno complejo de dos salas digitales (incluido 3D) dentro de Chango Mas, con buen sonido, cómodas butacas, estacionamiento amplio y promociones frecuentes",
    imagen: "../Imagenes/actividades/Cine-Flix.png"
  },
  {
    titulo: "Parque Helios Eseverri",
    descripcion: "Amplio espacio verde con más de 1 100 árboles, bicisenda, juegos infantiles y canchas deportivas. Ideal para caminar, entrenar o disfrutar actividades comunitarias al aire libre. ",
    imagen: "../Imagenes/actividades/Parque-norte.png"
  },
  {
    titulo: "La Maxima",
    descripcion: "Espacio natural con senderos, juegos y un pequeño zoológico. Ideal para disfrutar en familia y aprender sobre la fauna local. Un lugar que combina recreación y educación ambiental en un entorno cuidado y accesible.",
    imagen: "../Imagenes/actividades/La-Maxima.png"
  },
  {
    titulo: "Brau",
    descripcion: "Cervecería y restaurant moderno en Gral. Paz al 2600, con cervezas artesanales, pizzas, platos contundentes y ambiente cálido con patio. ",
    imagen: "../Imagenes/actividades/Brau.jpg"
  },
  {
    titulo: "Parque Recreo La Isla",
    descripcion: "Amplio espacio natural junto al arroyo Tapalqué, con mesas, parrillas, quinchos, senderos y áreas de descanso; ideal para un día de picnic, caminatas o actividades al aire libre",
    imagen: "../Imagenes/actividades/La-Isla.jpg"
  }
];

const contenedor = document.getElementById("contenedor-tarjetas");
const botonVerMas = document.getElementById("ver-mas");

let actividadesMostradas = 0;
const increment = 3; 

// Leer itinerario
function obtenerItinerario() {
  return JSON.parse(localStorage.getItem('itinerario')) || [];
}

// Guardar actividad
function agregarAlItinerario(titulo) {
  let actividades = obtenerItinerario();
  if (!actividades.includes(titulo)) {
    actividades.push(titulo);
    localStorage.setItem('itinerario', JSON.stringify(actividades));
  }
}

function quitarDelItinerario(titulo) {
  let actividades = obtenerItinerario();
  actividades = actividades.filter(act => act !== titulo);
  localStorage.setItem('itinerario', JSON.stringify(actividades));
}


function crearTarjeta(actividad) {
  const tarjeta = document.createElement("div");
  tarjeta.className = "col-md-4";
  const actividadesAgregadas = obtenerItinerario();
  tarjeta.innerHTML = `
    <div class="card mb-4 rounded-4">
      <img src="${actividad.imagen}" class="card-img-top rounded-top-4" alt="${actividad.titulo}">
      <div class="card-body">
        <h5 class="card-title fs-3">${actividad.titulo}</h5>
        <p class="card-text">${actividad.descripcion}</p>
        <div class="d-grid gap-2 d-md-flex justify-content-md-end">
          <button class="btn rounded-5" type="button">${actividadesAgregadas.includes(actividad.titulo) ? "Quitar" : "Agregar"}</button>
        </div>
        <p class="text-success mt-2" style="display: ${actividadesAgregadas.includes(actividad.titulo) ? "block" : "none"};">Actividad agregada al itinerario</p>
      </div>
    </div>
  `;

  const boton = tarjeta.querySelector("button");
  const mensaje = tarjeta.querySelector("p.text-success");

  boton.addEventListener("click", () => {
    if (boton.textContent === "Agregar") {
      agregarAlItinerario(actividad.titulo);
      boton.textContent = "Quitar";
      mensaje.style.display = "block";
    } else {
      quitarDelItinerario(actividad.titulo);
      boton.textContent = "Agregar";
      mensaje.style.display = "none";
    }
  });
  

  return tarjeta;
}


// Función actividades de a bloques
function mostrarActividades() {
  const next = actividadesMostradas + increment;
  for (let i = actividadesMostradas; i < next && i < nuevasActividades.length; i++) {
    const tarjeta = crearTarjeta(nuevasActividades[i]);
    contenedor.appendChild(tarjeta);
  }
  actividadesMostradas = Math.min(next, nuevasActividades.length);

  if (actividadesMostradas >= nuevasActividades.length) {
    botonVerMas.style.display = "none";

    // Cartel que no hay más actividades
    let cartel = document.getElementById("cartel-fin");
    if (!cartel) {
      cartel = document.createElement("p");
      cartel.id = "cartel-fin";
      cartel.textContent = "No hay más actividades para mostrar";
      cartel.className = "text-center mt-3 fw-bold";
      botonVerMas.parentNode.insertBefore(cartel, botonVerMas.nextSibling);
    }
  }
}

// Mostrar primeras 6 actividades al cargar la página
function mostrarPrimerasSeis() {
  const primerBloque = 6;
  for (let i = 0; i < primerBloque && i < nuevasActividades.length; i++) {
    const tarjeta = crearTarjeta(nuevasActividades[i]);
    contenedor.appendChild(tarjeta);
  }
  actividadesMostradas = Math.min(primerBloque, nuevasActividades.length);

  // Si ya mostró todo ocultar botón y mostrar cartel
  if (actividadesMostradas >= nuevasActividades.length) {
    botonVerMas.style.display = "none";

    let cartel = document.getElementById("cartel-fin");
    if (!cartel) {
      cartel = document.createElement("p");
      cartel.id = "cartel-fin";
      cartel.textContent = "No hay más actividades para mostrar";
      cartel.className = "text-center mt-3 fw-bold";
      botonVerMas.parentNode.insertBefore(cartel, botonVerMas.nextSibling);
    }
  }
}

// Evento para el botón "Ver más"
botonVerMas.addEventListener("click", mostrarActividades);

// Mostrar primeras 6 al cargar
mostrarPrimerasSeis();


btnFiltrar.addEventListener("click", () => {
  menuFiltros.classList.toggle("oculto");
});

btnCerrarFiltros.addEventListener("click", () => {
  menuFiltros.classList.add("oculto");
});
