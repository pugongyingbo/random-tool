"use strict";
function applyFill(a) {
    var b = 100 * (a.value - a.min) / (a.max - a.min)
      , c = "linear-gradient(90deg, " + sliderProps.fill + " " + b + "%, " + sliderProps.background + " " + (b + .1) + "%)";
    a.style.background = c,
    sliderValue.setAttribute("data-length", a.value)
}
function secureMathRandom() {
    return window.crypto.getRandomValues(new Uint32Array(1))[0] / (Math.pow(2, 32) - 1)
}
function getRandomLower() {
    return String.fromCharCode(Math.floor(26 * Math.random()) + 97)
}
function getRandomUpper() {
    return String.fromCharCode(Math.floor(26 * Math.random()) + 65)
}
function getRandomNumber() {
    return String.fromCharCode(Math.floor(10 * secureMathRandom()) + 48)
}
function getRandomSymbol() {
    var a = '~!@#$%^&*()_+{}":?><;.,';
    return a[Math.floor(Math.random() * a.length)]
}
function generatePassword(a, b, c, d, e) {
    var i, f = "", g = b + c + d + e, h = [{
        lower: b
    }, {
        upper: c
    }, {
        number: d
    }, {
        symbol: e
    }].filter(function(a) {
        return Object.values(a)[0]
    });
    if (0 === g)
        return "";
    for (i = 0; a > i; i++)
        h.forEach(function(a) {
            var b = Object.keys(a)[0];
            f += randomFunc[b]()
        });
    return f.slice(0, a).split("").sort(function() {
        return Math.random() - .5
    }).join("")
}
function disableOnlyCheckbox() {
    var a = [uppercaseEl, lowercaseEl, numberEl, symbolEl].filter(function(a) {
        return a.checked
    });
    a.forEach(function(b) {
        b.disabled = 1 == a.length ? !0 : !1
    })
}
var sliderProps, slider, sliderValue, randomFunc, resultEl, lengthEl, uppercaseEl, lowercaseEl, numberEl, symbolEl, generateBtn, copyBtn, resultContainer, copyInfo, copiedInfo, generatedPassword, resultContainerBound;
console.clear(),
sliderProps = {
    fill: "#0B1EDF",
    background: "rgba(255, 255, 255, 0.214)"
},
slider = document.querySelector(".range__slider"),
sliderValue = document.querySelector(".length__title"),
slider.querySelector("input").addEventListener("input", function(a) {
    sliderValue.setAttribute("data-length", a.target.value),
    applyFill(a.target)
}),
applyFill(slider.querySelector("input")),
randomFunc = {
    lower: getRandomLower,
    upper: getRandomUpper,
    number: getRandomNumber,
    symbol: getRandomSymbol
},
resultEl = document.getElementById("result"),
lengthEl = document.getElementById("slider"),
uppercaseEl = document.getElementById("uppercase"),
lowercaseEl = document.getElementById("lowercase"),
numberEl = document.getElementById("number"),
symbolEl = document.getElementById("symbol"),
generateBtn = document.getElementById("generate"),
copyBtn = document.getElementById("copy-btn"),
resultContainer = document.querySelector(".result"),
copyInfo = document.querySelector(".result__info.right"),
copiedInfo = document.querySelector(".result__info.left"),
generatedPassword = !1,
resultContainerBound = {
    left: resultContainer.getBoundingClientRect().left,
    top: resultContainer.getBoundingClientRect().top
},
resultContainer.addEventListener("mousemove", function(a) {
    resultContainerBound = {
        left: resultContainer.getBoundingClientRect().left,
        top: resultContainer.getBoundingClientRect().top
    },
    generatedPassword ? (copyBtn.style.opacity = "1",
    copyBtn.style.pointerEvents = "all",
    copyBtn.style.setProperty("--x", a.x - resultContainerBound.left + "px"),
    copyBtn.style.setProperty("--y", a.y - resultContainerBound.top + "px")) : (copyBtn.style.opacity = "0",
    copyBtn.style.pointerEvents = "none")
}),
window.addEventListener("resize", function() {
    resultContainerBound = {
        left: resultContainer.getBoundingClientRect().left,
        top: resultContainer.getBoundingClientRect().top
    }
}),
copyBtn.addEventListener("click", function() {
    var a = document.createElement("textarea")
      , b = resultEl.innerText;
    b && "CLICK GENERATE" != b && (a.value = b,
    document.body.appendChild(a),
    a.select(),
    document.execCommand("copy"),
    a.remove(),
    copyInfo.style.transform = "translateY(200%)",
    copyInfo.style.opacity = "0",
    copiedInfo.style.transform = "translateY(0%)",
    copiedInfo.style.opacity = "0.75")
}),
generateBtn.addEventListener("click", function() {
    var a = +lengthEl.value
      , b = lowercaseEl.checked
      , c = uppercaseEl.checked
      , d = numberEl.checked
      , e = symbolEl.checked;
    generatedPassword = !0,
    resultEl.innerText = generatePassword(a, b, c, d, e),
    copyInfo.style.transform = "translateY(0%)",
    copyInfo.style.opacity = "0.75",
    copiedInfo.style.transform = "translateY(200%)",
    copiedInfo.style.opacity = "0"
}),
[uppercaseEl, lowercaseEl, numberEl, symbolEl].forEach(function(a) {
    a.addEventListener("click", function() {
        disableOnlyCheckbox()
    })
});
