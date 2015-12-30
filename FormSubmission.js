/**
 * A custom script that sends form data to ui-admin@columbia.edu, google UI timeclock spreadsheet,
 * and an email to askcuit@columbia.edu
 * Used for the form 'CUID Access to Gussman'
 * Made by Jason Delancey
 */

/** Make a trigger that runs at the completion of the Google form submission **/
var form = FormApp.openByUrl(
		'https://docs.google.com/a/columbia.edu/forms/d/1PRNO4yxKbPYjpfR7rJKGp-Q-vRb4g_YCekeGMDcOXX8/edit'
);
ScriptApp.newTrigger('myFunction')
.forForm(form)
.onFormSubmit()
.create();

/** Open a form by URL and log the responses to each question **/
var formResponses = form.getResponses();
for (var i = 0; i < formResponses.length; i++) 
{
	var formResponse = formResponses[i];
	var itemResponses = formResponse.getItemResponses();
	for (var j = 0; j < itemResponses.length; j++) 
	{
		var itemResponse = itemResponses[j];
		Logger.log('Response #%s to the question "%s" was "%s"',
				(i + 1).toString(),
				itemResponse.getItem().getTitle(),
				itemResponse.getResponse());
	}
}

/** Send an email to ui-admin@columbia.edu and askcuit@columbia.edu **/
GmailApp.sendEmail('jrd2172@columbia.edu', 'Request for CUID Access to Gussman', Logger.getLog(), {
    bcc: 'jason.r.delancey@gmail.com',
});