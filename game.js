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

function Tap(){
    switch (state) {
        case 0: //waiting
            loadLevel();
            run=true;
            state=2;
            loop=1;
            const startbutton = document.getElementById("startbutton");//document.createElementNS('http://www.w3.org/2000/svg', 'startbutton');
            startbutton.setAttributeNS(null, 'visibility', 'hidden');
            setInterval(onTimerTick, 33); // 33 milliseconds = ~ 30 frames per sec
            break;
        case 1: // loading

            break;
        case 2: // running
        
            break;
        case 3: //ended
    
    
    }
    
}

function endlevel() {
    run=false;
    const startbutton = document.getElementById("startbutton");//document.createElementNS('http://www.w3.org/2000/svg', 'startbutton');
    startbutton.setAttributeNS(null, 'visibility', 'visible');
    state=0;
}


function onTimerTick() {
    // Do stuff.
    
    if (run) {
        angle=angle+rspeed;
        if (angle==-360) { angle=0; }
        x = px + w * Math.cos(angle * Math.PI / 180);
        y = py + h * Math.sin(angle * Math.PI / 180);
        
        
        if (angle==0) {
            if (rspeed==-2) {
                w=w+5;
                h=h+5;
                
                if(loop==maxloop) { endlevel(); }
                loop=loop+1;
            }
        }
        
        const circleNode = document.getElementById("player");//document.createElementNS('http://www.w3.org/2000/svg', 'fault');
        moveGroup(circleNode,x,y);
        
        ticks=ticks-1;
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
}



function loadLevel() {
    x = 100;
    y = 100;
    loadGame();
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
