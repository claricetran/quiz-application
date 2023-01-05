// Create Questions/Options Object
// variables for elements to manipulate
var returnHome = document.getElementById("return");
var countdown = document.getElementById("countdown");
var timerDisplay = document.getElementById("timer");
var question = document.getElementById("question");
var totalQSection = document.getElementById("total-q-section");
var currQDisplay = document.getElementById("currQ");
var totalQDisplay = document.getElementById("totalQ");
var description = document.getElementById("description");
var options = document.getElementById("options");
var startButton = document.getElementById("start-button");

var showHideEl = [returnHome, countdown, question, totalQSection];
var timeLeft;

// function to hide a specified element
function hideEl(el) {
	el.style.display = "none";
}
// function to show a hidden element
function showEl(el) {
	el.style.display = "unset";
}

// On pageload, the elements for the quiz are hidden
function init() {
	showHideEl.forEach((el) => {
		hideEl(el);
	});
}

// Initialize quiz on start quiz
function startQuiz() {
	// on quiz start display the return home, countdown, and question elements
	showHideEl.forEach((el) => {
		showEl(el);
	});
	// on quiz start hide the quiz description and start button
	hideEl(description);
	hideEl(startButton);

	//Timer count initiated
	timeLeft = 10;
	timerDisplay.textContent = timeLeft;
	startTimer();
	if (timer === 0) {
		return;
	}
}

// Start timer with decreasing interval
function startTimer(event) {
	timer = setInterval(function () {
		timeLeft--;
		timerDisplay.textContent = timeLeft;
		if (timeLeft <= 0) {
			timeLeft = 0;
			clearInterval(timer);
			showScore();
		}
	}, 1000);
}
// Put in questions and options into game section
//      options will be need to be in buttons in order to register onclick event
//      one of the options will need to be recognized as the correct answer.
//      if correct answer is selected the it will change green on click
//      else if wrong answer is selected it will change red on click and timer will decrease by an amount of penalty time
//      regardless of correct or incorrect answer - once an option is clicked and after the indication of a correct or wrong answer is displayed, the page will load the next question.

// finalScore is calculated when either all questions are answered or when the Interval reaches 0 and is cleared.
// Once the quiz is over, the user will be prompted to input their initials to save for the leaderboard
function showScore() {
	// display score
	question.textContent = "Your final score is " + timeLeft + ".";

	//Create form for user to input their initials to save their score locally
	var user = document.createElement("input");
	user.setAttribute("type", "text");
	user.setAttribute("maxlength", "3");
	user.setAttribute("name", "initials");
	user.setAttribute("placeholder", "Enter initals here (3 max)");
	user.setAttribute("size", user.getAttribute("placeholder").length);

	//Create button for user to submit their score
	var userSubmit = document.createElement("button");
	userSubmit.setAttribute("type", "button");
	userSubmit.textContent = "Submit Score";

	options.append(user);
	options.append(userSubmit);
	// If the user hits submit, the userData in the localstorage will be updated with the user's initials and score.
	userSubmit.addEventListener("click", function () {
		// if user attempts to submit without inputting initials, then does not let user submit the score.
		if (user.value.length == 0) {
			return;
		}
		// empty array to store user scores for sorting
		var scores = [];

		// Final score will be equivalent to the final timer count.
		var newUser = {
			name: user.value.trim(),
			score: timeLeft,
		};

		var storedScores = JSON.parse(localStorage.getItem("scores"));
		if (storedScores !== null) {
			scores = storedScores;
		}

		scores.push(newUser);
		scores.sort((a, b) => a.score - b.score);
		localStorage.setItem("scores", JSON.stringify(scores));
		location.href = "./highscores.html";
	});
}

// TODO: Remember to clearInterval on page reset and once quiz is over.
init();

startButton.addEventListener("click", startQuiz);
