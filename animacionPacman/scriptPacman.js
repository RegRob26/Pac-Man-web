let canvas = document.getElementById("pacmanCanvas");
let ctx = canvas.getContext('2d');
let img = new Image();
img.src = "resource.png";
let imgTile = new Image();
imgTile.src = "newResource.png"


let x = canvas.width;
let key = 0;
let xActual = 110;
let yActual = 80;

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
const pacmanImgTam = 6;
const pacmanCantiMov = 3.75;
const barrera = canvas.width;
let keyBackup = 1;
let tolerancia = 0;
let c, r;
let nivel = 0;
let newTam = 13;
//let tipo = [21, 16, 102, 4, 36, 36, 24, 16, 76, 68, 8, 56, 16, 20, 4, 71, 21, 16, 51, 4,];

            //Barra horizontal, barra vertical, barra HyV curva, invertida de anterior


//let coord = [[315, 0], [243,0], [252,0], [297,0],[306,0]]

document.addEventListener('keydown', manejarTecladoAbajo, false);
//document.addEventListener('keyup',manejarTecladoArriba, false);
setInterval(dibujar, 60, key)

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

    if(key !== keyBackup){
        barreraBool = !barreraBool
    }

    if (key === 39) {
        ctx.drawImage(img, resourceX + inc, resourceY, pacmanTam, pacmanTam, xActual, yActual, pacmanImgTam, pacmanImgTam);
        if ((xActual < x - (pacmanTam + pacmanCantiMov)) && !barreraBool) {
            xActual += pacmanCantiMov;
            inc += cantInc - 1;
        } else inc = cantInc;
        if (inc > 60) inc = 0;
    }

    if (key === 37) {
        ctx.drawImage(img, resourceX + inc, resourceY + 58, pacmanTam, pacmanTam, xActual, yActual, pacmanImgTam, pacmanImgTam);
        if ((xActual > 0) && !barreraBool) {
            xActual -= pacmanCantiMov;
            inc += cantInc;
        } else inc = cantInc;
        if (inc > 60) inc = 0;
    }

    if (key === 40) {
        ctx.drawImage(img, resourceX + inc, resourceY + 29, pacmanTam + 3, pacmanTam + 3, xActual, yActual, pacmanImgTam + 3, pacmanImgTam + 3);
        if ((yActual < y - (pacmanTam + pacmanCantiMov)) && !barreraBool) {
            yActual += pacmanCantiMov;
            inc += cantInc;
        } else inc = cantInc;
        if (inc > 60) inc = 0;
    }

    if (key === 38) {
        ctx.drawImage(img, resourceX + inc, resourceY - 29, pacmanTam + 3, pacmanTam + 3, xActual, yActual, pacmanImgTam + 3, pacmanImgTam + 3);
        if ((yActual > 0 && yActual < barrera) && !barreraBool) {
            yActual -= pacmanCantiMov;
            inc += cantInc;
        } else inc = cantInc;
        if (inc > 60) inc = 0;
    }


    keyBackup = key;
}




/*
    Mapeado de los elementos del tile


 */



let coord = [
                [225,0], [234,0], [243,0], [252,0], [261,0], [270,0], [279,0], [288,0], [297,0], [306, 0], [315, 0], [324, 0], [333,0], [342, 0], [351, 0], [360, 0],
                [225,9], [234,9], [243,9], [252,9], [261,9], [270,9], [279,9], [288,9], [297,9], [306, 9], [315, 9], [324, 9], [333,9], [342, 9], [351, 9], [360, 9],
                [225,18], [234,18], [243,18], [252,18], [261,18], [270,18], [279,18], [288,18], [297,18], [306, 18], [315, 18], [324, 18], [333,18], [342, 18], [351, 18], [360, 18],

            ];
