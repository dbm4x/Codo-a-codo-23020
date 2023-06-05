
// Código para la fecha
const fechaActual = new Date();
const fechaFormato = fechaActual.toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' });
const fechaElemento = document.getElementById('fecha-actual');
fechaElemento.setAttribute('datetime', fechaActual.toISOString());
fechaElemento.textContent = fechaFormato;

if ((".loader").length) {
    // Chequear si la página cargo
    $(window).on('load', function () {
      $(".loader").fadeOut("slow");
    });
}

// Código para la marquesina
const container = document.querySelector('.marquesina-noticia');
let isDragging = false;
let mouseDownX;

container.addEventListener('mousedown', (e) => {
  isDragging = true;
  mouseDownX = e.clientX;
  container.style.cursor = 'move';
});

container.addEventListener('mousemove', (e) => {
  if (isDragging) {
    const currentX = e.clientX;
    const deltaX = currentX - mouseDownX;
    if (deltaX !== 0) {
      container.scrollLeft -= deltaX;
      mouseDownX = currentX;
    }
  }
});

container.addEventListener('mouseup', () => {
  isDragging = false;
  container.style.cursor = 'grab';
});

container.addEventListener('mouseleave', () => {
  isDragging = false;
  container.style.cursor = 'grab';
});


/*
// Código para la API del dólar
// Creamos una instancia del objeto XMLHttpRequest
var xhr = new XMLHttpRequest();

// Definimos la URL de la API
var url = "https://api.bluelytics.com.ar/v2/latest";

// Configuramos la solicitud XHR
xhr.open("GET", url, true);
xhr.setRequestHeader("Content-Type", "application/json");

// Enviamos la solicitud
xhr.send();

// Esperamos a la respuesta de la API
xhr.onreadystatechange = function () {
  if (xhr.readyState === 4 && xhr.status === 200) {
    // Procesamos la respuesta de la API
    var response = JSON.parse(xhr.responseText);
    
    
    document.getElementById('dolar-bna').innerHTML = "$"+response.oficial.value_sell.toFixed(2);
    document.getElementById('dolar-blue').innerHTML = "$"+response.blue.value_sell.toFixed(2);

  }
};
*/

// Código para la API del dólar
// Creamos una instancia del objeto XMLHttpRequest
var xhr = new XMLHttpRequest();

// Definimos la URL de la API
var url = "https://www.dolarsi.com/api/api.php?type=valoresprincipales";

// Configuramos la solicitud XHR
xhr.open("GET", url, true);

// Enviamos la solicitud
xhr.send();

// Esperamos a la respuesta de la API
xhr.onreadystatechange = function () {
  if (xhr.readyState === 4 && xhr.status === 200) {
    // Procesamos la respuesta de la API
    var response = JSON.parse(xhr.responseText);
    
    var dolarOficial = response[0].casa;
    var dolarBlue = response[1].casa;
    
    document.getElementById('dolar-bna').innerHTML = "$" + dolarOficial.venta;
    document.getElementById('dolar-blue').innerHTML = "$" + dolarBlue.venta;
  }
};



$("#search-icon").click(function() {
  $(".menus").toggleClass("no-search");
});

$('.menuDrop').click(function(){
   $(".menus").toggleClass("mobile-nav");
   $(this).toggleClass("is-active");
});



