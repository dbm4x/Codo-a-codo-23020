const fechaActual = new Date();
const fechaFormato = fechaActual.toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' });
const fechaElemento = document.getElementById('fecha-actual');
fechaElemento.setAttribute('datetime', fechaActual.toISOString());
fechaElemento.textContent = fechaFormato;

if ((".loader").length) {
    // show Preloader until the website ist loaded
    $(window).on('load', function () {
      $(".loader").fadeOut("slow");
    });
}

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

function createCarousel(slideSelector, prevSelector, nextSelector, cantidad, opcion) {

const slide = document.querySelector(slideSelector);
const prevBtn = document.querySelector(prevSelector);
const nextBtn = document.querySelector(nextSelector);
let currentIndex = 0;

// Mover al siguiente slide
function nextSlide() {
  if (currentIndex < cantidad) {
    currentIndex++;
  } else {
    currentIndex = 0;
  }
  slide.style.transform = `translateX(-${currentIndex * document.querySelector(slideSelector).clientWidth}px)`;
  contar();
}

// Mover al slide anterior
function prevSlide() {
  if (currentIndex > 0) {
    currentIndex--;
  } else {
    currentIndex = cantidad;
  }
  slide.style.transform = `translateX(-${currentIndex * document.querySelector(slideSelector).clientWidth}px)`;
  contar();
}

function contar() {
if(opcion) {
  document.querySelector(".numeroImagen").innerHTML = currentIndex+1+"/10";
}
}

// Avanzar cada 3 segundos
setInterval(() => {
  nextSlide();
}, 5000);

// Agregar manejadores de eventos a los botones
nextBtn.addEventListener("click", nextSlide);
prevBtn.addEventListener("click", prevSlide);
}


createCarousel(".carousel-slide", ".carousel-prev", ".carousel-next",3,false);
createCarousel(".carousel-slide-imagen-dia", ".carousel-prev-imagen-dia", ".carousel-next-imagen-dia",9,true);
