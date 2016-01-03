/**
 * A custom script that sends form data to ui-admin@columbia.edu, google UI timeclock spreadsheet
 * Used for the form 'UI Quiz'
 * Made by Jason Delancey
 */

/** Make a trigger that runs at the completion of the Google form submission
var form6 = FormApp.openByUrl(
		'https://docs.google.com/a/columbia.edu/forms/d/1UwraxA349ejxbMoYetz6BewUphaejsvu9Q1Iq9_Y-KM/edit'
);
ScriptApp.newTrigger('uiQuiz')
.forForm(form6)
.onFormSubmit()
.create();*/

function doit()
{
  var form6 = FormApp.openByUrl(
		'https://docs.google.com/a/columbia.edu/forms/d/1UwraxA349ejxbMoYetz6BewUphaejsvu9Q1Iq9_Y-KM/edit'
);
  /** Open a form by URL and log the response to each question **/
	var formResponses = form6.getResponses();
	var itemResponseLine = '\n';
	var formResponse = formResponses[formResponses.length - 1];
	var itemResponses = formResponse.getItemResponses();
	for (var j = 0; j < itemResponses.length; j++) 
	{
		var itemResponse = itemResponses[j];
		itemResponseLine = itemResponseLine + itemResponse.getItem().getTitle().toString() + ' :: ' + itemResponse.getResponse().toString() + '\n\n';
	}
	
	/** Send an email to ui-admin@columbia.edu **/
	var requestMessage = 'There has been a UI Quiz submission:\n\n'
	GmailApp.sendEmail('ui-admin@columbia.edu', 'UI Quiz', requestMessage + itemResponseLine);
}
	
function uiQuiz()
{
	Utilities.sleep(3000);
	doit();
}