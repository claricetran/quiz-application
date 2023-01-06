// Questions for quiz
var questions = [
	{
		question: "Javascript is a(n) _____ language.",
		options: ["Object-oriented", "Object-based", "Procedural"],
		answer: "Object-oriented",
	},
	{
		question: "Which of the following words is used to define a variable in Javascript?",
		options: ["is", "var", "have", "variable"],
		answer: "var",
	},
	{
		question: "Which function is used to serialize an object into a JSON string in Javascript?",
		options: ["parse()", "convert()", "toString()", "stringify()"],
		answer: "stringify()",
	},
	{
		question: "Which method cancels an interval event?",
		options: ["endInterval()", "clearTimer()", "clearInterval()", "intervalEnd()"],
		answer: "clearInterval()",
	},
	{
		question: 'What is the result of var a = 2 + "3"; console.log(a); ?',
		options: ["5", "23", "2 3"],
		answer: "23",
	},
	{
		question: "Which method is used to write to a browser console?",
		options: ["console.log()", "console.output()", "console.write()", "console.text()"],
		answer: "console.log()",
	},
	{
		question: "A variable declared with var can be redeclared in javascript.",
		options: ["True", "False"],
		answer: "True",
	},
	{
		question: "A variable declared with let can be redeclared in javascript.",
		options: ["True", "False"],
		answer: "False",
	},
	{
		question: "How many keywords are there in JavaScript to declare variables or constants?",
		options: ["1", "2", "3", "4"],
		answer: "3",
	},
	{
		question: "Which section of the following lines is how a for loop is initialized?",
		options: ["var x = 0;", "x < 0;", "x++"],
		answer: "var x = 0;",
	},
];

// variables for elements to manipulate
var returnHome = document.getElementById("return");
var countdown = document.getElementById("countdown");
var timerDisplay = document.getElementById("timer");
var questionDisplay = document.getElementById("question");
var totalQSection = document.getElementById("total-q-section");
var currQDisplay = document.getElementById("currQ");
var totalQDisplay = document.getElementById("totalQ");
var description = document.getElementById("description");
var optionsDisplay = document.getElementById("options");
var startButton = document.getElementById("start-button");

var showHideEl = [returnHome, countdown, questionDisplay, totalQSection];
var timeLeft;
var timer;
var currQ = 1;
var tempQuestionsArray;
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
	description.textContent =
		"The following quiz is on the topic of Javascript. You will be timed and your score will be based off of your remaining time. Any incorrect answers will decrease your timer and thus decrease your score.";
}

// Initialize quiz on start quiz
function startQuiz() {
	// on quiz start display the return home, countdown, and question elements
	showHideEl.forEach((el) => {
		showEl(el);
	});
	// on quiz start hide the quiz description and start button
	description.textContent = "";
	hideEl(startButton);

	//Timer count initiated
	timeLeft = 100;
	timerDisplay.textContent = timeLeft;
	startTimer();
	totalQDisplay.textContent = questions.length;
	questionLoad(questions, currQ);
}

// Start timer with decreasing interval
function startTimer(event) {
	timer = setInterval(function () {
		timeLeft--;
		timerDisplay.textContent = timeLeft;
		if (timeLeft <= 0) {
			timeLeft = 0;
			showScore();
		}
	}, 1000);
}

// return random number based on inputed size
function randomIndex(size) {
	return Math.floor(Math.random() * size);
}

//loads next question
function questionLoad(arr, currQuestion) {
	currQDisplay.textContent = currQuestion;
	if (arr.length == 0) {
		showScore();
	}
	questionDisplay.textContent = "";
	optionsDisplay.innerHTML = "";
	description.textContent = "";
	//.slice must be called in order for a copy of the array to be made to tempQuestionsArray
	tempQuestionsArray = arr.slice();
	var selectedQuestion = randomIndex(arr.length);
	// Put in questions and options into game section
	questionDisplay.textContent = arr[selectedQuestion].question;

	var loadOptions = arr[selectedQuestion].options;
	//options will be need to be in buttons in order to register onclick event
	while (loadOptions.length > 0) {
		var selectedIndex = randomIndex(loadOptions.length);
		var selectedRandomOption = loadOptions[selectedIndex];
		var option = document.createElement("button");
		//one of the options will need to be recognized as the correct answer.
		if (selectedRandomOption == arr[selectedQuestion].answer) {
			option.setAttribute("class", "options");
			option.setAttribute("id", "correct");
			option.setAttribute("value", "correct");
		} else {
			option.setAttribute("class", "options");
			option.setAttribute("value", "wrong");
		}
		option.textContent = selectedRandomOption;
		optionsDisplay.append(option);
		loadOptions.splice(selectedIndex, 1);
	}
	tempQuestionsArray.splice(selectedQuestion, 1);
}
// regardless of correct or incorrect answer - once an option is clicked and after the indication of a correct or wrong answer is displayed, the page will load the next question.

// finalScore is calculated when either all questions are answered or when the Interval reaches 0 and is cleared.
// Once the quiz is over, the user will be prompted to input their initials to save for the leaderboard
function showScore() {
	// display score
	clearInterval(timer);
	description.textContent = "";
	hideEl(totalQSection);
	hideEl(countdown);
	questionDisplay.textContent = "Your final score is " + timeLeft + ".";

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
	options.innerHTML = "";
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
		//if there is previous data of high scores tehn the empty array will be filled os it can be updated, otherwise this can be skipped if the first saved score.
		if (storedScores !== null) {
			scores = storedScores;
		}
		//adds newUser to scores object array
		scores.push(newUser);
		//sorts the items in the array by their score value
		scores.sort((a, b) => b.score - a.score);
		//all scores are stored locally
		localStorage.setItem("scores", JSON.stringify(scores));
		location.href = "./highscores.html";
	});
}

// TODO: Remember to clearInterval on page reset and once quiz is over.
init();

// event listener to start quiz
startButton.addEventListener("click", startQuiz);
//if correct answer is selected the it will change green on click - done in css
//else when the wrong answer is selected it will change red on click and timer will decrease by an amount of penalty time
//TODO: need event listener to know user selection
optionsDisplay.addEventListener("click", function (event) {
	//if a button in the options form section is clicked
	if (event.target.matches("button")) {
		showEl(description);
		if (event.target.getAttribute("value") == "wrong") {
			timeLeft -= 5;
			description.textContent = "Wrong.";
		} else {
			description.textContent = "Correct.";
		}
		setTimeout(() => {
			description.textContent = "";
		}, 1000);
		console.log(currQ + " " + questions.length);
		if (currQ < questions.length) {
			//increase what the question number is currently at if going onto the next question
			currQ++;
			setTimeout(questionLoad(tempQuestionsArray, currQ), 2000);
		} else {
			showScore();
		}
	}
});
