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

  /**
   * Initialize Swiper sliders
   */
  document.addEventListener('DOMContentLoaded', () => {
    const swiperContainers = document.querySelectorAll('.init-swiper');
    swiperContainers.forEach((swiperContainer) => {
      const swiperConfig = {
        loop: true,
        speed: 600,
        autoplay: { delay: 1200 },
        slidesPerView: 'auto',
        pagination: {
          el: swiperContainer.querySelector('.swiper-pagination'),
          type: 'bullets',
          clickable: true
        },
        breakpoints: {
          320: { slidesPerView: 2, spaceBetween: 40 },
          480: { slidesPerView: 3, spaceBetween: 60 },
          640: { slidesPerView: 4, spaceBetween: 80 },
          992: { slidesPerView: 6, spaceBetween: 120 }
        }
      };
      new Swiper(swiperContainer, swiperConfig);
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
  

})();
