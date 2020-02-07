'use strict';

//***************************/
//RELACIONADO A LA TABLA TOWNER
//***************************/
let curDir = direccion;

tOwner.onmouseover = tOwner.onmouseout = tOwner.onclick = (event) => {
    //TODO TAREA: solo entrar si el estado actual es colocar si no salir. // DONE
    if(gameStatus != STATUS_ID.colocar) return;
    
    //TODO TAREA:  si es mouseOver actualizar curDir por la dirección // DONE
    if(event.type == 'mouseover')
        curDir = direccion;
    

    //TODO TAREA: determinar si terminó de poner barcos salir.  // DONE
    let finished = true;
    for(let i = 0; i < COUNT.length; i++)
        finished = (COUNT[i] == 0) && finished;

    if (finished) return;

    //TODO TAREA: si no es una celda el target salir. // DONE
    if(event.target.tagName != 'TD') return;


    //TODO TAREA: obtener rowIndex y cellIndex de la celda (fila, columna) // DONE
    let row = event.target.closest("tr").rowIndex;
    let col = event.target.cellIndex;
    
    
    //TODO TAREA: ejecutar isValid(row, col, curDir, barcos.sizes[numShip]))
    //regresa true o false, true cuando hay espacio para poner en esa celda un barco del  tamaño actual  // DONE
    //en esa dirección.

    let valid = isValid(row, col, curDir, barcos.sizes[numShip]);

    /*En caso de ser válido pintar la(s) celda(s) de un color puedes poner una clase a la celda ||
    como active si es mouseover                                                                 ||  
                                                                                                || > DONE     
    quitar active si es mouseout                                                                ||
    selected si es click                                                                        ||     
    */

    if(valid) { 
        let selected = false;
        for(let i = 0; i < barcos.sizes[numShip]; i ++){
            if(curDir == 0){ // Derecha
                if(event.type == 'mouseover'){
                    document.getElementById('tablaOwner').rows[row].cells[col + i].setAttribute("class", "active");
                } else if(event.type == 'mouseout'){
                    document.getElementById('tablaOwner').rows[row].cells[col + i].classList.remove("active");
                } else { // click;  disminuir y bla bla
                    document.getElementById('tablaOwner').rows[row].cells[col + i].setAttribute("class", "selected");
                    ownerMatrix[row][col + i] = 1;
                    selected = true;
                } 
            } else if(curDir == 2){ // Izquierda
                if(event.type == 'mouseover'){
                    document.getElementById('tablaOwner').rows[row].cells[col - i].setAttribute("class", "active");
                } else if(event.type == 'mouseout'){
                    document.getElementById('tablaOwner').rows[row].cells[col - i].classList.remove("active");
                } else { // disminuir y bla bla
                    document.getElementById('tablaOwner').rows[row].cells[col - i].setAttribute("class", "selected");
                    ownerMatrix[row][col + i] = 1;
                    selected = true;
                }
            } else if(curDir == 1){ // Abajo
                if(event.type == 'mouseover'){
                    document.getElementById('tablaOwner').rows[row + i].cells[col].setAttribute("class", "active");
                } else if(event.type == 'mouseout'){
                    document.getElementById('tablaOwner').rows[row + i].cells[col].classList.remove("active");
                } else { // disminuir y bla bla
                    document.getElementById('tablaOwner').rows[row + i].cells[col].setAttribute("class", "selected");
                    ownerMatrix[row][col + i] = 1;
                    selected = true;
                }
            } else { //Arriba
                if(event.type == 'mouseover'){
                    document.getElementById('tablaOwner').rows[row -  i].cells[col].setAttribute("class", "active");
                } else if(event.type == 'mouseout'){
                    document.getElementById('tablaOwner').rows[row - i].cells[col].classList.remove("active");
                } else { // disminuir y bla bla
                    document.getElementById('tablaOwner').rows[row - i].cells[col].setAttribute("class", "selected");
                    ownerMatrix[row][col + i] = 1;
                    selected = true;
                }
            }
        }
        if(selected) COUNT[numShip] --;
    } else {  // DONE
        if(event.type == 'mouseover')
            document.getElementById('tablaOwner').rows[row].cells[col].classList.add("invalid");
        else if(event.type == 'mouseout')
            document.getElementById('tablaOwner').rows[row].cells[col].classList.remove("invalid");
    }
    
    console.log("numShip: ", numShip, "sizes.kength: ", SIZES.length);
    if(numShip == (SIZES.length)){
        gameStatus = STATUS_ID.esperarInicio;
        updateStatus(gameStatus);
        esperarMiTurno(numJugador);
        console.log("status updated");
        return;
    }

    if(COUNT[numShip] == 0) numShip ++;
    updateCantidadBarcos(COUNT.slice());

    // en caso de que la celda sea inválida ponerle la clase invalid (mouseover) y no permite seleccionarla //DONE

    //al seleccionar disminuir la cantidad de barcos de la posición actual (numShip) // DONE
    //si se colocaron todos los barcos arrancar el proceso de esperar turno y cambiar el estatus a esperarInicio //DONE

 

};

