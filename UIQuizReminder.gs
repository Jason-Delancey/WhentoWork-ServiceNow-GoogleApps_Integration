/**
 * A custom script that sends a semesterly email reminding UIs to complete the UI Quiz.
 * Made by Jason Delancey
*/
 
/* Make a time-driven trigger that runs the script at the beginning/end of each semester */
var spring = new Date(2016, 1, 20);
var fall = new Date(2016, 9, 10);

function createTimeDrivenTriggersUIQuizReminder(){
  // Trigger for the beginning of the fall/spring semester.
  ScriptApp.newTrigger('uiQuizReminder')
      .timeBased()
      .at(spring)
      .create();
  
  ScriptApp.newTrigger('uiQuizReminder')
      .timeBased()
      .at(fall)
      .create();
}

function uiQuizReminder(){
  
  /** Send an email prompting to update UI availability */
  MailApp.sendEmail({
    to: "ui-folks@columbia.edu",
    cc: "UI-Admin@columbia.edu",
    subject: "***Please Complete The UI Quiz***",
    body: "Please complete the UI Quiz to brush up on rules and regulations. Here is the link: \n\n \
https://docs.google.com/a/columbia.edu/forms/d/1UwraxA349ejxbMoYetz6BewUphaejsvu9Q1Iq9_Y-KM/viewform \
    \n\n\n\n Thanks in advance!"
  });
}
