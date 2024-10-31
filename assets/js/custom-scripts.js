document.addEventListener("DOMContentLoaded", function () {
    // Seleccionar el contenedor donde se mostrará el contenido nuevo
    const serviceContentContainer = document.querySelector('#service-content');

    // Verificar si el contenedor existe
    if (!serviceContentContainer) {
        console.error('No se encontró el contenedor donde se mostrará el contenido del servicio.');
        return;
    }

    // Seleccionar todos los enlaces de los servicios
    const services = document.querySelectorAll('.service-item');

    // Datos para cada servicio
    const serviceDetails = {
        'pruebas-web': {
            content: `
              <h3>Pruebas Web Eficientes para un Desempeño Óptimo</h3>
              <p>Las pruebas web garantizan que tu sitio sea confiable, rápido y accesible para todos los usuarios. Con nuestras pruebas eficientes, nos aseguramos de que tu aplicación web funcione sin problemas en todos los navegadores y dispositivos.</p>
              <ul>
                <li><i class="bi bi-check-circle"></i> <span>Pruebas de compatibilidad multiplataforma.</span></li>
                <li><i class="bi bi-check-circle"></i> <span>Análisis de rendimiento y carga del sitio.</span></li>
                <li><i class="bi bi-check-circle"></i> <span>Automatización de pruebas para regresión constante.</span></li>
              </ul>
              <img src="assets/img/service-detainls/Eficientes.webp" alt="Pruebas Web Eficientes" class="img-fluid services-img custom-img-size">
            `
        },
        'validacion-apis': {
            content: `
              <h3>Validación Integral de APIs</h3>
              <p>Las APIs son la columna vertebral de las aplicaciones modernas. Nos aseguramos de que todas tus APIs funcionen como se espera, garantizando la integridad y seguridad de la comunicación entre sistemas.</p>
              <ul>
                <li><i class="bi bi-check-circle"></i> <span>Pruebas de autenticación y seguridad.</span></li>
                <li><i class="bi bi-check-circle"></i> <span>Validación de respuestas y estructura de datos.</span></li>
                <li><i class="bi bi-check-circle"></i> <span>Pruebas de carga para determinar la estabilidad bajo alta demanda.</span></li>
              </ul>
              <img src="assets/img/service-detainls/Integral.webp" alt="Validación de APIs" class="img-fluid services-img custom-img-size">
            `
        },
        'pruebas-moviles': {
            content: `
              <h3>Pruebas de Aplicaciones Móviles para una Experiencia de Usuario Superior</h3>
              <p>Nuestras pruebas móviles garantizan una experiencia óptima para los usuarios en diferentes dispositivos y plataformas. Detectamos problemas de rendimiento, usabilidad y compatibilidad para asegurar una experiencia consistente.</p>
              <ul>
                <li><i class="bi bi-check-circle"></i> <span>Pruebas de compatibilidad en múltiples dispositivos.</span></li>
                <li><i class="bi bi-check-circle"></i> <span>Validación de usabilidad en diferentes sistemas operativos.</span></li>
              </ul>
              <img src="assets/img/service-detainls/Experiencia.webp" alt="Pruebas de Aplicaciones Móviles" class="img-fluid services-img custom-img-size">
            `
        },
        'uat': {
            content: `
              <h3>Pruebas de Aceptación de Usuario (UAT)</h3>
              <p>Las pruebas de aceptación de usuario aseguran que el producto final cumpla con los requisitos del cliente y que los usuarios finales puedan utilizarlo de manera eficiente.</p>
              <ul>
                <li><i class="bi bi-check-circle"></i> <span>Validación con usuarios reales para garantizar la aceptación.</span></li>
                <li><i class="bi bi-check-circle"></i> <span>Pruebas basadas en escenarios de uso reales.</span></li>
              </ul>
              <img src="assets/img/service-detainls/UAT.webp" alt="Pruebas de Aceptación de Usuario (UAT)" class="img-fluid services-img custom-img-size">
            `
        },
        'integracion-continua': {
            content: `
              <h3>Integración Continua para Entregas sin Problemas</h3>
              <p>Implementamos pruebas de integración continua para garantizar que cada cambio en el código sea seguro y estable antes de ser desplegado en producción.</p>
              <ul>
                <li><i class="bi bi-check-circle"></i> <span>Automatización de pruebas en cada integración de código.</span></li>
                <li><i class="bi bi-check-circle"></i> <span>Reporte instantáneo de fallos para resolución rápida.</span></li>
              </ul>
               <img src="assets/img/service-detainls/Continua.webp" alt="Integración Continua" class="img-fluid services-img custom-img-size">
            `
        },
        'evaluacion-rendimiento': {
            content: `
              <h3>Evaluación de Rendimiento para una Experiencia Fluida</h3>
              <p>Evaluamos el rendimiento de tus aplicaciones para identificar y resolver cuellos de botella, asegurando que tu aplicación funcione correctamente bajo diferentes niveles de carga.</p>
              <ul>
                <li><i class="bi bi-check-circle"></i> <span>Pruebas de carga y estrés para determinar la capacidad del sistema.</span></li>
                <li><i class="bi bi-check-circle"></i> <span>Análisis de tiempo de respuesta y comportamiento bajo alta demanda.</span></li>
              </ul>
               <img src="assets/img/service-detainls/Rendimiento.webp" alt="Evaluación de Rendimiento" class="img-fluid services-img custom-img-size">
            `
        }
    };

    // Añadir el evento click a cada servicio
    services.forEach(service => {
      service.addEventListener('click', function (e) {
        e.preventDefault(); // Prevenir la acción por defecto del enlace
        const serviceKey = this.getAttribute('data-service');
        const selectedService = serviceDetails[serviceKey];
        if (selectedService) {
          serviceContentContainer.innerHTML = selectedService.content;
        }
      });
    });
  });

