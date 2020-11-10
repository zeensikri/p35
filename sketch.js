//Create variables here
var dog, happyDog, dogNor, database, foodS, foodStock;
var lastfed;
var feed, add;
var foodObj;


function preload()
{
  //load images here
  happyDog = loadImage("images/dogImg1.png");
  dogNor = loadImage("images/dogImg.png");
  milk = loadImage("images/Milk.png");
}

function setup() {
  createCanvas(500, 500);
  database = firebase.database();

  foodStock = database.ref('food');
  foodStock.on("value",readStock);
  foodObj = new Food();

  dog = createSprite(250,250,10,10);
  dog.addImage(dogNor);
  dog.scale = 0.5;


  feed = createButton("Feed the dog");
  feed.position(700,95);
  if(foodStock === 0){
  feed.mousePressed(error);
  }else{
    feed.mousePressed(feedDog)
  }


  add = createButton("Add Food");
  add.position(800,95);
  add.mousePressed(addFoods);



}


/*function draw() {  
  background(46,139,87);
  foodObj.display();

  fedtime = database.ref('FeedTime');
  fedtime.on("value", function(data){
    lastfed = data.val();
  })
  textSize(16);
  stroke(0);
  fill("white");
  text("Food Remaing :"+foodStock,350,100);
  if(lastfed>=12){
    text("LAST FED TIME  : "+lastfed%12+"PM",50,100);
  }else if(lastfed===0){
    text("LAST FED TIME : 12AM",50,100)
  }else{
    text("LAST FED TIME :"+lastfed+"AM",50,100);
  }

  drawSprites();
}*/
function draw(){
background(46, 139, 87);
//fill("black");
foodObj.display();


if(foodStock<=0){
  foodStock=0;
  dog.addImage(dogNor);
}

fedtime=database.ref('feedtime');
fedtime.on("value",function(data){
 lastfed=data.val();
})
textSize(16);
stroke(0);
fill("white");
text("Food Remaing :"+foodStock,350,100);
if(lastfed>=12){
  text("LAST FED TIME  : "+lastfed%12+"PM",50,100);
}else if(lastfed===0){
  text("LAST FED TIME : 12AM",50,100)
}else{
  text("LAST FED TIME :"+lastfed+"AM",50,100);
}
drawSprites();
}

function readStock(data){
  foodStock = data.val();
  foodObj.updateFoodStock(foodStock);
}

function addFoods(){
  foodStock++;
  database.ref('/').update({
    Food:foodStock
  })
}

function feedDog(){
  dog.addImage(happyDog);

  foodObj.updateFoodStock(foodStock-1);
  dog.addImage(happyDog);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime: hour()
  })
}

function error(){
  text("No Food Left For Pet", 400,400);
}



