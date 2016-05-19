/**
* This script is used to submit the Strike form upon completion.
* Made by Jason Delancey
**/

function createFormSubmissionTriggers()
{
  var form = FormApp.openById('1-y6ARpW7naWWA9Sxo1v2e-i0HjVjs-YFYoclTYoxEC4');
  ScriptApp.newTrigger('submitStrike')
     .forForm(form)
     .onFormSubmit()
     .create();

}

function submitStrike()
{
  
  // Open the form by ID and sort the responses to each question from the last form submission.
  var form2 = FormApp.openById('1-y6ARpW7naWWA9Sxo1v2e-i0HjVjs-YFYoclTYoxEC4');
  var formResponses = form2.getResponses();
  var lastResponse = formResponses[formResponses.length - 1];
  var itemResponses = lastResponse.getItemResponses();
  var recipientName = itemResponses[0].getResponse();
  var recipientAddress = itemResponses[itemResponses.length - 1].getResponse();
  var finalResponse = "Hello,";
  var closingMessage = "For a full review of the reasons for and consequences of accruing strikes, please review the UI Expectations wiki page. It is important that you take time to correct these areas moving forward. The admin team is here to support you in your role as a UI, so please do not hesitate to reach out to us if you have any questions.\n\n Best,\nThe Admin Team";
  
  for (var j = 0; j < itemResponses.length - 1; j++) 
  {
    var itemResponse = itemResponses[j];
    finalResponse = finalResponse + "\n\n\n" + itemResponse.getItem().getTitle() + " : " + itemResponse.getResponse();
  }
  finalResponse = finalResponse + "\n\n\n" + closingMessage;
  // Send the contents of the Strike form to the recipient.
  var subject = "[" + recipientName + "] " + "You have received a Strike. Please review for More Details";
  MailApp.sendEmail(recipientAddress, subject, finalResponse, {cc: "uiadmin@columbia.edu"});
}
