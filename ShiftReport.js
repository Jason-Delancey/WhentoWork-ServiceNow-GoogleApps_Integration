/**
 * A custom script that makes a report of a UI's most recent clocks.
 * Made by Jason Delancey
*/

/**
 * A special function that runs when the spreadsheet is open, used to add a
 * custom menu to the spreadsheet.
 * This is used to add the menu 'UI Clock Report' to the spreadsheet toolbar.
 */
function onOpen() 
{
  var spreadsheet = SpreadsheetApp.getActive();
  var menuItems = [
    {name: 'Generate most recent clocks for a UI', functionName: 'generateClocks_'}
  ];
  spreadsheet.addMenu('UI Clock Report', menuItems);
}

/**
 * Creates a new sheet containing a report of clocks from a worker, from the "Default" sheet 
 * using the UNI that the user selected.
 */
function generateClocks_() 
{
  var spreadsheet = SpreadsheetApp.getActive();
  var defaultSheet = spreadsheet.getSheetByName('Default');
  defaultSheet.activate();

  // Prompt the user for the UNI of the UI to be searched.
  var selectedUni = Browser.inputBox('UI Clock Report',
      'Please enter the UNI of the UI you wish to look-up' +
      ' (for example, "jrd2172"):',
      Browser.Buttons.OK_CANCEL);
  if (selectedUni == 'cancel') 
  {
    return;
  }
  
  //Make sure each letter in the UNI is lower case
  var letterCounter = 0;
  for(var i = 0; i < selectedUni.length - 1; i++)
  {
    if(typeof selectedUni.charAt(i) !== 'number')
    {
      letterCounter++;
    }
  }
  selectedUni = selectedUni.substring(0,letterCounter).toLowerCase() + selectedUni.substring(letterCounter);
  
  //An array used to holds the rows that match the selectedUni
  var matchedRows = [];
  
  /** Search rows for the selectedUni. It starts from the last row and 
  * scans for the the most recent 50 matches or 200 lines, whichever
  * comes first.
  */
  var rowCounter = 0;
  var matchCounter = 0;
  for(var i = defaultSheet.getLastRow(); i > 1 ; i--)
  {
    //Retrieve the row
    var rowNumber = i;
    var row = defaultSheet.getRange(rowNumber, 1, 1, 3);
    var rowValues = row.getValues();
    
    //Extract each cell from the row
    var timeStamp = rowValues[0][0];
    
    //shiftData contains both the shift location and clock in/out
    var shiftData = rowValues[0][2];
    
    //To retrieve the shiftLocation and clockInfo, we use a helper function
    var shiftLocation = extractShiftLocation(shiftData);
    var clockInfo = extractClockInfo(shiftData);
    
    var email = rowValues[0][1];
    
    //Make sure each row does not have an empty cell
    if (!timeStamp || !shiftData || !email) 
    {
      Browser.msgBox('Error', 'Row ' + rowNumber + ' may have an empty cell.',
        Browser.Buttons.OK);
      return;
    }
    
    /** Extract the UNI from the email address provided in the default spreadsheet
    * This uses a helper function defined at the bottom of the script.
    */
    var aUni = extractUni(email);
   
    if (!aUni) 
    {
      Browser.msgBox('Error', 'Row ' + rowNumber + ' does not contain a UNI.',
         Browser.Buttons.OK);
    }
    
    //Get the name associated with the UNI. This uses a custom switch.
    var aName;
    
    /** This is a switch used to retrieve the name associated with each UNI 
  * @param {STRING} aUni The UNI of the UI.
  * @return {STRING} The name associated with the UNI.
  */
  switch(aUni)
  {
    case 'jrd2172':
      aName = 'Sephiroth';
      break;
    case 'ag3468':
      aName = 'Abhaar Gupta';
      break;
    case 'apu2103':
      aName = 'Akachi Ukwu';
      break;
    case 'amd2254':
      aName = 'Alexandra Della Santina';
      break;
    case 'acg2169':
      aName = 'Ana Gonzalez';
      break;
    case 'apu2102':
      aName = 'Aniekeme Umoh';
      break;
    case 'ak3368':
      aName = 'Anna Kataeva';
      break;
    case 'bn2226':
      aName = 'Bill Nguyen';
      break;
    case 'bl2526':
      aName = 'Bruce Lee';
      break;
    case 'cs3202':
      aName = 'Caleb Solomon';
      break;
    case 'cs3098':
      aName = 'Charles Sanky';
      break;
    case 'dvg2108':
      aName = 'Daniel Garcia';
      break;
    case 'do2232':
      aName = 'Daniel Omachonu';
      break;
    case 'eek2138':
      aName = 'Eunice Kokor';
      break;
    case 'gym2103':
      aName = 'Gedion Metaferia';
      break;
    case 'hba2115':
      aName = 'Heather Akumiah';
      break;
    case 'hc2555':
      aName = 'Hubert Chang';
      break;
    case 'jf2658':
      aName = 'Jaclyn Fu';
      break;
    case 'jls2292':
      aName = 'Joe Sadallah';
      break;
    case 'kjz2106':
      aName = 'Katie Zheng';
      break;
    case 'lyl2110':
      aName = 'Lily Liu-Krason';
      break;
    case 'mmc2237':
      aName = 'Megan Cheah';
      break;
    case 'ml3312':
      aName = 'Mervin Liriano';
      break;
    case 'myl2122':
      aName = 'Michelle Lee';
      break;
    case 'pas2171':
      aName = 'Pamela Sanchez';
      break;
    case 'rdp2121':
      aName = 'Rahi Punjabi';
      break;
    case 'skc2148':
      aName = 'Sam Chelgut';
      break;
    case 'skc2143':
      aName = 'Steve Cheruiyot';
      break;
    case 'sim2116':
      aName = 'Syed Muzammil';
      break;
    
    default:
      aName = 'No Name';
  }  
    
    /** Match the UNI in the row with the selectedUni from the user
    * if there is a match, then save that row into the array of matched rows
    */

    if(aUni === selectedUni)
    {
      matchedRows.push([timeStamp, aName, aUni, shiftLocation, clockInfo]);
      matchCounter++;
    }
    
    //Stop scanning rows after 200 rows or 50 matches
    rowCounter++;
    if(rowCounter > 200 || matchCounter > 50)
    {
      i = 1;
    }
  }
  
  //If there are no matches, notify the user and cancel the report
  if(matchedRows.length === 0) 
  {
    Browser.msgBox('Sorry', 'There are no matches for that UNI.', Browser.Buttons.OK);
    return;
  }
  
  /** Create a new sheet and append the matched UNIs 
  * from the array into the new sheet.
  * The report sheet will clear previous data on a sheet if searching the same UNI.
  */
  var sheetName = 'Clocks for UNI: ' + selectedUni;
  var reportSheet = spreadsheet.getSheetByName(sheetName);
  if (reportSheet) 
  {
    reportSheet.clear();
    reportSheet.activate();
  } 
  else 
  {
    reportSheet =
        spreadsheet.insertSheet(sheetName, spreadsheet.getNumSheets());
  }
  var sheetTitle = sheetName;
  var headers = [
    ['Time Stamp', 'Name', 'UNI', 'Shift Location', 'Clock in/out',]
  ];
  
  
  //Populate the headers and rows respectively.
  reportSheet.getRange(1, 1, headers.length, 5).setValues(headers);
  reportSheet.getRange(headers.length + 1, 1, matchedRows.length, 5).setValues(matchedRows);
  
  //Format the new sheet
  row.copyFormatToRange(reportSheet, 1, 1, 2, reportSheet.getLastRow());
  reportSheet.setColumnWidth(1, 150);
  reportSheet.setColumnWidth(2, 150);
  reportSheet.setColumnWidth(3, 150);
  reportSheet.setColumnWidth(4, 150);
  reportSheet.setColumnWidth(4, 150);
  
  // Flush all pending changes to the spreadsheet
  SpreadsheetApp.flush();  
    
  /** This is a helper function used to extract the clock in/out info from the shiftData input.
  * @param {STRING} shiftData The input provided with the shift location like 'Mudd 251 Clock-out'.
  * @return {STRING} clockInfo The clock in/out info.
  */
  function extractClockInfo(shiftData)
  {
    if(shiftData !== 'Test')
    {
      var clockInfo = shiftData.substring(shiftData.indexOf("C"));
      return clockInfo;
    }
    else
    {
      return 'Test';
    }
  }
  
  /** This is a helper function used to extract the location of the lab worked from the input.
  * @param {STRING} shiftData The input provided with the shift location like 'Mudd 251 Clock-out'.
  * @return {STRING} shiftLocation The location of the shfit worked by the UI.
  */
  function extractShiftLocation(shiftData)
  {
    if(shiftData !== 'Test')
    {
      var shiftLocation = shiftData.substring(0, shiftData.indexOf("C"));
      return shiftLocation;
    }
    else
    {
       return 'Test';
    }
  }
  
  /** This is a helper function used to extract a UNI from a student's email address.
  * @param {STRING} anEmail The email address of the UI.
  * @return {STRING} uni The UNI of the UI.
  */
  function extractUni(anEmail)
  {
    if(anEmail !== 'Test')
    {
      //The part of the email address that contains '@columbia.edu'
      var tail = anEmail.length - 13;
      //Extract the UNI by removing the tail from the email address
      var uni = anEmail.substring(0, tail);
      return uni;
    }
    else
    {
      return '';
    }   
  }

}
  
  