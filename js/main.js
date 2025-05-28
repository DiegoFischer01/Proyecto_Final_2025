//ANIMACION DE SALTO DE IMAGENES PARA QUE SOLO SE ACTIVE AL HACER SCROLL
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if(entry.isIntersecting) {
            entry.target.classList.add("animate");
        } else {
            entry.target.classList.remove("animate");
        }
    });
}, {
    threshold: 0.2 //SE ACTIVA CUANDO AL MENOS 20% DEL ELEMENTO ES VISIBLE
});

document.querySelectorAll(".img-card").forEach(box => {
    observer.observe(box);
});
