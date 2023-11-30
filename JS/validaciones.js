  // Función para validar el correo
  function validarCorreo() {
    const correoInput = document.getElementById("correo");
    const correoMensaje = document.getElementById("correoMensaje");
    const correoPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    if (!correoPattern.test(correoInput.value)) {
      correoMensaje.textContent = "Correo no válido";
      correoInput.classList.add("is-invalid");
    } else {
      correoMensaje.textContent = "";
      correoInput.classList.remove("is-invalid");
    }
  }

  // Función para validar la contraseña
  function validarPassword() {
    const passwordInput = document.getElementById("Password");
    const passwordMensaje = document.getElementById("MensajePass");

    if (passwordInput.value.length < 8) {
      passwordMensaje.textContent = "La contraseña debe tener al menos 8 caracteres";
      passwordInput.classList.add("is-invalid");
    } else {
      passwordMensaje.textContent = "";
      passwordInput.classList.remove("is-invalid");
    }
  }

  // Función para validar la repetición de contraseña
  function validarRepetirPassword() {
    const passwordInput = document.getElementById("Password");
    const repeatPasswordInput = document.getElementById("RepeatPassword");
    const mensajeConfirmacion = document.getElementById("MensajeConfirmacion");

    if (passwordInput.value !== repeatPasswordInput.value) {
      mensajeConfirmacion.textContent = "Las contraseñas no coinciden";
      repeatPasswordInput.classList.add("is-invalid");
    } else {
      mensajeConfirmacion.textContent = "";
      repeatPasswordInput.classList.remove("is-invalid");
    }
  }

  // Validación de una cédula personalizada
  function validarCedula() {
    const cedulaPersonalizada = document.getElementById("cedula").value;
    const mensajeCedulaPersonalizada = document.getElementById("MensajeCedula");
    
    if (cedulaPersonalizada.length !== 10) {
      mensajeCedulaPersonalizada.textContent = "La cédula debe tener 10 dígitos.";
      return false;
    }
  
    if (!/^[0-9]+$/.test(cedulaPersonalizada)) {
      mensajeCedulaPersonalizada.textContent = "La cédula debe contener solo números.";
      return false;
    }
  
    const provincia = Number(cedulaPersonalizada.substring(0, 2));
    if (provincia < 1 || provincia > 24) {
      mensajeCedulaPersonalizada.textContent = "El primer número de la cédula debe estar entre 1 y 24.";
      return false;
    }
  
    const coeficientesCedula = [2, 1, 2, 1, 2, 1, 2, 1, 2];
    const digitoVerificadorCedula = Number(cedulaPersonalizada[9]);
  
    let sumaCedula = 0;
    for (let i = 0; i < 9; i++) {
      let valorCedula = Number(cedulaPersonalizada[i]) * coeficientesCedula[i];
      if (valorCedula > 9) {
        valorCedula -= 9;
      }
      sumaCedula += valorCedula;
    }
  
    const totalCedula = (Math.ceil(sumaCedula / 10) * 10);
    const digitoVerificadorCalculadoCedula = totalCedula - sumaCedula;
  
    if (digitoVerificadorCalculadoCedula === 10) {
      if (digitoVerificadorCedula !== 0) {
        mensajeCedulaPersonalizada.textContent = "La cédula es inválida.";
        return false;
      }
    } else {
      if (digitoVerificadorCedula !== digitoVerificadorCalculadoCedula) {
        mensajeCedulaPersonalizada.textContent = "La cédula es inválida.";
        return false;
      }
    }
  
    mensajeCedulaPersonalizada.textContent = "";
    return true;
  }



 // Función para mostrar SweetAlert con un formulario para recuperar contraseña
function mostrarFormularioRecuperar() {
    Swal.fire({
      title: 'Recuperar Contraseña',
      html: `
        <input type="email" id="correoRecuperar" class="swal2-input" placeholder="Correo para recuperar contraseña">
        <p id="correoMensaje" class="text-danger text-center"></p>
      `,
      showCancelButton: true,
      confirmButtonText: 'Recuperar',
      preConfirm: () => {
        const correoInput = Swal.getPopup().querySelector('#correoRecuperar');
        const correo = correoInput.value;
        const correoMensaje = Swal.getPopup().querySelector('#correoMensaje');
        const correoPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  
        if (!correoPattern.test(correo)) {
          correoMensaje.textContent = 'Correo no válido';
          correoInput.classList.add('is-invalid');
          Swal.showValidationMessage('Por favor ingresa un correo válido.');
          return false;
        }
  
        return correo;
      }
    }).then((result) => {
      if (result.isConfirmed) {
        const correo = result.value;
        // Aquí puedes enviar el correo de recuperación a la dirección proporcionada
        Swal.fire('Mensaje Enviado', `Se enviará un mensaje a ${correo} con instrucciones para recuperar tu contraseña.`, 'success');
      }
    });
  }