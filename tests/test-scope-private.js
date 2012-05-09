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

  test("scope(code,needs) must run code ignoring needs",function(){
    var
      hasRun = false;

    scope(function(context){
      hasRun = true;
      notStrictEqual(context, global, "code must not run in global context");
    },["a","ab","abc"]);
    ok(
      hasRun,
      "code must run synchronously, ignoring needs"
    );
  });

  test("scope(code,needs,name) must set result in private context",function(){
    var
      hasRun = false,
      privateContext,
      codeName1 = "module1",
      codeResult1 = {result:"value1"};

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

  });

}());
