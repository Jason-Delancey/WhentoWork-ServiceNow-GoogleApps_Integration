/**
 * A custom script that sends a semesterly email reminding graduating UIs that their last day to work with us is May 31st.
 * Made by Jason Delancey
*/
 
/* Make a time-driven trigger that runs May 24th each year, one week before their last day */
var finalNotice = new Date(2017, 4, 24);

function createTimeDrivenTriggersGraduatingUIs()
{
  // Trigger for the beginning of the fall/spring semester.
  ScriptApp.newTrigger('graduatingUIs')
      .timeBased()
      .at(finalNotice)
      .create();
}

function graduatingUIs()
{
  
  // Send an email reminder that the last day of employment for all graduating UIs is May 31st 
  MailApp.sendEmail({
    to: "ui-folks@columbia.edu",
    cc: "UI-Admin@columbia.edu",
    subject: "***Reminder: Last Day for Graduating UIs is May 31st***",
    body: "Hello Folks,\n\nThis is a friendly reminder that the last day for all graduating UIs to work with us is May 31st. If you will be leaving us before then, please remember to find time to return your UI keys to us in Watson Hall 4th Floor. \n\nThanks and the best of luck in all your future endeavors!"
  });
}
