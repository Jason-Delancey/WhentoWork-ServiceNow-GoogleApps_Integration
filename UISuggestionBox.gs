/**
* This script is used to request computer lab supplies.
* Made by Jason Delancey
**/

function createFormSubmissionTriggersSuggestionBox()
{
  var form = FormApp.openById('1ilLF-6nwI80KO5ZYPD_bVwxmuGwdHDpAVbkH2O0yS_I');
  ScriptApp.newTrigger('suggestionBox')
     .forForm(form)
     .onFormSubmit()
     .create();

}

function suggestionBox()
{
  
  // Open the form by ID and get the responses from the most recent form submission.
  var form2 = FormApp.openById('1ilLF-6nwI80KO5ZYPD_bVwxmuGwdHDpAVbkH2O0yS_I');
  var formResponses = form2.getResponses();
  var lastResponse = formResponses[formResponses.length - 1];
  var itemResponses = lastResponse.getItemResponses();
  
  // Construct the body of the email
  var finalResponse = "Hello Team,\n\nA new entry has been submitted for the UI Suggestion Box.";
  
  for (var j = 0; j < itemResponses.length; j++) 
  {
    var itemResponse = itemResponses[j];
    finalResponse = finalResponse + "\n\n\n" + itemResponse.getItem().getTitle() + " : " + itemResponse.getResponse();
  }
  finalResponse = finalResponse + "\n\n\n";
  
  // Send the email to the Admin team.
  // {cc: "uiadmin@columbia.edu"}
  var subject = "New Entry for UI Suggestion Box. Please Review for More Details";
  MailApp.sendEmail("uiadmin@columbia.edu", subject, finalResponse);
}