counter = 0;
scrcounter = 0;
score = 0;
var scoreint;
var svgns = "http://www.w3.org/2000/svg";

function loadmain(size, time, lvl) {
    document.getElementsByClassName("maintime")[lvl-1].innerHTML = "Time: " + time;

    mainsvgs = document.getElementsByClassName("mainsvgs")[lvl-1];
    maincirc = document.createElementNS(svgns, "circle");
    maincirc.setAttribute("id", "maingencircle");
    maincirc.setAttribute("cx", mainsvgs.clientWidth*0.5);
    maincirc.setAttribute("cy", mainsvgs.clientHeight*0.5);
    maincirc.setAttribute("r", mainsvgs.clientWidth*size);
    maincirc.setAttribute("style", "stroke: black; stroke-width: 2; fill: white;");
    mainsvgs.appendChild(maincirc);

}

function timer(secs,crtlvl) {
    element = document.getElementById("timer");
    document.getElementById("lvl").innerHTML = "level " + crtlvl;
    if (document.getElementById("reset").hasAttribute("onclick")) {
        document.getElementById("reset").removeAttribute("onclick");
        document.getElementById("reset").setAttribute("onclick", "resetnext('reset',"+crtlvl+")");
    }
    else {
        document.getElementById("reset").setAttribute("onclick", "resetnext('reset',"+crtlvl+")");
    }
    timerinterval = setInterval(intval, 1000);
    function intval() {
        secs-=1;
        mins = Math.floor(secs/60);
        vissecs = secs-60*mins;
        if (secs==0) {
            resetnext("retry",crtlvl);
            element.innerHTML = mins + ":0" + vissecs;
        }
        else if (vissecs >= 0 && vissecs < 10) {
            element.innerHTML = mins + ":0" + vissecs;
        }
        else {
            element.innerHTML = mins + ":" + vissecs;
        }
    }
}

function circleGen(size,amount,nxtlvl,scrmulti) {
    document.getElementById("main").style.display = "none";
    document.getElementById("game").style.display = "block";
    svg = document.getElementById("circles");
    score += scrcounter*scrmulti;
    document.getElementById("score").innerHTML = "Score: " + score;
    function scoreintval() {
        if (scrcounter <= 0) {
        clearInterval(scoreint);
        }
        else {
        scrcounter-=10;
        }
    }
    if (typeof scoreint != "undefined" || typeof scoreint != null) {
        clearInterval(scoreint);
    }
    scrcounter = 500;
    if (document.getElementById("result").style.display == "flex") {
        document.getElementById("result").style.display = "none";
    }
    if (document.getElementById("gencircle")) {
        document.getElementById("gencircle").remove();
    }
    if (counter < amount) {
        scoreint = setInterval(scoreintval, 100);
        circ = document.createElementNS(svgns, "circle");
        circ.setAttribute("id", "gencircle");
        circ.setAttribute("class", counter);
        circ.setAttribute("cx", Math.floor((Math.random()*(svg.clientWidth*0.84))+svg.clientWidth*0.09));
        circ.setAttribute("cy", Math.floor((Math.random()*(svg.clientHeight*0.57))+svg.clientHeight*0.09));
        if (size == "rand") {
            circ.setAttribute("r", Math.floor((Math.random()*(svg.clientWidth*0.04))+svg.clientWidth*0.02));
        }
        else {
            circ.setAttribute("r", svg.clientWidth*size);
            counter++;
        }
        circ.setAttribute("style", "stroke: black; stroke-width: 2; fill: white;");
        circ.addEventListener("click", () => circleGen(size,amount,nxtlvl,scrmulti));
        svg.appendChild(circ);
    }
    else {
        resetnext("next",nxtlvl);
    }
}

function resetnext(action, lvl) {
    console.log("hello");
    clearInterval(scoreint);
    clearInterval(timerinterval);
    score = 0;
    counter = 0;
    scrcounter = 0;
    document.getElementById("result").style.display = "flex";
    if (document.getElementById("gencircle")) {
        document.getElementById("gencircle").remove();
    }
    if (action == "next") {
        document.getElementById("message").innerHTML = "You have completed this level!";
        document.getElementById("nxtrty").innerHTML = "Next level?";
        if (document.getElementById("nxtrty").hasAttribute("onclick")) {
            document.getElementById("nxtrty").removeAttribute("onclick");
            document.getElementById("nxtrty").setAttribute("onclick", "lvl"+lvl+"()");
        }
        else {
        document.getElementById("nxtrty").setAttribute("onclick", "lvl"+lvl+"()");
        }
    }
    else if (action == "retry") {
        if (lvl == "endless") {
            document.getElementById("message").innerHTML = "You got a score of " + score;
            document.getElementById("lvlchoose").style.display = "flex";
        }
        else {
            document.getElementById("message").innerHTML = "You have failed!";
        }
        document.getElementById("nxtrty").innerHTML = "Retry?";

        if (document.getElementById("nxtrty").hasAttribute("onclick")) {
            document.getElementById("nxtrty").removeAttribute("onclick");
            document.getElementById("nxtrty").setAttribute("onclick", "lvl"+lvl+"()");
        }
        else {
        document.getElementById("nxtrty").setAttribute("onclick", "lvl"+lvl+"()");
        }
    }
    else if (action == "reset") {
        eval("lvl"+lvl+"()");
    }
    else if (action == 'exit') {    
        document.getElementById("game").style.display = "none";
        document.getElementById("main").style.display = "block";
    }
}

function lvl1() {
    timer(30,1);
    circleGen(0.04,10,2,1);
}

function lvl2() {
    timer(30,2);
    circleGen(0.03,15,3,1.3);
}

function lvl3() {
    timer(30,3);
    circleGen(0.02,20,"endless",1.6);
}

function lvlendless() {
    timer(60,"endless");
    circleGen("rand",5000,"endless",2);
}