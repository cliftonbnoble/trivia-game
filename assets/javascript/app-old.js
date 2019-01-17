//Global Variables
let timer = '';
let correctAnswers = 0;
let wrongAnswers = 0;
let qNum = 1;
let timeBar = 0;
let correctImg = "assets/images/correct.gif"
let wrongImg = "assets/images/wrong.gif"

//Object that holds Questions, Answers, and images
let questAnswers = {
    1: {question: "Which McDonald’s dipping sauce is Rick obsessed with?",
    answers: ["Tangy Ranch Dip", "Szechaun Sauce", "Sticky BBQ Sauce", "Honey Mustard"],
    correct: "Szechaun Sauce",
    wrong: "Wrong!",
    image: "assets/images/rickandmorty1.jpg",
    },
    2: {question: "Which song do Rick and Morty use to save the world?",
    answers: ["Get Springy", "Get Splurgey", "Get Schwifty", "Get Shrinky"],
    correct: "Get Schwifty",
    wrong: "Wrong!",
    image: "assets/images/rickandmorty2.gif"
    },
    3: {question: "What movie is Rick and Morty a homage to?",
    answers: ["Looper", "The Terminator", "Twelve Monkeys", "Back to the Future"],
    correct: "Back to the Future",
    wrong: "Wrong!",
    image: "assets/images/rickandmorty3.jpg",
    },
    4: {question: "Which dimension are our Rick and Morty (ostensibly) from?",
    answers: ["C-137", "G-677", "Y-243", "F-345"],
    correct: "C-137",
    wrong: "Wrong!",
    image: "assets/images/rickandmorty4.gif",
    },
    5: {question: "What food does Rick turn himself into?",
    answers: ["Gherkin", "Green Pepper", "Cucumber", "Pickle"],
    correct: "Pickle",
    wrong: "Wrong!",
    image: "assets/images/rickandmorty5.gif"
    },
    6: {question: "Who is this superhero team?",
    answers: ["Revengers", "Vindicators", "Justice Squad", "Requiters"],
    correct: "Vindicators",
    wrong: "Wrong!",
    image: "assets/images/rickandmorty6.jpg"
    },
    7: {question: "It was revealed in \"The Ricks Must Be Crazy\" that Rick modified Morty's DNA structure so he can transform into a what?",
    answers: ["Car", "Cat", "Cow", "Bus"],
    correct: "Car",
    wrong: "Wrong!",
    image: "assets/images/rickandmorty7.gif"
    },
    8: {question: "Who is this character?",
    answers: ["Mr. Meeseeks", "Mr. Minotels", "Mr. Morkels", "Mr. Mikelos"],
    correct: "Mr. Meeseeks",
    wrong: "Wrong!",
    image: "assets/images/rickandmorty8.gif"
    },
    9: {question: "What does Rick use to travel between dimensions and universes?",
    answers: ["Space Laser", "Portal gun", "Tardis", "Universe Key"],
    correct: "Portal gun",
    wrong: "Wrong!",
    image: "assets/images/rickandmorty9.gif"
    },
    10: {question: "What is the name of the park Rick builds inside a homeless man?",
    answers: ["Anatomy Park", "Anatomical Fair", "Anatomy Works", "Anatomical World"],
    correct: "Anatomy Park",
    wrong: "Wrong!",
    image: "assets/images/rickandmorty10.gif"
    },
}
// console.log(questAnswers[1].question);
// console.log("answers", questAnswers[1].answers.length);
// console.log(questAnswers[1].correct);

//functions
//Create answers
let createAnswers = function () {
    //create for loop to print 4 answer buttons
    for (let i = 0; i < questAnswers[qNum].answers.length; i++) {
        let newBtn = $("<button>");
        newBtn.addClass("btn btn-info btn-lg btn-block data-type");
        newBtn.attr("data-letter", questAnswers[qNum].answers[i]);
        newBtn.text(questAnswers[qNum].answers[i]);
        $(".question-area").append(newBtn);
    }
    $(document).off('click', checkAnswers);
    $(document).on('click', checkAnswers);
    checkAnswers();
}


