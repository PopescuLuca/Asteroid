let canvas, context, W, H;
let shipSize = 30;
let ship;
let asteroid = [];
let nrAsteroizi = 2;
let nrAsteroiziInitiali = nrAsteroizi;
let scor;
let scor1 = 0;
let xInitial = 0;
let yInitiali = 0;
let level = 0;
let highScore = 0;
let person;
function desenareNava() {
    context.clearRect(0, 0, W, H);
    context.strokeStyle = "white";
    context.lineWidth = shipSize / 20;
    context.beginPath();
    context.moveTo(
        ship.x + 5 / 3 * ship.r * Math.cos(ship.a),
        ship.y - 5 / 3 * ship.r * Math.sin(ship.a)
    )
    context.lineTo(
        ship.x - ship.r * (Math.cos(ship.a) - Math.sin(ship.a)),
        ship.y + ship.r * (+Math.sin(ship.a) + Math.cos(ship.a)))

    context.lineTo(
        ship.x - ship.r * (Math.cos(ship.a) + Math.sin(ship.a)),
        ship.y + ship.r * (Math.sin(ship.a) - Math.cos(ship.a)))

    context.closePath();
    context.stroke();
    ship.x += ship.thrust.x;
    ship.y += ship.thrust.y;
    Handledges();

    context.fillStyle = "red";
    context.fillRect(ship.x - 1, ship.y - 1, 2, 2);
    context.fillStyle = "red";
    context.font = "15px Arial"
    context.fillText("Lives : " + `${ship.health}`, W / 20, H / 20);
    context.fillText("Scor: " + `${scor}`, W - 60, H / 20);
    requestAnimationFrame(desenareNava);
}

function desenareAsteroizi() {
    context.strokeStyle = "white";
    context.lineWidth = 2;
    for (let i = 0; i < asteroid.length; i++) {

        if (asteroid[i].health == 1) {
            asteroid[i].radius = 15;
            context.beginPath();
            context.textAlign = "center";
            context.textBaseline = "middle";
            context.fillStyle = "lightblue";
            context.arc(asteroid[i].x, asteroid[i].y, asteroid[i].radius, 0, Math.PI * 2, false);
            context.fill();
            context.fillStyle = "red";
            context.font = "25px Arial";
            context.fillText(`${asteroid[i].health}`, asteroid[i].x, asteroid[i].y);
            context.stroke();
        } else if (asteroid[i].health == 2) {
            asteroid[i].radius = 30;
            context.textAlign = "center";
            context.textBaseline = "middle";
            context.fillStyle = "black"
            context.font = "30px Arial";
            context.beginPath();
            context.arc(asteroid[i].x, asteroid[i].y, asteroid[i].radius, 0, Math.PI * 2, false);
            context.fill();
            context.fillStyle = "red";
            context.fillText(`${asteroid[i].health}`, asteroid[i].x, asteroid[i].y)
            context.stroke();
        } else if (asteroid[i].health == 3) {
            asteroid[i].radius = 40;
            context.textAlign = "center";
            context.textBaseline = "middle";
            context.fillStyle = "darkmagenta";
            context.font = "35px Arial";
            context.beginPath();
            context.arc(asteroid[i].x, asteroid[i].y, asteroid[i].radius, 0, Math.PI * 2, false);
            context.fill();
            context.fillStyle = "red";
            context.fillText(`${asteroid[i].health}`, asteroid[i].x, asteroid[i].y)
            context.stroke();
        } else if (asteroid[i].health == 4) {
            asteroid[i].radius = 50;
            context.textAlign = "center";
            context.textBaseline = "middle";
            context.fillStyle = "rgb(200, 150, 57)";
            context.beginPath();
            context.arc(asteroid[i].x, asteroid[i].y, asteroid[i].radius, 0, Math.PI * 2, false);
            context.fill();
            context.fillStyle = "red";
            context.font = "40px Arial";
            context.fillText(`${asteroid[i].health}`, asteroid[i].x, asteroid[i].y)
            context.stroke();
        }
    }
    requestAnimationFrame(desenareAsteroizi);
}

