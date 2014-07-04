scope(function(context){
  var console = context.console;

  function log() {
    console.log.apply( console, arguments );
  }

  return log;
},["console"],"log");

