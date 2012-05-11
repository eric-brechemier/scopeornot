// Log when scope() is called and when code actually runs
// Implementation of scopeornot API
// https://github.com/eric-brechemier/scopeornot

// This is a filter which must be loaded after another implementation,
// for example scope-bootstrap.js, scope-private.js and scope-ready.js

/*global scope*/
scope(function(parentContext){

  var
    // declare aliases
    parentScope = parentContext.scope,
    Date = parentContext.Date,
    Number = parentContext.Number,
    console = parentContext.console || {},
    log = console.log || function(){};

  /*
    Function: getTimeStamp(): number
    Get a time stamp

    Returns:
      number, the number of milliseconds since 1970-01-01T00:00Z.
  */
  function getTimeStamp(){
    return Number(new Date());
  }

  /*
    Function: scope(code[,needs[,name]])
    Filter to log the call to scope() and when the code runs

    Parameters:
      code  - function(context), the code to run with the context as parameter
      needs - optional, array of strings, the names of the properties that
              this code would like to find in the context
      name  - optional, string, name of the context property to set the value
              that the code may return

    Note:
    Nothing happens in case console.log() is not available. The "console" is
    requested in the context at the time when scope() is called to define this
    implementation. A custom "console" may be defined beforehand, for example
    to forward the logs to a remote server.
  */
  function scope(code,needs,name){
    log.call(console,getTimeStamp(),":","scope(",code,",",needs,",",name,")");
    parentScope(function(context){
      log.call(console,getTimeStamp(),":","code(",code,",",needs,",",name,")");
      return code(context);
    },needs,name);
  }

  return scope;

},["scope","console","Date","Number"],"scope");
