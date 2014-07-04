scope(function(context){
  var
    log = context.log,
    logRecords = [];

  function addLogRecord(){
    logRecords.push(arguments);
  }

  function getLogRecords(){
    return logRecords;
  }

  context.log = addLogRecord;
  return {
    getLogRecords: getLogRecords,
    print: log
  };

},["log"],"stub-log");
