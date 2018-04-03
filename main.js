console.log('hello');


$( document ).ready(function() {
    console.log( "ready!" );

    var config = {
        apiKey: "AIzaSyAWWGKoVT9EC86PKAS0c6h6asPTUvoM5oE",
        authDomain: "train-times-6ed47.firebaseapp.com",
        databaseURL: "https://train-times-6ed47.firebaseio.com",
        projectId: "train-times-6ed47",
        storageBucket: "train-times-6ed47.appspot.com",
        messagingSenderId: "44425203979"
    };
    firebase.initializeApp(config);
    // Get a reference to the storage service, which is used to create references in your storage bucket
    var storage = firebase.storage();
    
    var database = firebase.database();
    

    
    //Button for adding Employees
    $("#formSubmit").on("click", function(event) {
        event.preventDefault();
    
    
        // Grabs user input
        var trainName = $("#trainNameInput").val().trim();
        var destination = $("#destinationInput").val().trim();
        var firstTrain = moment($("#firstTrainInput").val().trim(), "HH:mm").format("X");
        var frequentMin = $("#frequencyInput").val().trim();
    
        console.log(trainName);
        console.log(destination);
        console.log(firstTrain);
        console.log(frequentMin);
    
        // Clears all of the text-boxes
        //trainName.val("");
        //destination.val("");
        //firstTrain.val("");
        //frequentMin.val("");

        
    
        database.ref().push({
            trainName: trainName,
            destination: destination,
            firstTrain: firstTrain,
            frequentMin: frequentMin
        })
    });
    
    database.ref().on("child_added", function(snapshot) {
        
        // Change the HTML to reflect
        // var empName = snapshot.val().empName;
        // var empRole = snapshot.val().empRole;
        // var empStart = snapshot.val().empStart;
        // var empRate = snapshot.val().empRate;
    
        // Change the HTML to reflect
        var trainName = snapshot.val().trainName;
        var destination = snapshot.val().destination;
        var firstTrainVal = moment($("#firstTrainInput").val().trim(), "X").format("HH:mm");
        var firstTrain = snapshot.val().firstTrainVal;
        var frequentMin = snapshot.val().frequentMin;
        
        $("#trainTable > tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" + firstTrainVal + "</td><td>" + frequentMin  + "</td><td>" + "null" + "</td><td>" + "null" + "</td></tr>");
    
    })

});

