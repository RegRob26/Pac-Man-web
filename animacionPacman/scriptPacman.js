let canvas = document.getElementById("pacmanCanvas");
let ctx = canvas.getContext('2d');

/*
let canvasInicio = document.getElementById("cargaCanvas");
let ctxCarga = canvasInicio.getContext('2d');
*/

let img = new Image();
img.src = "imagenes/resource.png";
let imgTile = new Image();
imgTile.src = "imagenes/newResource2.png"

let derechaPacman = new Image();
derechaPacman.src = "imagenes/pacman_right.png"
let derechaX = 0
let derechaY = 0

let izquierdaPacman = new Image();
izquierdaPacman.src = "imagenes/pacman_left.png"
let izquierdaX = 0
let izquierdaY = 0

let arribaPacman = new Image();
arribaPacman.src = "imagenes/pacman_up.png"
let arribaX = 0
let arribaY = 0

let abajoPacman = new Image();
abajoPacman.src = "imagenes/pacman_down.png"
let abajoX = 0
let abajoY = 0

let punto = new Image();
punto.src = "imagenes/powerPellet.png"

let ready = new Image();
ready.src = "imagenes/ready.png"

let inicioJuego = new Audio("audio/game_start.mp3");

let waka1 = new Audio("audio/dot_1.mp3")
let waka2 = new Audio("audio/dot_2.mp3")

let decisionAudio = true;
let x = canvas.width;
let key = 0;
let xActual = 245;
let yActual = 125;

let marcador = 0;
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
const pacmanTam = 20;
const pacmanImgTam = 16;
const pacmanCantiMov = 3.75;
const barrera = canvas.width;
let keyBackup = 1;
let tolerancia = 15;
let c, r;
let nivel = 0;
let newTam = 13;
let aumentoTam = 10;

let pacmanTamIrrX = pacmanTam;
let pacmanTamIrrY = 12;

let cargaPantalla = false;
let vistazo = false;

document.addEventListener('keydown', manejarTecladoAbajo, false);
//document.addEventListener('keyup',manejarTecladoArriba, false);

setInterval(decisionPantallas, 40, key)

function pantallaCarga(){
    if (indice < 200){
        ctx.globalAlpha = 1-indice/200;
        ctx.drawImage(ready,0, 0, 48, 16, canvas.width/2 - 100, canvas.height/2 - 30, 216, 52);
        ctx.globalAlpha = 1;
        indice += 2;
        inicioJuego.play()
    }
}


