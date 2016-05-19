/**
* This script is used to request for CUID access to Gussman.
* Made by Jason Delancey
**/

function createFormSubmissionTriggersCUIDAccess()
{
  var form = FormApp.openById('1PRNO4yxKbPYjpfR7rJKGp-Q-vRb4g_YCekeGMDcOXX8');
  ScriptApp.newTrigger('gussmanCUIDAccess')
     .forForm(form)
     .onFormSubmit()
     .create();

}

function gussmanCUIDAccess()
{
  
  // Open the form by ID and get the responses from the most recent form submission.
  var form2 = FormApp.openById('1PRNO4yxKbPYjpfR7rJKGp-Q-vRb4g_YCekeGMDcOXX8');
  var formResponses = form2.getResponses();
  var lastResponse = formResponses[formResponses.length - 1];
  var itemResponses = lastResponse.getItemResponses();
  
  // Construct the body of the email
  var finalResponse = "Hello Team,\n\nA new request has been submitted for CUID access to Gussman Lab.";
  
  for (var j = 0; j < itemResponses.length; j++) 
  {
    var itemResponse = itemResponses[j];
    finalResponse = finalResponse + "\n\n\n" + itemResponse.getItem().getTitle() + " : " + itemResponse.getResponse();
  }
  finalResponse = finalResponse + "\n\n\n";
  
  // Send the email to the Admin team.
  // {cc: "uiadmin@columbia.edu"}
  var subject = "A Request for CUID Access to Gussman Lab. Please Review for More Details";
  MailApp.sendEmail("uiadmin@columbia.edu", subject, finalResponse);
}