scope(function(sharedContext){
  var
    log = sharedContext.log,
    test = sharedContext.test,
    assert = sharedContext.assert;

  log(test(function(){
    var
      hasRun,
      httpModule,
      webserver;

    hasRun = false;
    scope(function(context){
      hasRun = true;
      assert( context === sharedContext,      "context must be shared (code)");
    });
    assert( hasRun,                                    "scope(code) must run");

    hasRun = false;
    scope(function(context){
      hasRun = true;
      assert( context === sharedContext,     "context must be shared (needs)");
      assert( typeof context.timestamp === "function",
                               "direct dependency 'timestamp' must be loaded");
      assert( context.timestamp === require("timestamp").timestamp,
           "same module 'timestamp' expected by direct access with require()");
      assert(
        typeof context.Number === "function" &&
        typeof context.Date === "function",
                   "indirect dependencies 'Number' and 'Date' must be loaded");
    },["timestamp"]);
    assert( hasRun,                              "scope(code,needs) must run");

    hasRun = false;
    httpModule = require("http");
    webserver = scope(function(context){
      hasRun = true;

      assert( httpModule === context.http,
                "same module expected in context as in require() call before");

      return {
        http: context.http,
        https: context.https
      };
    },["http","https"],"webserver");
    assert( hasRun,                         "scope(code,needs,name) must run");
    assert( webserver.https = require("https"),
                 "same module expected in context as in require() call after");
  }));

},["log","test","assert"],"test-scope-level3-commonjs");
