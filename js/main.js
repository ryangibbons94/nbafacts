//Example fetch using pokemonapi.co
import { getMainColor } from 'nba-color';

console.log(getMainColor('CLE'));



document.querySelector('#team').addEventListener('click', getTeam)
document.querySelector('#player').addEventListener('click', getPlayer)
let teams = [ "gsw", "lac", "lal", "pho", "sac", "dal", "hou", "mem", "nor", "sas", "den", "min", "okc", "por", "uth", "bos", "bro", "nyk", "phi", "tor", "chi", "cle", "det", "ind", "mil", "atl", "cha", "mia", "orl", "was"]
let teamName 
let lastName
let firstName
//random team
function getTeam(){
  teamName = randomTeam()
  const url = `https://nba-players.herokuapp.com/players-stats-teams/${teamName}`
  fetch(url)
      .then(res => res.json()) // parse response as JSON
      .then(data => {
        console.log(data);
        console.log(getMainColor(teamName.toUpperCase()))
        document.querySelector('#teamName').innerText = data[0].team_name
      })
      .catch(err => {
          console.log(`error ${err}`)
      });
      getPlayer()
}

//random player
function getPlayer(){
  const url = `https://nba-players.herokuapp.com/players-stats-teams/${teamName}`
  fetch(url)
      .then(res => res.json()) // parse response as JSON
      .then(data => {
        let randomPlayer = random(0,data.length)
        document.querySelector('#playerName').innerText = data[randomPlayer].name
        lastName = data[randomPlayer].name.split(' ').pop().toLowerCase()
        firstName = data[randomPlayer].name.split(' ').shift().toLowerCase()
        document.querySelector('.points').innerText = `Points per game: ${data[randomPlayer].points_per_game}`
        document.querySelector('.rebounds').innerText = `Rebounds per game: ${data[randomPlayer].rebounds_per_game}`
        document.querySelector('.assists').innerText = `Assists per game: ${data[randomPlayer].assists_per_game}`
        playerPic()
      })
      .catch(err => {
          console.log(`error ${err}`)
      });
}
//random player pic
function playerPic(){
  const url = `https://nba-players.herokuapp.com/players/${lastName}/${firstName}`
  fetch(url)
      // .then(res => res.json()) // parse response as JSON
      .then(data => {
        let randomPlayer = random(0,data.length)
        document.querySelector('img').src = data.url

      })
      .catch(err => {
          console.log(`error ${err}`)
      });
}

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function randomTeam() {
  return `${teams[random(0,29)]}`;
}