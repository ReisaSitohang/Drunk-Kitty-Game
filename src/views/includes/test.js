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



[
 {
   "name": "Card1.png",
   "rule": "Drink if you are a boy!",
   "type": "Regular"
 },
 {
   "name": "Card2.png",
   "rule": "Each player plays rock paper scissors against a player with another team. If one team has more players a player goes twice. Team with the most wins, gets points!",
   "type": "Team"
 },
 {
   "name": "Card3.png",
   "rule": "You have snake eyes! If a player looks you in your beautiful eyes, they have to drink. There can only be one person with snake eyes.",
   "type": "Regular"
 },
 {
   "name": "Card4.png",
   "rule": "If you can cross your eyes you get a point, if not you drink!",
   "type": "Single"
 }
]         