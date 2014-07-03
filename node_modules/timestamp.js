scope(function(context){
  var
    Number = context.Number,
    Date = context.Date;

  function timestamp(){
    if (typeof Date.now == "function"){
      return Date.now();
    }
    return Number(new Date());
  };

  return timestamp;
},["Number","Date"],"timestamp");