let barrerasMatriz =
    [
        [
           //   0               1           2           3           4           5           6           7           8               9       10              11          12          13          14      15          16           17            18          19           20          21          22          23          24          25          26          27
            [{tipo: 1},     {tipo: 10}, {tipo: 10}, {tipo: 10,}, {tipo: 10}, {tipo: 10}, {tipo: 10}, {tipo: 10,}, {tipo: 10}, {tipo: 10}, {tipo: 10}, {tipo: 10,}, {tipo: 10}, {tipo: 8}, {tipo: 9}, {tipo: 10,}, {tipo: 10}, {tipo: 10}, {tipo: 10}, {tipo: 10,}, {tipo: 10}, {tipo: 10}, {tipo: 10}, {tipo: 10,}, {tipo: 10}, {tipo: 10}, {tipo: 10}, {tipo: 0,},],
            [{tipo: 3},    {tipo: -1}, {tipo: -1}, {tipo: -1,}, {tipo: -1}, {tipo: -1}, {tipo: -1}, {tipo: -1,}, {tipo: -1}, {tipo: -1}, {tipo: -1}, {tipo: -1,}, {tipo: -1}, {tipo: 2}, {tipo: 3}, {tipo: -1,}, {tipo: -1}, {tipo: -1}, {tipo: -1}, {tipo: -1,}, {tipo: -1}, {tipo: -1}, {tipo: -1}, {tipo: -1,}, {tipo: -1}, {tipo: -1}, {tipo: -1}, {tipo: 2,},],
            [{tipo: 3},    {tipo: -1}, {tipo: 23}, {tipo: 14,}, {tipo: 14}, {tipo: 38}, {tipo: -1}, {tipo: 23,}, {tipo: 14}, {tipo: 14}, {tipo: 14}, {tipo: 38,}, {tipo: -1}, {tipo: 2}, {tipo: 3}, {tipo: -1,}, {tipo: 23,}, {tipo: 14}, {tipo: 14}, {tipo: 14}, {tipo: 38,}, {tipo: -1}, {tipo: 23}, {tipo: 14,}, {tipo: 14}, {tipo: 38}, {tipo: -1}, {tipo: 2,},],
            [{tipo: 3},    {tipo: -1}, {tipo: 25}, {tipo: -1,}, {tipo: -1}, {tipo: 24}, {tipo: -1}, {tipo: 25,}, {tipo: -1}, {tipo: -1}, {tipo: -1}, {tipo: 24,}, {tipo: -1}, {tipo: 2}, {tipo: 3}, {tipo: -1,}, {tipo: 25}, {tipo: -1}, {tipo: -1}, {tipo: -1,}, {tipo: 24}, {tipo: -1}, {tipo: 25}, {tipo: -1,}, {tipo: -1}, {tipo: 24}, {tipo: -1}, {tipo: 2,},],
            [{tipo: 3},    {tipo: -1}, {tipo: 27}, {tipo: 20,}, {tipo: 20}, {tipo: 26}, {tipo: -1}, {tipo: 27,}, {tipo: 20}, {tipo: 20}, {tipo: 20}, {tipo: 26,}, {tipo: -1}, {tipo: 2}, {tipo: 3}, {tipo: -1,},  {tipo: 27}, {tipo: 20,}, {tipo: 20}, {tipo: 20}, {tipo: 26}, {tipo: -1}, {tipo: 27,}, {tipo: 20}, {tipo: 20}, {tipo: 26,}, {tipo: -1}, {tipo: 2},],
            [{tipo: 3},    {tipo: -1}, {tipo: -1}, {tipo: -1,}, {tipo: -1}, {tipo: -1}, {tipo: -1}, {tipo: -1,}, {tipo: -1}, {tipo: -1}, {tipo: -1}, {tipo: -1,}, {tipo: -1}, {tipo: -1}, {tipo: -1}, {tipo: -1,}, {tipo: -1}, {tipo: -1}, {tipo: -1}, {tipo: -1,}, {tipo: -1}, {tipo: -1}, {tipo: -1}, {tipo: -1,}, {tipo: -1}, {tipo: -1}, {tipo: -1}, {tipo:2,},],
            [{tipo: 3},    {tipo: -1}, {tipo: 23}, {tipo: 14,}, {tipo: 14}, {tipo: 38}, {tipo: -1}, {tipo: 23,}, {tipo: 38}, {tipo: -1}, {tipo: 23}, {tipo: 14,}, {tipo: 14}, {tipo: 14}, {tipo: 14}, {tipo: 14}, {tipo: 14,}, {tipo: 38}, {tipo: -1}, {tipo: 23,}, {tipo: 38}, {tipo: -1}, {tipo: 23}, {tipo: 14,}, {tipo: 14}, {tipo: 38}, {tipo: -1}, {tipo: 2,},],
            [{tipo: 3},    {tipo: -1}, {tipo: 27}, {tipo: 20,}, {tipo: 20}, {tipo: 26}, {tipo: -1}, {tipo: 2,}, {tipo: 3}, {tipo: -1}, {tipo: 27}, {tipo: 20,}, {tipo: 20}, {tipo: 20}, {tipo: 20}, {tipo: 20,},  {tipo: 20}, {tipo: 26,}, {tipo: -1}, {tipo: 2}, {tipo: 3}, {tipo: -1}, {tipo: 27,}, {tipo: 20}, {tipo: 20}, {tipo: 26,}, {tipo: -1}, {tipo: 2},],
            [{tipo: 3},    {tipo: -1}, {tipo: -1}, {tipo: -1,}, {tipo: -1}, {tipo: -1}, {tipo: -1}, {tipo: 2,}, {tipo: 3}, {tipo: -1}, {tipo: -1}, {tipo: -1,}, {tipo: -1}, {tipo: -1}, {tipo: -1}, {tipo: -1,}, {tipo: -1}, {tipo: -1}, {tipo: -1}, {tipo: 2,}, {tipo: 3}, {tipo: -1}, {tipo: -1}, {tipo: -1,}, {tipo: -1}, {tipo: -1}, {tipo: -1}, {tipo:2,},],
            [{tipo: 5},     {tipo: 12}, {tipo: 12}, {tipo: 12,}, {tipo: 12}, {tipo: 12}, {tipo: 12}, {tipo: 12,}, {tipo: 12}, {tipo: 12}, {tipo: 12}, {tipo: 12,}, {tipo: 12}, {tipo: 12}, {tipo: 12}, {tipo: 12,}, {tipo: 12}, {tipo: 12}, {tipo: 12}, {tipo: 12,}, {tipo: 12}, {tipo: 12}, {tipo: 12}, {tipo: 12,}, {tipo: 12}, {tipo: 12}, {tipo: 12}, {tipo: 4,},]
        ]
    ]

