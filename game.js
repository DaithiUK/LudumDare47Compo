var svg = document.getElementsByTagName('svg')[0];
    
var run=false;

var angle = 0;
var x = 100;
var y = 100;

var w = 12.5;
var h = 12.5;

var px = 400;
var py = 400;

var ticks=0;
var maxticks=1000;

var loop=0;
var maxloop=4;

var rspeed = -2;

var state=0; //0 waiting to start 1 loading 2 running 3 ended 

var runonce=false;
var brake=false;
var brakeused=false;
var brakecount=0;
var brakemax=4;

var nextloop=false;
var seconds=0;
var bestseconds=1000;
var dispseconds=0;

var onTimerTickId; 

document.addEventListener("click", function(event) {
Tap()
});

document.addEventListener('touchstart', process_touchstart, false);
window.addEventListener("onload", loadGame);

function process_touchstart(){
     Tap()
}

document.addEventListener('keydown', function(event) {
    if(event.keyCode == 37) {
        Tap();
    }
    else if(event.keyCode == 39) {
        Tap();
    }
});

function brakePlayer() {
    if (brakeused==false) {
        brake=true;
        brakeused=true;
        brakecount=0;
    }
    
}

function Tap(){
    switch (state) {
        case 0: //waiting
            loadLevel();
            run=true;
            state=2;
            loop=1;
            const startbutton = document.getElementById("startbutton");//document.createElementNS('http://www.w3.org/2000/svg', 'startbutton');
            startbutton.setAttributeNS(null, 'visibility', 'hidden');
            onTimerTickId=setInterval(onTimerTick, 33); // 33 milliseconds = ~ 30 frames per sec
            break;
        case 1: // loading

            break;
        case 2: // running
            brakePlayer();
            break;
        case 3: //ended
    
    
    }
    
}



function endlevel() {
    run=false;
    clearInterval(onTimerTickId);
    if (seconds<bestseconds) {
            const scoreboxc = document.getElementById("currentscore");//.getElementById("scoreboxtime-8");
            const scoretextc = document.getElementById("scoreboxtime-8");

    
            bestseconds=seconds;
            const scorebox = document.getElementById("bestscore");//.getElementById("scoreboxtime-8");
            const scoretext = document.getElementById("scoreboxtime");
            scoretext.textContent=scoretextc.textContent;//bestseconds.toFixed(2);
            
            
            
            
        }
    const startbutton = document.getElementById("startbutton");//document.createElementNS('http://www.w3.org/2000/svg', 'startbutton');
    startbutton.setAttributeNS(null, 'visibility', 'visible');
    state=0;
}


function onTimerTick() {
    // Do stuff.
    
    if (run) {
        angle=angle+rspeed;
        if (angle<=-360) { angle=0; }
        x = px + w * Math.cos(angle * Math.PI / 180);
        y = py + h * Math.sin(angle * Math.PI / 180);
        
        
        if (angle < 0 && angle> -5) {
            nextloop=false;
            if (rspeed>=-10 ) {
                rspeed=rspeed-1;
            }
        
        }
        if (brake) {
            if (brakecount<brakemax) {
                if (rspeed<-2 ) {
                    rspeed=rspeed+1;
                }
                brakecount=brakecount+1;
            }
        }
        if (angle <= -355 && angle> -359 && !nextloop) {
        //if (angle==0) {
            if (rspeed==-2) {
            
                w=w+5;
                h=h+5;
                nextloop=true;
                if(loop==maxloop) { endlevel(); }
                loop=loop+1;
            }
                brake=false;
                brakeused=false;
        }
        
        const circleNode = document.getElementById("player");//document.createElementNS('http://www.w3.org/2000/svg', 'fault');
        moveGroup(circleNode,x,y);
        
        ticks=ticks+1;
        
        // update score
        seconds=ticks*0.033;
        const scorebox = document.getElementById("currentscore");//.getElementById("scoreboxtime-8");
        const scoretext = document.getElementById("scoreboxtime-8");
        dispseconds=seconds;
        scoretext.textContent=dispseconds.toFixed(2);

        
        
        if (ticks==maxticks) { endlevel();}
    }
}
var ix=0;
var iy=0;

function loadGame() {
    const player = document.getElementById("player");
    ix=parseInt(player.children[0].getAttributeNS(null, 'cx'));
    iy=parseInt(player.children[0].getAttributeNS(null, 'cy'));
    //px=px+parseInt(player.children[0].getAttributeNS(null, 'rx'))/2;
    iy=iy+parseInt(player.children[0].getAttributeNS(null, 'ry'))/2;
    
    const scorebox = document.getElementById("bestscore");//.getElementById("scoreboxtime-8");
    const scoretext = document.getElementById("scoreboxtext");
    scoretext.textContent='Best';
}



function loadLevel() {
    x = 100;
    y = 100;
    if (runonce == false) { runonce=true; loadGame(); }
    w = 12.5;
    h = 12.5;

    px = 400;
    py = 400;

    ticks=0;
    maxticks=1000;

    loop=0;
    maxloop=4;

    rspeed = -2;


    const player = document.getElementById("player");
    px=ix;
    py=iy;
    //px=px-50;
    moveGroup(player,x,y);
}

function moveGroup(group,x,y) {
    var c = group.children;
    var i;
    for (i = 0; i < c.length; i++) {
      c[i].setAttributeNS(null, 'cx', x);
      c[i].setAttributeNS(null, 'cy', y);
    }
}

function hideGroup(group) {
    var c = group.children;
    var i;
    for (i = 0; i < c.length; i++) {
      c[i].setAttributeNS(null, 'visibility', 'false');
    }
}
