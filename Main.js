var isChromium = window.chrome,
    winNav = window.navigator,
    vendorName = winNav.vendor,
    isOpera = winNav.userAgent.indexOf("OPR") > -1,
    isIEedge = winNav.userAgent.indexOf("Edge") > -1,
    isIOSChrome = winNav.userAgent.match("CriOS");


var input;
var imgX;
var imgY;
var myfont;
var s;
var currentStr;
var ready;
var readyP;
var placeHolderTXT = '';
var States = {
  0: "Start",
  1: "1",
  2: "2",
  3: "4",
  10: "LOSER"
}
var anarchy;
var karl;
var currentState = "Start";
function txtBox(txt, ding){
  this.x=width/2;
  this.y=height/4;
  this.text= txt || "ANARCHY +1";
  this.h=0;
  this.alpha= 1;
  this.rot=0.4;
  this.num = .05;
  this.played = false;
  this.sound = ding || 0;
  this.c = null;
  this.ready = false;
  this.init = function(){
    if (Math.random()>= .5){
      this.rot = -.4
      this.x = width/4 - 20;
    } else {
      this.x = width*.75 + 20
    }
  }
  this.display = function(){
    if (!this.ready) {return;}
    if (!this.played && this.sound){
      this.played = true;
      this.sound.setVolume(.1);
      this.sound.play();
    }
    push()
    this.c = color('rgba(255, 255, 255,'+this.alpha+')');
    console.log(this.alpha)
    fill(this.c);
    textSize(20)
    rectMode(CENTER)
    textSize(25)
    textAlign(CENTER)
    translate(this.x,this.y)
    rotate(this.rot)
    text(this.text,0,0)
    if (frameCount % 2 == 0) {
      this.alpha = lerp(1,0,this.num)
      this.y--;
      if (this.num < .89){
        this.num += .05;
      } else {
        this.num = 1;
      }
    }
    pop()
  }
}
function preload(){
  img1 = loadImage('img/COMMUNISM.png');
  s = loadSound('song/propaganda.mp3');
  ding = loadSound('song/boom.wav')
}
function setup() {
  // Sets the screen to be 640 pixels wide and 360 pixels high

  var t = createCanvas(700, 580);
  imgX = width/2;
  imgY = height/2;
  input = new CanvasInput({
  canvas: document.getElementById('defaultCanvas0'),
  fontSize: 25,
  fontFamily: 'console',
  fontColor: 'white',
  fontWeight: 'bold',
  width: 660,
  padding: 8,
  borderWidth: 1,
  borderColor: '#000',
  borderRadius: 3,
  boxShadow: '0px 0px 0px #fff',
  innerShadow: '0px 0px 0px rgba(0, 0, 0, 0.5)',
  placeHolder: '...',
  x: 10,
  y: height-45,
  backgroundColor: 'black',

});
  currentStr = 'a';
  txtCycle("YOU MUST RESCUE THE GENTLE LABORER FROM HIS PLIGHT",
    function(s,r) { if (r) {txtCycleP("RUN AWAY or RESCUE")}}); // TODO: haha wow this is bad, make it its own function or somethin
  noSmooth();
  s.setVolume(0.2);
  s.loop();
  anarchy = new txtBox("+1 Anarchy", ding);
  anarchy.init();
  karl = new txtBox("A Spectre Is Haunting...", ding);
  karl.init();
}
var beetNUM = 10;
function draw() {
  background(51);
  noSmooth();
  input.render();
  input.onsubmit(function(){
    if (!ready){return;}
    comradeBonuses();

    if (currentState == States[0]) // TODO FUNCTIONS MY DUDE USE THEM
    {
      switch (input.value()) {
        case "RESCUE":
        txtCycle("THE CAPITALISTS ARE COMING, WHAT WILL YOU DO?",
          function(s,r) { if (r) {txtCycleP("STEAL THEIR LAND or CONVERT THEM")}});

            currentState = 1
          break;
        case "RUN AWAY":
            txtCycle("YOU & YOUR COMRADES ARE FORCED TO LABOR FOR THE REST OF YOU LIVES :(", function (s,r) {
              if (r){txtCycleP("TYPE REDUCATE")}
            });
            currentState = "LOSER"
          break;
        default:
          break;

      }


    } else if (currentState == States[1]){
      switch (input.value()) {
        case "CONVERT THEM":

            txtCycle("THE CAPITALISTS SEE THE LIGHT AND FORESAKE THEIR PROPERTY FOR THE MOTHERLAND", // TODO: hahahahaha
              function(s,r) {if (r) { placeHolderTXT = ''; setTimeout(function(){
                txtCycle("DO YOU WANT TAKE OVER THE GREEDY AMERICAN IMPERIALISTS?",
                function (s,r){if (r) txtCycleP("YEA BOI, or NO")})}, 1200)}});

            currentState = 2
          break;
        case "STEAL THEIR LAND":
            txtCycle("THE CAPITALISTS GET ANGRY AND CALL THE POLICE, YOU ARE FOREVER IMPRISONED", function (s,r) {
              if (r){txtCycleP("TYPE REDUCATE")}});
            currentState = "LOSER"
        default:
        //  txtCycle("THE CAPITALISTS ARE COMING, WHAT WILL YOU DO?",
            //function(s,r) { if (r) {txtCycleP("STEAL THEIR LAND or CONVERT THEM")}});
          break;
    }
  }else if (currentState == States[2]){
    switch (input.value()) {
      case "YEA BOI":
        txtCycle("THE AMERICANS ARE NO MATCH FOR THE MOTHERLAND!!!!",
        function(s,r) { if (r) {placeHolderTXT = ''; setTimeout(function(){
          txtCycle("GLOBAL FULLY AUTOMATED COMMUNISM IS ACHIEVED ***CONGRATS COMRADE***")}, 1200)}});
        break;
      case "NO":
        txtCycle("AMERICA ENGAGES IN A COLD WAR, AND THE GLORIUS MOTHERLAND SLOWLY FALLS, YOU LOSE", function (s,r) {
          if (r){txtCycleP("TYPE REDUCATE")}
        });
        placeHolderTXT = ""
        currentState = "LOSER"
      default:
      break;
    }
  }
  input.value('');
  })

  fill(120)
  textFont('console');
  textAlign(CENTER)
  textSize(100)
  text("COMRADE CONQUEST", (.5*width) ,100)
  imageMode(CENTER)
  image(img1, imgX,imgY,400,400);

  if (frameCount % 30 == 0) {
    imgY += beetNUM;
    beetNUM = -beetNUM;
  }
  textSize(32)
  rectMode(CENTER)
  textLeading(25);
  text(placeHolderTXT, (.5*width) ,460) // TODO: MAKE INTO FUNCTIONS
  if (isChromium){
    text(currentStr, (.5*width) ,500, 640, 65)
  } else {
    text(currentStr, (.5*width) ,500, 640, 80)
  }

  anarchy.display();
  karl.display();
}
function txtCycle(_str1,callback){
  callback = callback || 0;
  var i = 0;
  var str1 = _str1;
  var str2;
  ready = false;
  var consoleTyper = setInterval(function () {
            if (i != str1.length) {
                i += 1;
                str2 = str1.substr(0, i);
            }
            else
            {
             clearInterval(consoleTyper);
             ready = true;
             i = 0;

            }
            if (callback){callback(str2, ready)}

            currentStr = str2;

        }, 40);
}

function txtCycleP(_str1,callback){
  callback = callback || 0;
  var i = 0;
  var str1 = _str1;
  var str2;
  readyP = false;
  var consoleTyper = setInterval(function () {
            if (i != str1.length) {
                i += 1;
                str2 = str1.substr(0, i);
            }
            else
            {
             clearInterval(consoleTyper);
             ready = true;
             i = 0;

            }
            if (callback){callback(str2, ready)}

            placeHolderTXT = str2;

        }, 50);
}



function comradeBonuses(){
  switch (input.value()) {
    case "CONQUER BREAD":
      anarchy.ready = true;
      break;
    case "KARL MARX":
      karl.ready = true;
      break;
    case "REDUCATE":
      if (currentState != States[10]) {return;}
      currentState = "Start"
      txtCycle("YOU MUST RESCUE THE GENTLE LABORER FROM HIS PLIGHT",
        function(s,r) { if (r) {txtCycleP("RUN AWAY or RESCUE")}});
    default:

  }
}
