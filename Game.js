var ws;

function updateMap(Data) {
    for (var country_name in Data) {
        if (Data.hasOwnProperty(country_name)) {
            if (country_name === "type")
                continue;
            var country = Data[country_name];
            var local_country = countries[country_name];
            local_country.owner = country.owner;
        }
    }
}

window.onload=function(){
    ws=new WebSocket("ws://localhost:8081/echo_all");
    ws.onmessage=function(evt) {
        console.log(evt.data);
        var answer = JSON.parse(evt.data);
        if (answer["type"] === "update") {
           updateMap(answer);
        }
        console.log(answer);
    };
    ws.onopen=function(evt){
        var request = {
            "type" : "ping"
        };
        ws.send(JSON.stringify(request));
    }
};
window.onclose=function(){
    ws.close();
};


let url_string = window.location.href;
let url = new URL(url_string);
let player = parseInt(url.searchParams.get("player"));
console.log(player);


let canvas = document.getElementById('cv');
let context = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let background = new Image();
background.src = 'Risk_board.svg';

var playerFlags = []

for(var ip = 0; ip < 4; ip++) {
    var p = new Image();
    p.src = "player-" + ip + ".png";
    playerFlags.push(p);
}

let crosshair = new Image();
crosshair.src = 'crosshair.png';

// Sanity check
for (var country_name in countries) {
    if (countries.hasOwnProperty(country_name)) {
        var country = countries[country_name];
        country.name = country_name;
        country["owner"] = -1;
        for (var i = 0; i < country.neighbors.length; i++) {
            var neighbor = country.neighbors[i];
            if (!(neighbor in countries)) {
                console.log("ERROR: " + neighbor + " from " + country_name);

            } else {
                var neighbor_country = countries[neighbor];
                if (!(neighbor_country.neighbors.includes(country_name))) {
                    console.log("ERROR REV: " + neighbor + " not to " + country_name);
                }
            }
        }
    }
}

var selected = null;
var selectedCountries = [];

var hRatio = 1;
var vRatio = 1;
var ratio = 1;

var baseOffset_x = 0;
var baseOffset_y = 0;

var totalWidth = 0;
var totalHeight = 0;

function drawBackground(img, context) {
    var centerShift_x = (img.width * ratio) / 2;
    var centerShift_y = (img.height * ratio) / 2;
    baseOffset_x = canvas.width / 2 - centerShift_x;
    baseOffset_y = canvas.height / 2 - centerShift_y;
    context.drawImage(img, 0, 0, img.width, img.height,
        baseOffset_x, baseOffset_y,
        img.width*ratio, img.height*ratio);
}

function drawImageScaled(img, context, x, y, scale) {
    var centerShift_x = (img.width * ratio * scale) / 2;
    var centerShift_y = (img.height * ratio * scale) / 2;
    context.drawImage(img, 0, 0, img.width, img.height,
                      baseOffset_x + x * totalWidth - centerShift_x,
                      baseOffset_y + y * totalHeight - centerShift_y,
                      img.width*ratio*scale, img.height*ratio*scale);
}

function getMousePos(canvas, event) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
    };
}

function isInside(pos, rect){
    return pos.x > rect.x && pos.x < rect.x+rect.width && pos.y < rect.y+rect.heigth && pos.y > rect.y
}

function distance(pos, target) {
    let dx = pos.x - target.x;
    let dy = pos.y - target.y;
    return Math.sqrt(dx * dx + dy * dy);
}

function isEnemyCountry(country_name) {
    let country = countries[country_name];
    console.log(country);
    return country.owner !== player;
}

canvas.addEventListener('click', function(evt) {
    let mousePos = getMousePos(canvas, evt);

    for (var country_name in countries) {
        if (countries.hasOwnProperty(country_name)) {
            var country = countries[country_name];
            var country_pos = {
                x : country.x * totalWidth + baseOffset_x,
                y : country.y * totalHeight + baseOffset_y
            };
            if (distance(mousePos, country_pos) < 40) {
                if (isEnemyCountry(country_name)) {
                    if (selectedCountries.includes(country_name)) {
                        var request = {
                            "type" : "attack",
                            "source" : selected.name,
                            "target" : country_name
                        };
                        ws.send(JSON.stringify(request));
                    }
                } else {
                    selected = country;
                    selectedCountries = [];
                    for (var i = 0; i < country.neighbors.length; ++i) {
                        var neighbor = country.neighbors[i];
                        if (isEnemyCountry(neighbor))
                            selectedCountries.push(neighbor);
                    }
                    // Outdated, select all countries:
                    // selectedCountries = country.neighbors;
                }
                break;
            }
        }
    }
    step();
}, false);

function requestUpdate() {
    var request = {
        "type" : "ping"
    };
    if (ws) {
        ws.send(JSON.stringify(request));
        console.log("Sending update");
    } else
        console.log("Waiting on websocket");
    setTimeout(requestUpdate, 500);
}
requestUpdate();

function getPlayerFlag(playerId) {
    if (playerId === -1)
        return playerFlags[0];
    return playerFlags[playerId];
}

function step() {
    context.clearRect(0, 0, canvas.width, canvas.height);

    hRatio = canvas.width  / background.width;
    vRatio =  canvas.height / background.height;
    ratio  = Math.min ( hRatio, vRatio );

    totalWidth = background.width*ratio;
    totalHeight = background.height*ratio;

    drawBackground(background, context);

    for (var country_name in countries) {
        if (countries.hasOwnProperty(country_name)) {
            var country = countries[country_name];
            var scale = 0.15;
            drawImageScaled(getPlayerFlag(country.owner), context, country.x, country.y, scale);
            if (selectedCountries.includes(country_name))
                drawImageScaled(crosshair, context, country.x, country.y, 0.1);
        }
    }

    setTimeout(step, 200);
}
step();