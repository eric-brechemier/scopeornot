scope(function(context){
  var
    Array = context.Array,
    join = Array.prototype.join,

    // constant
    LOG_ELEMENT_ID = "log",

    // declare aliases
    document = context.document;

  function log(){
    document
      .getElementById(LOG_ELEMENT_ID)
      .innerHTML += join.call(arguments,'') + "<br/>";
  }

  return log;

},["document","Array"],"log");
