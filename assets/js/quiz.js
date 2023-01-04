// Create Questions/Options Object
// Initialize quiz on start quiz
// Start timer with decreasing interval
// Put in questions and options into game section
//      options will be need to be in buttons in order to register onclick event
//      one of the options will need to be recognized as the correct answer.
//      if correct answer is selected the it will change green on click
//      else if wrong answer is selected it will change red on click and timer will decrease by an amount of penalty time
//      regardless of correct or incorrect answer - once an option is clicked and after the indication of a correct or wrong answer is displayed, the page will load the next question.
// finalScore is calculated when either all questions are answered or when the Interval reaches 0 and is cleared.
//      Final score will be equivalent to the final timer count.
// Once the quiz is over, the user will be prompted to input their initials to save for the leaderboard
// If the user hits submit, the userData in the localstorage will be updated with the user's initials and score.
// check if takingQuiz for the following conditions: true for quiz, false for startPage, endScreen, and highScores
//      button will change display from hidden to block depending on page and type will be button or submit depending on page.
// Remember to clearInterval on page reset and once quiz is over.
