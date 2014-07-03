scope(function(context){

  var
    log = context.log,
    test = context.test,
    assert = context.assert,
    // global object
    global = context.global;

  log(test(function(){
    var
      hasRun,
      privateContext,
      originalScope,
      codeName1 = "module1",
      codeResult1 = {result:"value1"},
      scopeReplacement = function(){/* replacement for scope() */};

    hasRun = false;
    scope(function(context){
      hasRun = true;
      assert( context !== global,       "code must not run in global context");
    });
    assert( hasRun,                             "code must run synchronously");

    hasRun = false;
    scope(function(context){
      hasRun = true;
      assert( context !== global,       "code must not run in global context");
      privateContext = context;
      return codeResult1;
    },["a","ab","abc"],codeName1);
    assert( hasRun,             "code must run synchronously, ignoring needs");
    assert( typeof privateContext === "object",
                                          "private context must be an object");
    assert( privateContext[codeName1] === codeResult1,
                                "result value must be set in private context");

    scope(function(context){
      assert( context === privateContext,
                  "private context must be shared (no dependencies, no name)");
    });

    scope(function(context){
      assert( context === privateContext,
                                   "private context must be shared (no name)");
    },[]);

    scope(function(context){
      assert( context === privateContext,    "private context must be shared");
    },[],"module2");

    originalScope = global.scope;
    scope(function(context){
      return scopeReplacement;
    },[],"scope");
    assert( privateContext.scope === scopeReplacement,
                      "scope() is expected to be replaced in private context");
    assert( global.scope === scopeReplacement,
                       "scope() is expected to be replaced in global context");
    // restore origin scope() to allow further tests
    privateContext.scope = originalScope;
    global.scope = originalScope;
  }));

},["assert","log","test","global"],"test-scope-level2-shared");
