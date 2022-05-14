//need to account for suffixes like jr or iii in name, probably need to use its own function to get the first and last name

import { getMainColor, getFullName, getSecondaryColor } from "nba-color";
document.querySelector("#team").addEventListener("click", getTeam);
document.querySelector("#player").addEventListener("click", getPlayer);
let teams = [
  "gsw",
  "lac",
  "lal",
  "pho",
  "sac",
  "dal",
  "hou",
  "mem",
  "nor",
  "sas",
  "den",
  "min",
  "okc",
  "por",
  "uth",
  "bos",
  "bro",
  "nyk",
  "phi",
  "tor",
  "chi",
  "cle",
  "det",
  "ind",
  "mil",
  "atl",
  "cha",
  "mia",
  "orl",
  "was",
];
let teamName;
let lastName;
let firstName;
//random team
function getTeam() {
  teamName = randomTeam();
  const url = `https://nba-players.herokuapp.com/players-stats-teams/${teamName}`;
  fetch(url)
    .then((res) => res.json()) // parse response as JSON
    .then((data) => {
      console.log(data);
      document.querySelector("#teamName").innerText = data[0].team_name;
      if (getMainColor(teamName) != undefined) {
        document.getElementById("stats").style.backgroundColor =
          getMainColor(teamName).hex;
        let li = document.querySelectorAll("li");
        li.forEach((x) => (x.style.color = getSecondaryColor(teamName).hex));
      }
    })
    .catch((err) => {
      console.log(`error ${err}`);
    });
  getPlayer();
}

//random player
function getPlayer() {
  const url = `https://nba-players.herokuapp.com/players-stats-teams/${teamName}`;
  fetch(url)
    .then((res) => res.json()) // parse response as JSON
    .then((data) => {
      let randomPlayer = random(0, data.length);
      document.querySelector("#playerName").innerText = data[randomPlayer].name;
      lastName = data[randomPlayer].name
        .split(" ")
        .pop()
        .toLowerCase()
        .replace("'", "")
        .replace(".", "");
      firstName = data[randomPlayer].name
        .split(" ")
        .shift()
        .toLowerCase()
        .replace("'", "")
        .replace(".", "");
      document.querySelector(
        ".points"
      ).innerText = `Points per game: ${data[randomPlayer].points_per_game}`;
      document.querySelector(
        ".rebounds"
      ).innerText = `Rebounds per game: ${data[randomPlayer].rebounds_per_game}`;
      document.querySelector(
        ".assists"
      ).innerText = `Assists per game: ${data[randomPlayer].assists_per_game}`;
      document.querySelector(
        ".steals"
      ).innerText = `Steals per game: ${data[randomPlayer].steals_per_game}`;
      document.querySelector(
        ".blocks"
      ).innerText = `Blocks per game: ${data[randomPlayer].blocks_per_game}`;
      document.querySelector(
        ".games"
      ).innerText = `${data[randomPlayer].games_played} games played`;
      document.querySelector(
        ".mins"
      ).innerText = `Minutes per game: ${data[randomPlayer].minutes_per_game}`;
      playerPic();
    })
    .catch((err) => {
      console.log(`error ${err}`);
    });
}
//random player pic
function playerPic() {
  const url = `https://nba-players.herokuapp.com/players/${lastName}/${firstName}`;
  fetch(url)
    // .then(res => res.json()) // parse response as JSON
    .then((data) => {
      let randomPlayer = random(0, data.length);
      if (!data.url) {
        document.querySelector("img").src =
          "https://spana.org/wp-content/uploads/2018/09/brown-donkey-eating-hay-1-500x480.jpg";
      } else {
        document.querySelector("img").src = data.url;
        console.log(data.url);
      }
    })
    .catch((err) => {
      console.log(`error ${err}`);
    });
}

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function randomTeam() {
  return `${teams[random(0, 29)]}`;
}
