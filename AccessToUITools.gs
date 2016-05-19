/**
* This script is used to request computer lab supplies.
* Made by Jason Delancey
**/

function createFormSubmissionTriggersUITools()
{
  var form = FormApp.openById('1dlJeufLbNsapLHg5zm8BslCUrSKitd9l8UQBp5FJNsM');
  ScriptApp.newTrigger('uiTools')
     .forForm(form)
     .onFormSubmit()
     .create();

}

function uiTools()
{
  
  // Open the form by ID and get the responses from the most recent form submission.
  var form2 = FormApp.openById('1dlJeufLbNsapLHg5zm8BslCUrSKitd9l8UQBp5FJNsM');
  var formResponses = form2.getResponses();
  var lastResponse = formResponses[formResponses.length - 1];
  var itemResponses = lastResponse.getItemResponses();
  
  // Construct the body of the email
  var finalResponse = "Hello Team,\n\nA new request has been submitted for access to UI tools.";
  
  for (var j = 0; j < itemResponses.length; j++) 
  {
    var itemResponse = itemResponses[j];
    finalResponse = finalResponse + "\n\n\n" + itemResponse.getItem().getTitle() + " : " + itemResponse.getResponse();
  }
  finalResponse = finalResponse + "\n\n\n";
  
  // Send the email to the Admin team.
  // {cc: "uiadmin@columbia.edu"}
  var subject = "A Request for UI Tools. Please Review for More Details";
  MailApp.sendEmail("uiadmin@columbia.edu", subject, finalResponse);
}