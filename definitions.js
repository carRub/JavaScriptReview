//PARA LA TAREA NO REQUIERE CAMBIOS
//pero si te ayuda añadir o quitar algo puedes hacerlo



let barcos = {
    count: [0,0,0], //cantidad de barcos por tipo 
    sizes: [0,0,0]  //tamaños de barcos
};

//variables globales
let ownerMatrix; //matriz de 11 x 11 para colocar mis barcos
let attackMatrix; // matriz de 11 x 11 para marcar ataques
let direccion; // dirección para color barcos
let gameStatus; //se puede usar esta o datosJugador.status
let numShip = 0; //cual id de barco se está acomodando
let numJugador =1; //debe ser 1 o 2
let datosJugador = {
    step: 0,
    status: 0,
    attack: [0,0],  //ataque inválido solo para inicializar
    attack_status: ""
}

// constantes

//tamaños de barcos
const SIZES = [2,3,4]; //PODRIAN SER DIFERENTES, PARA INICIALIZAR LOS VALORES
//cantidad de barcos por tamaño
const COUNT = [4,3,2]; //PODRIAN SER DIFERENTES, PARA INICIALIZAR LOS VALORES

const DIR = {
    derecha: 0,
    abajo: 1,
    izquierda: 2,
    arriba: 3
};

const DIR_NAMES = ['Derecha','Abajo','Izquierda','Arriba'];

const STATUS_ID = {
    colocar : 0,
    esperarInicio : 1,
    esperarTurno : 2,
    miTurno: 3,
    finalizar: 4
};

const STATUS_NAMES = ['Colocar barcos','Esperando al otro jugador','Esperando mi turno','Es mi turno de atacar','Juego terminado']


//******************/
// ELEMENTOS DEL DOM
//******************/


//tablas
let tOwner = document.querySelector('#tablaOwner');
let tAttack = document.querySelector('#tablaAttack');

//botones
let btnReiniciar = document.querySelector('#btnReiniciar');
let btnSelect = document.querySelector('#select');

//select
let selectJugador = document.querySelector('select')

//span de dirección
let spanDir = document.querySelector('#dir');

//span de status de juego
let spanStatus = document.querySelector('#status');






