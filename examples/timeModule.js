scope(function(context){
  var
    // Private aliases
    timestamp = context.timestamp,
    log = context.log,

    // Private fields
    startTime = null,
    endTime = null;

  // Private functions
  function logEvent(name,time){
    log(name+": "+time);
  }

  function start(){
    startTime = timestamp();
    logEvent("start",startTime);
  }

  function stop(){
    endTime = timestamp();
    logEvent("end",endTime);
  }

  function getDuration(){
    if (startTime === null){
      return 0;
    }
    if (endTime === null){
      return timestamp() - startTime;
    }
    return endTime - startTime;
  }

  // Public API
  return {
    start: start,
    stop: stop,
    getDuration: getDuration
  };
},["timestamp","log"],"timeModule");
