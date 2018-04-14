countries =
{
    "Egypt": {
        "x" : 0.54,
        "y" : 0.55,
        "neighbors" : ["East-Africa", "West-Africa", "South-Europe", "Middle-East"]
    },
    "West-Africa": {
        "x" : 0.46,
        "y" : 0.58,
        "neighbors" : ["Brazil", "Egypt", "East-Africa", "Kongo", "West-Europe", "South-Europe"]
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
        "neighbors" : ["West-Australia", "New-Guinea", "Indonesia"]
    },
    "New-Guinea": {
        "x" : 0.90,
        "y" : 0.67,
        "neighbors" : ["Indonesia", "West-Australia", "East-Australia"]
    },
    "Indonesia": {
        "x" : 0.82,
        "y" : 0.69,
        "neighbors" : ["Siam", "New-Guinea", "West-Australia", "East-Australia"]
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
        "neighbors" : ["Iceland", "Scandinavia", "North-Europe", "West-Europe"]
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
        "neighbors" : ["North-Europe", "West-Europe", "East-Europe", "Middle-East", "Egypt", "West-Africa"]
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
}