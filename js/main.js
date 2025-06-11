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