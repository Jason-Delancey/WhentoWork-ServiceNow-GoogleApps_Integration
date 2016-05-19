/**
 * A custom script that sends a monthly reminder to elect a UI of the Month.
 * Made by Jason Delancey
*/
 
/* Make a time-driven trigger that runs the script every month at midnight */

function createTimeDrivenTriggersUIofTheMonth()
{
  
  // Trigger for the beginning of the month.
  ScriptApp.newTrigger('myUIofTheMonth')
      .timeBased()
      .onMonthDay(1)
      .create();
}

function myUIofTheMonth(){
  
  /** Send an email prompting to update UI availability */
  MailApp.sendEmail({
    to: "ui-folks@columbia.edu",
    cc: "UI-Admin@columbia.edu",
    subject: "***Please Elect Your UI of the Month***",
    body: "Please elect our UI of the Month by filling out the below form. Here is the link: \n\n \
https://docs.google.com/a/columbia.edu/forms/d/1HPocGQvM95M2qjLpJBkL-U9gelPEm02YjXn6ea7WUaE/viewform \
    \n\n\n\n Thanks in advance!"
  });
}
