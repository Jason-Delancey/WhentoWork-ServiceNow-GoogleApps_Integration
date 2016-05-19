/**
* This script is used to submit Computer Lab Support Feedback.
* Made by Jason Delancey
**/

function createFormSubmissionTriggersFeedback()
{
  var form = FormApp.openById('19E0zD__Ow_5LCFb1-2Nzodd-4xKWzSMEtuyDIgOG120');
  ScriptApp.newTrigger('feedBack')
     .forForm(form)
     .onFormSubmit()
     .create();

}

function feedBack()
{
  
  // Open the form by ID and get the responses from the most recent form submission.
  var form2 = FormApp.openById('19E0zD__Ow_5LCFb1-2Nzodd-4xKWzSMEtuyDIgOG120');
  var formResponses = form2.getResponses();
  var lastResponse = formResponses[formResponses.length - 1];
  var itemResponses = lastResponse.getItemResponses();
  
  // Construct the body of the email
  var finalResponse = "Hello Team,\n\nThe Computer Lab Support Feedback form has been submitted.";
  
  for (var j = 0; j < itemResponses.length; j++) 
  {
    var itemResponse = itemResponses[j];
    finalResponse = finalResponse + "\n\n\n" + itemResponse.getItem().getTitle() + " : " + itemResponse.getResponse();
  }
  finalResponse = finalResponse + "\n\n\n";
  
  // Send the email to the Admin team.
  // {cc: "uiadmin@columbia.edu"}
  var subject = "Computer Lab Support Feedback Form Has Been Submitted. Please Review for More Details";
  MailApp.sendEmail("uiadmin@columbia.edu", subject, finalResponse);
}