var svg = document.getElementsByTagName('svg')[0];
    
var run=false;
document.addEventListener("click", function(event) {
run=true;
});

document.addEventListener('touchstart', process_touchstart, false);

function process_touchstart(){
     run=true;
}


document.addEventListener('keydown', function(event) {
    if(event.keyCode == 37) {
        alert('Left was pressed');
        run=true;
    }
    else if(event.keyCode == 39) {
        alert('Right was pressed');
        run=false;
    }
});

setInterval(onTimerTick, 33); // 33 milliseconds = ~ 30 frames per sec
 var x=0;
function onTimerTick() {
    // Do stuff.
    if (run) {
        const startbutton = document.getElementById("startbutton");//document.createElementNS('http://www.w3.org/2000/svg', 'startbutton');
        startbutton.setAttributeNS(null, 'visibility', 'hidden');
        hideGroup(startbutton);
        x=x+10;
        const circleNode = document.getElementById("player");//document.createElementNS('http://www.w3.org/2000/svg', 'fault');
        circleNode.setAttributeNS(null, 'cx', '50');
        circleNode.setAttributeNS(null, 'cy', '50');
        circleNode.setAttributeNS(null, 'r', '40');
        circleNode.setAttributeNS(null, 'fill', 'blue');
        
        moveGroup(circleNode,x,50);
        circleNode.style.cx=x;
    }
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
