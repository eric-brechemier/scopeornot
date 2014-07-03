scope(function(context){

  var
    assert = context.assert,
    test = context.test,
    log = context.log,

    // global object
    global = context.global;

  log(test(function(){
    var
      PROPERTY_NAME = "property-name/for/unit.test",
      RESULT_VALUE = {result:"value"},

      hasRun;

    assert( typeof scope === "function",         "scope() must be a function");

    hasRun = false;
    scope(function(context){
      hasRun = true;
      assert( context === global,           "code must run in global context");
    });
    assert( hasRun,                             "code must run synchronously");

    hasRun = false;
    scope(function(context){
      hasRun = true;
      assert( context === global,           "code must run in global context");
    },["a","ab","abc"]);
    assert( hasRun,             "code must run synchronously, ignoring needs");

    hasRun = false;
    scope(function(context){
      hasRun = true;
      assert( context === global,           "code must run in global context");
      return RESULT_VALUE;
    },["a","ab","abc"],PROPERTY_NAME);
    assert( hasRun,               "code must run synchronously, ignoring needs");
    assert( global[PROPERTY_NAME] === RESULT_VALUE,
                 "result value must be set with given name in global context");
  }));

},["assert","test","log","global"],"test-scope-level1-global");
