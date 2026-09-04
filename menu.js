/* Menú desplegable para pantallas móviles. */
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.cabecera-prueba').forEach((cabecera) => {
    const boton = cabecera.querySelector('.boton-menu-movil');
    const navegacion = cabecera.querySelector('.navegacion-prueba');

    if (!boton || !navegacion) return;

    const cerrarMenu = () => {
      cabecera.classList.remove('menu-abierto');
      boton.setAttribute('aria-expanded', 'false');
      boton.setAttribute('aria-label', 'Abrir menú de navegación');
    };

    boton.addEventListener('click', () => {
      const estaAbierto = cabecera.classList.toggle('menu-abierto');
      boton.setAttribute('aria-expanded', String(estaAbierto));
      boton.setAttribute('aria-label', estaAbierto ? 'Cerrar menú de navegación' : 'Abrir menú de navegación');
    });

    // Al seleccionar una sección se cierra el menú antes de navegar.
    navegacion.querySelectorAll('a').forEach((enlace) => {
      enlace.addEventListener('click', cerrarMenu);
    });

    // Cerrar al tocar fuera del panel o usar Escape.
    document.addEventListener('click', (evento) => {
      if (!cabecera.contains(evento.target)) cerrarMenu();
    });

    document.addEventListener('keydown', (evento) => {
      if (evento.key === 'Escape') cerrarMenu();
    });
  });

  /* Revela secciones y tarjetas al entrar en el área visible. */
  const elementosAnimados = document.querySelectorAll([
    '.hero-prueba',
    '.beneficios-prueba',
    '.rutas-prueba',
    '.cursos-prueba',
    '.contenido-nosotros > section',
    '.contenido-ruta > section',
    '.catalogo-cursos-v2 .filtros-v2',
    '.catalogo-cursos-v2 .catalogo-v2',
    '.sidebar-aula',
    '.contenido-leccion',
    '.pie-prueba',
    '.tarjeta-beneficio-prueba',
    '.tarjeta-ruta-prueba',
    '.tarjeta-curso-prueba',
    '.tarjeta-catalogo-v2',
    '.sobre-pilares article',
    '.pasos-metodo article',
    '.paso-ruta'
  ].join(','));

  const reducirMovimiento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  elementosAnimados.forEach((elemento, indice) => {
    elemento.classList.add('animar-entrada');
    elemento.style.setProperty('--retraso-entrada', `${(indice % 5) * 65}ms`);
  });

  if (reducirMovimiento || !('IntersectionObserver' in window)) {
    elementosAnimados.forEach((elemento) => elemento.classList.add('entrada-visible'));
    return;
  }

  const observador = new IntersectionObserver((entradas, instancia) => {
    entradas.forEach((entrada) => {
      if (!entrada.isIntersecting) return;
      entrada.target.classList.add('entrada-visible');
      instancia.unobserve(entrada.target);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -36px' });

  elementosAnimados.forEach((elemento) => observador.observe(elemento));

  /* Rutas de aprendizaje: muestra contexto sin sacar al usuario de la portada. */
  document.querySelectorAll('.boton-expandir-ruta').forEach((boton) => {
    boton.addEventListener('click', () => {
      const tarjetaActual = boton.closest('.ruta-expandible');
      const seAbrira = !tarjetaActual.classList.contains('ruta-abierta');

      document.querySelectorAll('.ruta-expandible.ruta-abierta').forEach((tarjeta) => {
        tarjeta.classList.remove('ruta-abierta');
        tarjeta.querySelector('.boton-expandir-ruta')?.setAttribute('aria-expanded', 'false');
      });

      if (seAbrira) {
        tarjetaActual.classList.add('ruta-abierta');
        boton.setAttribute('aria-expanded', 'true');
      }
    });
  });
});
