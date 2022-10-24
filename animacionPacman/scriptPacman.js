let canvas = document.getElementById("pacmanCanvas");
let ctx = canvas.getContext('2d');
let img = new Image();
img.src = "resource.png";
let x = canvas.width;
let key= 39;
let xActual = 0
let yActual = 0

let movimiento = 1;
let indice = 0;
let inc = 0;
const cantInc = 20;
const y = canvas.height;
let  direccion = 0;

document.addEventListener('keydown',manejarTecladoAbajo, false);
//document.addEventListener('keyup',manejarTecladoArriba, false);
setInterval(dibujar,100,key)

function manejarTecladoAbajo(e){
    if (e.keyCode ===39){
        console.log("Mover a la derecha");
        key = 39;
    }
    if (e.keyCode ===37){
        console.log("Mover a la izquierda");
        key = 37;

    }
    if (e.keyCode ===38){
        key = 38;
        console.log("Mover hacia arriba");
    }
    if (e.keyCode ===40){
        key = 40;
        console.log("Mover hacia abajo");
    }
}



//Vamos a definir los valores de las direcciones para cambiar la imagen del pacman
//2 arriba, 1 izquierda, 0 abajo, 3 derecha


function dibujar(direccion){
    let resourceX = 492;
    const resourceY = 60;
    const pacmanTam = 13;
    const pacmanCantiMov = 3.75;
    const barrera = canvas.width;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (key===39) {

        ctx.drawImage(img, resourceX + inc, resourceY, pacmanTam, pacmanTam, movimiento, yActual, pacmanTam, pacmanTam);

        if ((movimiento < x - (pacmanTam + pacmanCantiMov))) {
            movimiento += pacmanCantiMov;
            inc += cantInc-1;
        } else inc = cantInc-1;
        if (inc > 60) inc = 0;
    }

    if (key===37){
        ctx.drawImage(img, resourceX + inc, resourceY + 58, pacmanTam, pacmanTam,movimiento - pacmanTam, yActual, pacmanTam, pacmanTam);
        console.log(x+movimiento)
        if ((x+movimiento>pacmanTam)) {
            movimiento -= pacmanCantiMov;
            inc += cantInc;
        } else inc = cantInc;
        if (inc > 60) inc = 0;
    }

    if (key===40){
        ctx.drawImage(img, resourceX+inc, resourceY + 29, pacmanTam+3, pacmanTam+3,xActual, movimiento, pacmanTam+3, pacmanTam+3);
        console.log(yActual)
        if ((yActual < y - (pacmanTam + pacmanCantiMov))) {
            movimiento += pacmanCantiMov;
            inc += cantInc;
        } else inc = cantInc;
        if (inc > 60) inc = 0;
    }

    if (key===38){
        ctx.drawImage(img, resourceX + inc, resourceY - 29, pacmanTam+3, pacmanTam+3,xActual, movimiento - pacmanTam, pacmanTam+3, pacmanTam+3);
        console.log(x+movimiento)
        if ((y+movimiento>pacmanTam+pacmanCantiMov && movimiento < barrera)) {
            movimiento -= pacmanCantiMov;
            inc += cantInc;
        } else inc = cantInc;
        if (inc > 60) inc = 0;
    }

}