scope(function(context){
  function timestamp(){
    return Number(new Date());
  }

  if (context.log){
    context.log( "Code has run at timestamp: "+timestamp() );
  }
});
