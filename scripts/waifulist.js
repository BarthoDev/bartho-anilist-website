/* ============= VARIABLES ============= */

let json = (function() {
  var json = null;
  $.ajax({
    'async': false,
    'global': false,
    'url': "/data/waifulist.json",
    'dataType': "json",
    'success': function(data) {
      json = data;
    }
  });
  return json;
})()
let buttons = [
      "card",
      "cover"
    ]

/* ============= FUNCTIONS ============= */

function buildList(type) {
  document.getElementsByClassName("podium")[0].innerHTML = "<ul>" + json.top.slice(0, 3).map((val, i) => `<li class="element"> <div class="lefter"><img src="${val.image}"><div class="index"><a>${i+1}</a></div></div> <div class="name"><a>${val.name}</a></div> </li>`).join("") + "</ul>"
  document.getElementsByClassName("top")[0].innerHTML = "<ul>" + json.top.slice(3).map((val, i) => `<li class="element ${type}"> <div class="lefter"><img src="${val.image}"><div class="index"><a class="${i>5?"textDizaine":"text"}">${i+4}</a></div></div> <div class="name">${val.name}</div> </li>`).join("") + "</ul>"
};

function onClick(button) {
  let otherButton = buttons.find(val => val !== button)
  document.getElementsByClassName(button)[0].style.backgroundColor = "rgba(255,255,255,0.5)";
  document.getElementsByClassName(otherButton)[0].style.backgroundColor = "transparent";
  buildList(button)
}







  