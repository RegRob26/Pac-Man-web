let canvas = document.getElementById("pacmanCanvas");
let ctx = canvas.getContext('2d');
let img = new Image();
img.src = "resource.png";
let x = canvas.width;
let key = 39;
let xActual = 0;
let yActual = 0;

let movimiento = 1;
let indice = 0;
let inc = 0;
const cantInc = 20;
const y = canvas.height;
let direccion = 0;
let xBarrera = 150;
let yBarrera = 0;
let anchuraBarrera = 30;
let alturaBarrera = 10;

document.addEventListener('keydown', manejarTecladoAbajo, false);
//document.addEventListener('keyup',manejarTecladoArriba, false);
setInterval(dibujar, 40, key)

function manejarTecladoAbajo(e) {
    console.log(e.keyCode)
    if (e.keyCode === 39) {
        console.log("Mover a la derecha");
        key = 39;
    }
    if (e.keyCode === 37) {
        console.log("Mover a la izquierda");
        key = 37;

    }
    if (e.keyCode === 38) {
        key = 38;
        console.log("Mover hacia arriba");
    }
    if (e.keyCode === 40) {
        key = 40;
        console.log("Mover hacia abajo");
    }
}


//Vamos a definir los valores de las direcciones para cambiar la imagen del pacman
//2 arriba, 1 izquierda, 0 abajo, 3 derecha


function dibujar(direccion) {
    let resourceX = 492;
    const resourceY = 60;
    const pacmanTam = 13;
    const pacmanCantiMov = 3.75;
    const barrera = canvas.width;


    ctx.clearRect(0, 0, canvas.width, canvas.height);
    dibujaBarrera();
    //console.log("xactual: ",xActual,yActual);
    if (key === 39) {
        ctx.drawImage(img, resourceX + inc, resourceY, pacmanTam, pacmanTam, xActual, yActual, pacmanTam, pacmanTam);
        if ((xActual < x - (pacmanTam + pacmanCantiMov))){
            xActual += pacmanCantiMov;
            inc += cantInc - 1;
        } else inc = cantInc;
        if (inc > 60) inc = 0;
    }

    if (key === 37) {
        ctx.drawImage(img, resourceX + inc, resourceY + 58, pacmanTam, pacmanTam, xActual, yActual, pacmanTam, pacmanTam);
        if ((xActual > 0)) {
            xActual -= pacmanCantiMov;
            inc += cantInc;
        } else inc = cantInc;
        if (inc > 60) inc = 0;
    }

    if (key === 40) {
        ctx.drawImage(img, resourceX + inc, resourceY + 29, pacmanTam + 3, pacmanTam + 3, xActual, yActual, pacmanTam + 3, pacmanTam + 3);
        if ((yActual < y - (pacmanTam + pacmanCantiMov))) {
            yActual += pacmanCantiMov;
            inc += cantInc;
        } else inc = cantInc;
        if (inc > 60) inc = 0;
    }

    if (key === 38) {
        ctx.drawImage(img, resourceX + inc, resourceY - 29, pacmanTam + 3, pacmanTam + 3, xActual, yActual, pacmanTam + 3, pacmanTam + 3);
        if ((yActual > 0 && yActual < barrera)) {
            yActual -= pacmanCantiMov;
            inc += cantInc;
        } else inc = cantInc;
        if (inc > 60) inc = 0;
    }
}
//En esta seccion del codigo encontraremos los casos para los escenarios segun el nivel, como ahora no existe tal situacion
//se encontraran datos sobre las pruebas para la deteccion de barreras y otros casos a determinar
function dibujaEscenario(){
    dibujaBarrera();
}


/*
    let ladrillos = [];
    for (c=0;c<ladrillosColumnas;c++){
    ladrillos[c]=[];//cada columna ahora sera un arreglo
    for (r=0;r<ladrillosFilas;r++){
        ladrillos[c][r]={
            x:0,
            y:0,
            orientacion:
        }
    }
}*/

function dibujaBarrera(){
    console.log("dibuja barrera");
    ctx.beginPath();
    ctx.rect(150,0,30,10);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.closePath();
}