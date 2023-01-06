// This script will grab the localStorage data of the current leaderboard and display it based of off the highest to lowest scores to display on the highscores page.
var leaderboard = document.querySelector("tbody");
// leaderboard.remove();

var scores = JSON.parse(localStorage.getItem("scores"));

scores.forEach((data) => {
	var listScore = document.createElement("tr");
	var name = document.createElement("td");
	name.textContent = data.name;
	listScore.append(name);
	var score = document.createElement("td");
	score.textContent = data.score;
	listScore.append(score);
	leaderboard.append(listScore);
});
