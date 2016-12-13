//Function that randomizes/shuffles the array
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

var arr = ["a", "b", "c", "d", "e"];
arr = shuffle(arr);

let arraylength = arr.length
let teams = arraylength/2
let team1 = Math.ceil(teams)
let team2 = Math.floor(teams)

var x = arr
var y = x.splice(team1, team2);
console.log(x);
console.log(y);          