//function to check answers and assign score
let checkAnswers = function () {
    //function to get user clicks
    $('.data-letter').on('click', function() {
        console.log('.data-letter');
    })
    //Get users click
    let userAnswer = $(this).data('type');
    //Store correct answer
    let correct = questAnswers[qNum].correct;
    let wrong = questAnswers[qNum].wrong;
    console.log(userAnswer);

    if (userAnswer === correct) {
        correctAnswers++;
        qNum++;
        $(".question-area").empty();
        // let correctPic = $("<img>"),
        // correctPic.attr('src', correctImg),
        // $(".question-area").append(correctPic);
    } 
    if (userAnswer !== correct) {
        wrongAnswers++;
        qNum++;   
    }
    // if (qNum <= 10) {
    //     setTimeout(() => {
    //         $(".question-area").empty();
    //         createQuestions();
    //         createAnswers();
    //     }, 3500);
    // console.log(correct);
    // console.log(wrong);
    // console.log("User Click", userAnswer);    
    }
    
// }
    
    
    

//Function to create questions
let createQuestions = function () {
    startTimer();
    //create variable to store question from object
    let question = questAnswers[qNum].question;
    let newDiv = $("<div>");
    //Print question
    $(".question-area").text(question);
    
    //append new div after question
    $(".question-area").append(newDiv);
    //Create variable to hold image element
    let newImage = $("<img>");
    //set attributes for image
    newImage.attr('src',questAnswers[qNum].image);
    //Appeand image to question area
    $(".question-area").append(newImage);
    createAnswers();
}
//function to start timer and append to timer area
let startTimer = function () {
    $(".timerSection").empty();
    timeBar = 100;
    //Target a status bar
    let timeDiv = $("<div>");
    timeDiv.addClass('time');
    timeDiv.addClass('progress');
    let bar = $("<div>");
    bar.addClass('progress-bar');
    bar.width(timeBar + '%');

    // $('.timerSection').apend(timeDiv);
    $('.timeSection').append(timeDiv);
    timer = setInterval(countDown, 100);    
}
//Function to decrement the timer
let countDown = function () {
    //Target timerSection
    $(".timerSection").width(timeBar + "%");
    timeBar--;
    //If it times out
    if (timeBar === 0) {
        userAnswer = false;
        //Clear time
        clearInterval(timer);
        checkAnswers();
    }


    
}
//Game Over function.  Show totals
let gameOver = function () {
    //Remove everything in trivia section
	$('.question-area').empty();
	//Remove everthing in timer section
	$('.timerSection').empty();
	var scoreDiv = $('<div>');
	scoreDiv.addClass('score');
	scoreDiv.html('Correct: ' + correctAnswers + '<br>' + 'Wrong: ' + wrongAnswers);
	$('.question-area').append(scoreDiv);
	//Assign new div element to new Div
	var newDiv = $('<div>');
	//add class to new Div
	newDiv.addClass('gameOver');
	//add game over text
	newDiv.text('Game Over! Play Again ?');
	//Append game over text to DOM
	$('.question-area').append(newDiv);
	//Create ResetButton
	var newBtn = $('<button>');
	//Give btn Class
	newBtn.addClass('btn btn-info btn-lg btn-block data-type');
	//Give btn reset Text
	newBtn.text('Reset');
	//Append
	$('.question-area').append(newBtn);
	//Reset all value
	trivTime = 100;
	qACount = 1;
	correctAnswers = 0;
	wrongAnswers = 0;
	//When reset button is clicked.......
	$('.resetBtn').on('click',function(){
		$('.question-area').empty()
		//Starts game over
		createQuestions();
	});
    
}
//function to take click to start game
let startGame = function () {
    $("#start-game").on("click", function () {
        //Emptys area
        $(".question-area").empty();
        //Calls function to create questions
        createQuestions();
        
    })
}

//Start of Quiz
//=================================================================================================================================================================
startGame();












//OLD CODE


// let question = questAnswers[1].question;
// $(".question-area").text(question);
// let newDiv = $("<div>");
// $(".question-area").append(newDiv);
// let newImage = $("<img>");
// newImage.attr('src',questAnswers[1].image);
// $(".question-area").append(newImage);
// for (let i = 0; i < questAnswers[1].answers.length; i++) {
//     let newBtn = $("<button>");
//     newBtn.addClass("btn btn-info btn-lg btn-block");
//     newBtn.attr("data-letter", questAnswers[1].answers[i]);
//     newBtn.text(questAnswers[1].answers[i]);
//     $(".question-area").append(newBtn);
    
// }
    
// }