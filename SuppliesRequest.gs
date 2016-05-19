/**
* This script is used to request computer lab supplies.
* Made by Jason Delancey
**/

function createFormSubmissionTriggers()
{
  var form = FormApp.openById('1-fUx-sie01jU0CRt3ul8AvBnNh_jeWT0n8_FYghe7NQ');
  ScriptApp.newTrigger('supplyRequest')
     .forForm(form)
     .onFormSubmit()
     .create();

}

function supplyRequest()
{
  
  // Open the form by ID and get the responses from the most recent form submission.
  var form2 = FormApp.openById('1-fUx-sie01jU0CRt3ul8AvBnNh_jeWT0n8_FYghe7NQ');
  var formResponses = form2.getResponses();
  var lastResponse = formResponses[formResponses.length - 1];
  var itemResponses = lastResponse.getItemResponses();
  
  // Construct the body of the email
  var finalResponse = "Hello Team,\n\nA new request has been submitted for lab supply replenishment.";
  
  for (var j = 0; j < itemResponses.length; j++) 
  {
    var itemResponse = itemResponses[j];
    finalResponse = finalResponse + "\n\n\n" + itemResponse.getItem().getTitle() + " : " + itemResponse.getResponse();
  }
  finalResponse = finalResponse + "\n\n\n";
  
  // Send the email to the Admin team.
  // {cc: "uiadmin@columbia.edu"}
  var subject = "A Request for Lab Supply Replenishment. Please Review for More Details";
  MailApp.sendEmail("uiadmin@columbia.edu", subject, finalResponse);
}