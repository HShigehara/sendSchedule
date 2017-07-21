var lineToken = "2AfUxK2jxG1oHC7exp76n4WVYO7IT0byCLYpIW4doKU";
var emiCalName = "しみずえみこ";
var emiAddress = "rahmens.js5@gmail.com";
var shigeCalName = "H.Shigehara";
var shigeAddress = "Chilly_Private";

function main() {
  var calendars = CalendarApp.getAllCalendars();
  var text = Utilities.formatDate(new Date(), 'JST', 'yyyy/MM/dd') + "\n";
  
  for(i in calendars) {
    var calendar = calendars[i];
    var events = calendar.getEventsForDay(new Date());

    if( events.length > 0 ) {
      text += "==================\n";
      if( calendar.getName() == emiAddress ){
        text += "◆" + emiCalName + "\n";
      }
      else if( calendar.getName() == shigeAddress ){
        text += "◆" + shigeCalName + "\n";
      }
      else{
        text += "◆" + "その他" + "\n";
      }
    }

    for(j in events) {
      var event = events[j];
      var title = event.getTitle();
      var start = toTime(event.getStartTime());
      var end = toTime(event.getEndTime());
      text += start + ' - ' + end + "\n" + " - " + title;
    }
  }
  text += "\n==================\n";
  sendToLine(text);
}

function sendToLine(text){
  var token = lineToken;
  var options =
   {
     "method"  : "post",
     "payload" : "message=" + text,
     "headers" : {"Authorization" : "Bearer "+ token}

   };
   UrlFetchApp.fetch("https://notify-api.line.me/api/notify", options);
}

function toTime(str){
  return Utilities.formatDate(str, 'JST', 'HH:mm');
}