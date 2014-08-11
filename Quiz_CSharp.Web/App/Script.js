//------------------------------------------------------------------
// Data
//------------------------------------------------------------------

//Array to hold questions in random order
var questionArray = [];

//Holde entire question object
var myQuestion = {};

//What Question we're on
var questionIndex = 0;

//Hold my array of answers
var answerBank = [];

//Running Total of Number of Correct Questions
var runningTotal = 0;

//How many questions we're on
var runningQuestion = 0;

//------------------------------------------------------------------
// Ajax Calls
//------------------------------------------------------------------
//Master Ajax Call
var masterAjax = function (method, url, success, data) {
    var xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.onload = function () {
        if (this.status >= 200 && this.status < 400) {
            if (this.response != "") {
                success(JSON.parse(this.response));
            }
            else {
                console.log(this.status +" "+ this.response);
            }
        }
        else {
            console.log(this.status+": Error on "+method);
        }
    }
    xhr.onerror = function () {
        console.log("Connection Error");
    }
    if (data) {
        xhr.send(JSON.stringify(data));
    }
    else {
        xhr.send();
    }
}
//Get all questions from database
var getAllQuestions = function () {
    masterAjax("GET", "/api/v1/ApiQuestion", getJustIds);
}
var getJustIds = function (data) {
    console.log("data: " + JSON.stringify(data));
    questionArray = data;
    shuffleOrder(questionArray);
    console.log(questionArray);
    console.log(questionArray[questionIndex]);
    document.getElementById("currentQuestionDiv").innerHTML = "<h3>Press start to begin</h3>";
    getOneQuestion(questionArray[questionIndex]);
}

//Get original question list from database
var getOneQuestion = function (id) {
    console.log(id);
    masterAjax("GET", "/api/v1/ApiQuestion/" + id, drawTable);
}
//------------------------------------------------------------------
// Logic
//------------------------------------------------------------------

//Draw Table Function
var drawTable = function (question) {
    //Clear Alert
    document.getElementById("alertDiv").innerHTML = "";

    //Progress Bar
    document.getElementById('progressBar').innerHTML = "<div class='progress-bar progress-bar-success' role='progressbar' aria-valuenow='60' aria-valuemin='0' aria-valuemax='100' style='width:" + (runningQuestion) / questionArray.length * 100 + "% ;>" + "<span class='sr-only'>" + "</span> </div>";
    //Create Table
    if (runningQuestion < questionArray.length) {
        //Create Array of answer bank questions
        answerBank[0] = "<tr>" + "<td class= 'correct' id='correctDiv'>" + "<input type='radio' id='correct1' name='answer' value = 'correct' />" + " &nbsp;&nbsp;" + question.Answers[0].AnAnswer + "</td>" + "</tr>";
        answerBank[1] = "<tr>" + "<td id='wrong1Div'>" + "<input type='radio' id='wrong1' name='answer' value = 'wrong'/>" + " &nbsp;&nbsp;" + question.Answers[1].AnAnswer + "</td>" + "<tr>";
        answerBank[2] = "<tr>" + "<td id='wrong2Div'>" + "<input type='radio' id='wrong2' name='answer' value='wrong'/>" + " &nbsp;&nbsp;" + question.Answers[2].AnAnswer + "</td>";
        answerBank[3] = "<tr>" + "<td id='wrong3Div'>" + "<input type='radio' name='answer'  id='wrong3' value='wrong'/>" + " &nbsp;&nbsp;" + question.Answers[3].AnAnswer + "</td>" + "</tr>";
        shuffleOrder(answerBank);

        //Draw Table
        holder = "<table>";
        // Question Row
        holder += "<tr>";
        holder += "<td>" + question.Question.AQuestion + "</td>";
        holder += "</tr>";
        //Answer Rows
        holder += answerBank[0];
        holder += answerBank[1];
        holder += answerBank[2];
        holder += answerBank[3];
        holder += "</table>";
    }
        //End - Show Score, Ask to Create a new question
    else {
        holder = "<table>";
        holder += "<tr>" + "<td class='final'>" + "You Final Score: "+score()+"%" + "<br/> <br/> </td>" + "</tr>";
        holder += "<tr>" + "<td>" + "<button class='btn btn-primary btn-large' onclick='modal.show()'> Create Your Own Question </button>" + "</td>" + "</tr>";
        holder += "</table>";
    }
    document.getElementById("currentQuestionDiv").innerHTML = holder;
    myQuestion = question;
};



var shuffleOrder = function shuffle(array) {
    var m = array.length, t, i;

    // While there remain elements to shuffle…
    while (m) {

        // Pick a remaining element…
        i = Math.floor(Math.random() * m--);

        // And swap it with the current element.
        t = array[m];
        array[m] = array[i];
        array[i] = t;
    }
    return array;
};

