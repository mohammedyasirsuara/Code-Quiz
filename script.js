let score = 0;
let qindex = 0;
var quizQuestions = [
    {
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
var timerEl= $("#timeLeft");
let timeLeft = 50;

function startTime(){
    timer = setInterval(function(){
        timeLeft--;
        if(timeLeft===0){
            alert("Time up");
            $("#question-page").hide();
            $("#summary-page").show();
            clearInterval(timer);
        }
        timerEl.text(timeLeft);
    }, 1000);
}

//Event handler for when start button is clicked
$("#start-btn").on('click', function(event){
    event.preventDefault();
    $("#start-page").hide();
    startTime();
    $("#question-page").show();
    displayQuestions();
});

// Function to display questions and answers
function displayQuestions(){
    let q = quizQuestions[qindex];
    $('#question-page ul').html("")
    $("#Question").text(q.question);
    for(var i=0; i<q.answers.length; i++){
        $('#options').append("<li><button class='btn btn-primary btn-lg' id=btn'"+i
        + "'>" + q.answers[i]+ "</button></li>") 
    }
}

 //method to check if answer is correct after button is clicked
 function check(choice){
    let ans = quizQuestions[qindex];
    if(ans.correctAns===choice){
        score+=1;
        $("#correct").text("Correct!");
    }else{
        timeLeft-=10;
        timerEl.text(timeLeft);
        $("#correct").text("Wrong!");
    }
    qindex++;

    if(qindex > quizQuestions.length){
        //showSummary
    }else{
        displayQuestions();
    }
 }

 //event handler for when an option is selected
 $("#options").on('click', 'button', function(){
    $('.choice').removeClass('choice');
    $(this).addClass('choice');

    if($('button.choice').length){
        let choice=parseInt($('button.choice').prop('id'));
        console.log(choice);
        check(choice);
    }
 })