function desenareLaser() {
    for (let i = 0; i < ship.Rachete.length; i++) {
        context.fillStyle = "graywhite"
        context.beginPath()
        context.arc(ship.Rachete[i].x, ship.Rachete[i].y, shipSize / 20, 0, Math.PI * 2, false);
        context.fill();
    }
    requestAnimationFrame(desenareLaser);

}
function keyDown(e) {
    if (e.keyCode == 82) {
        location.reload();
    }
    if (e.keyCode == 88) { //tasta x
        if (ship.Rachete.length < 3) {
            ship.Rachete.push({
                x: ship.x + 5 / 3 * ship.r * Math.cos(ship.a),
                y: ship.y - 5 / 3 * ship.r * Math.sin(ship.a),
                xv: Math.cos(ship.a) * 2,
                yv: -Math.sin(ship.a) * 2,
                dist: 0
            })
            desenareLaser();
        }
    }
    if (e.keyCode == 38)  //sageata sus
    {
        ship.thrust.y = 0;
        ship.thrust.y -= 3;
    }
    if (e.keyCode == 37) { //sageata stanga
        ship.thrust.x = 0;
        ship.thrust.x -= 3;
    }
    if (e.keyCode == 39) { //sageata dreapta
        ship.thrust.x = 0;
        ship.thrust.x += 3;
    }
    if (e.keyCode == 40) { //sageata jos
        ship.thrust.y = 0;
        ship.thrust.y += 3;
    }
    if (e.keyCode == 90) { //rotire stanga
        ship.a += Math.PI / 2
    }
    if (e.keyCode == 67) { //rotire dreapta
        ship.a -= Math.PI / 2
    }
    //e.preventDefault();
}
function keyUp(e) {
    if (e.keyCode == 38) {
        if (ship.y != 0) {
            ship.thrust.y = 0;
        }
    }
    if (e.keyCode == 37) {
        if (ship.x != 0) {
            ship.thrust.x = 0;
        }
    }
    if (e.keyCode == 39) {
        if (ship.x != 0) {
            ship.thrust.x = 0;
        }

    }
    if (e.keyCode == 40) {
        if (ship.y != 0) {
            ship.thrust.y = 0;
        }
    }

}

function createAsteroizi() {
    asteroid = [];
    let x;
    let y;
    let xv;
    let yv;
    let a;
    let health;
    let radius;
    for (let i = 0; i < nrAsteroizi; i++) {
        do {
            x = Math.floor(Math.random() * W);
            y = Math.floor(Math.random() * H);
            xv = Math.random() * (Math.random() < 0.5 ? 1 : -1);
            yv = Math.random() * (Math.random() < 0.5 ? 1 : -1);
            a = -Math.random() * Math.PI * 2;
            health = Math.floor(Math.random() * 4) + 1;
            radius = 1;
        } while (distBetweenPoints(ship.x, ship.y, x, y) < 100)
        asteroid.push({
            x: x,
            y: y,
            xv: xv,
            yv: yv,
            a: a,
            health: health,
            radius: radius
        })
    }
    desenareAsteroizi();
}


function miscareAsteroizi() {
    for (var i = 0; i < asteroid.length; i++) {
        asteroid[i].x += asteroid[i].xv;
        asteroid[i].y += asteroid[i].yv;

        if (asteroid[i].x < 0 - asteroid[i].radius) {
            asteroid[i].x = W + asteroid[i].radius;
        } else if (asteroid[i].x > W + asteroid[i].radius) {
            asteroid[i].x = 0 - asteroid[i].radius
        }
        if (asteroid[i].y < 0 - asteroid[i].radius) {
            asteroid[i].y = H + asteroid[i].radius;
        } else if (asteroid[i].y > H + asteroid[i].radius) {
            asteroid[i].y = 0 - asteroid[i].radius
        }
        coliziuneNavaAsteroizi();
        coliziuneRachetaAsteroizi();
    }
}

function miscareRacheta() {
    for (let i = 0; i < ship.Rachete.length; i++) {
        ship.Rachete[i].x += ship.Rachete[i].xv;
        ship.Rachete[i].y += ship.Rachete[i].yv;
        ship.Rachete[i].dist += Math.sqrt(Math.pow(ship.Rachete[i].xv, 2) + Math.pow(ship.Rachete[i].yv, 2));
        if (ship.Rachete[i].x < 0) {
            ship.Rachete[i].x = W;
        } else if (ship.Rachete[i].x > W) {
            ship.Rachete[i].x = 0;
        }
        if (ship.Rachete[i].y < 0) {
            ship.Rachete[i].y = H;
        } else if (ship.Rachete[i].y > H) {
            ship.Rachete[i].y = 0;
        }
        if (ship.Rachete[i].dist > W) {
            ship.Rachete.splice(i, 1);
            continue;
        }
    }

}

