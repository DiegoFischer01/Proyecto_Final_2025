//nEFECTO NAVBAR
let lastScrollTop = 0;
const navbar = document.getElementById("mainNavbar");
const navbarToggler = document.getElementById("#navbarTogller");
const navbarCollapse = document.getElementById("navBarNav");

window.addEventListener("scroll", 
    function() {
        let scrollTop = window.scrollY;

        //CAMBIAR TRANSPARENCIA A COLOR NEGRO DESPUES DE HACER SCROLL
        if(scrollTop > 50) {
            navbar.classList.remove("bg-transparent");
            navbar.classList.add("bg-dark");
        }else {
            navbar.classList.remove("bg-dark");
            navbar.classList.add("bg-transparent");
        }

        //OCULTAR AL HACER SCROLL HACIA ABAJO
        if(scrollTop > lastScrollTop && scrollTop > 550) {
            navbar.style.top = "-80px";
        }else {
            navbar.style.top = "0";
        }

        lastScrollTop = scrollTop <= 0 ? 0:scrollTop;
    });


//----------------------------------------------------------------------------------
//----------------------------------------------------------------------------------



//MAPA DE OLAVARRIA LEATLET
const olavarriaCordenadas = [-36.8933, -60.3225];
const mapa = L.map(`mapa`).setView(olavarriaCordenadas, 13) //13 es un buen zoom para ciudad

//CARGAR MAPA
L.tileLayer(`https://tile.openstreetmap.org/{z}/{x}/{y}.png`, {
    attribution: `&copy; OpenStreetMap contributors`
}).addTo(mapa);

//AGREGAR MARCADOR
L.marker(olavarriaCordenadas).addTo(mapa)
    .bindPopup(`Olavarria, Buenos Aires, Argentina`)
    .openPopup();




//SECCION COMENTARIOS
const draggable = document.getElementById('draggable');
const zonaOrigen = document.getElementById('zona-origen');
const dropZone = document.getElementById('drop-zone');

const itemData = {
    draggable1: {
        titulo: "Vivi Blasco",
        descripcion: `"¡Excelente página! Encontré todo lo que necesitaba para organizar mi escapada a Olavarría. Clara, rápida y muy visual."`
    },
    draggable2: {
        titulo: "Sergio Garcia Retegui",
        descripcion: `"Viaggio me ayudó a descubrir lugares increíbles como el Parque Mitre y la iglesia San josé. ¡No sabía que Olavarría tenía tanto para ofrecer!"`
    },
    draggable3: {
        titulo: "Carolina Vasconcellos",
        descripcion: `"La mejor guía turística de Olavarria. Me encantaron las fotos y la info útil para cada lugar."`
    },
    draggable4: {
        titulo: "Jose Mauricio",
        descripcion: `"Gracias a Viaggio visité el Museo de los Hermanos Emiliozzi. ¡Imperdible para los fans del automovilismo!"`
    },
    draggable5: {
        titulo: "Karen Simari",
        descripcion: `"¡Me encantó la experiencia! Viaggio hizo     que recorrer Olavarría fuera fácil y emocionante. Todo esta explicado con detalle"`
    }
};



//AL CXOMENZAR A ARRASTRAR
function setupDraggable(el) {
    el.addEventListener(`dragstart`, (e) => {
        e.dataTransfer.setData(`text/plain`, el.id);
        setTimeout(() => {
            el.style.display = `none`; //OCULTAR EL ELEMENTO MIENTRAS SE ARRASTRA 
        });

    });

    el.addEventListener(`dragend`, () => {
        el.style.display = "flex";
    });
}

document.querySelectorAll(`.drg`).forEach((el, index) => {
    el.dataset.originalIndex = index; //GUARDAR EL ÍNDICE ORIGINAL
    setupDraggable(el);
});

