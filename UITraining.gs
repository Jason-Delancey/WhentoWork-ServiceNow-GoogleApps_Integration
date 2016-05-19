/**
* This script is used to request computer lab supplies.
* Made by Jason Delancey
**/

function createFormSubmissionTriggersUITraining()
{
  var form = FormApp.openById('1D0SWC7ieHHT53iPHbSuodb1-i-l2P3jbg9byrId3kxo');
  ScriptApp.newTrigger('uiTraining')
     .forForm(form)
     .onFormSubmit()
     .create();

}

function uiTraining()
{
  
  // Open the form by ID and get the responses from the most recent form submission.
  var form2 = FormApp.openById('1D0SWC7ieHHT53iPHbSuodb1-i-l2P3jbg9byrId3kxo');
  var formResponses = form2.getResponses();
  var lastResponse = formResponses[formResponses.length - 1];
  var itemResponses = lastResponse.getItemResponses();
  
  // Construct the body of the email
  var finalResponse = "Hello Team,\n\nA UI Has Been Trained.";
  
  for (var j = 0; j < itemResponses.length; j++) 
  {
    var itemResponse = itemResponses[j];
    finalResponse = finalResponse + "\n\n\n" + itemResponse.getItem().getTitle() + " : " + itemResponse.getResponse();
  }
  finalResponse = finalResponse + "\n\n\n";
  
  // Send the email to the Admin team.
  // {cc: "uiadmin@columbia.edu"}
  var subject = "A UI Has Been Trained. Please Review for More Details";
  MailApp.sendEmail("uiadmin@columbia.edu", subject, finalResponse);
}