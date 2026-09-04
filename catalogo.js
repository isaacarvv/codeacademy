/* Filtros y búsqueda del catálogo, sin dependencias externas. */
document.addEventListener('DOMContentLoaded', () => {
  const catalogo = document.querySelector('.catalogo-cursos-v2');
  if (!catalogo) return;

  const tarjetas = [...catalogo.querySelectorAll('.tarjeta-catalogo-v2')];
  const limpiar = document.querySelector('#limpiar-filtros');
  const cuadrilla = document.querySelector('.grid-catalogo-v2');

  const normalizar = (texto) => texto
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]/g, '');

  const valoresSeleccionados = (titulo) => {
    const grupo = [...document.querySelectorAll('.grupo-filtros')]
      .find((fieldset) => fieldset.querySelector('legend')?.textContent.trim() === titulo);

    if (!grupo) return [];
    return [...grupo.querySelectorAll('input:checked')]
      .map((input) => normalizar(input.parentElement.textContent));
  };

  const coincideDuracion = (duracion, filtros) => {
    if (!filtros.length) return true;
    return filtros.some((filtro) => (
      (filtro === 'menosde5horas' && duracion < 5) ||
      (filtro === '510horas' && duracion >= 5 && duracion <= 10) ||
      (filtro === 'masde10horas' && duracion > 10)
    ));
  };

  const actualizarCatalogo = () => {
    const tipos = valoresSeleccionados('Tipo');
    const niveles = valoresSeleccionados('Nivel');
    const tecnologias = valoresSeleccionados('Tecnología');
    const duraciones = valoresSeleccionados('Duración promedio');
    let visibles = 0;

    tarjetas.forEach((tarjeta) => {
      const tipoValido = !tipos.length || tipos.includes(normalizar(tarjeta.dataset.tipo)) || (tipos.includes('cursos') && tarjeta.dataset.tipo === 'curso');
      const nivelValido = !niveles.length || niveles.includes(normalizar(tarjeta.dataset.nivel));
      const tecnologiasTarjeta = tarjeta.dataset.tecnologias.split(' ').map(normalizar);
      const tecnologiaValida = !tecnologias.length || tecnologias.some((tecnologia) => tecnologiasTarjeta.includes(tecnologia));
      const duracionValida = coincideDuracion(Number(tarjeta.dataset.duracion), duraciones);
      const visible = tipoValido && nivelValido && tecnologiaValida && duracionValida;

      tarjeta.hidden = !visible;
      if (visible) visibles += 1;
    });

    cuadrilla.dataset.resultados = visibles;
  };

  catalogo.querySelectorAll('.grupo-filtros input').forEach((input) => {
    input.addEventListener('change', actualizarCatalogo);
  });

  limpiar.addEventListener('click', () => {
    catalogo.querySelectorAll('.grupo-filtros input').forEach((input) => {
      input.checked = false;
    });
    actualizarCatalogo();
  });

  actualizarCatalogo();
});
