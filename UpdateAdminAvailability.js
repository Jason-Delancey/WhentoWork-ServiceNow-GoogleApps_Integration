/**
 * A custom script that sends a weekly email reminding Admin to update their availability.
 * Made by Jason Delancey
*/
 
/* Make a time-driven trigger that runs the script the 25th of each month */
function createTimeDrivenTriggers3(){
  // Trigger every week.
  ScriptApp.newTrigger('myEmailReminderAdmin')
      .timeBased()
      .onMonthDay(25)
      .atHour(0)
      .create();
}

function myEmailReminderAdmin(){
  
  /** Send an email prompting to update UI-Admin availability */
  MailApp.sendEmail({
    to: "ui-admin@columbia.edu",
    subject: "***Please Update Your Admin Availability***",
    body: "Click here for the link: \n\n \
http://docs.google.com/a/columbia.edu/forms/d/1GHlCbXC6P42kIh6fq06AXEv8VdZqxfGq50mxBHG6ufU/viewform \
    \n\n\n\n Thanks in advance!"
  });
  
}
