/*global scope, test, ok, strictEqual */
test("scope-ready must run code only when all needs are available",function(){

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
  ok(hasRun,"scope(code) must run code");

  hasRun = false;
  scope(function(context){
    hasRun = true;
    strictEqual(context,sharedContext,"context must be shared");
  },["scope","setTimeout","Date","document"]);
  ok(hasRun,"scope(code,needs) must run code when all needs are available");

  hasRun = false;
  scope(function(context){
    hasRun = true;
    strictEqual(context,sharedContext,"context must be shared");
  },[],"module0");
  ok(hasRun,"scope(code,needs,name) must run code when needs are empty");

  hasRun = false;
  scope(function(context){
    hasRun = true;
    hasRunB = true;
    strictEqual(context,sharedContext,"context must be shared");
    return "B";
  },["module2","module1"],"moduleB");
  scope(function(context){
    hasRun = true;
    hasRunC = true;
    strictEqual(context,sharedContext,"context must be shared");
    return "C";
  },["module1","module3","module2"],"moduleC");
  scope(function(context){
    hasRun = true;
    hasRunA = true;
    strictEqual(context,sharedContext,"context must be shared");
    return "A";
  },["module1"],"moduleA");
  ok(!hasRun,"scope() must not run code when a need is missing");

  hasRun = false;
  scope(function(){
    hasRun = true;
  },[],"module1");
  ok(hasRun,"code must run for module1");
  ok(hasRunA,"moduleA must run after module1 runs");
  ok(!hasRunB,"moduleB must not run when module2 is missing");
  ok(!hasRunC,"moduleC must not run when module2 and module3 are missing");

  hasRun = false;
  scope(function(){
    hasRun = true;
    return function(){};
  },[],"module2");
  ok(hasRun,"code must run for module2");
  ok(hasRunB,"moduleB must run when module1 and module2 are available");
  ok(!hasRunC,"moduleC must not run when module3 is missing");

  hasRun = false;
  scope(function(context){
    hasRun = true;
    context.module3 = false;
    return {};
  },[],"module4");
  ok(hasRunC,"moduleC must run when module1, module2 and module3 are present");

});
