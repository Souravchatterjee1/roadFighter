var myGamePiece;
var myObstacles = [];
var myScore;
var myBackground;
$(window).load(function(){
 startGame();   
})
function startGame() {
    
    
   
      
      
    myGamePiece = new component(50,70,"../images/yellowCar.jpg", 110, 440,"image");
    myBackground = new component(270, 656, "../images/track.png", 0, 0, "background");
    myScore = new component("20px", "Consolas", "black", 80, 40, "text");
    myGameArea.start();
}

var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 230;
        this.canvas.height = 680;
        this.context = this.canvas.getContext("2d");
       

       
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.frameNo = 0;
        this.interval = setInterval(updateGameArea, 20);
        },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    stop : function() {
        clearInterval(this.interval);
    }
}

function component(width, height, color, x, y, type) {
  
    this.type = type;
        if (type == "image" || type == "background"||type=="obs") {
        
        this.image = new Image();
        this.image.src = color;
    }
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;    
    this.x = x;
    this.y = y;    
    this.update = function() {
       ctx = myGameArea.context;
        
        
     
        
        if (this.type == "image") {
            ctx.drawImage(this.image, 
                this.x, 
                this.y,
                this.width, this.height);
        }
        if (this.type == "background") {
       
            ctx.drawImage(this.image, 
                this.x, 
                this.y - this.height,
                this.width, this.height);
        }
        
        if (this.type == "text") {
            
            ctx.font = this.width + " " + this.height;
            ctx.fillStyle = color;
            ctx.fillText(this.text, this.x, this.y);
        } 
       if(this.type=="obs") {
            ctx.drawImage(this.image, 
                this.x, 
                this.y,
                this.width,this.height);
        }
        
     
    
    }
    this.newPos = function() {
        this.x += this.speedX;
        this.y += this.speedY;        
    }
    this.crashWith = function(otherobj) {
        var myleft = this.x;
        var myright = this.x + (this.width);
        var mytop = this.y;
        var mybottom = this.y + (this.height);
        var otherleft = otherobj.x;
        var otherright = otherobj.x + (otherobj.width);
        var othertop = otherobj.y;
        var otherbottom = otherobj.y + (otherobj.height);
        var crash = true;
        if ((mybottom < othertop) || (mytop > otherbottom) || (myright < otherleft) || (myleft > otherright)) {
            crash = false;
        }
        return crash;
    }
}

function updateGameArea() {
  
    var y, width, gap, minWidth, maxWidth, minGap, maxGap;
    for (i = 0; i < myObstacles.length; i += 1) {
        if (myGamePiece.crashWith(myObstacles[i])) {
            myGameArea.stop();
            return;
        } 
    }
    myGameArea.clear();
    myGameArea.frameNo += 1;
    if (myGameArea.frameNo == 1 || everyinterval(150)) {
        y = myGameArea.canvas.height;
        minWidth = 00;
        maxWidth = 180;
        width = Math.floor(Math.random()*(maxWidth-minWidth+1)+minWidth);
        minGap = 50;
        maxGap = 200;
        gap = Math.floor(Math.random()*(maxGap-minGap+1)+minGap);
        myObstacles.push(new component(50,70, "../images/yellowCar.jpg", width, width-50,"obs"));
        myObstacles.push(new component(50,70,  "../images/yellowCar.jpg",  width - gap, width-40,"obs"));
    }
    for (i = 0; i < myObstacles.length; i += 2) {
        myObstacles[i].speedY = 2;
        myObstacles[i].newPos();
        myObstacles[i].update();
    }
    myScore.text="SCORE: " + myGameArea.frameNo;
    myScore.update();
    myGamePiece.newPos();    
    myGamePiece.update();
}

function everyinterval(n) {
    if ((myGameArea.frameNo / n) % 1 == 0) {return true;}
    return false;
}

function moveup() {
    myGamePiece.speedY = -2; 
}

function movedown() {
    myGamePiece.speedY = 2; 
}

function moveleft() {
    myGamePiece.speedX = -2; 
}

function moveright() {
    myGamePiece.speedX = 2; 
}

function clearmove() {
    myGamePiece.speedX = 0; 
    myGamePiece.speedY = 0; 
}