// Se define un constructor de usuarios y la lista de usuarios mediante array

class Usuario {
  constructor(user, email, wattsTotales, precioAudio) {
    this.user = user;
    this.email = email;
    this.wattsTotales = wattsTotales;
    this.precioAudio = precioAudio;
  }
}

const Users = [
  { usuario: "jose", contraseña: "jose123" },
  { usuario: "juan", contraseña: "juan123" },
  { usuario: "julio", contraseña: "agosto123" },
  { usuario: "diego", contraseña: "diego123" },
];

//  Validacion de identidad para entrada al sitio

let bandera1 = true;
let wattsNecesarios;
let user;
let email;
let precioAudio;
let cantidadInvitados;

const validarIdentidad = () => {
  let bandera = false;
  let i = 0;
  let intento = 1;
  let secreto;
  let identidad;

  while (intento <= 3) {
    i = 0;
    identidad = prompt(`Intento N°${intento}. Ingrese su usuario:`);
    secreto = prompt(`Intento N°${intento}. Ingrese su contraseña:`);
    while (!bandera && i < Users.length) {
      if (Users[i].usuario === identidad && Users[i].contraseña === secreto) {
        bandera = true;
        intento = 5;
        alert(`Contraseña correcta!`);
      } else {
        i++;
      }
    }
    intento++;
  }

  if (intento === 4) {
    alert(`Ingreso el maximo de intentos incorrectos`);
    bandera1 = false;
  }
};

validarIdentidad();

// Ingreso de datos

if (bandera1 == true) {
  user = prompt(`Ingrese su nombre de usuario nuevamente:`);
  email = prompt(`Ingrese su email:`);

  cantidadInvitados = parseInt(prompt(`Ingrese la cantidad de invitados`));
  let lugar = prompt(
    `Ingrese "abierto" o "cerrado" dependiendo del tipo de lugar`
  );
  wattsNecesarios = 0;
  precioAudio = 0;

  // Calculador de datos

  const wattsTotales = () => {
    if (lugar == "cerrado") {
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
    } else if (lugar == "abierto") {
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
      alert("Ingrese un lugar válido");
      lugar = prompt(
        `Ingrese "abierto" o "cerrado" dependiendo del tipo de lugar`
      );
      wattsTotales();
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

  // Se crea y se agrega el nuevo usuario al array de usuarios

  const newUser = new Usuario(
    user,
    email,
    `${wattsNecesarios} W`,
    `$ ${precioAudio}`
  );

  console.log(newUser);

  Users.push(newUser);

  // Se le informa al usuario los resultados

  console.log(
    `${newUser.user}, el precio total del audio es de ${precioAudio}`
  );
  alert(`${newUser.user}, el precio total del audio es de ${precioAudio}`);
  console.log(`Le enviaremos el presupuesto a su correo ${newUser.email}`);
  alert(`Le enviaremos el presupuesto a su correo ${newUser.email}`);

  console.log(Users);
} else {
  // Si el usuario ingresa mal los datos mas de 3 veces, se deberá reiniciar la pestaña
  alert("Reinicie la pestaña para continuar");
}

// Se agregan los resultados al HTML por medio de DOM

const respuesta = document.querySelector(".atf_contenedor_general");

respuesta.innerHTML += `<div class="atf_contenedor_general">
<div class="atf_contenedor">
  <h2 class="consulta_titulo">bienvenido ${user} <span>tu presupuesto esta listo</span></h2>
  <h3 class="respuestaJS">Su fiesta es para <span>${cantidadInvitados}</span> invitados<h3>
  <h3 class="respuestaJS">El precio total del audio es de <span>$${precioAudio}</span></h3>
  <h3 class="respuestaJS">Le enviaremos el presupuesto a su correo <span>${email}</span></h3>
  </div>
  </div>`;
