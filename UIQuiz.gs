/**
* This script is used to request computer lab supplies.
* Made by Jason Delancey
**/

function createFormSubmissionTriggersUIQuiz()
{
  var form = FormApp.openById('1UwraxA349ejxbMoYetz6BewUphaejsvu9Q1Iq9_Y-KM');
  ScriptApp.newTrigger('uiQuiz')
     .forForm(form)
     .onFormSubmit()
     .create();

}

function uiQuiz()
{
  
  // Open the form by ID and get the responses from the most recent form submission.
  var form2 = FormApp.openById('1UwraxA349ejxbMoYetz6BewUphaejsvu9Q1Iq9_Y-KM');
  var formResponses = form2.getResponses();
  var lastResponse = formResponses[formResponses.length - 1];
  var itemResponses = lastResponse.getItemResponses();
  
  // Construct the body of the email
  var finalResponse = "Hello Team,\n\nA UI Quiz has been Completed.";
  
  for (var j = 0; j < itemResponses.length; j++) 
  {
    var itemResponse = itemResponses[j];
    finalResponse = finalResponse + "\n\n\n" + itemResponse.getItem().getTitle() + " : " + itemResponse.getResponse();
  }
  finalResponse = finalResponse + "\n\n\n";
  
  // Send the email to the Admin team.
  // {cc: "uiadmin@columbia.edu"}
  var subject = "A UI Quiz Has Been Completed. Please Review for More Details";
  MailApp.sendEmail("uiadmin@columbia.edu", subject, finalResponse);
}