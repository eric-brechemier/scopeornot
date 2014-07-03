scope(function(context){
  var console = context.console;

  function log( message ) {
    console.log( message );
  }

  return log;
},["console"],"log");

