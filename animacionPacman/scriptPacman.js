let canvas = document.getElementById("pacmanCanvas");
let ctx = canvas.getContext('2d');
let img = new Image();
img.src = "resource.png";
let x = canvas.width;
let key = 0;
let xActual = 0;
let yActual = 0;

let movimiento = 1;
let indice = 0;
let inc = 0;
const cantInc = 20;
const y = canvas.height;
let direccion = 0;
let xBarrera = 600;
let yBarrera = 400;
let anchuraBarrera = 30;
let alturaBarrera = 5;
let barreraBool = false;
let resourceX = 492;
const resourceY = 60;
const pacmanTam = 13;
const pacmanCantiMov = 3.75;
const barrera = canvas.width;
let keyBackup = 1;
let tolerancia = 0;
let c, r;
let nivel = 0;
let tipo = [21, 16, 102, 4, 36, 36, 24, 16, 76, 68, 8, 56, 16,20,4,71,21, 16, 51, 4,];
let barrerasMatriz = [
    [
        //Tabla de tipos
        /*
        * tipo 0 barra horizontal completa
        * tipo 4 Rectangulos del escenario
        * tipo 8 Barra vertical con hueco
        * tipo 12 Barra vertical completa
        * tipo 16 Barra horizontal mitad
        * */
        [{estado: 1, separacion: 0, tipo: 0}],
        [{estado: 1,separacion: pacmanTam,tipo: 12}, {estado: 0}, {estado: 0}, {estado: 0}, {estado: 0}, {estado: 0}],
        [{estado: 0}, {estado: 1, separacion: 0, tipo: 4}, {estado: 0}, {estado: 1,separacion: 0,tipo: 4}, {estado: 0}, {estado: 0}],
        [{estado: 0}, {estado: 0}, {estado: 0}, {estado: 0}, {estado: 0}, {estado: 0}],
        [{estado:  0}, {estado: 1, separacion: pacmanTam, tipo: 4}, {estado: 0}, {estado: 1,separacion: pacmanTam,tipo: 8}, {estado: 1,separacion: pacmanTam,tipo:0}, {estado: 0}],
        [{estado: 0}, {estado: 0}, {estado: 0},  {estado: 1,separacion: pacmanTam+15,tipo: 16}, {estado: 0}, {estado: 0}],
        [{estado: 1, separacion: 25,tipo: 16}, {estado: 0}, {estado: 1,separacion: pacmanTam+15,tipo: 12},{estado: 0}, {estado: 0}, {estado: 0}]
    ]
];

ctx.translate

document.addEventListener('keydown', manejarTecladoAbajo, false);
//document.addEventListener('keyup',manejarTecladoArriba, false);
setInterval(dibujar, 40, key)

function manejarTecladoAbajo(e) {
    if (e.keyCode === 39) {
        key = 39;
    }
    if (e.keyCode === 37) {
        key = 37;
    }
    if (e.keyCode === 38) {
        key = 38;
    }
    if (e.keyCode === 40) {
        key = 40;
    }
}

//Vamos a definir los valores de las direcciones para cambiar la imagen del pacman
//2 arriba, 1 izquierda, 0 abajo, 3 derecha

