//Global Variables
let correctAnswers = 0;
let wrongAnswers = 0;
let qNum = 1;
let QandAtime = 0;
let correctImg = "assets/images/correct.gif"
let correctText = "CORRECT!"
let wrongText = "WRONG!"
let wrongImg = "assets/images/wrong.gif"
let timer = '';
let audio = new Audio('assets/audio/Rick-and-Morty.mp3')

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
//Functions
//Start Game function
let StartGame = function () {
    //Clear section when clicked
    $("#start-game").on('click', function(){
        $(".question-area").empty();
        audio.play();
        createQandA();
    })
}
//Create Questions, Image and answers
let createQandA = function () {
    startTimer();
    //Attach div to qDiv
    let qDiv = $('<div>');
    let question = questAnswers[qNum].question;
    qDiv.addClass("h5")
    qDiv.text(question);
    $('.question-area').append(qDiv);
    let newImage = $('<img>');
    let image = questAnswers[qNum].image;
    newImage.attr('src', image);
    $('.question-area').append(newImage);
    //For Loop to print 4 Answer buttons
    for (let i = 0; i < questAnswers[qNum].answers.length; i++) {
        let newBtn = $("<button>");
        newBtn.addClass("btn btn-info btn-lg btn-block answers");
        newBtn.attr("data-type", questAnswers[qNum].answers[i]);
        newBtn.text(questAnswers[qNum].answers[i]);
        $(".question-area").append(newBtn);
    }
    $(document).off('click', '.answers', checkAnswers);
    $(document).on('click', '.answers', checkAnswers);
    // event.preventDefault();
}
//Check Answers
let checkAnswers = function () {
    //record user click
    let userAnswer = $(this).data("type");
    let correct = questAnswers[qNum].correct;
    // let wrong = questAnswers[qnum].wrong;


    if (userAnswer === correct) {
        //Award correct
        correctAnswers++;
        //Clear out question area
        $(".question-area").empty();
        //Get correct image
        let rightAnswerImg = $("<img>");
        rightAnswerImg.attr('src', correctImg);
        $(".question-area").append(rightAnswerImg);
        //create Div for correct text
        let newDiv = $("<div>");
        newDiv.addClass("display-4");
        newDiv.text(correctText);
        $(".question-area").append(newDiv);
        clearInterval(timer)
        //Add one to qNum to cycle through question
        qNum++;
        if(qNum <= 10){
            setTimeout(
                function () {
                    $(".question-area").empty();
                    createQandA();
                }, 3500);
        }
        //New
        else {
            $(".question-area").empty();
            let rightAnswerImg = $("<img>");
            rightAnswerImg.attr('src', correctImg);
            $(".question-area").append(rightAnswerImg);
            //create Div for correct text
            let newDiv = $("<div>");
            newDiv.addClass("display-4");
            newDiv.text(correctText);
            $(".question-area").append(newDiv);
            //Stop time
            clearInterval(timer)
			//Reset
			setTimeout(gameOver, 3500);
        }
    }
    else {
            wrongAnswers++;
            //Clear out question area
            $(".question-area").empty();
            let ImgWrong = $("<img>");
            ImgWrong.attr('src', wrongImg);
            $(".question-area").append(ImgWrong);
            //Add Wrong Text
            let wrongDiv = $("<div>");
            wrongDiv.addClass("display-4");
            wrongDiv.text(wrongText);
            $(".question-area").append(wrongDiv);
            clearInterval(timer);
            qNum++;
            if (qNum <= 10){
                setTimeout(function () {
                $(".question-area").empty();
                createQandA();    
                }, 3500);
            }
            else {
                $(".question-area").empty();
                let rightAnswerImg = $("<img>");
                rightAnswerImg.attr('src', correctImg);
                $(".question-area").append(rightAnswerImg);
                //create Div for correct text
                let newDiv = $("<div>");
                newDiv.addClass("display-4");
                newDiv.text(correctText);
                $(".question-area").append(newDiv);
                //Stop time
                clearInterval(timer)
                //Reset
                setTimeout(gameOver, 3500);
            }

    }
}
// Timer Area ->
let startTimer = function () {
    $(".timerSection").empty();
    //Add time to timer
    QandAtime = 100;
    //Target time area
    let timeDiv = $("<div>");
    timeDiv.addClass("time progress");
    let progressDiv = $("<div>");
    progressDiv.addClass("progress-bar progress-bar-striped bg-info");
    progressDiv.width(QandAtime + '%');
    $(".timerSection").append(timeDiv);
    $(".time").append(progressDiv);
    //Starts function to decrement time
    timer = setInterval(countdown, 100);
}

//Function to countdown the time
let countdown = function () {
    $(".progress-bar").width(QandAtime + '%');
    QandAtime--;
    //If time expires
    if (QandAtime === -10) {
        userAnswer = false;
        //Clears time
        clearInterval(timer);
        checkAnswers();
    }
}

//Function to end game and start over
let gameOver = function () {
    //Empty out question area and time area
    $(".question-area").empty();
    $(".timeSection").empty();
    //Create questions they got correct
    let correctTotal = $("<div>");
    correctTotal.addClass("headline-6")
    correctTotal.text("Correct: " + correctAnswers);
    $(".question-area").append(correctTotal);
    //Create questions they got wrong
    let wrongTotal = $("<div>");
    wrongTotal.addClass("headline-6")
    wrongTotal.text("Wrong: " + wrongAnswers);
    $(".question-area").append(wrongTotal);
    //Create Game Over Message
    let newDiv = $("<div>");
    newDiv.addClass("gameOver headline-5");
    newDiv.text("Game Over, Click the button if you would like to play again")
    $(".question-area").append(newDiv);
    //Create Button
    let newBtn = $("<button>");
    newBtn.addClass("btn btn-info btn-lg btn-block reset");
    newBtn.text("RESET");
    $(".question-area").append(newBtn);
    //Rest Values
    correctAnswers = 0;
    wrongAnswers = 0;
    qNum = 1;
    QandAtime = 100;
    //Function to record the click
    $(".reset").on('click', function () {
        $(".question-area").empty();
        //Start the game again
        createQandA();
        
    });    
}

// gameOver();

StartGame();
