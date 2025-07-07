const form = document.getElementById("formulario");

form.addEventListener("submit", (e) =>{
    e.preventDefault();

    const contraseña = document.getElementById("contraseña").value.trim();


    if(contraseña === "") {
        Swal.fire("Campos vacíos", "Por favor completá todos los campos", "Warning");
        return;
    }

    //TODO VALIDO
    Swal.fire({
        icon: "success",
        title: "¡iniciando sesión!",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
    }).then(() => {
        form.reset();
    });
})
