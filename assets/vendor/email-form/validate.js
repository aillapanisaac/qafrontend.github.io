// Código JavaScript (corregido)
(function () {
  "use strict";

  let forms = document.querySelectorAll('.email-form');

  forms.forEach(function(e) {
    e.addEventListener('submit', function(event) {
      event.preventDefault();

      let thisForm = this;

      let action = thisForm.getAttribute('action');
      let recaptcha = thisForm.getAttribute('data-recaptcha-site-key');
      
      if (!action) {
        displayError(thisForm, 'The form action property is not set!');
        return;
      }

      thisForm.querySelector('.loading').classList.add('d-block');
      thisForm.querySelector('.error-message').classList.remove('d-block');
      thisForm.querySelector('.sent-message').classList.remove('d-block');

      let formData = new FormData(thisForm);

      if (recaptcha) {
        if (typeof grecaptcha !== "undefined") {
          grecaptcha.ready(function() {
            try {
              grecaptcha.execute(recaptcha, {action: 'php_email_form_submit'})
              .then(token => {
                formData.set('recaptcha-response', token);
                php_email_form_submit(thisForm, action, formData);
              });
            } catch (error) {
              displayError(thisForm, error);
            }
          });
        } else {
          displayError(thisForm, 'The reCaptcha javascript API url is not loaded!');
        }
      } else {
        php_email_form_submit(thisForm, action, formData);
      }
    });
  });

  function php_email_form_submit(thisForm, action, formData) {
    fetch(action, {
      method: 'POST',
      body: formData,
      headers: {'X-Requested-With': 'XMLHttpRequest'}
    })
    .then(response => {
      if (response.ok) {
        return response.text();
      } else {
        throw new Error(`${response.status} ${response.statusText} ${response.url}`); 
      }
    })
    .then(data => {
      thisForm.querySelector('.loading').classList.remove('d-block');
      if (data.trim() === 'OK') {
        thisForm.querySelector('.sent-message').classList.add('d-block');
        thisForm.reset(); 
      } else {
        throw new Error(data ? data : 'Form submission failed and no error message returned from: ' + action); 
      }
    })
    .catch((error) => {
      console.error("Error en el envío del formulario:", error);
      displayError(thisForm, error);
    });
  }

  function displayError(thisForm, error) {
    thisForm.querySelector('.loading').classList.remove('d-block');
    thisForm.querySelector('.error-message').innerHTML = error;
    thisForm.querySelector('.error-message').classList.add('d-block');
  }

  // Función para abrir el modal con un mensaje
  function showModalMessage(message, title = "Notificación") {
    document.getElementById("modalMessage").textContent = message;
    document.getElementById("responseModalLabel").textContent = title;
    const modal = new bootstrap.Modal(document.getElementById('responseModal'));
    modal.show();
  }

  // Enviar datos del formulario
  document.getElementById("contacts").addEventListener("submit", function(event) {
    event.preventDefault();

    const nombre = document.getElementById("contact-name").value;
    const correo = document.getElementById("contact-email").value;
    const telefono = document.getElementById("contact-phone").value;
    const mensaje = document.getElementById("contact-message").value;

    // Validación del teléfono: Debe tener exactamente 13 caracteres en total (+569 seguido de 9 dígitos)
    const telefonoRegex = /^\+569[0-9]{9}$/;
    if (!telefonoRegex.test(telefono)) {
        showModalMessage("El número de teléfono debe comenzar con +569 y tener 9 dígitos adicionales, para un total de 13 caracteres.", "Error");
        return;  // Detiene el envío del formulario si la validación falla
    }

    const data = {
      nombre: nombre,
      correo: correo,
      telefono: telefono,
      mensaje: mensaje
    };

    fetch("http://localhost:8080/api/index", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
    .then(response => {
      if (!response.ok) {
        return response.json().then(error => {
          let message = 'Error desconocido';
          switch (response.status) {
            case 400:
              message = error.message || 'Los datos proporcionados no son válidos. Por favor, verifica la información.';
              break;
            case 409:
              message = error.message || 'El correo ya está registrado. Intenta con otro correo.';
              break;
            case 500:
              message = error.message || 'Hubo un error en el servidor. Intenta nuevamente más tarde.';
              break;
            default:
              message = error.message || 'Ocurrió un error inesperado. Intenta nuevamente.';
          }
          throw new Error(message);
        });
      }
      return response.json();
    })
    .then(result => {
      showModalMessage("¡Formulario enviado con éxito!", "Éxito");
      document.getElementById("contacts").reset();
    })
    .catch(error => {
      console.error("Error en la respuesta del servidor:", error);
      showModalMessage(error.message || "Ocurrió un error. Por favor, inténtalo nuevamente.", "Error");
    });
  });
})();
