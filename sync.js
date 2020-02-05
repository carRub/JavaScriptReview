let url = 'https://api.myjson.com/bins/wezgm'; //actualiza tu URL
let players = {};
let numEnemigo = 0;

 async function getData(){
    let json = await fetch(url);
    let obj = await json.json();
    console.log("my json", obj);
    return obj;
}

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
    players[`j${numJugador}`] = datosJugador;
    saveData(players);
    //obtener los datos y actualizar al jugador correspondiente volvera a guardar
}

async function esperarMiTurno(numJugador){
    //entrar aquí solo si el estado es esperarInicio o esperarTurno
    //si no salir
    if(gameStatus != STATUS_ID.esperarInicio && gameStatus != STATUS_ID.esperarTurno) return;

    //obtener datos guardar en variables jugador y enemigo // PENDING
    if(numJugador == 1) { 
        numEnemigo = 2;
        // enemigo = obj.j2; 
    } else {
        numEnemigo = 1;
        // enemigo = obj.j1
    };


    getData().then(obj => {
        players = obj;
        // jugador = obj[`j${numJugador}`];
    });

    //si el estatus de ataque existe significa que
    //el enemigo me edito mi ataque y respondió con fire o failed
    //en este caso actualiza en mi tabla de ataque con su respectiva clase fire o failed
    //limpia el attack_status y guarda los datos. 
    if(players[`j${numJugador}`].attack_status != "") {
        document.getElementById('tablaAttack').rows[players[`j${numJugador}`].attack[0]].cells[players[`j${numJugador}`].attack[1]].setAttribute("class", players[`j${numJugador}`].attack_status);
        players[`j${numJugador}`].attack_status = "";
        // updatePlayer(jugador, numJugador);
        updatePlayer(players[`j${numJugador}`], numJugador);
    }

    //si es jugador 1 y el jugador 2 está esperandoInicio
        //asignarme el turno por defecto. 
    //si no si el estado no es mi turno (llamada recursiva a esperar) 
    
    if(numJugador == 1 && players[`j${numEnemigo}`].status == STATUS_ID.esperarInicio){ 
        players[`j${numJugador}`].status = STATUS_ID.miTurno; 
    } else if(players[`j${numJugador}`].status != miTurno){ 
        esperarMiTurno(numJugador); 
    }
    
     //si es mi turno // DONE
    if(players[`j${numJugador}`].status == STATUS_ID.miTurno){
        //leer el ataque, revisar si me dieron (fire) o falló (failed)
        //modificar el attack_status del enemigo por "fire" o "failed"    // DONE
        //pintar la celda con el ataque del enemigo
        if(ownerMatrix[players[`j${numEnemigo}`].attack[0]][players[`j${numEnemigo}`].attack[1]] == 1){
            players[`j${numEnemigo}`].attack_status = "fire";
            document.getElementById('tablaOwner').rows[players[`j${numEnemigo}`].attack[0]].cells[players[`j${numEnemigo}`].attack[1]].setAttribute("class", "fire");
        } else {
            enemigo.attack_status = "failed";
            document.getElementById('tablaOwner').rows[players[`j${numEnemigo}`].attack[0]].cells[players[`j${numEnemigo}`].attack[1]].setAttribute("class", "failed");
        }
        //guardar los datos con los cambios  (actualizar local y en myjson.com) // Pending
        updatePlayer(players[`j${numEnemigo}`], numEnemigo);
        saveData(players);
    }
           
}

async function atacar(ataque, numJugador){
    console.log("****** ataque ***", numJugador, ataque);
    if(numJugador == 1) { 
        numEnemigo = 2;
        // enemigo = obj.j2; 
    } else {
        numEnemigo = 1;
        // enemigo = obj.j1
    };

    //obtener datos , clasificar por jugador y enemigo
    getData().then(obj => {
        players = obj;
        // jugador = obj[`j${numJugador}`];
    });

    //asignar ataque a jugador, y attack_status =""

    players[`j${numJugador}`].attack = ataque;
    players[`j${numJugador}`].attack_status = "";
    // jugador.attack = ataque;
    // jugador.attack_status = "";
    
    //incrementar step
    players[`j${numJugador}`].step ++;
    //cambiar el estatus del enemigo por .miTurno (darle el turno)
    players[`j${numEnemigo}`].status = STATUS_ID.miTurno;
    // enemigo.status = STATUS_ID.miTurno;
    //cambiar mi estatus (local y externo) por esperarTurno
    players[`j${numJugador}`].status = STATUS_ID.esperarTurno;
    gameStatus = STATUS_ID.esperarTurno;

    //guardar
    saveData(players);

    //regresar a esperar turno
    esperarMiTurno(numJugador);

}
