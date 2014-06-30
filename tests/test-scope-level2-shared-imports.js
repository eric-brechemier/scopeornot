(function(){

  var
    // global object
    global = this;

  test("scope(code) must run code in private context",function(){
    var
      hasRun = false;
    scope(function(context){
      hasRun = true;
      notStrictEqual(context,global,"code must not run in global context");
    });
    ok(hasRun,"code must run synchronously");
  });

  test("scope(code,needs) must import needs from global context",function(){
    var
      hasRun = false;

    scope(function(context){
      hasRun = true;
      notStrictEqual(context, global, "code must not run in global context");
      strictEqual(
        context.undefined,
        global.undefined,
        "undefined must be imported from global context"
      );
      strictEqual(
        context.document,
        global.document,
        "document must be imported from global context"
      );
      strictEqual(
        context.window,
        global.window,
        "window must be imported from global context"
      );
      strictEqual(
        context.Date,
        global.Date,
        "Date must be imported from global context"
      );
      strictEqual(
        context.Number,
        global.Number,
        "Number must be imported from global context"
      );
      strictEqual(
        context.setTimeout,
        global.setTimeout,
        "setTimeout must be imported from global context"
      );
    },[
      "a","ab","abc", // missing
      "undefined","document","window","Date","Number","setTimeout" // expected
      ]
    );
    ok(hasRun,"code must run synchronously, in spite of missing needs");
  });

  test("scope(code,needs,name) must set result in private context",function(){
    var
      hasRun = false,
      privateContext,
      codeName1 = "module1",
      codeResult1 = {result:"value1"},
      originalScope,
      scopeReplacement = function(){/* replacement for scope() */};

    scope(function(context){
      hasRun = true;
      notStrictEqual(context, global, "code must not run in global context");
      privateContext = context;
      return codeResult1;
    },["a","ab","abc"],codeName1);
    ok(hasRun,"code must run synchronously, ignoring needs");
    strictEqual(
      typeof privateContext,
      "object",
      "private context must be an object"
    );
    strictEqual(
      privateContext[codeName1],
      codeResult1,
      "result value must be set in private context"
    );

    scope(function(context){
      strictEqual(context,privateContext,"private context must be shared");
    });

    scope(function(context){
      strictEqual(context,privateContext,"private context must be shared");
    },[]);

    scope(function(context){
      strictEqual(context,privateContext,"private context must be shared");
    },[],"module2");

    originalScope = global.scope;
    scope(function(context){
      return scopeReplacement;
    },[],"scope");
    strictEqual(
      privateContext.scope,
      scopeReplacement,
      "scope() is expected to be replaced in private context"
    );
    strictEqual(
      global.scope,
      scopeReplacement,
      "scope() is expected to be replaced in global context"
    );
    // restore origin scope() to allow further tests
    privateContext.scope = originalScope;
    global.scope = originalScope;
  });

}());
