scope(function(sharedContext){
  var
    log = sharedContext.log,
    test = sharedContext.test,
    assert = sharedContext.assert,

    // relative path to the module which defines scope() for CommonJS
    // (this is were new modules are exported in Node.js)
    SCOPE_COMMONJS_MODULE = "../scope-level3-commonjs.js";

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
    assert( webserver === require(SCOPE_COMMONJS_MODULE).webserver,
            "exported module expected to be available with require() as well");

  }));

},["log","test","assert"],"test-scope-level3-commonjs");
