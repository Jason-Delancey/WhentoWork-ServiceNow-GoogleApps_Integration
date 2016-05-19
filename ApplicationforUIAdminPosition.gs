/**
* This script is used to request computer lab supplies.
* Made by Jason Delancey
**/

function createFormSubmissionTriggersAdminPosition()
{
  var form = FormApp.openById('1ywaOTMOisq5WWnx-iPRy7Uinb5Hkta3lMxwvTptBiGc');
  ScriptApp.newTrigger('adminPosition')
     .forForm(form)
     .onFormSubmit()
     .create();

}

function adminPosition()
{
  
  // Open the form by ID and get the responses from the most recent form submission.
  var form2 = FormApp.openById('1ywaOTMOisq5WWnx-iPRy7Uinb5Hkta3lMxwvTptBiGc');
  var formResponses = form2.getResponses();
  var lastResponse = formResponses[formResponses.length - 1];
  var itemResponses = lastResponse.getItemResponses();
  
  // Construct the body of the email
  var finalResponse = "Hello Team,\n\nA new application has been submitted for a UI-Admin Position.";
  
  for (var j = 0; j < itemResponses.length; j++) 
  {
    var itemResponse = itemResponses[j];
    finalResponse = finalResponse + "\n\n\n" + itemResponse.getItem().getTitle() + " : " + itemResponse.getResponse();
  }
  finalResponse = finalResponse + "\n\n\n";
  
  // Send the email to the Admin team.
  // {cc: "uiadmin@columbia.edu"}
  var subject = "An Application for UI-Admin Position. Please Review for More Details";
  MailApp.sendEmail("uiadmin@columbia.edu", subject, finalResponse);
}