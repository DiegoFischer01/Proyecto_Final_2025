const form = document.getElementById("formulario");

form.addEventListener("submit", (e) =>{
    e.preventDefault();

    const nombre = document.getElementById("nombre").value.trim();
    const apellido = document.getElementById("apellido").value.trim();
    const contraseña = document.getElementById("contraseña").value.trim();
    const confirmarContraseña = document.getElementById("confirmarContraseña").value.trim();

    const nuevoUsuario = {
        nombre,
        apellido,
        email,
        contraseña
    };

    const usuarios = JSON.parse(localStorage.getItem(`usuarios`)) || [];

    const yaExiste = usuarios.some(usuario => usuario.email === email);

    if(yaExiste) {
        Swal.fire({
            icon:"error",
            title: "Correo ya registrado",
            text:"Por favor usá otro correo electrónico"
        });
        return;
    }

    usuarios.push(nuevoUsuario);
    localStorage.setItem(`usuarios`, JSON.stringify(usuarios));

    if(!validarNombreApellido(nombre)) {
        Swal.fire("El nombre solo debe contener letras y espacios", "Por favor complete correctamente el campo", "error");
        return;
    }

        if(!validarNombreApellido(apellido)) {
        Swal.fire("El apellido solo debe contener letras y espacios", "Por favor complete correctamente el campo", "error");
        return;
    }


    if(contraseña === "" || confirmarContraseña === "") {
        Swal.fire("Campos vacíos", "Por favor completá todos los campos", "Warning");
        return;
    }


    if(contraseña.length < 6) {
        Swal.fire("Contraseña muy corta", "La contraseña debe tener al menos 6 caracteres", "Error");
        return;
    }

    if(contraseña !== confirmarContraseña) {
        Swal.fire("Error", "Las constraseñas no coinciden", "error");
        return;
    }

    //TODO VALIDO
    Swal.fire({
        icon: "success",
        title: "¡Registro exitoso!",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true
    }).then(() => {
        form.reset();
    });
});

    function validarNombreApellido(texto) {
        const regex = /^[a-zA-Z\s]+$/;
        return regex.test(texto);
    }