function dibujar(direccion) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    dibujaBarrera();
    detectarBarrera();
    if (key === 39) {

        ctx.save();
        ctx.translate(xActual,yActual);
        ctx.rotate((0*90*Math.PI)/180);
        ctx.drawImage(img, resourceX + inc, resourceY, pacmanTam, pacmanTam, xActual, yActual, pacmanTam, pacmanTam);
        ctx.restore();
/*        ctx.drawImage(img, resourceX + inc, resourceY, pacmanTam, pacmanTam, xActual, yActual, pacmanTam, pacmanTam);
        if ((xActual < x - (pacmanTam + pacmanCantiMov)) && !barreraBool) {
            xActual += pacmanCantiMov;
            inc += cantInc - 1;
        } else inc = cantInc;
        if (inc > 60) inc = 0;*/
    }

    if (key === 37) {
        ctx.drawImage(img, resourceX + inc, resourceY + 58, pacmanTam, pacmanTam, xActual, yActual, pacmanTam, pacmanTam);
        if ((xActual > 0) && !barreraBool) {
            xActual -= pacmanCantiMov;
            inc += cantInc;
        } else inc = cantInc;
        if (inc > 60) inc = 0;
    }

    if (key === 40) {
        ctx.drawImage(img, resourceX + inc, resourceY + 29, pacmanTam + 3, pacmanTam + 3, xActual, yActual, pacmanTam + 3, pacmanTam + 3);
        if ((yActual < y - (pacmanTam + pacmanCantiMov)) && !barreraBool) {
            yActual += pacmanCantiMov;
            inc += cantInc;
        } else inc = cantInc;
        if (inc > 60) inc = 0;
    }

    if (key === 38) {
        ctx.drawImage(img, resourceX + inc, resourceY - 29, pacmanTam + 3, pacmanTam + 3, xActual, yActual, pacmanTam + 3, pacmanTam + 3);
        if ((yActual > 0 && yActual < barrera) && !barreraBool) {
            yActual -= pacmanCantiMov;
            inc += cantInc;
        } else inc = cantInc;
        if (inc > 60) inc = 0;
    }

    if (barreraBool && key !== keyBackup) {
        if (key === 39) {
            xActual += pacmanCantiMov + 5;
        }
        if (key === 37) {
            xActual -= pacmanCantiMov;
        }
        if (key === 40) {
            yActual += pacmanCantiMov + 5;
        }
        if (key === 38) {
            yActual -= pacmanCantiMov;
        }
    }
    keyBackup = key;

}

//En esta seccion del codigo encontraremos los casos para los escenarios segun el nivel, como ahora no existe tal situacion
//se encontraran datos sobre las pruebas para la deteccion de barreras y otros casos a determinar
function dibujaEscenario() {
    dibujaBarrera();
}

function dibujaBarrera() {

    for (c = 0; c < barrerasMatriz[nivel].length; c++) {
        for (r = 0; r < barrerasMatriz[nivel][c].length; r++) {
            if (barrerasMatriz[nivel][c][r].estado !== 0) {
                let accesoBloque = barrerasMatriz[nivel][c][r];
                let xBarrera = (r * 30);
                let yBarrera = (c * 16);
                accesoBloque.x = xBarrera;
                accesoBloque.y = yBarrera;
                ctx.beginPath();
                console.log("acceso tipo vertical", accesoBloque,r,c)
                ctx.drawImage(img, tipo[accesoBloque.tipo], tipo[accesoBloque.tipo + 1], tipo[accesoBloque.tipo + 2], tipo[accesoBloque.tipo + 3], xBarrera, yBarrera+accesoBloque.separacion, tipo[accesoBloque.tipo + 2], tipo[accesoBloque.tipo + 3]);
                ctx.fillStyle = "blue";
                ctx.fill();
                ctx.closePath();
            }
        }
    }
    console.log(barrerasMatriz);

}

function detectarBarrera() {
    for (c = 0; c < barrerasMatriz[nivel].length; c++) {
        for (r = 0; r < barrerasMatriz[nivel][c].length; r++) {
            let accesoBloque = barrerasMatriz[nivel][c][r];
            if ((xActual >= accesoBloque.x - pacmanTam - 3) && yActual <= accesoBloque.y + tipo[accesoBloque.tipo + 3] + 3 +accesoBloque.separacion  && (xActual <= accesoBloque.x + tipo[accesoBloque.tipo + 2]) && yActual >= accesoBloque.y - pacmanTam - 3 + accesoBloque.separacion ) {
                return barreraBool = true;
            }
            barreraBool = false;
        }
    }
}