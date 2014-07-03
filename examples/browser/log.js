scope(function(context){
  var
    // constant
    LOG_ELEMENT_ID = "log",

    // declare aliases
    document = context.document,
    timestamp = context.timestamp;

  function log(text){
    document
      .getElementById(LOG_ELEMENT_ID)
      .innerHTML += timestamp() + '|' + text + "<br/>";
  }

  return log;

},["document","timestamp"],"log");
