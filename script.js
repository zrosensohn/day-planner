// $( document ).ready(function() {

    //Pre loader
    $(function(){
        $(".loader").fadeOut(1000, function() {
            $(".content").fadeIn(1000);
        });
    });
    //////////////////////

    // Time for the header
    function showTime() {
        var a = moment().format("dddd[, ] MMMM Do[, ] YYYY[, ] HH:mm:ss");
        $("#currentDay").text(a); 
    }
    setInterval(showTime, 250);
    ////////////////////////////////////////////

    //create and instantiate array
    var toDoArray = [];

    //check if storage exists, if so print it, if not initialize storage array
    console.log(localStorage.getItem("To Do Items"));
    if(!localStorage.getItem("To Do Items")){
        initializeArray();
    }else {
        getStorage();
        console.log("getting storage");
    }

    //initialize array of objects and push copy to local storage
    function initializeArray(){
        for(i=8; i<19; i++){
            toDoArray.push({
                hour: i,
                toDo: ""
            });
        }
        var toDoString = JSON.stringify(toDoArray);
        localStorage.setItem("To Do Items", toDoString);
    }
    /////////////////////////////////////////////

    //Local Storage
    //overwrite single item to toDoArray and send copy to local storage
    function addToStorage(hour){
        var input = $("#" + hour);
        index = parseInt(input.attr("id")) - 8;
        toDoArray[index].toDo = input.val();
        var toDoString = JSON.stringify(toDoArray);
        localStorage.setItem("To Do Items", toDoString);
    }

    //loop parse and loop over storage array and add value attribute to each todoblock
    function getStorage(){
        var ls = localStorage.getItem("To Do Items")
        var toDoArrayFromStorage = JSON.parse(ls);
        toDoArray = toDoArrayFromStorage;
        for(i=0; i<11; i++){
            var hour = i + 8;
            $("#" + hour).attr("value", toDoArray[i].toDo);
        }
    }
    ////////////////////////////////////////////////

    // Create ToDo Blocks
    function initialize(){
        for(i=8; i<19; i++){
            var containerDiv = $("<div>");
            var timeDiv = $("<div>").text(moment(i, "HH:mm").format("HH:mm"));
            var toDoDiv = $("<div>");
            var input = $("<input>");
            var saveDiv = $("<div>");
            var saveButton = $("<button>")
            var icon = $("<i>");
        
            containerDiv.addClass("hourBlock d-flex mb-1");
            timeDiv.addClass("time mr-3 p-2");
            toDoDiv.addClass("todo flex-grow-1 mr-3 p-2");
            input.addClass("form-control");
            input.addClass("block-display");
            input.attr({name: "", id: i, type: "text", disabled: "", value: toDoArray[i-8].toDo});
            saveDiv.addClass("button-container p-2");
            saveButton.addClass("btn btn-primary saveButton");
            saveButton.attr("data-hour", i);
            icon.addClass("fas fa-lock");
        
            //Append Itmes
            $("#plannerContainer").append(containerDiv);
            toDoDiv.append(input);
            saveDiv.append(saveButton);
            saveButton.append(icon)
            containerDiv.append(timeDiv, toDoDiv, saveDiv);
        }
    }initialize();
    ///////////////////////////////////////////////////////

    //Grey out past events color current hour color available slots
    function pastEvent(){
        $(".time").each((_index, element) => {
        var hourBlockMoment = moment($(element).text(), "HH:mm:ss");
        var currentTime = moment();
        if (moment(currentTime, "hour").isSame(hourBlockMoment, "hour")){
                $(element).parent().removeClass("available-time");
                $(element).parent().addClass("current-time");
        } else if ( moment(currentTime).isAfter(hourBlockMoment)){
                $(element).parent().removeClass("current-time");
                $(element).parent().addClass("past-time");
        } else {
                $(element).parent().addClass("available-time");
        }
        })
    }
    setInterval(pastEvent, 250);
    ////////////////////////////////////////////////////////

    //Save and Lock values
    $(".saveButton").on("click", function(e){
        console.log("click");
        var hour = $(this).attr("data-hour");
        var icon = $(this).children();
        var input = $("#" + hour);
        var disabled = input.attr("disabled");
        if (disabled === "disabled") {
            input.removeAttr("disabled");
            icon.removeClass();
            icon.addClass("fas fa-unlock-alt");
        } else {
            input.attr("disabled","");
            icon.removeClass();
            icon.addClass("fas fa-lock")
            addToStorage(hour);
            getStorage();
        }
    });
    ////////////////////////////////////

    //Clear function
    $("#clear").on("click", function(e){
        e.preventDefault();
        alert("Are you sure?");
        toDoArray=[];
        for(i=0; i<11; i++){
            var hour = i + 8;
            $("#" + hour).val("");
        }
        initializeArray();
        getStorage();
    })
    /////////////////////////////////////
// });



