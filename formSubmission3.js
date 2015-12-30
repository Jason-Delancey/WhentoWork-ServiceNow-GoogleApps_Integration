/**
 * A custom script that sends form data to ui-admin@columbia.edu, google UI timeclock spreadsheet,
 * and an email to askcuit@columbia.edu
 * Used for the form 'Request for Lab Supplies'
 * Made by Jason Delancey
 */

/** Make a trigger that runs at the completion of the Google form submission **/
var form = FormApp.openByUrl(
		'https://docs.google.com/a/columbia.edu/forms/d/1-fUx-sie01jU0CRt3ul8AvBnNh_jeWT0n8_FYghe7NQ/edit'
);
ScriptApp.newTrigger('uiSupplies')
.forForm(form)
.onFormSubmit()
.create();

function uiSupplies()
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
	var requestMessage = 'There has been a request for lab supplies:\n\n'
	GmailApp.sendEmail('ui-admin@columbia.edu', 'Request for Lab Supplies', requestMessage + itemResponseLine);
	
	/** Send an email to askcuit@columbia.edu **/
	var ticketMessage = '\n\n\n\n****Please forward this ticket to the Computer Lab Support group. Thanks.'
	GmailApp.sendEmail('askcuit@columbia.edu', 'Request for Lab Supplies', requestMessage+ itemResponseLine + ticketMessage, {
	     cc: 'jrd2172@columbia.edu',
	 });
}