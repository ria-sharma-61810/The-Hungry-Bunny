const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var rope, fruit, ground;
var fruit_con;
var fruit_con_2;
var mutebtn;
var bg_img,bg_sound;
var food;
var rabbit;
var air;
var balloon;
var knife_sound;
var crunch;
var button;
var bunny;
var blink, eat, sad,sad_sound;

function preload() {
  bg_img = loadImage('background.png');
  food = loadImage('melon.png');
  rabbit = loadImage('Rabbit-01.png');;
  blink = loadAnimation("blink_1.png", "blink_2.png", "blink_3.png");
  eat = loadAnimation("eat_0.png", "eat_1.png", "eat_2.png", "eat_3.png", "eat_4.png");
  sad = loadAnimation("sad_1.png", "sad_2.png", "sad_3.png");
  bg_sound = loadSound("cool_background_music.mp3")
  sad_sound = loadSound("sad.wav")
  knife_sound = loadSound("knife_cutting_sound.mp3")
  crunch = loadSound("crumch.mp3")
  air = loadSound("air.mp3")
  

  blink.playing = true;
  eat.playing = true;
  sad.playing = true;
  sad.looping = false;
  eat.looping = false;
}

function setup() {
  frameRate(80);
  var isMobile = /iPhone |  iPad | Android /i.test(navigator.userAgent)
  if(isMobile){
    canW = displayWidth
    canH = displayHeight
    createCanvas(displayWidth + 50,displayHeight)
  }
  else{
    canW = windowWidth
    canH = windowHeight
    createCanvas(windowWidth, windowHeight)
  }

  engine = Engine.create();
  world = engine.world;
  mutebtn = createImg("soundbtn.png")
  mutebtn.position(440,20)
  mutebtn.size(50,50) 
  mutebtn.mouseClicked(soundMute)
  button = createImg('cut_btn.png');
  button.position(220, 30);
  button.size(50, 50);
  button.mouseClicked(drop);
  bg_sound.play()
  bg_sound.setVolume(0.1)

  blink.frameDelay = 20;
  eat.frameDelay = 20;
  bunny = createSprite(50, canH-90, 100, 100);
  bunny.scale = 0.2;
  sad.frameDelay = 20;

  bunny.addAnimation('blinking', blink);
  bunny.addAnimation('eating', eat);
  bunny.addAnimation('crying', sad);
  bunny.changeAnimation('blinking');
  //bunny.changeAnimation('crying');
  

  rope = new Rope(6.5, { x: 245, y: 30 });
  rope1 = new Rope(7, { x: 50, y: 50 });
  rope2 = new Rope(7, { x: 400, y: 150 });
  ground = new Ground(displayWidth/2, canH-20, displayWidth, 20);

  fruit = Bodies.circle(300, 300, 20);
  Matter.Composite.add(rope.body, fruit);
  scissor1 = createImg("cut_btn.png")
  scissor1.size(50, 50)
  scissor1.position(50, 50)
  scissor1.mouseClicked(drop1)
  scissor2 = createImg("cut_btn.png")
  scissor2.size(50, 50)
  scissor2.position(400, 150)
  scissor2.mouseClicked(drop2)
  fruit_con = new Link(rope, fruit);
  fruit_con1 = new Link(rope1, fruit);
  fruit_con2 = new Link(rope2, fruit);

  balloon = createImg('balloon.png')
  balloon.position(10,50)
  balloon.size(50,90)
  balloon.mouseClicked(airBlow)

  rectMode(CENTER);
  ellipseMode(RADIUS);
  imageMode(CENTER);

}

function draw() {
  background(51);
  
  image(bg_img, width / 2, height / 2, displayWidth + 90, displayHeight);
  if (fruit != null) {
    image(food, fruit.position.x, fruit.position.y, 70, 70);
  }
  rope.show();
  rope1.show();
  rope2.show();
  Engine.update(engine);
  ground.show();

  drawSprites();
  if (collided(fruit, bunny) == true) {
    bunny.changeAnimation('eating')
    crunch.play()
  }
  if (collided(fruit, ground.body) == true) {
    bunny.changeAnimation('crying')
    sad_sound.play()
    fruit = null
  }
 
}


function drop() {
  rope.break();
  fruit_con.detach();
  fruit_con = null;
  knife_sound.play()
  knife_sound.setVolume(0.1)
}
function drop1() {
  rope1.break();
  fruit_con1.detach();
  fruit_con1 = null;
  knife_sound.play()
  knife_sound.setVolume(0.1)
}
function drop2() {
  rope2.break();
  fruit_con2.detach();
  fruit_con2 = null;
  knife_sound.play()
  knife_sound.setVolume(0.1)
}

function collided(fru, bun) {
  if (fru != null) {
    var distance = dist(fru.position.x, fru.position.y, bun.position.x, bun.position.y)
    if (distance <= 190) {
      World.remove(engine.world, fruit)
      fruit = null
      return (true)
    }
    else {
      return (false)
    }
  }

}

function airBlow(){
  Matter.Body.applyForce(fruit, {x:0,y:0}, {x:-0.1, y:0})
  air.play()
}

function soundMute(){
  if(bg_sound.isPlaying()){
    bg_sound.stop()
  }
  else{
    bg_sound.play()
  }
}
