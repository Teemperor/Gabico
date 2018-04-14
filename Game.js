var ws;
window.onload=function(){
    ws=new WebSocket("ws://localhost:8081/echo_all");
    ws.onmessage=function(evt){console.log(evt.data);};
    ws.onopen=function(evt){
        ws.send("Hello");
        ws.send("Hello1");
        ws.send("Hello2");
    }
}
window.onclose=function(){
    ws.close();
}

var canvas=document.getElementById('cv');
var context= canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var background = new Image();
background.src = 'Risk_board.svg';

var button = new Image();
button.src = 'button.png';

var crosshair = new Image();
crosshair.src = 'crosshair.png';

// Sanity check
for (var country_name in countries) {
    if (countries.hasOwnProperty(country_name)) {
        var country = countries[country_name];
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
    var dx = pos.x - target.x;
    var dy = pos.y - target.y;
    return Math.sqrt(dx * dx + dy * dy);
}

canvas.addEventListener('click', function(evt) {
    var mousePos = getMousePos(canvas, evt);

    for (var country_name in countries) {
        if (countries.hasOwnProperty(country_name)) {
            var country = countries[country_name];
            var country_pos = {
                x : country.x * totalWidth + baseOffset_x,
                y : country.y * totalHeight + baseOffset_y
            };
            if (distance(mousePos, country_pos) < 40) {
                console.log(country_name);
                selectedCountries = country.neighbors;
                break;
            }
        }
    }
    step();
}, false);

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
            drawImageScaled(button, context, country.x, country.y, 0.1);
            if (selectedCountries.includes(country_name))
                drawImageScaled(crosshair, context, country.x, country.y, 0.1);
        }
    }

    setTimeout(step, 200);
}
step();