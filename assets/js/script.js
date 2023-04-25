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


/* PARA CONSUMIR API DE LA BUENARDA

// Creamos una instancia del objeto XMLHttpRequest
var xhr = new XMLHttpRequest();

// Definimos la URL de la API
var url = "https://api.example.com/users";

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
    
    // Creamos una tabla HTML para mostrar los datos
    var table = document.createElement("table");
    
    // Creamos una fila para el encabezado de la tabla
    var headerRow = table.insertRow(0);
    var header1 = headerRow.insertCell(0);
    var header2 = headerRow.insertCell(1);
    header1.innerHTML = "Nombre";
    header2.innerHTML = "Correo electrónico";
    
    // Agregamos filas con los datos de los usuarios
    for (var i = 0; i < response.length; i++) {
      var row = table.insertRow(i + 1);
      var cell1 = row.insertCell(0);
      var cell2 = row.insertCell(1);
      cell1.innerHTML = response[i].name;
      cell2.innerHTML = response[i].email;
    }
    
    // Agregamos la tabla al elemento HTML
    document.getElementById("myTable").appendChild(table);
  }
};

*/

const slide = document.querySelector(".carousel-slide");
const prevBtn = document.querySelector(".carousel-prev");
const nextBtn = document.querySelector(".carousel-next");
let currentIndex = 0;

// Mover al siguiente slide
function nextSlide() {
  if (currentIndex < 2) {
    currentIndex++;
  } else {
    currentIndex = 0;
  }
  slide.style.transform = `translateX(-${currentIndex * document.querySelector(".carousel-slide").clientWidth}px)`;
}

// Mover al slide anterior
function prevSlide() {
  if (currentIndex > 0) {
    currentIndex--;
  } else {
    currentIndex = 2;
  }
  slide.style.transform = `translateX(-${currentIndex * document.querySelector(".carousel-slide").clientWidth}px)`;
}

// Avanzar cada 3 segundos
setInterval(() => {
  nextSlide();
}, 5000);

// Agregar manejadores de eventos a los botones
nextBtn.addEventListener("click", nextSlide);
prevBtn.addEventListener("click", prevSlide);
