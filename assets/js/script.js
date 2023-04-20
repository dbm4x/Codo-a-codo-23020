const fechaActual = new Date();
const fechaFormato = fechaActual.toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' });
const fechaElemento = document.getElementById('fecha-actual');
fechaElemento.setAttribute('datetime', fechaActual.toISOString());
fechaElemento.textContent = fechaFormato;