function Handledges() {
    if (ship.x < 0 - ship.r) {
        ship.x = W + ship.r;
    } else if (ship.x > W + ship.r) {
        ship.x = 0 - ship.r;
    }
    if (ship.y < 0 - ship.r) {
        ship.y = H + ship.r;
    } else if (ship.y > H + ship.r) {
        ship.y = 0 - ship.r;
    }
}
function coliziuneNavaAsteroizi() {
    for (let i = 0; i < nrAsteroizi; i++) {
        if (distBetweenPoints(ship.x, ship.y, asteroid[i].x, asteroid[i].y) < shipSize + asteroid[i].radius - 10) {
            scadereViataNava();
        }
    }
}

function coliziuneRachetaAsteroizi() {
    for (let i = 0; i < nrAsteroizi; i++) {
        for (let j = 0; j < ship.Rachete.length; j++) {
            if (distBetweenPoints(asteroid[i].x, asteroid[i].y, ship.Rachete[j].x, ship.Rachete[j].y) < asteroid[i].radius) {
                ship.Rachete.splice(j, 1);
                scor += 10;
                asteroid[i].health--;
                scor1 += 10;
                if (ship.health < 3 && scor1 >= 200) {
                    ship.health++;
                    scor1 = 0;
                }
                if (asteroid[i].health == 0) {
                    asteroid.splice(i, 1);
                    nrAsteroizi--;
                }
                if (asteroid.length == 0) {
                    ship.Rachete.length = 0;
                    nrAsteroiziInitiali++;
                    //if (level >= 1) {
                    //    level++;
                       
                    //}
                    nrAsteroizi = nrAsteroiziInitiali + 1;
                    createAsteroizi();

                }
            }
        }
    }
}

function distBetweenPoints(x1, y1, x2, y2) {
    let a = x1 - x2;
    let b = y1 - y2;
    return Math.sqrt((a * a) + (b * b));
}

function scadereViataNava() {
    ship.health--;
    ship.Rachete.length = 0;
    ship.x = xInitial;
    ship.y = yInitiali;

    createAsteroizi();

    if (ship.health == 0) {
        context.font = "45px Arial"
        context.fillStyle = "rgba(255, 255, 255)";
        context.fillText("Game Over", W / 2, H / 3);
        context.fillText("Press R to restart", W / 2, H / 2);
        if (scor > highScore) {
            highScore = scor;

            let txt = prompt("Please enter your name:", "Anonim");

            if (txt == null || txt == "") {
                person = "Anonim";
            }
            else {
                person = txt;
            }
            localStorage.setItem(person, highScore);
            //let highScoreLista = localStorage.getItem();
            //if (highScoreLista.length > 5) {
            //    for (let i = highScoreLista.length; i > 5; i--)
            //        highScoreLista[i].splice(i,1);
            //}
            alert("HighScore: " + `${highScore}` + " realizat de " + person);
            //alert("Ultimele " + `${highScoreLista.length}` + " high scores");
            //for (let i = 0; i < highScore.length; i++)
            //    alert(`${highScoreLista[i].getItem()}`+" realizat de "+person);
        }
        context = null;
    }
}
function lastHighScore() {
    person = document.querySelector('#persoana').value;
    if (person == null || person == undefined) {
        person = "Anonim"
    }

    highScore = localStorage.getItem(person);
    alert("Ultimul HighScore: " + `${highScore}` + " realizat de " + person);
}

function aplicatie() {
    canvas = document.querySelector('canvas');
    context = canvas.getContext('2d');
    W = canvas.width;
    H = canvas.height;
    ship = { x: W / 2, y: H / 2, r: shipSize / 2, a: Math.PI / 2, thrust: { x: 0, y: 0 }, Rachete: [], health: 3 };
    xInitial = ship.x;
    yInitiali = ship.y;
    scor = 0;
    desenareNava();
    createAsteroizi();
    miscareRacheta();
    miscareAsteroizi();
    setInterval(miscareAsteroizi, 7);
    setInterval(miscareRacheta, 4);


    document.addEventListener('keydown', keyDown);
    document.addEventListener('keyup', keyUp);
}
document.addEventListener('DOMContentLoaded', aplicatie);