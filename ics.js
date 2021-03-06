define(['/FileSaver','/Blob'], function(
    FileSaver, Blob) 
{
  var DEFAULT_OPTIONS = {
    'title'            : null,
    'location'         : null,
    'desc'             : null,
    //-5, +3, -3 etc etc
    'time_zone'        : 0,
    //1 or 0 (for calculation purposes)
    'daylight_savings' : 0,
    //Starts
    'year_start'    : getUTCFullYear().toString(),
    'month_start'   : getUTCMonth().toString(),
    'day_start'     : getUTCDay().toString(),
    'hour_start'    : getUTCHours().toString(),
    'minute_start'  : getUTCMinutes().toString(),
    //Ends
    'year_end'      : getUTCFullYear().toString(),
    'month_end'     : getUTCMonth().toString(),
    'day_end'       : getUTCDay().toString(),
    'hour_end'      : getUTCHours().toString(),
    'minute_end'    : getUTCMinutes().toString(),
    //Other
    'file_name'     : "Generated by ICS.js!"
  };
  var GenerateICS = function(options) {
    options = $.extend(true, {}, DEFAULT_OPTIONS, options);
    var dt_start = new Date(
        options['year_start'], 
        options['month_start'],
        options['day_start'],
        options['hour_start'],
        options['minute_start']
    );
    var dt_end = new Date(
        options['year_end'], 
        options['month_end'],
        options['day_end'],
        options['hour_end'],
        options['minute_end']
    );
    dt_start.setHours(dt_start.getHours + time_zone - daylight_savings);
    dt_end.setHours(dt_end.getHours + time_zone - daylight_savings);
    var file = "BEGIN:VCALENDAR\nVERSION:2.0\nCALSCALE:GREGORIAN\nBEGIN:VEVENT\n";
    file += "SUMMARY:" + options['title'] + "\n";
    file += "DTSTART;TZID=United_Kingdom/London:" + dt_start.getFullYear() + dt_start.getMonth() + dt_start.getDay() + "T" +  dt_start.getHours() + dt_start.getMinute() + "00\n";
    file += "DTSTART;TZID=United_Kingdom/London:" + dt_end.getFullYear() + dt_end.getMonth() + dt_end.getDay() + "T" +  dt_end.getHours() + dt_end.getMinute() + "00\n";
    file += "LOCATION:" + options['location'];
    file += "DESCRIPTION:" + options['desc'];
    file += "STATUS:CONFIRMED\nSEQUENCE:3\nBEGIN:VALARM\nTRIGGER:-PT10M\n";
    file += "DESCRIPTION:Pickup Reminder\nACTION:DISPLAY\nEND:VALARM\nEND:VEVENT\nEND:VCALENDAR\n";
    var to_save = new Blob([file], {type: "text/plain;charset=utf-8"});
    saveAs(to_save, options['file_name'] + ".ics" );
  };
})
