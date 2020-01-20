$(document).ready(function() {
  
   //initializing with the test flag
    const test = false;
  
    // using moment to get current time and format it to 
    const curTime = moment().format('MMMM Do YYYY');

    // adding curTime to the header to track for the user
    $("#datetime").append("Today is " + curTime);
  
    // commented out for test in non-standard hours
    let nowHour24 = moment().format('H');
    let nowHour12 = moment().format('h');
  
    // set times for testing after hours
    if (test) {
      nowHour24 = 13;
      nowHour12 = 1;
    }
  
    // Get stored todos from localStorage
    // Parsing the JSON string to an object
    let storedPlans = JSON.parse(localStorage.getItem("storedPlans"));
  
    // If todos were retrieved from localStorage, update the plan array to it
    if (storedPlans !== null) {
      planTextArr = storedPlans;
    } 

    else {

    // when the app is loaded - creating an array - length 9 (0-8) and adding a test task
     
      planTextArr = new Array(9);
      planTextArr[4] = "This is a test pre-stored task";
    }
  
    // this var references planner div in HTML
    let plannerDiv = $('#plannerContainer');

    // clear existing elements
    plannerDiv.empty();
  
    // build calendar by row for fix set of hours
    for (let hour = 9; hour <= 17; hour++) {

      // setting index for array of hours
      let index = hour - 9;
      
      // adding rows for hours
      let rowDiv = $('<div>');
      rowDiv.addClass('row');
      rowDiv.attr('hour-index',hour);
    
      // building Time box portion of row
      let col2TimeDiv = $('<div>');
      col2TimeDiv.addClass('col-md-2');
    
      // create timeBox element (contains time)
      const timeBoxSpn = $('<span>');
      
      // format hours for display
      let displayHour = 0;
      let ampm = "";
      if (hour > 12) { 
        displayHour = hour - 12;
        ampm = "pm";
      } else {
        displayHour = hour;
        ampm = "am";
      }
      
      // populate timeBox with time
      timeBoxSpn.text(`${displayHour} ${ampm}`);
  
      // insert into col insert into timebox
      rowDiv.append(col2TimeDiv);
      col2TimeDiv.append(timeBoxSpn);
     
  
      //  building input portion of row
      // build row components
      let dailyPlanSpn = $('<input>');
  
      dailyPlanSpn.attr('id',`input-${index}`);
      dailyPlanSpn.attr('hour-index',index);
      dailyPlanSpn.attr('type','text');
      dailyPlanSpn.attr('class','dailyPlan');
  
      // access index from data array for hour 
      dailyPlanSpn.val( planTextArr[index] );
      
      // create col to control width
      let colInputWidth = $('<div>');
      colInputWidth.addClass('col-md-9');
  
      // add col width and row component to row
      rowDiv.append(colInputWidth);
      colInputWidth.append(dailyPlanSpn);
      
  
      // building save portion of row
      let colSaveDiv = $('<div>');
      colSaveDiv.addClass('col-md-1');
  
      let saveBtn = $('<i>');
      saveBtn.attr('id',`saveid-${index}`);
      saveBtn.attr('save-id',index);
      saveBtn.attr('class',"far fa-save saveIcon");
      
      // add col width and row component to row
      rowDiv.append(colSaveDiv);
      colSaveDiv.append(saveBtn);
      // STOP building save portion of row
  
      // set row color based on time
      updateRowColor(rowDiv, hour);
      
      // add row to planner container
      plannerDiv.append(rowDiv);
    };
  
    // function to update row color
    function updateRowColor (hourRow,hour) { 
  
      if ( hour < nowHour24) {
        hourRow.css("background-color","lightgrey")
      } 
      else if ( hour > nowHour24) {
        hourRow.css("background-color","lightgreen")
      } 
      else {
        hourRow.css("background-color","tomato")
      }
    };
  
    // saves to local storage
   
    $(document).on('click','i', function(event) {
      event.preventDefault();  
  
      let index = $(this).attr('save-id');
  
      let inputId = '#input-'+index;
      let value = $(inputId).val();
  
      planTextArr[index] = value;
  
      localStorage.setItem("storedPlans", JSON.stringify(planTextArr));
    });  
  
  });