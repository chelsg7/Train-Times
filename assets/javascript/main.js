console.log('hello');

$(document).ready(function() {
    console.log( "ready!" );
    
    var currentTime = moment();
    var currentTimeH1 = moment(currentTime, "HH:mm").format("HH:mm:ss")
    console.log ("current time : " + currentTimeH1);
    
  
// this is not updating like I want - why
    // var interval = setInterval(
    //     function(){
    //         $('#clock').html(currentTimeH1);
    //     }, 1000);
    


    
    var config = {
        apiKey: "AIzaSyAWWGKoVT9EC86PKAS0c6h6asPTUvoM5oE",
        authDomain: "train-times-6ed47.firebaseapp.com",
        databaseURL: "https://train-times-6ed47.firebaseio.com",
        projectId: "train-times-6ed47",
        storageBucket: "train-times-6ed47.appspot.com",
        messagingSenderId: "44425203979"
    }; // end config
    
    firebase.initializeApp(config);
    // Get a reference to the storage service, which is used to create references in your storage bucket
    var storage = firebase.storage();
    var database = firebase.database();

    //Button for adding trains
    $("#formSubmit").on("click", function(event) {
        event.preventDefault();
        
        // Grabs user input
        var trainName = $("#trainName").val().trim();
        var destination = $("#destination").val().trim();
        var firstTrain = $("#firstTrainTime").val().trim();
        var firstTrainConvert = moment(firstTrain, "HH:mm").format("X");
        var trainFrequent = $("#frequency").val().trim();
        
        // Clears all of the text-boxes
        $("#trainName").val("");
        $("#destination").val("");
        $("#firstTrainTime").val("");
        $("#frequency").val("");
        
        database.ref().push({
            newTrainName: trainName,
            newDestination: destination,
            newFirstTrainTime: firstTrain,
            newFirstConvert: firstTrainConvert,
            newTrainFrequency: trainFrequent,
        }); // end database ref push

    }); // end form submit

    database.ref().on("child_added", function(snapshot) {
            // Change the HTML to reflect
            var trainName = snapshot.val(). newTrainName;
            var destination = snapshot.val().newDestination;
            var firstTrainVal = moment(snapshot.val().newFirstConvert, "X").format("HH:mm");
            console.log("First Train Format : " + firstTrainVal);
            var firstTrainX = moment(snapshot.val().newFirstConvert, "X").format("X");
            console.log("First Train : " + firstTrainX);
            var frequentMinutes = snapshot.val().newTrainFrequency;
            
            // new variables for table
            var minutesUntilTrain = 0;
            var nextTimeTrain = 0;


            //math will go below here
            var currentTime = moment().subtract(1, "years");
            var currentTimeX = moment(currentTime).format("X");
            var currentTimeH = moment(currentTime).format("HH:mm");
            console.log ("current time x : " + currentTimeX);
            console.log ("current time h : " + currentTimeH);

            var tFrequency = frequentMinutes;
            console.log(tFrequency);

            var timeDifference = moment(currentTimeH, "HH:mm").diff(moment(firstTrainVal, "HH:mm"), "minutes");
            console.log ("Difference in Minutes : " + timeDifference);
            
            var timeRemain = timeDifference % tFrequency;
            console.log(timeRemain);
        
            var minutesNextTrain = tFrequency - timeRemain;
            console.log("Minutes to next train : " + minutesNextTrain);
        
            var nextTrainComes = moment().add(minutesNextTrain, "minutes");
            var nextTrainFormat = moment(nextTrainComes, "X").format("HH:mm");
            console.log("Train will come at X Time : " + nextTrainComes);
            console.log("Train will Arrive at : " + nextTrainFormat);

            minutesUntilTrain = nextTrainFormat;
            nextTimeTrain = minutesNextTrain;

            
            //appending to the table
            
            $("#trainTable > tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" + firstTrainVal + "</td><td>" + frequentMinutes  + "</td><td>" +  minutesUntilTrain + "</td><td>" + nextTimeTrain + "</td></tr>");
    }); // end child added
}); // end doc ready