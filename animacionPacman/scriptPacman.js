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
let xBarrera = 150;
let yBarrera = 50;
let anchuraBarrera = 20;
let alturaBarrera = 3;
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
let barrerasMatriz = [[
                        [{estado: 1, separacion: 0}, {estado: 1, separacion: 0}, {estado: 1, separacion: 0},
                        {estado: 0, separacion: 0}, {estado: 0, separacion: 0}, {estado: 0, separacion: 0}],
                        [{estado: 0}, {estado: 0}, {estado: 0}, {estado: 0}, {estado: 0}, {estado: 0}],
                        [{estado: 0}, {estado: 0}, {estado: 0}, {estado: 0}, {estado: 0}, {estado: 0}]
]

];

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
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    dibujaBarrera();
    detectarBarrera();
    console.log("keys", key, keyBackup);

    if (key === 39) {
        ctx.drawImage(img, resourceX + inc, resourceY, pacmanTam, pacmanTam, xActual, yActual, pacmanTam, pacmanTam);
        if ((xActual < x - (pacmanTam + pacmanCantiMov)) && !barreraBool) {
            xActual += pacmanCantiMov;
            inc += cantInc - 1;
        } else inc = cantInc;
        if (inc > 60) inc = 0;
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
    /*    for (let i = 0; i<3;i++){
            ctx.beginPath();
            ctx.rect(xBarrera*i, yBarrera, anchuraBarrera, alturaBarrera);
            ctx.fillStyle = "white";
            ctx.fill();
            ctx.closePath();
        }*/
    console.log("barreralenght", barrerasMatriz[nivel].length);
    for (c = 0; c < barrerasMatriz[nivel].length; c++) {
        console.log("CLENGHT", barrerasMatriz[nivel][c].length)

        for (r = 0; r < barrerasMatriz[nivel][c].length; r++) {
            console.log("c,r", c,r);
            console.log(barrerasMatriz[nivel][c][r].estado);
            if (barrerasMatriz[nivel][c][r].estado !== 0) {
                let xBarrera = (r * (anchuraBarrera + barrerasMatriz[nivel][c][r].separacion));
                let yBarrera = (c * (alturaBarrera + barrerasMatriz[nivel][c][r].separacion));
                barrerasMatriz[nivel][c][r].x = xBarrera;
                barrerasMatriz[nivel][c][r].y = yBarrera;
                ctx.beginPath();
                ctx.drawImage(img, 21, 16, 19, 4, xBarrera, yBarrera, anchuraBarrera, alturaBarrera);
                //ctx.rect(xBarrera, yBarrera, anchuraBarrera, alturaBarrera);
                ctx.fillStyle = "blue";
                ctx.fill();
                ctx.closePath();
            }
        }
    }

}

function detectarBarrera() {
    console.log(xActual, yActual, yBarrera + alturaBarrera, xBarrera + anchuraBarrera)
    if ((xActual >= xBarrera - pacmanTam - 3) && yActual <= yBarrera + alturaBarrera + 3 && (xActual <= xBarrera + anchuraBarrera) && yActual >= yBarrera - pacmanTam - 3) {
        return barreraBool = true;
    }
    barreraBool = false;
}