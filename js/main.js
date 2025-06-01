//ANIMACION DE SALTO DE IMAGENES PARA QUE SOLO SE ACTIVE AL HACER SCROLL
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if(entry.isIntersecting) {
            entry.target.classList.add("animate");
        } else {
            entry.target.classList.remove("animate");
        }
    })
});

document.querySelectorAll(".img-card").forEach(box => {
    observer.observe(box);
});
