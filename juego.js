// Variables Imagenes
var bird = new Image()
bird.src = "./Img/personaje.png"

var suelo = new Image()
suelo.src = "./Img/suelo.png"

var fondo = new Image()
fondo.src = "./Img/fondo.png"

var obsArriba = new Image()
obsArriba.src = "./Img/obsArriba.png"

var obsAbajo = new Image()
obsAbajo.src = "./Img/obsAbajo.png"

var obstaculos = new Array()

//VARIABLES AUDIOS
var punto = new Audio()
punto.src = "audios/punto.mp3"

var contexto = document.getElementById('lienzojuego')
var ctx = contexto.getContext("2d")
var WIDTH = 300
var HEIGHT = 600
var CANVAS_WIDTH = 300
var CANVAS_HEIGHT = 600
contexto.width = WIDTH
contexto.height = HEIGHT
var FPS = 60
var gravedad = 1.5
var score = 0

obstaculos[0] = {
   x: contexto.width,
   y: 0
}

var personaje = {
   x:50,
   y:150,
   w:50,
   h:50
}

//Control
function keyDown()
{
   personaje.y -= 25
}
resize()
function resize()
{
   CANVAS_HEIGHT = window.innerHeight;
   CANVAS_WIDTH = window.innerWight;
   contexto.width = WIDTH
   contexto.height = HEIGHT

   contexto.style.height = "" + CANVAS_HEIGHT + "px";
   //contexto.style.width = ""+CANVAS_WIDTH+"px";
}

setInterval(loop,1000/FPS)
function loop(){
   ctx.clearRect(0,0,300,600)
   //Fondo
   ctx.drawImage(fondo,0,0)
   ctx.drawImage(suelo,0, contexto.height - suelo.height)
   //Personaje
   ctx.drawImage(bird, personaje.x, personaje.y,personaje.w, personaje.h)
   //Obstaculos
   for(var i = 0; i < obstaculos.length; i++)
   {  
      var constante = obsArriba.height + 110
      ctx.drawImage(obsArriba,obstaculos[i].x,obstaculos[i].y)
      ctx.drawImage(obsAbajo,obstaculos[i].x,obstaculos[i].y + constante)
      obstaculos[i].x--
      if(obstaculos[i].y + obsArriba.height < 80)
      {
         obstaculos[i].y = 0
      }
      if(obstaculos[i].x == 75)
      {
         obstaculos.push({
            x: contexto.width,
            y: Math.floor(Math.random()*obsArriba.height) - obsArriba.height
         })
      }
      //Colisiones
      console.log(personaje.x + personaje.w)
      if( personaje.y + personaje.h >= contexto.height - suelo.height ||
         ((personaje.x + personaje.w >= obstaculos[i].x &&
            personaje.x <= obstaculos[i].x + obsArriba.width) &&
               (personaje.y <= obstaculos[i].y + obsArriba.height || 
                  personaje.y + personaje.h >= obstaculos[i].y + constante))
         )
      {
         location.reload()
         
      }
      if(obstaculos[i].x == personaje.x)
      {
         score++
         punto.play()
      }

     }
   //Condiciones
   personaje.y += gravedad
   ctx.fillStyle = "rgba(0,0,0,1)"
   ctx.font = "25px Arial"
   ctx.fillText("Score: " + score, 10,contexto.height - 40)
}

//eventos
window.addEventListener("resize", resize)
window.addEventListener("keydown",keyDown)