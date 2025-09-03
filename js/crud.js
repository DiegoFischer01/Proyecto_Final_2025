


//REGISTRO
function registrar() {
    const nombre = document.getElementById("regNombre")?.value.trim() ?? ``;
    const apellido = document.getElementById("regApellido")?.value.trim() ?? ``;
    const email = document.getElementById("regEmail")?.value.trim() ??``;
    const contraseña = document.getElementById("regContraseña")?.value.trim() ??``;
    const contraseña2 = document.getElementById("regContraseña2")?.value.trim()??``;


    //VALIDAR CAMPOS VACIOS
    if(!nombre || !apellido || !email || !contraseña || !contraseña2) {
        Swal.fire("Campos incompletos","Por favor complete todos los campos", "warning");
        return;
    }


    //VALIDAR EMAIL Básico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailRegex.test(email)) {
        Swal.fire("Correo invalido","ingrese un correo válido  (ejemplo@correo.com)", "error");
        return;
    }

    //VALIDAR LONGITUD CONTRASEÑA
    if(contraseña.length < 6) {
        Swal.fire("Contraseña débil","La contraseña debe tener al menos 6 caracteres", "error"); 
        return;
    }


    //VALIDAR CONTRASEÑAS IGUALES
    if(contraseña !== contraseña2) {
        Swal.fire("Error","Las contraseñas no coinciden", "error");
        return;
    }


    //VERIFICAR SI EL EMAIL YA ESTA REGISTRADO
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    const existe = usuarios.find(u => u.email.toLowerCase() === email.toLowerCase());

    if(existe) {
        Swal.fire("Correo en uso","El correo ya está registrado", "error");
        return;
    }

    //GUARDAR USUARIO
    usuarios.push({nombre, apellido, email, contraseña});
    localStorage.setItem("usuarios", JSON.stringify(usuarios))

    Swal.fire({
        icon: "success",
        title: "Registro exitoso",
        text: "Ahora puedes iniciar sesión",
        confirmButtonText: "Aceptar"
    }).then(() => {
        window.location.href = "../paginas/inicioSesion.html"; //despues del registro ir a login
    });
}



//LOGIN
function login() {
    const email = document.getElementById("logEmail")?.value.trim()??``;
    const contraseña = document.getElementById("logContraseña")?.value.trim()??``;

    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    const usuario = usuarios.find(user => user.email === email && user.contraseña === contraseña);

    if(!usuario) {
        Swal.fire("Error", "Correo o contraseña incorrecta", "error");
        return;
    }


    localStorage.setItem("usuarioActivo", JSON.stringify(usuario));

    Swal.fire({
        icon: "success",
        title: `Bienvenido, ${usuario.nombre}`,
        confirmButtonText: "Continuar"
    }).then(() => {
        window.location.href = "../paginas/inicioUsuarios.html"; //despues del login ir a inicio
    });
}


//CERRAR SESION   
function cerrarSesion() {
    localStorage.removeItem("usuarioActivo");

    Swal.fire({
        icon: "info",
        title: "Sesión cerrada",
        confirmButtonText: "Ok"
    }).then(() => {
        window.location.href = "../index.html"; //despues de cerrar sesion ir a inicio
    });    
}




//VERIFICAR SESION
function verificarSesion() {
    const usuarioActivo = JSON.parse(localStorage.getItem("usuarioActivo"));
    if(!usuarioActivo) {
        window.location.href = "../paginas/inicioSesion.html";
        return //si no hay usuario activo ir a login
    } 
    const info = document.getElementById(`userInfo`);
    if(info) info.innerText = `Hola, ${usuarioActivo.nombre}${usuarioActivo.apellido}`;
}


//EVENTOS
document.addEventListener("DOMContentLoaded", () => {
    //SI ESTOY EN REGISTO.HTML
    const btnReg = document.getElementById("btn-registrarse");
    if(btnReg) btnReg.addEventListener("click", registrar);

    //SI ESTOY EN INICIOSESION.HTML
    const btnLogin = document.getElementById("btn-inicio-sesion");
    if(btnLogin) btnLogin.addEventListener("click", login);

    //SI ESTOY EN CUALQUIER PAGINA
    if(document.getElementById(`userInfo`)) {
        verificarSesion();
        const btnLogout = document.getElementById("btn-logout");
        if(btnLogout) btnLogout.addEventListener("click", cerrarSesion);
    }
    
});