function vistazoBarrera(coord, tipo){
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


//En esta seccion del codigo encontraremos los casos para los escenarios segun el nivel, como ahora no existe tal situacion
//se encontraran datos sobre las pruebas para la deteccion de barreras y otros casos a determinar
function dibujaEscenario() {
    dibujaBarrera();
}

function dibujaBarrera() {
    for (c = 0; c < barrerasMatriz[nivel].length; c++) {
        for (r = 0; r < barrerasMatriz[nivel][c].length; r++) {
            if (barrerasMatriz[nivel][c][r].tipo >= 0) {
                let accesoBloque = barrerasMatriz[nivel][c][r];
                let xBarrera = (r*12);
                let yBarrera = (c*12);
                accesoBloque.x = xBarrera;
                accesoBloque.y = yBarrera;
                ctx.beginPath();
                ctx.drawImage(imgTile, coord[accesoBloque.tipo][0], coord[accesoBloque.tipo][1], 7, 7, xBarrera, yBarrera, 12,12)
                //ctx.drawImage(imgTile, tipo[accesoBloque.tileF][accesoBloque.tileC][0], tipo[accesoBloque.tipo + 1], tipo[accesoBloque.tipo + 2], tipo[accesoBloque.tipo + 3], xBarrera, yBarrera + accesoBloque.separacion, tipo[accesoBloque.tipo + 2], tipo[accesoBloque.tipo + 3]);
                ctx.fillStyle = "blue";
                ctx.fill();
                ctx.closePath();
            }
        }
    }

}

function detectarBarrera() {
    for (c = 0; c < barrerasMatriz[nivel].length; c++) {
        for (r = 0; r < barrerasMatriz[nivel][c].length; r++) {
            let accesoBloque = barrerasMatriz[nivel][c][r];
            //if ((xActual >= accesoBloque.x - pacmanTam/2 - 3) && yActual <= accesoBloque.y  && (xActual <= accesoBloque.x  && yActual >= accesoBloque.y - pacmanTam/2 - 3) && accesoBloque.tipo >=0 ){
            if(accesoBloque.tipo >= 0){
/*                rect1.x < rect2.x + rect2.w &&
                rect1.x + rect1.w > rect2.x &&
                rect1.y < rect2.y + rect2.h &&
                rect1.h + rect1.y > rect2.y*/
                //if (xActual >= accesoBloque.x-newTam && yActual <= accesoBloque.y +7  && xActual <= accesoBloque.x + 7 && yActual >= accesoBloque.y -newTam+7 ){
                if (accesoBloque.x < xActual + pacmanImgTam && accesoBloque.x + 12 > xActual && accesoBloque.y < yActual + pacmanImgTam && 12 + accesoBloque.y > yActual){
                    return barreraBool = true;
                }
                barreraBool = false;
            }

        }
    }
}
