scope(function(context){

  var
    // declare aliases
    Number = context.Number,
    Date = context.Date,
    log = context.log;

  function timestamp(){
    return Number(new Date());
  }

  if (log){
    log( "Code has run at timestamp: "+timestamp() );
  }
},["log","Number","Date"]);
