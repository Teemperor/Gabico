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

countries = {
    "Egypt": {
        "x" : 0.54,
        "y" : 0.55,
        "neighbors" : ["East-Africa", "West-Africa", "South-Europe", "Middle-East"]
    },
    "West-Africa": {
        "x" : 0.46,
        "y" : 0.58,
        "neighbors" : ["Brazil", "Egypt", "East-Africa", "Kongo", "West-Europe"]
    },
    "East-Africa": {
        "x" : 0.62,
        "y" : 0.69,
        "neighbors" : ["Middle-East", "Kongo", "Madagascar", "South-Africa", "West-Africa", "Egypt"]
    },
    "South-Africa": {
        "x" : 0.54,
        "y" : 0.83,
        "neighbors" : ["Madagascar", "Kongo", "East-Africa"]
    },
    "Madagascar": {
        "x" : 0.64,
        "y" : 0.84,
        "neighbors" : ["South-Africa", "East-Africa"]
    },
    "Kongo": {
        "x" : 0.54,
        "y" : 0.71,
        "neighbors" : ["West-Africa", "East-Africa", "South-Africa"]
    },

    "West-Australia": {
        "x" : 0.95,
        "y" : 0.84,
        "neighbors" : ["East-Australia", "New-Guinea", "Indonesia"]
    },
    "East-Australia": {
        "x" : 0.85,
        "y" : 0.84,
        "neighbors" : ["West-Australia", "New-Guinea"]
    },
    "New-Guinea": {
        "x" : 0.90,
        "y" : 0.67,
        "neighbors" : ["Indonesia", "West-Australia", "East-Australia"]
    },
    "Indonesia": {
        "x" : 0.82,
        "y" : 0.69,
        "neighbors" : ["Siam", "New-Guinea", "West-Australia"]
    },

    "Brazil": {
        "x" : 0.32,
        "y" : 0.64,
        "neighbors" : ["Venezuela", "Peru", "Argentinia", "West-Africa"]
    },
    "Venezuela": {
        "x" : 0.23,
        "y" : 0.55,
        "neighbors" : ["Brazil", "Peru", "Middle-America"]
    },
    "Argentinia": {
        "x" : 0.26,
        "y" : 0.79,
        "neighbors" : ["Brazil", "Peru"]
    },
    "Peru": {
        "x" : 0.23,
        "y" : 0.66,
        "neighbors" : ["Brazil", "Venezuela", "Argentinia"]
    },

    "Middle-America": {
        "x" : 0.17,
        "y" : 0.46,
        "neighbors" : ["East-USA", "West-USA", "Venezuela"]
    },
    "West-USA": {
        "x" : 0.16,
        "y" : 0.34,
        "neighbors" : ["East-USA", "Middle-America", "Alberta", "Ontario"]
    },
    "East-USA": {
        "x" : 0.24,
        "y" : 0.37,
        "neighbors" : ["West-USA", "Middle-America", "Ontario", "Quebec"]
    },
    "Alberta": {
        "x" : 0.16,
        "y" : 0.24,
        "neighbors" : ["Alaska", "North-West-Territory", "West-USA", "Ontario"]
    },
    "Alaska": {
        "x" : 0.07,
        "y" : 0.16,
        "neighbors" : ["Kamchatka", "North-West-Territory", "Alberta"]
    },
    "North-West-Territory": {
        "x" : 0.18,
        "y" : 0.13,
        "neighbors" : ["Alaska", "Alberta", "Ontario", "Greenland"]
    },
    "Greenland": {
        "x" : 0.35,
        "y" : 0.13,
        "neighbors" : ["Iceland", "North-West-Territory", "Quebec", "Ontario"]
    },
    "Ontario": {
        "x" : 0.22,
        "y" : 0.24,
        "neighbors" : ["North-West-Territory", "Quebec", "West-USA", "East-USA", "Alberta", "Greenland"]
    },
    "Quebec": {
        "x" : 0.29,
        "y" : 0.25,
        "neighbors" : ["Greenland", "Ontario", "East-USA"]
    },

    "Iceland": {
        "x" : 0.43,
        "y" : 0.21,
        "neighbors" : ["UK", "Greenland", "Scandinavia"]
    },
    "UK": {
        "x" : 0.41,
        "y" : 0.30,
        "neighbors" : ["Iceland", "South-Europe", "Scandinavia", "North-Europe", "West-Europe"]
    },
    "West-Europe": {
        "x" : 0.43,
        "y" : 0.43,
        "neighbors" : ["West-Africa", "North-Europe", "UK", "South-Europe"]
    },
    "North-Europe": {
        "x" : 0.50,
        "y" : 0.31,
        "neighbors" : ["Scandinavia", "East-Europe", "South-Europe", "West-Europe", "UK"]
    },
    "South-Europe": {
        "x" : 0.51,
        "y" : 0.42,
        "neighbors" : ["North-Europe", "UK", "West-Europe", "East-Europe", "Middle-East", "Egypt"]
    },
    "East-Europe": {
        "x" : 0.58,
        "y" : 0.31,
        "neighbors" : ["Middle-East", "Afghanistan", "Ural", "Scandinavia", "North-Europe", "South-Europe"]
    },
    "Scandinavia": {
        "x" : 0.50,
        "y" : 0.21,
        "neighbors" : ["East-Europe", "North-Europe", "Iceland", "UK"]
    },

    "Middle-East": {
        "x" : 0.63,
        "y" : 0.52,
        "neighbors" : ["Egypt", "East-Africa", "South-Europe", "East-Europe", "India", "Afghanistan"]
    },
    "Afghanistan": {
        "x" : 0.68,
        "y" : 0.38,
        "neighbors" : ["East-Europe", "Ural", "China", "India", "Middle-East"]
    },
    "India": {
        "x" : 0.72,
        "y" : 0.48,
        "neighbors" : ["Siam", "China", "Afghanistan", "Middle-East"]
    },
    "China": {
        "x" : 0.82,
        "y" : 0.45,
        "neighbors" : ["Siam", "India", "Afghanistan", "Mongolia", "Siberia", "Ural"]
    },
    "Siam": {
        "x" : 0.80,
        "y" : 0.55,
        "neighbors" : ["China", "Indonesia", "India"]
    },
    "Mongolia": {
        "x" : 0.82,
        "y" : 0.35,
        "neighbors" : ["Japan", "Irkutsk", "Siberia", "China", "Kamchatka"]
    },
    "Japan": {
        "x" : 0.92,
        "y" : 0.35,
        "neighbors" : ["Mongolia", "Kamchatka"]
    },
    "Kamchatka": {
        "x" : 0.88,
        "y" : 0.15,
        "neighbors" : ["Japan", "Alaska", "Mongolia", "Yakutsk", "Irkutsk"]
    },
    "Irkutsk": {
        "x" : 0.80,
        "y" : 0.26,
        "neighbors" : ["Siberia", "Yakutsk", "Kamchatka", "Mongolia"]
    },
    "Yakutsk": {
        "x" : 0.81,
        "y" : 0.14,
        "neighbors" : ["Irkutsk", "Siberia", "Kamchatka"]
    },
    "Siberia": {
        "x" : 0.73,
        "y" : 0.16,
        "neighbors" : ["Ural", "Yakutsk", "Irkutsk", "China", "Mongolia"]
    },
    "Ural": {
        "x" : 0.68,
        "y" : 0.22,
        "neighbors" : ["East-Europe", "Afghanistan", "China", "Siberia"]
    }
};

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
            }
        }
    }
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
        }
    }

    setTimeout(step, 200);
}
step();
//window.requestAnimationFrame(step);