// Draw Table - Showing Answer
var drawTableAnswers = function () {

    // Track which radio user checked
    var correct = 0;
    var wrong1 = 0;
    var wrong2 = 0;
    var wrong3 = 0;
    if (document.getElementById('wrong1').checked) {
        wrong1 = 1;
    }
    if (document.getElementById('wrong2').checked) {
        wrong2 = 1;
    }
    if (document.getElementById('wrong3').checked) {
        wrong3 = 1;
    }
    if (document.getElementById('correct1').checked) {
        correct = 1;
    }
    console.log("correct:" + correct + ", wrong1: " + wrong1 + ", wrong2: " + wrong2 + ", wrong3: " + wrong3);

    //Draw Table
    if (questionIndex < questionArray.length) {

        holder = "<table>";
        // Question Row
        holder += "<tr>";
        holder += "<td>" + myQuestion.Question.AQuestion + "</td>";
        holder += "</tr>";
        //Answer Rows
        holder += answerBank[0];
        holder += answerBank[1];
        holder += answerBank[2];
        holder += answerBank[3];
        holder += "</table>";
        questionIndex++
    }
    else {
        holder = "<div well well-lg>" + "You Final Score: "+score()+"%" + "</div>";
    }
    document.getElementById("currentQuestionDiv").innerHTML = holder;

    //Change Background Colors
    document.getElementById('correctDiv').style.backgroundColor = "#6CDA6C";
    if (correct === 1) {
        document.getElementById('correct1').checked = "checked";
    }
    if (wrong1 === 1) {
        document.getElementById('wrong1Div').style.backgroundColor = "#FF8566";
        document.getElementById('wrong1').checked = "checked";
    }
    if (wrong2 === 1) {
        document.getElementById('wrong2Div').style.backgroundColor = "#FF8566";
        document.getElementById('wrong2').checked = "checked";
    }
    if (wrong3 === 1) {
        document.getElementById('wrong3Div').style.backgroundColor = "#FF8566";
        document.getElementById('wrong3').checked = "checked";
    }
};

//Evaluate Answer
var evaluateAnswer = function (i) {
    var valueSelected = "";
    //Get Radio Elements by Name document.getElementByName("answer")
    var radioAnswers = document.getElementsByName('answer');
    //Create to Find which radio button is checked
    for (var i in radioAnswers) {
        if (radioAnswers[i].checked) {
            valueSelected = radioAnswers[i].value
        }
    }
    //console.log("New Value Selected " + valueSelected);
    //Compare radio button array id to correct answer
    if (valueSelected === "correct") {
        runningTotal += 1;
        document.getElementById("alertDiv").innerHTML = "<br/> <div class='alert alert-info alert-dismissible' role='alert'>" + "<button type='button' class='close' data-dismiss='alert'><span aria-hidden='true'>&times;</span><span class='sr-only'>Close</span></button>" + "<strong> Correct! </strong> Current Score: " + runningTotal + "/" + questionArray.length + " " + "</div>";
    }
    else {
        document.getElementById("alertDiv").innerHTML = "<br/> <div class='alert alert-warning alert-dismissible' role='alert'>" + "<button type='button' class='close' data-dismiss='alert'><span aria-hidden='true'>&times;</span><span class='sr-only'>Close</span></button>" + "<strong> Incorrect! </strong> Current Score: " + runningTotal + "/" + questionArray.length + " " + "</div>";
    }
    //console.log("Running Total: " + runningTotal);
    score();
    //console.log("Running Score: " + score());
    //console.log("questionIndex: " + questionIndex);
    runningQuestion++;
};

//Grading Function
var score = function () {
    if (runningTotal !== 0) {
        return runningTotal / questionArray.length * 100;
    }
    else {
        return 0;
    }
};

//Function to Start the Quiz Over
var startOver = function () {
    if (questionIndex !== 0) {
        questionIndex = 0;
        runningTotal = 0;
        runningQuestion = 1;
    }
    getAllQuestions();
};

