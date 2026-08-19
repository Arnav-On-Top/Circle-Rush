var gameArea=document.getElementById("gameArea");
var ScoreText=document.getElementById("score");
var timeText=document.getElementById("time");
var startButton=document.getElementById("startButton");
var gameOver=document.getElementById("gameOver");
var finalScore=document.getElementById("finalScore");
var restartButton=document.getElementById("restartButton");
var score=0;
var time=30;
var gameRunning=false;
var timer;
var circles=[];
startButton.addEventListener("click", function(){
    startGame();
});
restartButton.addEventListener("click", function() {
    startGame();
});
function startGame() {
    score=0;
    ScoreText.innerText=score;
    time=30;
    timeText.innerText=time;
    gameOver.style.display="none";
    gameArea.innerHTML="";
    circles=[];
    gameRunning=true;
    createCircle();
    createCircle();
    createCircle();
    createCircle();
    createCircle();
    createCircle();
    clearInterval(timer);
    timer=setInterval(function(){
        time=time-1;
        timeText.innerText=time;
        if (time<=0) {
            endGame();
        }
    }, 1000);
}
function createCircle() {
    var circle=document.createElement("div");
    circle.classList.add("circle");
    var randomColor=Math.floor(Math.random()*4);
    if (randomColor==0) {
        circle.classList.add("green");
    }
    if (randomColor==1) {
        circle.classList.add("blue");
    }
    if (randomColor==2) {
        circle.classList.add("yellow");
    }
    if (randomColor==3) {
        circle.classList.add("red");
    }
    var x=Math.random()*(gameArea.clientWidth-50);
    var y=Math.random()*(gameArea.clientHeight-50);
    circle.style.left=x+"px";
    circle.style.top=y+"px";
    var speedX=Math.random()*4-2;
    var speedY=Math.random()*4-2;
    if (speedX==0) {
        speedX=1;
    }
    if (speedY==0) {
        speedY=1;
    }
    gameArea.appendChild(circle);
    var circleInfo={
        element: circle,
        x: x,
        y: y,
        speedX: speedX,
        speedY: speedY,
        moving: true
    };
    circles.push(circleInfo);
    circle.addEventListener("click", function() {
        catchCircle(circleInfo);
    });
    circle.addEventListener("mouseenter", function() {
        circleInfo.moving=false;
    });
    circle.addEventListener("mouseleave", function() {
        circleInfo.moving=true;
    });
    moveCircle(circleInfo);
}
function moveCircle(circleInfo) {
    if (gameRunning==false) {
        return;
    }
    if (circleInfo.moving==true) {
        circleInfo.x=circleInfo.x+circleInfo.speedX;
        circleInfo.y=circleInfo.y+circleInfo.speedY;
        if (circleInfo.x<=0) {
            circleInfo.speedX=circleInfo.speedX* -1;
        }
        if (circleInfo.x >= gameArea.clientWidth-40) {
            circleInfo.speedX=circleInfo.speedX* -1;
        }
        if (circleInfo.y<=0) {
            circleInfo.speedY=circleInfo.speedY*-1;
        }
        if (circleInfo.y>=gameArea.clientHeight-40) {
            circleInfo.speedY=circleInfo.speedY*-1;
        }
        circleInfo.element.style.left=circleInfo.x+"px";
        circleInfo.element.style.top=circleInfo.y+"px";
    }
    requestAnimationFrame(function() {
        moveCircle(circleInfo);
    });
}
function catchCircle(circleInfo) {
    if (gameRunning==false) {
        return;
    }
    score=score+1;
    ScoreText.innerText=score;
    circleInfo.element.remove();
    var position=circles.indexOf(circleInfo);
    circles.splice(position, 1);
    createCircle();
}
function endGame() {
    gameRunning=false;
    clearInterval(timer);
    finalScore.innerText=score;
    gameOver.style.display="block"
}