/**
 * A custom script that sends a weekly email reminding UIs to update their availability.
 * Made by Jason Delancey
*/
 
/* Make a time-driven trigger that runs the script every Wednesday at midnight */
function createTimeDrivenTriggers2(){
  // Trigger every week.
  ScriptApp.newTrigger('myEmailReminder')
      .timeBased()
      .everyWeeks(2)
      .onWeekDay(ScriptApp.WeekDay.WEDNESDAY)
      .atHour(0)
      .create();
}

function myEmailReminder(){
  
  /** Send an email prompting to update UI availability */
  MailApp.sendEmail({
    to: "ui-folks@columbia.edu",
    cc: "UI-Admin@columbia.edu",
    subject: "***Please Update Your Availability***",
    body: "Please update your availability by noon Thursday. Here is the link: \n\n \
whentowork.com \
    \n\n\n\n Thanks in advance!"
  });
}
