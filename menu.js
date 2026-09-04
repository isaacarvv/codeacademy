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
});
