// Styles to apply
// Default style
var style = {
  fill: "#ddd",
  stroke: "#aaa",
  "stroke-width": 1,
  "stroke-linejoin": "round",
  cursor: "pointer"
};

// Style when hovering
var hoverStyle = {
  fill: "#A8BED5"
}

// Styles for tax brackets
var fivePercent = {
  fill: "#358205"
}

var overFourPercent = {
  fill: "#8FB822"
}

var overThreePercent = {
  fill: "#F3EE00"
}

var overTwoPercent = {
  fill: "#D76804"
}

var overOnePercent = {
  fill: "#C12818"
}

var overZeroPercent = {
  fill: "#801A0F"
}

var animationSpeed = 500;

// Return style by tax bracket for provided council name using the concelhosIRS array
function corConcelho(nome) {
  if (concelhosIRS[nome] == 0.05) {
    return fivePercent;
  } else if (concelhosIRS[nome] >= 0.04 && concelhosIRS[nome] < 0.05) {
    return overFourPercent;
  } else if (concelhosIRS[nome] >= 0.03 && concelhosIRS[nome] < 0.04) {
    return overThreePercent;
  } else if (concelhosIRS[nome] >= 0.02 && concelhosIRS[nome] < 0.03) {
    return overTwoPercent;
  } else if (concelhosIRS[nome] >= 0.01 && concelhosIRS[nome] < 0.02) {
    return overOnePercent;
  } else if (concelhosIRS[nome] > 0.00 && concelhosIRS[nome] < 0.01) {
    return overZeroPercent;
  } else {
    return style;
  }
}

// Main loop
// Initializes the map with default styles
// Adds event listeners for mouseover and mouseout to allow us to see which council we are selecting
for (var concelhoName in concelhosSVG) {
  (function(concelho, nome) {
    concelho.attr(style);
    concelho.attr(corConcelho(nome));

    concelho[0].addEventListener("mouseover", function() {
      concelho.animate(hoverStyle, animationSpeed);
      document.getElementById('popup').style.display = 'block';
      document.getElementById('popup').innerHTML = nome;

    }, true);

    concelho[0].addEventListener("mouseout", function() {
      concelho.animate(corConcelho(nome), animationSpeed);
      document.getElementById('popup').style.display = 'none';
      document.getElementById('popup').innerHTML = null;
    }, true);

  })(concelhosSVG[concelhoName], concelhoName);
}
