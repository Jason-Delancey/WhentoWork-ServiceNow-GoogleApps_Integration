/**
 * A custom script that sends form data to ui-admin@columbia.edu, google UI timeclock spreadsheet,
 * and an email to askcuit@columbia.edu
 * Used for the form 'Request for Access to UI Tools'
 * Made by Jason Delancey
 */

/** Make a trigger that runs at the completion of the Google form submission **/
var form2 = FormApp.openByUrl(
		'https://docs.google.com/a/columbia.edu/forms/d/1dlJeufLbNsapLHg5zm8BslCUrSKitd9l8UQBp5FJNsM/edit'
);
/**ScriptApp.newTrigger('uiTools')
.forForm(form2)
.onFormSubmit()
.create();*/

function uiTools()
{
  setTimeout(doit, 30000);
  function doit()
  {
    var form2 = FormApp.openByUrl(
		'https://docs.google.com/a/columbia.edu/forms/d/1dlJeufLbNsapLHg5zm8BslCUrSKitd9l8UQBp5FJNsM/edit'
);
    /** Open a form by URL and log the response to each question **/
	var formResponses = form2.getResponses();
	var itemResponseLine = '\n';
	var formResponse = formResponses[formResponses.length - 1];
	var itemResponses = formResponse.getItemResponses();
	for (var j = 0; j < itemResponses.length; j++) 
	{
		var itemResponse = itemResponses[j];
		itemResponseLine = itemResponseLine + itemResponse.getItem().getTitle().toString() + ' :: ' + itemResponse.getResponse().toString() + '\n\n';
	}
	
	/** Send an email to ui-admin@columbia.edu **/
	var requestMessage = 'There has been a request for access to UI tools:\n\n'
	GmailApp.sendEmail('ui-admin@columbia.edu', 'Request for Access to UI Tools', requestMessage + itemResponseLine);
	
	/** Send an email to askcuit@columbia.edu */
	var ticketMessage = '\n\n\n\n****Please forward this ticket to the Computer Lab Support group. Thanks.'
	GmailApp.sendEmail('askcuit@columbia.edu', 'Request for Access to UI Tools', requestMessage+ itemResponseLine + ticketMessage, {
	     cc: 'jrd2172@columbia.edu',
	 });
  }
	
}