scope(function(context){
  var
    timestamp = context.timestamp,
    console = context.console;

  function log( message ) {
    console.log( timestamp() + ": " + message );
  }

  return log;
},["console","timestamp"],"log");

