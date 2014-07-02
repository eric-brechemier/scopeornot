scope(function(context){
  var
    // constant
    LOG_ELEMENT_ID = "log",

    // declare alias
    document = context.document;

  function log(text){
    document
      .getElementById(LOG_ELEMENT_ID)
      .innerHTML += text + "<br/>";
  }

  return log;

},["document"],"log");
