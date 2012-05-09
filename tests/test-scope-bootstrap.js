(function(){

  var
    // global object
    global = this;

  test("scope() must be defined",function(){
    strictEqual(typeof scope, "function", "scope() must be a function");
  });

  test("scope(code) must run code in global context",function(){
    var
      hasRun = false;

    scope(function(context){
      hasRun = true;
      strictEqual(context, global, "code must run in global context");
    });
    ok(hasRun,"code must run synchronously");
  });

  test("scope(code,needs) must run code ignoring needs",function(){
    var
      hasRun = false;

    scope(function(context){
      hasRun = true;
      strictEqual(context, global, "code must run in global context");
    },["a","ab","abc"]);
    ok(
      hasRun,
      "code must run synchronously, ignoring needs"
    );
  });

  test("scope(code,needs,name) must set result in global context",function(){
    var
      PROPERTY_NAME = "property-name/for/unit.test",
      RESULT_VALUE = {result:"value"};
      hasRun = false;

    scope(function(context){
      hasRun = true;
      strictEqual(context, global, "code must run in global context");
      return RESULT_VALUE;
    },["a","ab","abc"],PROPERTY_NAME);
    ok(
      hasRun,
      "code must run synchronously, ignoring needs"
    );
    strictEqual(
      global[PROPERTY_NAME],
      RESULT_VALUE,
      "result value must be set with given name in global context"
    );
  });

}());
