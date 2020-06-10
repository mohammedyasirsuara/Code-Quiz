let score = 0;
let qindex = 0;
var quizQuestions = [{
        question: "What is 5*5+2?",
        answers: [
            '27',
            '12',
            '35',
            '50',
        ],
        correctAns: '27'
    },
    {
        question: "What is colour is the sun?",
        answers: [
            'blue',
            'orange',
            'pink',
            'white',
        ],
        correctAns: 'white'
    },
    {
        question: "What continent is Ethiopia located?",
        answers: [
            'Africa',
            'Europe',
            'Asia',
            'Antartica',
        ],
        correctAns: 'Africa'
    },
    {
        question: "Through which element do we include Javascript inside HTML: ",
        answers: [
            '<js>',
            '<javascript>',
            '<script>',
            '<include>',
        ],
        correctAns: '<script>'
    },
]

// Countdown timer function
var timerEl = $("#timeLeft");
let timeLeft = 50;
var timer;

function startTime() {
    timer = setInterval(function() {
        timeLeft--;
        if (timeLeft === 0) {
            alert("Time up");
            $("#question-page").hide();
            endQuiz();
        }
        timerEl.text(timeLeft);
    }, 1000);
}

//Event handler for when start button is clicked
$("#start-btn").on('click', function(event) {
    event.preventDefault();
    $("#start-page").hide();
    startTime();
    $("#question-page").show();
    displayQuestions();
});

// Function to display questions and answers
function displayQuestions() {
    let q = quizQuestions[qindex];
    $('#question-page ul').html("");
    $("#Question").text(q.question);
    for (var i = 0; i < q.answers.length; i++) {
        let button = $("<button class='btn btn-primary btn-md m-1'></button>");
        button.addClass("button-comp");
        button.attr("value", q.answers[i]);
        button.text(q.answers[i]);
        button.click(check);
        var List = $("<li></li>")
        List.append(button);
        $('#options').append(List);
    }
}

//method to check if answer is correct after button is clicked
function check() {
    let ans = quizQuestions[qindex];
    if (this.value === ans.correctAns) {
        score += 1;
        $("#correct").text("Correct!");
    } else {
        $("#correct").text("Wrong!");
        timeLeft -= 10;
        timerEl.text(timeLeft);
    }
    qindex++;

    if (qindex === quizQuestions.length) {
        endQuiz();
    } else {
        displayQuestions();
    }
}

//function to display the end page after quiz is done
function endQuiz() {
    clearInterval(timer);
    $("#start-page").hide();
    $("#question-page").hide();
    $("#end-page").show();
    $("#score").text(score);
    $("#qLength").text(quizQuestions.length);
}

//function to save the highscore
function saveScore() {
    let hscore = JSON.parse(localStorage.getItem("Highscore"));
    let name = $("#info").val()
    let uScore = score

    if (hscore == null) {
        hscore = [];
    }
    let info = {
        userName: name,
        userScore: uScore
    };

    hscore.push(info);
    hscore.sort((a, b) => b.userScore - a.userScore);
    localStorage.setItem('Highscore', JSON.stringify(hscore));
    window.location.replace("highscore.html")

}

$("#submitbtn").on('click', function(e) {
    e.preventDefault();
    saveScore();
})

$("#userInfo").on("submit", function(e) {
    e.preventDefault();
    saveScore();
})