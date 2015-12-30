/**
 * A custom script that sends form data to ui-admin@columbia.edu, google UI timeclock spreadsheet,
 * and an email to askcuit@columbia.edu
 * Used for the form 'UI Inquiries/Suggestions'
 * Made by Jason Delancey
 */

/** Make a trigger that runs at the completion of the Google form submission **/
var form = FormApp.openByUrl(
		'https://docs.google.com/a/columbia.edu/forms/d/1ilLF-6nwI80KO5ZYPD_bVwxmuGwdHDpAVbkH2O0yS_I/edit?usp=drive_web'
);
ScriptApp.newTrigger('uiSuggestions')
.forForm(form)
.onFormSubmit()
.create();

function uiSuggestions()
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
	var requestMessage = 'There has been a UI Inquiry/Suggestion:\n\n'
	GmailApp.sendEmail('ui-admin@columbia.edu', 'UI Inquiry/Suggestion', requestMessage + itemResponseLine);
}