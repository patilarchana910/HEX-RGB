function convertColor() {
  var input = document.getElementById("input");
  var output = document.getElementById("result-of-color");
  var color = input.value;

  if (isHexColor(color)) {
    var rgb = hexToRGB(color);

    if (rgb) {
      document.getElementById("result-of-color").value = "RGB Color: " + rgb;
      console.log(rgb);
      document.body.classList.remove("hex-bg");
      document.getElementById("color-box").style.backgroundColor = rgb;
      document.body.classList.add("rgb-bg");
    }
  } else if (isRGBColor(color)) {
    var hex = rgbToHex(color);

    if (hex) {
      console.log(hex);
      document.getElementById("result-of-color").value = "Hex Color: " + hex;
      document.getElementById("color-box").style.backgroundColor = hex;

      document.body.classList.remove("hex-bg");
      document.body.classList.add("rgb-bg");
    }
  } else {
    document.getElementById("result-of-color").value = "Invalid color code";
    document.body.classList.remove("hex-bg", "rgb-bg");
  }
}

function isHexColor(color) {
  var hexRegex = /[0-9A-Fa-f]{6}/g;
  return hexRegex.test(color);
}

function isRGBColor(color) {
  var rgbRegex = /^\s*\d+\s*,\s*\d+\s*,\s*\d+\s*(,\s*\d+\s*)?$/;
  return rgbRegex.test(color);
}

function hexToRGB(hex) {
  var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, function (m, r, g, b) {
    return r + r + g + g + b + b;
  });

  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (result) {
    var r = parseInt(result[1], 16);
    var g = parseInt(result[2], 16);
    var b = parseInt(result[3], 16);
    return "rgb(" + r + ", " + g + ", " + b + ")";
  } else {
    return null;
  }
}

function rgbToHex(rgb) {
  rgb = "rgb(" + rgb + ")";
  var result = /^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*\d+)?\)$/.exec(rgb);

  if (result) {
    var r = parseInt(result[1], 10);
    var g = parseInt(result[2], 10);
    var b = parseInt(result[3], 10);
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
  } else {
    return null;
  }
}

function componentToHex(c) {
  var hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}

function copyToClipboard() {
  var output = document.getElementById("result-of-color").textContent;
  navigator.clipboard.writeText(result - of - color).then(
    function () {
      alert("Copied to clipboard!");
    },
    function () {
      alert("Failed to copy to clipboard.");
    }
  );
}
