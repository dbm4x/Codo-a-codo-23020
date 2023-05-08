    

window.addEventListener("load", function() {

  
const form = document.querySelector("#formulario")


form.addEventListener('submit', e => {
    e.preventDefault();

    let nombre = document.getElementById("nombre");
    let apellido = document.getElementById("apellido");
    let email = document.getElementById("email");
    let telefono = document.getElementById("telefono");
    let horario = document.getElementById("horario");
    let genero = document.getElementById("genero");

    var formatoEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  
  let isValid = true;


  if (nombre.value === '') {
    document.getElementById('validacion-nombre').style.display = 'block';
    isValid = false;
  } else {
    document.getElementById('validacion-nombre').style.display = 'none';
  }

  if (apellido.value === '') {
    document.getElementById('validacion-apellido').style.display = 'block';
    isValid = false;
  } else {
    document.getElementById('validacion-apellido').style.display = 'none';
  }

  if (!email.value.match(formatoEmail)) {
    document.getElementById('validacion-email-invalido').style.display = 'block';
    isValid = false;
  } else {
    document.getElementById('validacion-email-invalido').style.display = 'none';
  }

  if (telefono.value.length !== 10 || !telefono.value.match(/^[0-9]+$/)) {
    document.getElementById('validacion-telefono-invalido').style.display = 'block';
    isValid = false;
  } else {
    document.getElementById('validacion-telefono-invalido').style.display = 'none';
  }

  if (horario.selectedIndex === 0) {
    document.getElementById('validacion-horario-invalido').style.display = 'block';
    isValid = false;
  } else {
    document.getElementById('validacion-horario-invalido').style.display = 'none';
  }

  if (genero.selectedIndex === 0) {
    document.getElementById('validacion-genero-invalido').style.display = 'block';
    isValid = false;
  } else {
    document.getElementById('validacion-genero-invalido').style.display = 'none';
  }


  if (!isValid) {
    event.preventDefault();
  } else {

    document.getElementById('envioSpinner').style.display = 'inline-block';
    document.getElementById('botonEnvio').style.display = 'none';

    const enviar = new FormData();
    
    //Enviar campos indepenientes
    enviar.append('Nombre', nombre.value);
    enviar.append('Apellido', apellido.value);
    enviar.append('Email', email.value);
    enviar.append('Telefono', telefono.value);
    enviar.append('Horario', horario.value);
    enviar.append('Genero', genero.value);

    //Enviar como un todo
    enviar.append('mensaje', 
    `Contacto desde la página de Anunciantes - Prensa del Plata:
    
    Nombre: ${nombre.value}
    Apellido: ${apellido.value}
    Email: ${email.value}
    Teléfono: ${telefono.value}
    
    Horario disponible: ${horario.value}
    Género: ${genero.value}`
  );


  fetch('https://formspree.io/f/xvonlyej', {
    method: 'POST',
    body: enviar,
    headers: {
        'Accept': 'application/json'
    }
  }).then(response => {
    if (response.ok) {
        const msjOk = document.querySelector('.msj-ok');
        msjOk.style.display = 'block';
        document.getElementById('envioSpinner').style.display = 'none';
        document.getElementById('botonEnvio').style.display = 'inline-block';
        form.reset();
    } else {
      response.json().then(data => {
        const msjError = document.getElementById('envio-error');
        msjError.style.display = 'block';
        document.getElementById('envioSpinner').style.display = 'none';
        document.getElementById('botonEnvio').style.display = 'inline-block';

      })
    }
  }).catch(error => {
    const msjError = document.getElementById('envio-error');
        msjError.style.display = 'block';
        document.getElementById('envioSpinner').style.display = 'none';
        document.getElementById('botonEnvio').style.display = 'inline-block';
  });
}

   

});

});