//Revisar si es válido introducir un barco en la posición indicada // DONE
//considerar tipo de barco y direccion
function isValid(fila, columna, curDirection, shipSize) {
    //si la matriz owner ya tiene algo diferente de 0 regresar false.  // DONE
    //Si el susario esta sobre la definicion de las filas o columnas, regresar false. //DONE
    if(ownerMatrix[fila][columna] != 0 || fila == 0 || columna == 0) return false;
    
    
    //revisar que el barco del tamaño indicado no choca con otro ya puesto // DONE
    //considerar la duración y el tamaño del barco // DONE
    for(let i = 0; i < shipSize; i ++){
        if(curDirection == 0) { // Derecha
            if(ownerMatrix[fila][columna + i] != 0) return false;
        } else if(curDirection == 2){ // Izquierda
            if(ownerMatrix[fila][columna - i] != 0 || (columna - i) == 0) return false;
        } else if(curDirection == 1){ // Abajo
            if((fila + i) > 10 || ownerMatrix[fila + i][columna] != 0) return false;
        } else { // Arriba
            if((fila - i) <= 0 || ownerMatrix[fila - i][columna] != 0) return false;
        }
    }
    return true;
}

//***************************/
//RELACIONADO A LA TABLA DE ATAQUE
//***************************/

tAttack.onmouseover = tAttack.onmouseout = tAttack.onclick = (event)=>{
    //entrar aquí cuando sea mi turno, si no salir //DONE
    if(gameStatus != STATUS_ID.miTurno) return;
    
    //asegurarse que sea celda(TD) y obtner rowIndex y cellIndex, // DONE
    if(event.target.tagName != 'TD') return;
    let row = event.target.closest("tr").rowIndex;
    let col = event.target.cellIndex;
    
    //validar que la celda no haya sido previamente seleccionada //DONE
    //puedes usar attackMatrix  si tiene valor 1 significa que la celda fue usada // DONE
    //Si el susario esta sobre la definicion de las filas o columnas, salir //DONE
    if(row == 0 || col == 0 || attackMatrix[row][col] != 0) return;
    console.log("valid");

    //Manejando los eventos // DONE
    if(event.type == 'mouseover'){
        document.getElementById('tablaAttack').rows[row].cells[col].setAttribute("class", "active");
    } else if(event.type == 'mouseout'){
        document.getElementById('tablaAttack').rows[row].cells[col].classList.remove("active");
    }else { //click  //en caso de click  seleccionar la celda  y poner un 1 en la matriz. /// DONE
        document.getElementById('tablaAttack').rows[row ].cells[col].setAttribute("class", "selected");
        attackMatrix[row][col] = 1;
        let ataque = [row, col]; 
        atacar(ataque, numJugador);
    }

    //enviar el ataque. 

    //en caso de que no sea válido poner a la celda la clase invalid 
    

}