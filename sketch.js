var lion, lionImg;
var deer, deerImg;
var forest, forestImg;

var score;

var PLAY = 1;
var END = 0;
var gameState = PLAY;

var invisible_ground;
var wood, woodImg, woodGroup;

var lionRoar, lion_close;
var end_sound;
var end, endImg;



function preload() {
    lionImg = loadImage("Lion-gif-19.gif");
    deerImg = loadImage("deer.gif");

    forestImg = loadImage("forest.jpg");

    woodImg = loadImage("wood.png");

    lionRoar = loadSound("Lion-roar.mp3");
    lion_close = loadSound("LION_ROA.wav");

    end_sound = loadSound("end_lion.mp3");
    endImg = loadImage("end.png");
}

function setup() {

    createCanvas(windowWidth, windowHeight);

    // creating the background
    forest = createSprite(width / 2, 300, 250, 850);
    forest.addImage("forest", forestImg);
    forest.scale = 1.5;

    // creating the end background
    end = createSprite(width / 2, 300, 250, 850);
    end.addImage("game_end", endImg);
    end.scale = 1.5;
    end.visible = false;

    // creating the lion, the antagonist of the game
    lion = createSprite(1600, 750, 20, 20);
    lion.addImage("lion", lionImg);
    lion.scale = 1.4;
    lion.setCollider("circle", 0, 20, 150);
    lion.debug = false;

    // creating the reindeer, the protagonist of the game
    deer = createSprite(1200, 750, 20, 20);
    deer.addImage("deer", deerImg);
    deer.scale = 0.9;
    deer.setCollider("circle", 0, 20, 200);
    deer.debug = false;

    score = 0;

    // creating a ground so that the deer and lion don't fall of
    invisible_ground = createSprite(1200, 970, 1150, 20);
    invisible_ground.setCollider("rectangle", 40, 0, 1300, 30);
    invisible_ground.debug = true;
    invisible_ground.visible = false;

    woodGroup = new Group();
}

function draw() {
    background(20);

    score = score + Math.round(getFrameRate() / 60);
    console.log("score: " + score);

    if (gameState === PLAY) {
        forest.velocityX = 17;
        deer.velocityY = 25;
        lion.velocityY = 0;


        deer.collide(invisible_ground);
        lion.collide(invisible_ground);

        if (forest.x > 1200) {
            forest.x = 500;
        }

        // making the controls for the deer
        if (keyDown("space")) {
            deer.velocityY = -15;
        }

        if (deer.y < 400) {
            deer.y = 600;
        }

        // if the deer hits the obstacles 
        if (deer.isTouching(woodGroup)) {
            wood.destroy();
            lion.x = lion.x - 100;
            lion_close.play();
        }

        // if the lion hits the obstacles
        if (lion.isTouching(woodGroup)) {
            lion.velocityY = -15;
        }
        else {
            lion.y = 750;
        }

        if (frameCount % 350 === 0) {
            lionRoar.play();
        }

        if (lion.isTouching(deer)) {
            gameState = END;
            ending();
        }
    }

    if (gameState === END) {
        end.visible = true;

        lion.destroy();
        deer.destroy();
        woodGroup.destroy();
        forest.destroy();
    }


    spawnWood();

    drawSprites();
}

function spawnWood() {
    if (frameCount % 225 === 0) {
        wood = createSprite(-50, 825);
        wood.addImage(woodImg);

        wood.velocityX = 17;
        wood.scale = 0.4;
        wood.lifetime = 2200;

        wood.setCollider("rectangle", 0, 90, 550, 320);
        wood.debug = false;
        woodGroup.add(wood);
    }
}

function ending() {
    end_sound.play();
}