//AL TERMINAR DE ARRASTRAR
function setupDrop(zone) {
    zone.addEventListener(`dragover`, (e) => {
        e.preventDefault(); //NECESARIO PARA QUE SE PERMITA EL DROP
    });


    zone.addEventListener(`drop`, (e) => {
        e.preventDefault();


        const draggedId = e.dataTransfer.getData(`text/plain`);
        const draggedEl = document.getElementById(draggedId);
        const mensaje = document.getElementById('mensaje');

        if(draggedEl.classList.contains("en-dropzone") && zone.id === "zona-origen") {
            return;
        }

        //QUE SOLO PERMITA UN ITEM DENTRO DE LA ZONA DE DROP
        if (zone.id === "drop-zone" && zone.childElementCount > 1) {
            mensaje.textContent = "Solo se permite un elemento e la zona de drop.";
            return;
        }else {
            mensaje.textContent = "";   
        }


        if(zone.id === "drop-zone") {

            const placeholder = document.createElement("div");
            placeholder.classList.add("placeholder");
            placeholder.style.width = "50%";
            placeholder.style.display = "inline-block";
            placeholder.style.visibility = "hidden";

            zonaOrigen.replaceChild(placeholder, draggedEl);
            placeholder.dataset.placeholderFor = draggedId;


            zone.innerHtml = "";

            const contenedor = document.createElement('div');
            contenedor.classList.add("info-container", "fade-in");
            contenedor.style.display = "flex";
            contenedor.style.alignItems = "flex-start";
            contenedor.style.gap = "10px";

            contenedor.appendChild(draggedEl);
            draggedEl.draggable = false;

            draggedEl.classList.add("en-dropzone");

            const data = itemData[draggedId];
            const infoBox = document.createElement('div');

            infoBox.classList.add("brg-info");
            infoBox.innerHTML = `
                <h3>${data.titulo}</h3>
                <p>${data.descripcion}</p>
            `;

            //CRUZ PARA ELIMINAR EL ELEMENTO DEL DROP ZONE
            const closeButton = document.createElement("button");
            closeButton.classList.add("btn-quitar");
            closeButton.textContent = "X";
            closeButton.style.position = "absolute";
            closeButton.style.top = "0px";
            closeButton.style.right = "10px";
            closeButton.style.background = "transparent";
            closeButton.style.border = "none";
            closeButton.style.fontSize = "20px";
            closeButton.style.cursor = "pointer";
            closeButton.style.zIndex = "999";

            //CONTENEDOR RELATIVO PARA POSICIONAR LA X
            contenedor.style.position = "relative";
            contenedor.appendChild(closeButton);

            //EVENTO AL HACER CLICK EN LA CRUZ
            closeButton.addEventListener("click", () => {
                contenedor.classList.remove("fade-in");
                contenedor.classList.add("fade-out");

                contenedor.addEventListener("animationend" , () => {
                    contenedor.remove();//ELIMINA EL CONTENEDOR DE DROP ZONE
                })


                const placeholder = zonaOrigen.querySelector(`[data-placeholder-for="${draggedId}"]`);

                if(placeholder) {
                    zonaOrigen.replaceChild(draggedEl,placeholder);
                }

                draggedEl.style.display = "flex"; //MOSTRAR EL ITEM DE NUEVO
                draggedEl.draggable = true;
                draggedEl.classList.remove("en-dopzone");
                
            })

            contenedor.appendChild(infoBox);
            zone.appendChild(contenedor);

        }else {
            mensaje.textContent = "";

            if(draggedEl.parentElement.classList.contains("info-container")) {
                draggedEl.parentElement.remove();
                zone.appendChild(draggedEl);

            }

            const index = parseInt(draggedEl.dataset.originalIndex);
            const children = Array.from(zone.children);

            //INSERTAR EL ITEM EN LA POSICION CORRECTA
            let inserted = false;
            for(let i = 0; i < children.length; i++) {
                const child = children[i];

                //IGNORAMOS ELEMENTOS QUE NO SON ITEMS DRAGGABLES
                if(!child.classList.contains("drg")) continue;

                    const childIndex = parseInt(child.dataset.originalIndex);
                    if(childIndex > index) {
                        zone.insertBefore(draggedEl, child);
                        inserted = true;
                        break;
                    }  
            }
            if(!inserted) {
                zone.appendChild(draggedEl); //SI NO SE INSERTÓ, AÑADIR AL FINAL
            }
            
        }

    });
}

setupDrop(zonaOrigen);
setupDrop(dropZone);




//parallax para parallax
const title = document.getElementById("parallax-texto");

window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;
    const offsetX = scrollY * 0.6;
    title.style.transform = `translateX(${offsetX}px)`
});

const title2 = document.getElementById("parallax-texto2");

window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;
    const offsetX = scrollY * -0.6;
    title2.style.transform = `translateX(${offsetX}px)`
});