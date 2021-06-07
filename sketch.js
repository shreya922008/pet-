var dog,sadDog,happyDog, database,firebase;
var foodS,foodStock;
var addFood;
var foodObj;
var fedtime,lastFed,addFood,feed



function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  feed=createButton("feed the doggy")
  feed.position(700,95)
  feed.mousePressed(feedDog) 

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

}

function draw() {
  background(46,139,87);
  foodObj.display();

 fedtime=database.ref("FeedTime")
 fedtime.on("value",function(data){
   lastFed=data.val()
 })
 if(lastFed >= 12){
  fill ("black")
  textSize(20)
  text("Last Fed :" + lastFed + "PM", 300,30 );
 }else if (lastFed == 0){
  fill ("black")
  textSize(20)
  text("Last Fed : 12 AM" , 300,30 );
 }else{
  fill ("black")
  textSize(20)
  text("Last Fed :" + lastFed + "AM", 300,30 );
 }
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


function feedDog(){
  dog.addImage(happyDog);

  //write code here to update food stock and last fed time

}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}
