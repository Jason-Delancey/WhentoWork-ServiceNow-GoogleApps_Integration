/**
 * A custom script that sends a semesterly email reminding UIs to update their Student Status.
 * Made by Jason Delancey
*/
 
/* Make a time-driven trigger that runs the script at the beginning/end of each semester */
var spring = new Date(2016, 1, 20);
var fall = new Date(2016, 9, 10);
var springEnd = new Date(2016, 4, 25);
var fallEnd = new Date(2016, 12, 12);

function createTimeDrivenTriggersStudentStatusReminder()
{
  // Trigger for the beginning of the fall/spring semester.
  ScriptApp.newTrigger('studentStatusReminder')
      .timeBased()
      .at(spring)
      .create();
  
  ScriptApp.newTrigger('studentStatusReminder')
      .timeBased()
      .at(fall)
      .create();
  
  ScriptApp.newTrigger('studentStatusReminder')
      .timeBased()
      .at(springEnd)
      .create();
  
  ScriptApp.newTrigger('studentStatusReminder')
      .timeBased()
      .at(fallEnd)
      .create();
}

function studentStatusReminder()
{
  
  /** Send an email prompting to update UI availability */
  MailApp.sendEmail({
    to: "ui-folks@columbia.edu",
    cc: "UI-Admin@columbia.edu",
    subject: "***Please Update Your Student Status***",
    body: "Please update your Student Status by filling out the below form. Here is the link: \n\n \
https://wiki.cc.columbia.edu/secondlevel:Student%20Status \
    \n\n\n\n Thanks in advance!"
  });
}
