

var cv = document.getElementById("tablero");
var game = cv.getContext("2d");

var data = [];
var fichaPosX = 0;

for (let i = 0; i < 30; i++){
    let fila = []
    for(let a = 0; a < 25; a++){
        fila.push(0);
    }
    data.push(fila);
}
console.log(data);


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


async function juego(){
    var i = 0
    while(true){
        game.beginPath();
        if( i != 0){
            game.fillStyle = "grey";
            game.clearRect(0, 20 * (i-1) , 500, 20);
        }
        game.fillStyle = "black";
        game.fillRect(fichaPosX, 20*i , 100, 20);
        game.stroke();
        
        result = comprobarColision(fichaPosX, 20*(i+1));
        
        if (result){
            rellenar(fichaPosX,20*i);
            i = 0;
        }
        if(i == 30){
            rellenar(fichaPosX,20*i);
            console.log(data)
            i = 0
        }else{
            i += 1
        }
        await sleep(300);
    }
}
function rellenar(x, y){
    posY = (y / 20);
    for(let i = 0; i < 5; i++){
        posX = (x / 20) + i;
        data[posY][posX] = 1;
    }
}
function comprobarColision(x, y){
   posY = (y / 20);
   if(posY == 30){
        return true;
   }
   for(let i = 0; i < 5; i++){
        posX = (x / 20) + i;     
        if(data[posY][posX] == 1){
            return true;
        }
   }
   return false;
}

function lanzarFicha(){
}
window.onload = function() {
    document.addEventListener('keydown', function (event){
        if(event.key == 'ArrowRight'){
            fichaPosX+=20;
        }
        console.log(event.key)
    })
}


juego();