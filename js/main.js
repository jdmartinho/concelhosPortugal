// Function to get the nth key from the object
Object.prototype.getByIndex = function (index) {
  return this[Object.keys(this)[index]];
};

// Styles to apply
// Default style
var style = {
  fill: "#ddd",
  stroke: "#aaa",
  "stroke-width": 1,
  "stroke-linejoin": "round",
  cursor: "pointer",
};

// Style when hovering
var hoverStyle = {
  fill: "#A8BED5",
};

// Styles for tax brackets
var fivePercent = {
  fill: "#358205",
};

var overFourPercent = {
  fill: "#8FB822",
};

var overThreePercent = {
  fill: "#F3EE00",
};

var overTwoPercent = {
  fill: "#D76804",
};

var overOnePercent = {
  fill: "#C12818",
};

var overZeroPercent = {
  fill: "#801A0F",
};

var animationSpeed = 500;

// Return style by tax bracket for provided council name using the concelhosIRS array
function corConcelho(nome) {
  console.log(nome);
  var selectedCouncil = councilData.find((council) => {
    return council.municipio == nome;
  });
  console.log(selectedCouncil);
  var taxBenefit;
  if (selectedCouncil) {
    taxBenefit = selectedCouncil.beneficioFiscal2023;
  }
  console.log(taxBenefit);
  if (taxBenefit) {
    if (taxBenefit == 0.05) {
      return fivePercent;
    } else if (taxBenefit >= 0.04 && taxBenefit < 0.05) {
      return overFourPercent;
    } else if (taxBenefit >= 0.03 && taxBenefit < 0.04) {
      return overThreePercent;
    } else if (taxBenefit >= 0.02 && taxBenefit < 0.03) {
      return overTwoPercent;
    } else if (taxBenefit >= 0.01 && taxBenefit < 0.02) {
      return overOnePercent;
    } else if (taxBenefit > 0.0 && taxBenefit < 0.01) {
      return overZeroPercent;
    }
  } else {
    return style;
  }
}

// Main loop
// Initializes the map with default styles
// Adds event listeners for mouseover and mouseout to allow us to see which council we are selecting
for (var concelhoName in concelhosSVG) {
  (function (concelho, nome) {
    concelho.attr(style);
    concelho.attr(corConcelho(nome));

    concelho[0].addEventListener(
      "mouseover",
      function () {
        concelho.animate(hoverStyle, animationSpeed);
        document.getElementById("popup").style.display = "block";
        document.getElementById("popup").innerHTML = nome;
      },
      true
    );

    concelho[0].addEventListener(
      "mouseout",
      function () {
        concelho.animate(corConcelho(nome), animationSpeed);
        document.getElementById("popup").style.display = "none";
        document.getElementById("popup").innerHTML = null;
      },
      true
    );

    concelho[0].addEventListener(
      "click",
      function () {
        var selectedCouncil = councilData.find((council) => {
          return council.municipio == nome;
        });
        fillInformation(selectedCouncil);
      },
      true
    );
  })(concelhosSVG[concelhoName], concelhoName);
}

function fillInformation(council) {
  var keys = Object.keys(council);
  document.getElementById("councilName").innerHTML = council["municipio"];

  // Draw table with headers
  var tableToFill = document.getElementById("results");
  tableToFill.innerHTML = "";
  var tblHeader = document.createElement("thead");
  var header2011 = document.createElement("th");
  header2011.innerHTML = "2011";
  header2011.scope = "col";
  var header2021 = document.createElement("th");
  header2021.innerHTML = "2021";
  header2021.scope = "col";

  tblHeader.appendChild(header2011);
  tblHeader.appendChild(header2021);
  tableToFill.appendChild(tblHeader);

  // Fill in rows, 2 elements at a time because they are a "pair"
  // of related values, for 2011 and 2021
  var tblBody = document.createElement("tbody");
  var x = 2;
  while (x < keys.length) {
    // Properties
    var headerRow = document.createElement("tr");
    var headerText2011 = document.createElement("td");
    headerText2011.innerHTML = keys[x];
    var headerText2021 = document.createElement("td");
    headerText2021.innerHTML = keys[x + 1];
    headerRow.appendChild(headerText2011);
    headerRow.appendChild(headerText2021);

    // Values
    var valuesRow = document.createElement("tr");
    var valuesText2011 = document.createElement("td");
    valuesText2011.innerHTML = council.getByIndex(x);
    var valuesText2021 = document.createElement("td");
    valuesText2021.innerHTML = council.getByIndex(x + 1);
    valuesRow.appendChild(valuesText2011);
    valuesRow.appendChild(valuesText2021);

    tblBody.appendChild(headerRow);
    tblBody.appendChild(valuesRow);

    tableToFill.appendChild(tblBody);

    x = x + 2;
  }
}