var myQuestionId = 0;
var modal = {
    //Show modal
    show: function () {
        document.getElementById("newQuestion").value = "";
        document.getElementById("correctAnswer").value = "";
        document.getElementById("wrongAnswer1").value = "";
        document.getElementById("wrongAnswer2").value = "";
        document.getElementById("wrongAnswer3").value = "";
        document.getElementById("modal-buttons").innerHTML = "<button type='button' class='btn btn-default' data-dismiss='modal'>Close</button><button type='button' class='btn btn-primary' onclick='modal.saveQuestion()' id='save-button'>Save</button>";
        $('#modal').modal();
    },

    //Hide modal and generate new question
    saveQuestion: function () {
        var VM = {};
        VM.Question = {};
        VM.Question.AQuestion = document.getElementById('newQuestion').value;
        //VM.Question.QuestionType = "multiple";
        VM.Answers = [];
        var Answer1 = {};
        Answer1.AnAnswer = document.getElementById('correctAnswer').value;
        Answer1.isCorrect = true;
        var Answer2 = {};
        Answer2.AnAnswer = document.getElementById('wrongAnswer1').value;
        Answer2.isCorrect = false;
        var Answer3 = {};
        Answer3.AnAnswer = document.getElementById('wrongAnswer2').value;
        Answer3.isCorrect = false;
        var Answer4 = {};
        Answer4.AnAnswer = document.getElementById('wrongAnswer3').value;
        Answer4.isCorrect = false;
        masterAjax("POST", "/api/v1/ApiQuestion", function (data) {
            VM.Question.Id = data;
            console.log(data);
            Answer1.questionId = data;
            Answer2.questionId = data;
            Answer3.questionId = data;
            Answer4.questionId = data;
            VM.Answers.push(Answer1, Answer2, Answer3, Answer4);
            masterAjax("POST", "/api/v1/ApiQuestion", modal.hide, VM)
        }, VM);
        $('#modal').modal("hide");
    },

    showEdit: function (id) {
        masterAjax("GET", "/api/v1/ApiQuestion/" + id, function (data) {
            document.getElementById("newQuestion").value = data.Question.AQuestion;
            document.getElementById("correctAnswer").value = data.Answers[0].AnAnswer;
            document.getElementById("wrongAnswer1").value = data.Answers[1].AnAnswer;
            document.getElementById("wrongAnswer2").value = data.Answers[2].AnAnswer;
            document.getElementById("wrongAnswer3").value = data.Answers[3].AnAnswer;
            document.getElementById("modal-buttons").innerHTML = "<button type='button' class='btn btn-default' data-dismiss='modal'>Close</button><button type='button' class='btn btn-primary' onclick='modal.saveEdit("+id+")' id='save-button'>Save</button>";
            $('#modal').modal();
        });
    },
    saveEdit: function (id) {
        masterAjax("GET", "/api/v1/ApiQuestion/" + id, function (editVM) {
            editVM.Question.AQuestion = document.getElementById("newQuestion").value;
            editVM.Answers[0].AnAnswer = document.getElementById("correctAnswer").value;
            editVM.Answers[1].AnAnswer = document.getElementById("wrongAnswer1").value
            editVM.Answers[2].AnAnswer = document.getElementById("wrongAnswer2").value
            editVM.Answers[3].AnAnswer = document.getElementById("wrongAnswer3").value
            // editVM.Id = 
            masterAjax("PUT", "/api/v1/ApiQuestion/" + id, function () {
                getOneQuestion(id);
                $('#modal').modal("hide");
                document.getElementById("newQuestion").value = "";
                document.getElementById("correctAnswer").value = "";
                document.getElementById("wrongAnswer1").value = "";
                document.getElementById("wrongAnswer2").value = "";
                document.getElementById("wrongAnswer3").value = "";
            }, editVM);
        });
    }
};

var addNewAnswers = function (answers, questionId) {
}
modal.hide = function(){
    //Clear Input Boxes
    document.getElementById('newQuestion').value = '';
    document.getElementById('correctAnswer').value = '';
    document.getElementById('wrongAnswer1').value = '';
    document.getElementById('wrongAnswer2').value = '';
    document.getElementById('wrongAnswer3').value = '';
};

//------------------------------------------------------------------
// CRUD
//------------------------------------------------------------------
var deleteQuestion = function (id) {
    console.log("delete: " + id);
    masterAjax("DELETE", "/api/v1/ApiQuestion/" + id, function () {
        questionIndex++;
        getOneQuestion(questionArray[questionIndex]);
    }, id);
}

//------------------------------------------------------------------
// OnLoad Functions
//------------------------------------------------------------------
getAllQuestions();

//holder = "<div class='form-group'>";
//holder += "<label class='col-sm-4 control-label'>New Question</label>";
//holder += "<div class='col-sm-8'>";
//holder += "<input type='text' class='form-control' id='newQuestion' placeholder='Question'>";
//holder += "</div>";
//holder += "</div>";
//holder += "<div class='form-group'>";
//holder += "<label class='col-sm-4 control-label'>Correct Answer</label>";
//holder += "<div class='col-sm-8'>";
//holder += "<input type='text' class='form-control' id='correctAnswer' placeholder='Correct Answer'>";
//holder += "</div>";
//holder += "</div>";
//holder += "<div class='form-group'>";
//holder += "<label class='col-sm-4 control-label'>Wrong Answer #1</label>";
//holder += "<div class='col-sm-8'>";
//holder += "<input type='text' class='form-control' id='wrongAnswer1' placeholder='Answer'>";
//holder += "</div>";
//holder += "</div>";
//holder += "<div class='form-group'>";
//holder += "<label class='col-sm-4 control-label'>Wrong Answer #2</label>";
//holder += "<div class='col-sm-8'>";
//holder += "<input type='text' class='form-control' id='wrongAnswer2' placeholder='Answer'>";
//holder += "</div>";
//holder += "</div>";
//holder += "<div class='form-group'>";
//holder += "<label class='col-sm-4 control-label'>Wrong Answer #3</label>";
//holder += "<div class='col-sm-8'>";
//holder += "<input type='text' class='form-control' id='wrongAnswer3' placeholder='Answer'>";
//holder += "</div>";
//holder += "</div>";