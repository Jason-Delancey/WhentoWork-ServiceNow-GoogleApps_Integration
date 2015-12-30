/**
 * A custom script that sends form data to ui-admin@columbia.edu, google UI timeclock spreadsheet,
 * and an email to askcuit@columbia.edu
 * Used for the form 'CUID Access to Gussman Lab'
 * Made by Jason Delancey
 */

/** Make a trigger that runs at the completion of the Google form submission **/
var form = FormApp.openByUrl(
		'https://docs.google.com/a/columbia.edu/forms/d/1PRNO4yxKbPYjpfR7rJKGp-Q-vRb4g_YCekeGMDcOXX8/edit'
);
ScriptApp.newTrigger('gussmanLab')
.forForm(form)
.onFormSubmit()
.create();

function gussmanLab()
{
	/** Open a form by URL and log the response to each question **/
	var formResponses = form.getResponses();
	var itemResponseLine = '\n';
	var formResponse = formResponses[formResponses.length - 1];
	var itemResponses = formResponse.getItemResponses();
	for (var j = 0; j < itemResponses.length; j++) 
	{
		var itemResponse = itemResponses[j];
		itemResponseLine = itemResponseLine + itemResponse.getItem().getTitle().toString() + ' :: ' + itemResponse.getResponse().toString() + '\n\n';
	}
	
	/** Send an email to ui-admin@columbia.edu **/
	var requestMessage = 'There has been a request for CUID access to Gussman Lab:\n\n'
	GmailApp.sendEmail('ui-admin@columbia.edu', 'Request for CUID Access to Gussman Lab', requestMessage + itemResponseLine);
	
	/** Send an email to askcuit@columbia.edu **/
	var ticketMessage = '\n\n\n\n****Please forward this ticket to the Computer Lab Support group. Thanks.'
	GmailApp.sendEmail('askcuit@columbia.edu', 'Request for CUID Access to Gussman Lab', requestMessage + itemResponseLine + ticketMessage, {
	     cc: 'jrd2172@columbia.edu',
	 });
}