const btnOrdenar = document.getElementById("btnOrdenar");
const menuOrdenar = document.getElementById("menuOrdenar");
const btnCerrarOrdenar = document.getElementById("btnCerrarOrdenar");

btnOrdenar.addEventListener("click", () => {
    menuOrdenar.classList.toggle("oculto");
});

btnCerrarOrdenar.addEventListener("click", () => {
    menuOrdenar.classList.add("oculto");
});

const contenedorItinerario = document.getElementById("contenedor-itinerario");

const todasLasActividades = [
    {
        titulo: "Casa del bicentenario",
        descripcion: "Espacio cultural moderno que ofrece exposiciones, talleres y actividades para toda la comunidad.",
        imagen: "../Imagenes/actividades/Casa-del-Bicentenario.jpg"
    },
    {
        titulo: "Teatro municipal",
        descripcion: "Histórico escenario de la ciudad donde se presentan obras teatrales, conciertos y eventos culturales.",
        imagen: "../Imagenes/actividades/Teatro-Municipal.jpg"
    },
    {
        titulo: "Museo de las ciencias",
        descripcion: "Centro interactivo dedicado a la divulgación científica. Ideal para aprender jugando.",
        imagen: "../Imagenes/actividades/Museo-de-Ciencias.jpg"
    },
    {
        titulo: "Centro Cultural",
        descripcion: "Espacio cultural con muestras de arte, talleres y espectáculos.",
        imagen: "../Imagenes/actividades/Centro-cultural.jpg"
    },
    {
        titulo: "Parque Mitre",
        descripcion: "Clásico parque olavarriense con juegos y puentes colgantes.",
        imagen: "../Imagenes/actividades/Parque-mitre.jpg"
    },
    {
        titulo: "Museo Municipal Hermanos Emiliozzi",
        descripcion: "Museo que rinde homenaje a los corredores Emiliozzi.",
        imagen: "../Imagenes/actividades/Museo-HE.jpg"
    },
    {
        titulo: "Museo Damaso Arce",
        descripcion: "Museo de artes plásticas y orfebrería con obras de Quinquela y Soldi.",
        imagen: "../Imagenes/actividades/Museo-DA.jpg"
    },
    {
        titulo: "Cine Paris",
        descripcion: "Histórico cine renovado con proyección digital y candy bar.",
        imagen: "../Imagenes/actividades/Cine-LP.png"
    },
    {
        titulo: "Cine Flix",
        descripcion: "Complejo moderno de dos salas, una 3D, en Chango Más.",
        imagen: "../Imagenes/actividades/Cine-Flix.png"
    },
    {
        titulo: "Parque Helios Eseverri",
        descripcion: "Espacio verde con bicisenda, árboles y canchas.",
        imagen: "../Imagenes/actividades/Parque-norte.png"
    },
    {
        titulo: "La Maxima",
        descripcion: "Espacio natural con senderos, juegos y mini zoológico.",
        imagen: "../Imagenes/actividades/La-Maxima.png"
    },
    {
        titulo: "Brau",
        descripcion: "Cervecería con buen ambiente, patio y platos abundantes.",
        imagen: "../Imagenes/actividades/Brau.jpg"
    },
    {
        titulo: "Parque Recreo La Isla",
        descripcion: "Parque con parrillas, mesas, senderos y mucha sombra.",
        imagen: "../Imagenes/actividades/La-Isla.jpg"
    }
];

//Traer lo guardado
function obtenerItinerario() {
    return JSON.parse(localStorage.getItem("itinerario")) || [];
}

//Mostrarlo
function mostrarItinerario() {
    const actividades = obtenerItinerario();

    if (actividades.length === 0) {
        contenedorItinerario.innerHTML = `<p class="text-center mt-4">No hay actividades en tu itinerario.</p>`;
        return;
    }
  actividades.forEach(titulo => {
    const actividad = todasLasActividades.find(act => act.titulo === titulo);
    if (actividad) {
      const tarjeta = document.createElement("div");
      tarjeta.classList.add("card", "mb-3", "actividades");

      tarjeta.innerHTML = `
        <div class="row align-items-center">
          <div class="col-md-8">
            <div class="card-body">
              <h5 class="card-title">${actividad.titulo}</h5>
              <p class="card-text">${actividad.descripcion}</p>
            </div>
          </div>
          <div class="col-md-4">
            <img src="${actividad.imagen}" class="img-fluid actividades-img" alt="${actividad.titulo}" />
          </div>
        </div>
      `;

      contenedorItinerario.appendChild(tarjeta);
    }
  });
}

mostrarItinerario();
