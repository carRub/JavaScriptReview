let url = 'https://api.myjson.com/bins/wezgm'; //actualiza tu URL
console.log("sync");

 async function getData(){
    let json = await fetch(url);
    let obj = await json.json();
    console.log("my json", obj);
    return obj;
}

getData().then(obj => console.log(obj));

async function saveData(data){
    try{
        let res =  await fetch(url, {
            method: 'PUT', 
            body: JSON.stringify(data), 
            headers:{
              'Content-Type': 'application/json'
            }
          })
        let obj = await res.json();
        return true;
    }catch(e){
        console.error("error:", e)
        return false; 
    }
 }

 //ejemplo de un objeto que guardaría myJson.com

let test1 = {
    j1: {
        step:1,
        status:2,
        attack:[3,2],
        attack_status : "fail"
    },
    j2: {
        step: 1,
        status: 2,
        attack: [3 ,2],
        attack_status : "fire"
    },
}


async function updatePlayer(datosJugador, numJugador){
    console.log("updatePlayer", datosJugador, numJugador);
    //obtener los datos y actualizar al jugador correspondiente volvera a guardar
}

async function esperarMiTurno(numJugador){
    //entrar aquí solo si el estado es esperarInicio o esperarTurno
    //si no salir

    //obtener datos guardar en variables jugador y enemigo 

    //si el estatus de ataque existe significa que
    //el enemigo me edito mi ataque y respondió con fire o failed
    //en este caso actualiza en mi tabla de ataque con su respectiva clase fire o failed
    //limpia el attack_status y guarda los datos. 

    //si es jugador 1 y el jugador 2 está esperandoInicio
        //asignarme el turno por defecto. 
    //si no si el estado no es mi turno (llamada recursiva a esperar) 
    //si es mi turno 
        //leer el ataque, revisar si me dieron (fire) o falló (failed)
        //modificar el attack_status del enemigo por "fire" o "failed"
        //pintar la celda con el ataque del enemigo
        //guardar los datos con los cambios  (actualizar local y en myjson.com)
           
}

async function atacar(ataque, numJugador){
    console.log("****** ataque ***", numJugador, ataque);

    //obtener datos , clasificar por jugador y enemigo
    //asignar ataque a jugador, y attack_status =""
    //incrementar step
    //cambiar el estatus del enemigo por .miTurno (darle el turno)
    //cambiar mi estatus (local y externo) por esperarTurno
    //guardar
    //regresar a esperar turno

}
