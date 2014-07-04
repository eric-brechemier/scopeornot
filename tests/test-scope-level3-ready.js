scope(function(context){
  var
    log = context.log,
    test = context.test,
    assert = context.assert;

  log(test(function(){
    var
      hasRun = false,
      hasRunA = false,
      hasRunB = false,
      hasRunC = false,
      sharedContext;

    scope(function(context){
      hasRun = true;
      sharedContext = context;
    });
    assert( hasRun,                               "scope(code) must run code");

    sharedContext.setTimeout = setTimeout;
    sharedContext.Date = Date;

    hasRun = false;
    scope(function(context){
      hasRun = true;
      assert( context === sharedContext,   "context must be shared (no name)");
    },["scope","setTimeout","Date"]);
    assert( hasRun,
               "scope(code,needs) must run code when all needs are available");

    hasRun = false;
    scope(function(context){
      hasRun = true;
      assert( context === sharedContext,   "context must be shared (module0)");
    },[],"module0");
    assert( hasRun,
                  "scope(code,needs,name) must run code when needs are empty");

    hasRun = false;
    scope(function(context){
      hasRun = true;
      hasRunB = true;
      assert( context === sharedContext,   "context must be shared (moduleB)");
      return "B";
    },["module2","module1"],"moduleB");
    scope(function(context){
      hasRun = true;
      hasRunC = true;
      assert( context === sharedContext,   "context must be shared (moduleC)");
      return "C";
    },["module1","module3","module2"],"moduleC");
    scope(function(context){
      hasRun = true;
      hasRunA = true;
      assert( context === sharedContext,    "context must be shared (moduleA)");
      return "A";
    },["module1"],"moduleA");
    assert( !hasRun,       "scope() must not run code when a need is missing");

    hasRun = false;
    scope(function(){
      hasRun = true;
    },[],"module1");
    assert( hasRun,                               "code must run for module1");
    assert( hasRunA,                    "moduleA must run after module1 runs");
    assert( !hasRunB,          "moduleB must not run when module2 is missing");
    assert( !hasRunC,
                  "moduleC must not run when module2 and module3 are missing");

    hasRun = false;
    scope(function(){
      hasRun = true;
      return function(){};
    },[],"module2");
    assert( hasRun,                               "code must run for module2");
    assert( hasRunB,"moduleB must run when module1 and module2 are available");
    assert( !hasRunC,          "moduleC must not run when module3 is missing");

    hasRun = false;
    scope(function(context){
      hasRun = true;
      context.module3 = false;
      return {};
    },[],"module4");
    assert( hasRunC,
             "moduleC must run when module1, module2 and module3 are present");
  }));

},["log","test","assert"],"test-scope-level3-ready");
