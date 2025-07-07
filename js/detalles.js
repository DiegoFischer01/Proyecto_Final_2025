//obtener el ID del alojamiento desde la url
const params = new URLSearchParams(window.location.search);
const id = parseInt(params.get("id"));

//seleccionar el contenedor donde se mostrara la info
const container = document.getElementById("detalle-contenedor");


fetch("../json/alojamientos.json")
    .then(response => response.json())
    .then(data => {
        const alojamiento = data.find(item => item.id === id);

        if(!alojamiento) {
            container.innerHTML= `
            <p>Alojamiento no encontrado.</p>
            `
            return;
        }

        //CONSTRUIR HTML DINAMICO


        container.innerHTML=`
            <div class="galeria-contenedor">
                <div class="btn-contenedor">
                    <button class="boton-reservar">
                        Reservar ahora
                    </button>
                </div>
                </div>
                <div class="galeria">
                    ${alojamiento.imagen.map(img => `<img src="${img.url}"class="${img.clases}" alt="${alojamiento.nombre}"/>`).join("")}
                    <h1>${alojamiento.nombre}</h1>
                    <p class="puntuacion">⭐${alojamiento.puntuacion}</p>        
                    <p class="descripcion"><strong>Descripcion: </strong>${alojamiento.descripcion}</p>


                    <div class="galeria-informacion">
                        <p><strong>Capacidad: </strong>${alojamiento.personas}</p>
                        <p><strong>Precio por noche: </strong>$${alojamiento.precio}</p>
                        <p><strong>Ubicacion:</strong>${alojamiento.ubicacion}</p>
                    </div>

                    <div class="servicios">
                        <p><strong>Servicios: </strong></p>
                        <ul>
                            ${alojamiento.servicios.map(servicio => `<li>${servicio}</li>`).join("")}
                        </ul>

                    </div>
                </div>

                
            </div>

                <div class="galeria-descripcion">
                </div>
        
`;
            

    })
    .catch(err => {
        console.error("Error al cargar los datos: ", err);
        container.innerHTML= `<p>Error al cargar los datos.</p>`;
    });
