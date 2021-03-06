// Se define un constructor de usuarios y la lista de usuarios mediante array



class Usuario {
  constructor(user, email, wattsTotales, precioAudio, cantidad, id, img) {
    this.user = user;
    this.email = email;
    this.wattsTotales = wattsTotales;
    this.precioAudio = precioAudio;
    this.cantidad = cantidad;
    this.id = id;
    this.img = img;
  }
}

const Usuarios = []

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

// Funcion de Mercado Pago

async function pagarConFe (){
  const productosToMp = Usuarios.map(Element => {
      let nuevoElemento = {
          title: Element.user,
          description: Element.wattsTotales,
          picture_url: Element.img,
          category_id: Element.id,
          quantity: Element.cantidad,
          currency_id: "ARS",
          unit_price: Element.precioAudio,
      }
      return nuevoElemento
  })

  let response = await fetch("https://api.mercadopago.com/checkout/preferences",
  {
      method: "POST",
      headers: {
          Authorization: "Bearer TEST-680675151110839-052307-64069089337ab3707ea2f547622a1b6a-60191006"
      },
      body: JSON.stringify({
          items: productosToMp,
      })
  })

  const data = await response.json()
  window.open(data.init_point, "_blank")
}


// Se agregan los resultados al HTML por medio de DOM


$('.ATFButton').on('click', () => {


  nombre = $('#nombre').val();
  email = $("#email").val();
  apellido = $("#apellido").val();
  cantidadInvitados = $("#cantidad_invitados").val();
  lugarAbierto = document.getElementById("Aire libre").checked;
  lugarCerrado = document.getElementById("Cerrado").checked;
  fotografo = document.getElementById("afirmativo").checked;
  dj = document.getElementById("sinDJ").checked;
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
  
  let newUser = new Usuario(`Audio para tu fiesta`, email, wattsNecesarios, precioAudio, 1, "1", "f");
  Usuarios.push(newUser);
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
    <form><button type='button' class="ATFButton irAPagar">
    IR A PAGAR
    </button></form>
    </div>
    </div>
    </div>`);
    $('.atf_contenedor_general').fadeIn();

    if (dj == true) {
      traerDatosDj ();
    }
    if (fotografo == true) {
      traerDatosFotos ();
    }


  // Forma sin Jquery

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
  
  }

  $('.principal').slideUp(1200);
  $('html, body').animate({scrollTop : 0});

  $('.irAPagar').on('click', () => {

    pagarConFe ();
  })

});


// Funciones para traer sugerencias de ML

function traerDatosFotos (){
  $.get(`https://api.mercadolibre.com/sites/MLA/search?q=Book Pre 15 A??os Promo! Sesion Fotos+libro De Firmas+video`,
  function (resultado, status){
    if (status === "success") {
      let itemsSugeridos = resultado.results;
      for (let i=0; i<2; i++) {
        $(`.contenedorSugerido`).append(`
        <div class="cardSugerido">
                <figure>
                    <img src="${resultado.results[i].thumbnail}">
                </figure>
        <div class="contenidoSugerido">
              <h3>${resultado.results[i].title}</h3>
              <p>$ ${resultado.results[i].price}</p>
              <a href="${resultado.results[i].permalink}" target="_blank">COMPRAR</a>
        </div>
        </div>
        `     
        )}
    }
  }
  )
}


function traerDatosDj (){
$.get(`https://api.mercadolibre.com/sites/MLA/search?q=egresados jard??n y primaria: animaci??n, shows y servicios`,
function (resultado, status){
  if (status === "success") {
    let itemsSugeridos2 = resultado.results;
    for (let i=0; i<2; i++) {
      $(`.contenedorSugerido`).append(`
      <div class="cardSugerido">
              <figure>
                  <img src="${resultado.results[i].thumbnail}">
              </figure>
      <div class="contenidoSugerido">
            <h3>${resultado.results[i].title}</h3>
            <p>$ ${resultado.results[i].price}</p>
            <a href="${resultado.results[i].permalink}" target="_blank">COMPRAR</a>
      </div>
      </div>
      `
      )}
  }  
}
)
}