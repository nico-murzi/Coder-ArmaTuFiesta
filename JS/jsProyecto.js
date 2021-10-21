// Se define un constructor de usuarios y la lista de usuarios mediante array



class Usuario {
  constructor(user, email, wattsTotales, precioAudio) {
    this.user = user;
    this.email = email;
    this.wattsTotales = wattsTotales;
    this.precioAudio = precioAudio;
  }
}


//  Validacion de identidad para entrada al sitio

let bandera1 = true;
let wattsNecesarios;
let user;
let email;
let precioAudio;
let cantidadInvitados;
let nombre;
let apellido;
let lugarAbierto;
let lugarCerrado;
let datosCompletos = true;


// Se agregan los resultados al HTML por medio de DOM


$('.ATFButton').on('click', () => {


  nombre = $('#nombre').val();
  email = $("#email").val();
  apellido = $("#apellido").val();
  cantidadInvitados = $("#cantidad_invitados").val();
  lugarAbierto = document.getElementById("Aire libre").checked;
  lugarCerrado = document.getElementById("Cerrado").checked;
  datosCompletos = true;
  
  if (datosCompletos == true) {
   
    wattsNecesarios = 0;
    precioAudio = 0;
  
    // Calculador de datos
  
    
    const wattsTotales = () => {
  
  
      if (lugarCerrado) {
        switch (true) {
          case cantidadInvitados <= 50:
            wattsNecesarios = wattsNecesarios + 200;
            break;
          case cantidadInvitados <= 100:
            wattsNecesarios = wattsNecesarios + 300;
            break;
          case cantidadInvitados <= 200:
            wattsNecesarios = wattsNecesarios + 400;
            break;
          case cantidadInvitados <= 500:
            wattsNecesarios = wattsNecesarios + 600;
            break;
          case cantidadInvitados <= 1000:
            wattsNecesarios = wattsNecesarios + 800;
            break;
          case cantidadInvitados <= 1200:
            wattsNecesarios = wattsNecesarios + 1000;
            break;
          default:
            wattsNecesarios = wattsNecesarios + 1200;
        }
        console.log(
          `Se necesitan ${wattsNecesarios} Watts de potencia para tu fiesta`
        );
      } else if (lugarAbierto) {
        switch (true) {
          case cantidadInvitados <= 50:
            wattsNecesarios = wattsNecesarios + 300;
            break;
          case cantidadInvitados <= 100:
            wattsNecesarios = wattsNecesarios + 500;
            break;
          case cantidadInvitados <= 200:
            wattsNecesarios = wattsNecesarios + 500;
            break;
          case cantidadInvitados <= 500:
            wattsNecesarios = wattsNecesarios + 800;
            break;
          case cantidadInvitados <= 1000:
            wattsNecesarios = wattsNecesarios + 1000;
            break;
          case cantidadInvitados <= 1200:
            wattsNecesarios = wattsNecesarios + 1200;
            break;
          default:
            wattsNecesarios = wattsNecesarios + 1500;
        }
        console.log(
          `Se necesitan ${wattsNecesarios} Watts de potencia para tu fiesta`
        );
        
      } else {
        alert("Seleccione el tipo de lugar");
        location.reload();
      }
    };
  
    // Calculador de precio en funcion de los Watts necesarios
  
    let precioWatts = 45;
  
    const precioTotal = () => {
      precioAudio += wattsNecesarios * precioWatts;
    };
  
    // Declaracion
  
    wattsTotales();
    precioTotal();
  
  } else {
    alert("Complete todos los campos obligatorios")
    
  }
  
  let newUser = new Usuario(`${nombre} ${apellido}`, email, wattsNecesarios, precioAudio)
  console.log(newUser);
  localStorage.setItem("usuario", JSON.stringify(newUser));
  
  
  
  if (datosCompletos == true) {

    $('.atf_contenedor_general').append(`<div style="display: none" class="atf_contenedor_general">
    <div class="atf_contenedor">
    <div class="formulario_contacto atf_contacto">
    <h2 class="consulta_titulo tituloJS">bienvenido ${nombre} ${apellido} <span>tu presupuesto esta listo</span></h2>
    <h3 class="respuestaJS">Su fiesta es para <span>${cantidadInvitados}</span> invitados<h3>
    <h3 class="respuestaJS">El precio total del audio es de <span>$${precioAudio}</span></h3>
    <h3 class="respuestaJS">Le enviaremos el presupuesto a su correo <span>${email}</span></h3>
    </div>
    </div>
    </div>`);
    $('.atf_contenedor_general').fadeIn();
  
    // const respuesta = document.querySelector(".atf_contenedor_general");
  
    // respuesta.innerHTML += `<div class="atf_contenedor_general">
    //         <div class="atf_contenedor">
    //         <div class="formulario_contacto atf_contacto">
    //         <h2 class="consulta_titulo tituloJS">bienvenido ${nombre} ${apellido} <span>tu presupuesto esta listo</span></h2>
    //         <h3 class="respuestaJS">Su fiesta es para <span>${cantidadInvitados}</span> invitados<h3>
    //         <h3 class="respuestaJS">El precio total del audio es de <span>$${precioAudio}</span></h3>
    //         <h3 class="respuestaJS">Le enviaremos el presupuesto a su correo <span>${email}</span></h3>
    //         </div>
    //         </div>
    //         </div>`;
  
  } else {
  
    const respuesta = document.querySelector(".atf_contenedor_general");
  
    respuesta.innerHTML += `<div class="atf_contenedor_general">
            <div class="atf_contenedor">
              <h2 class="consulta_titulo">Superaste el limite de intentos <span>refresca la pestaña</span></h2>
              </div>
              </div>`;
  }

  $('.principal').slideUp(1200);
});