function decisionPantallas(){
    if (cargaPantalla){
        document.body.style.backgroundColor = "yellow";
        document.location.href = "logo.html"
    }
    else{
        dibujar();
    }
}



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
    pantallaCarga();
    dibujaBarrera();
    detectarBarrera();
    dibujarMarcador();



    let xtemp = xActual
    let yTemp = yActual
    let barreraTemp = barreraBool;


    //37 izquierda, 39 derecha, 38 arriba, 40 abajo
    let tempKey = key;

    if (key === 39) {
        xActual += pacmanCantiMov;
        detectarBarrera();
        if (barreraBool){
            key = keyBackup;
        }else vistazo = false;
        xActual = xtemp;
    }
    if (key === 37) {
        xActual -= pacmanCantiMov;
        detectarBarrera();

        if (barreraBool){
            key = keyBackup;
        }
        else vistazo = false
        xActual = xtemp;
    }
    if (key === 40) {
        yActual += pacmanCantiMov;
        detectarBarrera();

        if (barreraBool){
            key = keyBackup;
        }else vistazo = false

        yActual = yTemp;
    }
    if (key === 38) {
        yActual -= pacmanCantiMov;
        detectarBarrera();
        if (barreraBool) {
            key = keyBackup;
        }else vistazo = false
        yActual =yTemp;
    }
    if(key !== keyBackup && barreraBool){
        barreraBool = !barreraBool
    }

    if (!vistazo) {

        if (key === 39) {
            ctx.drawImage(derechaPacman, derechaX + inc, derechaY, 16, 16, xActual, yActual, pacmanTam + aumentoTam, pacmanTam + aumentoTam);
            if ((xActual < x - (pacmanTam + pacmanCantiMov)) && !barreraBool) {
                xActual += pacmanCantiMov;
                inc += cantInc - 4;
            } else inc = 16;
            if (inc > 60) inc = 0;
        }

        if (key === 37) {
            ctx.drawImage(izquierdaPacman, izquierdaX + inc, 0, 16, 16, xActual, yActual, pacmanTam + aumentoTam, pacmanTam + aumentoTam);
            if ((xActual > 0) && !barreraBool) {
                xActual -= pacmanCantiMov;
                inc += cantInc - 4;
            } else inc = cantInc - 4;
            if (inc > 60) inc = 0;
        }

        if (key === 40) {
            ctx.drawImage(abajoPacman, abajoX + inc, 0, 16, 16, xActual, yActual, pacmanTam + aumentoTam, pacmanTam + aumentoTam);
            if ((yActual < y - (pacmanTam + pacmanCantiMov)) && !barreraBool) {
                yActual += pacmanCantiMov;
                inc += cantInc - 4;
            } else inc = cantInc - 4;
            if (inc > 60) inc = 0;
        }

        if (key === 38) {
            ctx.drawImage(arribaPacman, arribaX + inc, 0, 16, 16, xActual, yActual, pacmanTam + aumentoTam, pacmanTam + aumentoTam);
            if ((yActual > 0 && yActual < barrera) && !barreraBool) {
                yActual -= pacmanCantiMov;
                inc += cantInc - 4;
            } else inc = cantInc - 4;
            if (inc > 60) inc = 0;
        }
    }
    keyBackup = key;
    barreraBool = false;
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
            [{tipo: 100}, {tipo: 100}, {tipo: 100}, {tipo: 100}, {tipo: 100}, {tipo: 100}, {tipo: 100}, {tipo: 100}, {tipo: 100}, {tipo: 100}, {tipo: 100}, {tipo: 100}, {tipo: 100}, {tipo: 100}, {tipo: 100}, {tipo: 100}, {tipo: 100}, {tipo: 100}, {tipo: 100}, {tipo: 100}, {tipo: 100}, {tipo: 100}, {tipo: 100}, {tipo: 100}, {tipo: 100}, {tipo: 100}, {tipo: 100}, {tipo: 100}],
            [{tipo: 100}, {tipo: 100}, {tipo: 100}, {tipo: 100}, {tipo: 100}, {tipo: 100}, {tipo: 100}, {tipo: 100}, {tipo: 100}, {tipo: 100}, {tipo: 100}, {tipo: 100}, {tipo: 100}, {tipo: 100}, {tipo: 100}, {tipo: 100}, {tipo: 100}, {tipo: 100}, {tipo: 100}, {tipo: 100}, {tipo: 100}, {tipo: 100}, {tipo: 100}, {tipo: 100}, {tipo: 100}, {tipo: 100}, {tipo: 100}, {tipo: 100}],
            [{tipo: 1},     {tipo: 10}, {tipo: 10}, {tipo: 10,}, {tipo: 10}, {tipo: 10}, {tipo: 10}, {tipo: 10,}, {tipo: 10}, {tipo: 10}, {tipo: 10}, {tipo: 10,}, {tipo: 10}, {tipo: 8}, {tipo: 9}, {tipo: 10,}, {tipo: 10}, {tipo: 10}, {tipo: 10}, {tipo: 10,}, {tipo: 10}, {tipo: 10}, {tipo: 10}, {tipo: 10,}, {tipo: 10}, {tipo: 10}, {tipo: 10}, {tipo: 0,},],
            [{tipo: 3},    {tipo: -1}, {tipo: -1}, {tipo: -1,}, {tipo: -1}, {tipo: -1}, {tipo: -1}, {tipo: -1,}, {tipo: -1}, {tipo: -1}, {tipo: -1}, {tipo: -1,}, {tipo: -1}, {tipo: 2}, {tipo: 3}, {tipo: -1,}, {tipo: -1}, {tipo: -1}, {tipo: -1}, {tipo: -1,}, {tipo: -1}, {tipo: -1}, {tipo: -1}, {tipo: -1,}, {tipo: -1}, {tipo: -1}, {tipo: -1}, {tipo: 2,},],
            [{tipo: 3},    {tipo: -1}, {tipo: 23}, {tipo: 14,}, {tipo: 14}, {tipo: 38}, {tipo: -1}, {tipo: 23,}, {tipo: 14}, {tipo: 14}, {tipo: 14}, {tipo: 38,}, {tipo: -1}, {tipo: 2}, {tipo: 3}, {tipo: -1,}, {tipo: 23,}, {tipo: 14}, {tipo: 14}, {tipo: 14}, {tipo: 38,}, {tipo: -1}, {tipo: 23}, {tipo: 14,}, {tipo: 14}, {tipo: 38}, {tipo: -1}, {tipo: 2,},],
            [{tipo: 3},    {tipo: -1}, {tipo: 25}, {tipo: -2,}, {tipo: -2}, {tipo: 24}, {tipo: -1}, {tipo: 25,}, {tipo: -2}, {tipo: -2}, {tipo: -2}, {tipo: 24,}, {tipo: -1}, {tipo: 2}, {tipo: 3}, {tipo: -1,}, {tipo: 25}, {tipo: -2}, {tipo: -2}, {tipo: -2,}, {tipo: 24}, {tipo: -1}, {tipo: 25}, {tipo: -2,}, {tipo: -2}, {tipo: 24}, {tipo: -1}, {tipo: 2,},],
            [{tipo: 3},    {tipo: -1}, {tipo: 27}, {tipo: 20,}, {tipo: 20}, {tipo: 26}, {tipo: -1}, {tipo: 27,}, {tipo: 20}, {tipo: 20}, {tipo: 20}, {tipo: 26,}, {tipo: -1}, {tipo: 2}, {tipo: 3}, {tipo: -1,},  {tipo: 27}, {tipo: 20,}, {tipo: 20}, {tipo: 20}, {tipo: 26}, {tipo: -1}, {tipo: 27,}, {tipo: 20}, {tipo: 20}, {tipo: 26,}, {tipo: -1}, {tipo: 2},],
            [{tipo: 3},    {tipo: -1}, {tipo: -1}, {tipo: -1,}, {tipo: -1}, {tipo: -1}, {tipo: -1}, {tipo: -1,}, {tipo: -1}, {tipo: -1}, {tipo: -1}, {tipo: -1,}, {tipo: -1}, {tipo: -2}, {tipo: -2}, {tipo: -1,}, {tipo: -1}, {tipo: -1}, {tipo: -1}, {tipo: -1,}, {tipo: -1}, {tipo: -1}, {tipo: -1}, {tipo: -1,}, {tipo: -1}, {tipo: -1}, {tipo: -1}, {tipo:2,},],
            [{tipo: 3},    {tipo: -1}, {tipo: 23}, {tipo: 14,}, {tipo: 14}, {tipo: 38}, {tipo: -1}, {tipo: 23,}, {tipo: 38}, {tipo: -1}, {tipo: 23}, {tipo: 14,}, {tipo: 14}, {tipo: 14}, {tipo: 14}, {tipo: 14}, {tipo: 14,}, {tipo: 38}, {tipo: -1}, {tipo: 23,}, {tipo: 38}, {tipo: -1}, {tipo: 23}, {tipo: 14,}, {tipo: 14}, {tipo: 38}, {tipo: -1}, {tipo: 2,},],
            [{tipo: 3},    {tipo: -1}, {tipo: 27}, {tipo: 20,}, {tipo: 20}, {tipo: 26}, {tipo: -1}, {tipo: 2,}, {tipo: 3}, {tipo: -1}, {tipo: 27}, {tipo: 20,}, {tipo: 20}, {tipo: 20}, {tipo: 20}, {tipo: 20,},  {tipo: 20}, {tipo: 26,}, {tipo: -1}, {tipo: 2}, {tipo: 3}, {tipo: -1}, {tipo: 27,}, {tipo: 20}, {tipo: 20}, {tipo: 26,}, {tipo: -1}, {tipo: 2},],
            [{tipo: 3},    {tipo: -1}, {tipo: -1}, {tipo: -1,}, {tipo: -1}, {tipo: -1}, {tipo: -1}, {tipo: 2,}, {tipo: 3}, {tipo: -1}, {tipo: -1}, {tipo: -1,}, {tipo: -1}, {tipo: -1}, {tipo: -1}, {tipo: -1,}, {tipo: -1}, {tipo: -1}, {tipo: -1}, {tipo: 2,}, {tipo: 3}, {tipo: -1}, {tipo: -1}, {tipo: -1,}, {tipo: -1}, {tipo: -1}, {tipo: -1}, {tipo:2,},],
            [{tipo: 5},     {tipo: 12}, {tipo: 12}, {tipo: 12,}, {tipo: 12}, {tipo: 12}, {tipo: 12}, {tipo: 12,}, {tipo: 12}, {tipo: 12}, {tipo: 12}, {tipo: 12,}, {tipo: 12}, {tipo: 12}, {tipo: 12}, {tipo: 12,}, {tipo: 12}, {tipo: 12}, {tipo: 12}, {tipo: 12,}, {tipo: 12}, {tipo: 12}, {tipo: 12}, {tipo: 12,}, {tipo: 12}, {tipo: 12}, {tipo: 12}, {tipo: 4,},],
            [{tipo: 100}, {tipo: 100}, {tipo: 100}, {tipo: 100}, {tipo: 100}, {tipo: 100}, {tipo: 100}, {tipo: 100}, {tipo: 100}, {tipo: 100}, {tipo: 100}, {tipo: 100}, {tipo: 100}, {tipo: 100}, {tipo: 100}, {tipo: 100}, {tipo: 100}, {tipo: 100}, {tipo: 100}, {tipo: 100}, {tipo: 100}, {tipo: 100}, {tipo: 100}, {tipo: 100}, {tipo: 100}, {tipo: 100}, {tipo: 100}, {tipo: 100}]
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
            if (barrerasMatriz[nivel][c][r].tipo >= 0 && barrerasMatriz[nivel][c][r].tipo <= 99) {
                let accesoBloque = barrerasMatriz[nivel][c][r];
                let xBarrera = (r*18);
                let yBarrera = (c*18);
                accesoBloque.x = xBarrera;
                accesoBloque.y = yBarrera;
                ctx.beginPath();
                ctx.drawImage(imgTile, coord[accesoBloque.tipo][0], coord[accesoBloque.tipo][1], 7, 7, xBarrera, yBarrera, 18,18)
                //ctx.drawImage(imgTile, tipo[accesoBloque.tileF][accesoBloque.tileC][0], tipo[accesoBloque.tipo + 1], tipo[accesoBloque.tipo + 2], tipo[accesoBloque.tipo + 3], xBarrera, yBarrera + accesoBloque.separacion, tipo[accesoBloque.tipo + 2], tipo[accesoBloque.tipo + 3]);
                ctx.fillStyle = "blue";
                ctx.fill();
                ctx.closePath();
            }
            else{
                if (barrerasMatriz[nivel][c][r].tipo === -1){
                    let accesoBloque = barrerasMatriz[nivel][c][r];
                    let xBarrera = (r*18) + 4;
                    let yBarrera = (c*18) + 4;
                    accesoBloque.x = xBarrera;
                    accesoBloque.y = yBarrera;
                    ctx.beginPath();
                    ctx.drawImage(punto,0, 0, 8, 8, xBarrera, yBarrera, 6,6)
                    ctx.closePath();
                }

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
                if (accesoBloque.x < xActual + pacmanTamIrrY && accesoBloque.x + pacmanTamIrrY > xActual && accesoBloque.y < yActual + pacmanTamIrrX && pacmanTamIrrY + accesoBloque.y > yActual){
                    return barreraBool = true;
                }
                barreraBool = false;
            }
            else{
                if (accesoBloque.tipo === -1){
                    if (accesoBloque.x < xActual + pacmanTam && accesoBloque.x + pacmanTam > xActual && accesoBloque.y < yActual + pacmanTam && pacmanTam + accesoBloque.y > yActual){
                        marcador += 1;
                        accesoBloque.tipo = -2;
                        if (decisionAudio){
                            waka1.play();
                            decisionAudio = false;
                        }
                        else {
                            waka2.play()
                            decisionAudio = true;
                        }
                    }
                    barreraBool = false;
                }
            }

        }
    }
}

let fuente = new FontFace('press-start-2p-v9-latin-regular.woff', 'press-start-2p-v9-latin-regular.woff');

function dibujarMarcador(){
    ctx.font = "10px pacman";
    ctx.fillStyle="white";
    ctx.fillText("1up",15,15);

    ctx.font = "10px pacman";
    ctx.fillStyle="white";
    ctx.fillText(marcador,25,30);

    ctx.font = "12px pacman";
    ctx.fillStyle="white";
    ctx.fillText("HIGH SCORE",canvas.width/2 - 53,20);

    ctx.font = "12px pacman";
    ctx.fillStyle="white";
    ctx.fillText(marcador, canvas.width/2-5,30);

}