(() => {
  "use strict";

  /**
   * Toggle .scrolled class on body based on scroll position
   */
  const toggleScrolled = () => {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  };

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');
  const mobileNavToggle = () => {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  };
  if (mobileNavToggleBtn) {
    mobileNavToggleBtn.addEventListener('click', mobileNavToggle);
  }

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) mobileNavToggle();
    });
  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', e => {
      e.preventDefault();
      navmenu.parentNode.classList.toggle('active');
      navmenu.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader removal on page load
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => preloader.remove());
  }

  /**
   * Scroll top button
   */
  const scrollTop = document.querySelector('.scroll-top');
  const toggleScrollTop = () => {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  };
  scrollTop?.addEventListener('click', e => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Initialize AOS animations
   */
  const aosInit = () => {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  };
  window.addEventListener('load', aosInit);

  function initializeSwiperTestimonials(swiperContainer) {
    const swiperConfig = {
      loop: true,
      speed: 1500,
      autoplay: { delay: 3000 },
      slidesPerView: 1,
      pagination: {
        el: swiperContainer.querySelector('.swiper-pagination'),
        type: 'bullets',
        clickable: true
      },
      navigation: {
        nextEl: swiperContainer.querySelector('.swiper-button-next'),
        prevEl: swiperContainer.querySelector('.swiper-button-prev'),
      },
      breakpoints: {
        320: { slidesPerView: 1, spaceBetween: 20 },
        480: { slidesPerView: 1, spaceBetween: 30 },
        640: { slidesPerView: 1, spaceBetween: 40 },
        992: { slidesPerView: 1, spaceBetween: 50 }
      }
    };
    new Swiper(swiperContainer, swiperConfig);
  }

  function initializeSwiperClients(swiperContainer) {
    const swiperConfig = {
      loop: true,
      speed: 600,
      autoplay: { delay: 2000 },
      slidesPerView: 'auto',
      spaceBetween: 30,
      pagination: {
        el: swiperContainer.querySelector('.swiper-pagination'),
        type: 'bullets',
        clickable: true
      },
      breakpoints: {
        320: { slidesPerView: 2, spaceBetween: 20 },
        480: { slidesPerView: 3, spaceBetween: 30 },
        640: { slidesPerView: 4, spaceBetween: 40 },
        992: { slidesPerView: 6, spaceBetween: 50 }
      }
    };
    new Swiper(swiperContainer, swiperConfig);
  }

  document.addEventListener('DOMContentLoaded', () => {
    const swiperTestimonials = document.querySelectorAll('.init-swiper-testimonials');
    swiperTestimonials.forEach((swiperContainer) => {
      initializeSwiperTestimonials(swiperContainer);
    });

    const swiperClients = document.querySelectorAll('.init-swiper');
    swiperClients.forEach((swiperContainer) => {
      initializeSwiperClients(swiperContainer);
    });
  });

  /**
   * GLightbox initialization
   */
  GLightbox({ selector: '.glightbox' });

  /**
   * Isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(isotopeItem => {
    const layout = isotopeItem.getAttribute('data-layout') || 'masonry';
    const filter = isotopeItem.getAttribute('data-default-filter') || '*';
    const sort = isotopeItem.getAttribute('data-sort') || 'original-order';

    imagesLoaded(isotopeItem.querySelector('.isotope-container'), () => {
      const initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });

      isotopeItem.querySelectorAll('.isotope-filters li').forEach(filterItem => {
        filterItem.addEventListener('click', () => {
          isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
          filterItem.classList.add('filter-active');
          initIsotope.arrange({ filter: filterItem.getAttribute('data-filter') });
          aosInit();
        });
      });
    });
  });

  /**
   * Pure Counter initialization
   */
  new PureCounter();

  /**
   * Chat popup functionality
   */
  document.addEventListener("DOMContentLoaded", () => {
    const openChatButton = document.getElementById("openChat");
    const chatPopup = document.getElementById("chatPopup");
    const closeChatButton = document.getElementById("closeChat");

    openChatButton.addEventListener("click", () => chatPopup.style.display = "block");
    closeChatButton.addEventListener("click", () => chatPopup.style.display = "none");
  });

  
  window.addEventListener("scroll", function () {
    const fadeText = document.getElementById("fade-text");
    const maxScroll = 50; // Punto en el que el texto desaparece completamente
    const scrollPosition = window.scrollY;
  
    if (fadeText) {
      const progress = Math.min(scrollPosition / maxScroll, 1); // Va de 0 a 1
      fadeText.style.opacity = 1 - progress; // Reduce opacidad
      fadeText.style.transform = `scale(${1 - 0.2 * progress})`; // Reduce la escala a 80%
    }
  });

  document.addEventListener("DOMContentLoaded", function() {
    // Inicializar CodeMirror
    const editor = CodeMirror.fromTextArea(document.getElementById('code-editor'), {
      lineNumbers: true,
      mode: "javascript",
      theme: "monokai", // Tema oscuro similar a editores de código reales
      readOnly: true // Para evitar que el usuario escriba manualmente
    });
  
    // Código React del componente de inicio de sesión
    const code = `
  import React, { useState } from 'react';
  
  function LoginForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
  
    const handleSubmit = (e) => {
      e.preventDefault();
      if (username === 'testUser' && password === 'securePassword123') {
        console.log('Login Successful');
      } else {
        console.log('Invalid Username or Password');
      }
    };
  
    return (
      <div className="login-container">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input 
              type="text" 
              id="username" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input 
              type="password" 
              id="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    );
  }
  
  export default LoginForm;`;
  
    // Variables para la animación
    let index = 0;
    const speed = 100;  // Velocidad de escritura en milisegundos (valor más alto = escritura más lenta)
  
    function writeCode() {
      if (index <= code.length) {
        // Establecer el valor en CodeMirror hasta el índice actual
        editor.setValue(code.slice(0, index));
        index++;
        // Llamar a la función de nuevo después de un tiempo
        setTimeout(writeCode, speed);
      } else {
        // Reiniciar la animación una vez que se complete
        setTimeout(() => {
          index = 0; // Reiniciar el índice
          writeCode(); // Iniciar la escritura nuevamente
        }, 1000); // Pausar por 1 segundo antes de reiniciar la escritura
      }
    }
  
    // Iniciar la escritura automática
    writeCode();
  });
      document.addEventListener('DOMContentLoaded', function () {
        AOS.init({
            duration: 1000, // Duración de la animación en milisegundos
            easing: 'ease-in-out',
            once: true, // Solo anima una vez
        });
    });
  
// Script para el efecto de autocompletado y la barra de progreso
document.addEventListener('DOMContentLoaded', function () {
  // Obtener todas las tarjetas de paso
  const steps = document.querySelectorAll('.steps-container .step');
  
  // Retraso inicial en milisegundos
  let delay = 1000;

  steps.forEach((step, index) => {
      setTimeout(() => {
          step.classList.add('completed');
          // Calcular el ancho de la barra de progreso según el paso completado
          const progressPercentage = ((index + 1) / steps.length) * 100;
          progressBar.style.width = progressPercentage + '%';
      }, delay);
      // Incrementar el retraso para cada tarjeta
      delay += 2000; // Incrementado para un efecto de carga más lenta
  });
});


})();
