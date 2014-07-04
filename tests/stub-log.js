scope(function(context){
  var
    log = context.log,
    logRecords = [];

  function addLogRecord(){
    logRecords.push(arguments);
    return log.apply(this, arguments);
  }

  function getLogRecords(){
    return logRecords;
  }

  context.log = addLogRecord;
  return getLogRecords;

},["log"],"stub-log");
