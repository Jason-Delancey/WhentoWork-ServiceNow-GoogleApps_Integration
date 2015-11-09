/**
 * A custom google script that checks to see if UIs clock in on-time.
 * Runs at the end of each day
 * Made by Jason Delancey
*/
 
/* Make a time-driven trigger that runs the script every hour /
function createTimeDrivenTriggers(){
  /* Trigger runs at the end of each day./
  ScriptApp.newTrigger('myMaintenance')
      .timeBased()
      .atHour(23)
      .everyDays(1)
      .create();
}*/

function myMaintenance()
{
  
  /** Get the spreadsheet with the UI clock in/outs */
  var spreadsheet = SpreadsheetApp.getActive();
  spreadsheet.setSpreadsheetTimeZone("America/New_York")
  var clockSheet = spreadsheet.getSheetByName('Default');
  var rosterSheet = spreadsheet.getSheetByName('UI Roster');
  
  /** Get the w2w Calendar with all the UI shifts */
  var w2wCalendar = CalendarApp.getCalendarsByName('W2W Complete Schedule');
  w2wCalendar[0].setTimeZone("America/New_York");
  Logger.log('Found %s matching calendars.', w2wCalendar.length);
  Logger.log('Calendar time zone: %s', w2wCalendar[0].getTimeZone())
  
  /** Get the name and description of the w2w calendar */
  var calName = w2wCalendar[0].getName();
  var calDescription = w2wCalendar[0].getDescription();
  Logger.log('Calendar name: %s', calName);
  Logger.log('Calendar description: %s', calDescription);
  
  /** Get all of today's shifts from the calendar */
  var today = new Date();
  var shifts = w2wCalendar[0].getEventsForDay(today);
  Logger.log('Todays date: %s', today);
  Logger.log('Number of shifts for today: ' + shifts.length + '\n');
  
  /** Get the first shift for today 
  * get the name, location, and shift time from the shift array */
  var w2wShift = shifts[0].getTitle();
  w2wShift = w2wShift.split(" ");
  var firstName = w2wShift[0];
  var lastName = w2wShift[1];
  var shiftLocation = w2wShift[2];
  var shiftDuration = w2wShift[3].split("-");
  var startTime = shiftDuration[0];
  var endTime = shiftDuration[1];
  Logger.log(w2wShift);
  Logger.log(startTime);
  Logger.log(endTime);
  
  /** Find the UNI to match the person assigned to this shift from the UI Roster sheet */
  var shiftUni;
  var lastRow = rosterSheet.getLastRow();
  for(var i = lastRow; i > 0; i--)
  {
    var aRow = rosterSheet.getRange(i, 1, 1, 8);
    var aValue = aRow.getValues();
    var aLastName = aValue[0][0];
    var aFirstName = aValue[0][1];
    if(aFirstName.equals(firstName) && aLastName.equals(lastName))
    {
      shiftUni = aValue[0][2];
    }
  }
  Logger.log('First Name: %s', firstName);
  Logger.log('Last Name: %s', lastName);
  Logger.log('UNI: %s', shiftUni);
  Logger.log('Shift Location: %s', shiftLocation);
  Logger.log('Start Time: %s', startTime);
  Logger.log('End Time: %s' + '\n', endTime);
  
  /** Retrieve a clock entry, starting with the last entry */
  var lastRow = clockSheet.getLastRow();
  var aRow = clockSheet.getRange(lastRow, 1, 1, 3);
  var values = aRow.getValues();
  var date = values[0][0];
  var rowDate = date.toString().split(" ");
  rowDate2 = rowDate[0] + " " + rowDate[1] + " " + rowDate[2] + " " + rowDate[3] + " " + rowDate[4];
  var rowEmail = values[0][1];
  rowEmail = rowEmail.split("@");
  var clockUni = rowEmail[0];
  var clockLocation = values[0][2];
  clockLocation = clockLocation.split(" ");
  var clockType = clockLocation[1];
  clockLocation = clockLocation[0];
  Logger.log(rowDate);
  Logger.log('Clock Entry Date: %s', rowDate2);
  Logger.log('UNI: %s', clockUni);
  Logger.log('Shift Location: %s', clockLocation);
  Logger.log(clockType);
  
  /** Check to see if the clock entry matches the shift date */
  today = today.toString().split(" ");
  if(today[0].equals(rowDate[0]) && today[1].equals(rowDate[1]) && today[2].equals(rowDate[2]))
  {
    Logger.log('This shift matches the clock entrys date');
    
    /** Check to see if the clock entry matches the UNI of the shift */
    if(shiftUni.equals(clockUni))
    {
      Logger.log('This shift UNI also matches the clock entrys UNI');
      
      /** Check to see if the clock location matches the shift location */
      if(shiftLocation.equals(clockLocation))
      {
        Logger.log('This shift location also matches the clock entry location');
      }
    }
  }
  
  
  
  /** Check to see if the clock entry matches the start time of the shift */
  var clockTime = rowDate[4];
  clockTime = clockTime.split(":");
  clockHour = clockTime[0];
  clockMin = clockTime[1];
  if(clockType.equals('Clock-in'))
  {
    
  }
  
  /** Send an email containing the entire log file 
  GmailApp.sendEmail("jrd2172@columbia.edu", "Log Files", Logger.getLog());*/
}
