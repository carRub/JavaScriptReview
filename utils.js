const getKey = (obj, val) => Object.keys(obj).find(key => obj[key] === val); //retrieve object key by value

//reiniciar partida, limpiar todo, iniciar todo


let reiniciar = ()=>{
    
    // gameStatus = STATUS_ID.colocar; 
    gameStatus = STATUS_ID.miTurno;
    //matrices de 11 por 11 los indices 0 no se van a usar
    ownerMatrix = Array(11).fill().map(() => Array(11).fill(0));
    attackMatrix = Array(11).fill().map(() => Array(11).fill(0));

    /* TODO TAREA: quitar las clases a todas las celdas (TD) 
    de ambas tablas con un forEach es una línea de código */   // DONE
    let tables = document.querySelectorAll('td');
    tables.forEach((cell) => {
        cell.removeAttribute('class');
        //console.log("removing class");
    });
    
    //******/
    updateCantidadBarcos(COUNT.slice());
    updateTamañosBarcos(SIZES.slice());
    numShip =0;
    updateDireccion(DIR.derecha);
    updateStatus(gameStatus);

    datosJugador = {
        step: 0,
        status: 0,
        attack: [0,0],
        attack_status: ""
    }

    updatePlayer(datosJugador, numJugador);

};

btnReiniciar.onclick=  reiniciar;

//al dar clic en la barra espaciadora cambiar de dirección
document.body.onkeypress  = (event)=>{

    //TODO: Si el estatus no es colocar salir // DONE 
    if(gameStatus != STATUS_ID.colocar) 
        return;
    
    if (event.key === ' ' || event.key === "Spacebar"){
        event.preventDefault()
        updateDireccion((direccion+1) % 4);
    }

}


//mostrar en pantalla la cantidad de barcos que faltan por poner
function updateCantidadBarcos(numBarcos){ 
    barcos.count = numBarcos;

    //TODO TAREA: mostrar cantidad de barcos en elementos con clase .count // DONE
    let counts = document.querySelectorAll('span.count');

    for(let i = 0; i < counts.length; i ++) {
        counts[i].innerText = numBarcos[i];
    }

}

function updateTamañosBarcos(sizes){
    barcos.sizes = sizes;

    //TODO TAREA: mostrar tamaños de barcos en elementos con clase .size // DONE
    let shipSizes = document.querySelectorAll('span.size');

    for(let i = 0; i < shipSizes.length; i ++){
        shipSizes[i].innerText = sizes[i];
    }
    
}

function updateDireccion(dir){
    direccion = dir;
    //TODO TAREA: mostrar dirección en spanDir // DONE
    document.getElementById('dir').innerText = getKey(DIR, dir);
}

async function updateStatus(status){
    console.log("actualizar status a", status);

    //TODO TAREA: actualizar estatus // DONE
    //gameStatus = status;
    document.getElementById('status').innerText = getKey(STATUS_ID, status);
}


btnSelect.onclick = () => {
    numJugador = Number(selectJugador.value);
    // console.log("Jugador seleccionado", numJugador);
    reiniciar();
}

reiniciar();


