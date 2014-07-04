// Level 8
// Log when scope() is called and when code actually runs
// Implementation of scopeornot API
// https://github.com/eric-brechemier/scopeornot

// This is a filter which may loaded at any level above level 1, and depends
// on the module "log" in the context, not included. Examples of "log" module
// implementations for different platforms can be found in the subdirectories
// of examples/ and tests/ in scopeornot repository.

/*global scope*/
scope(function(parentContext){

  var
    // declare aliases
    parentScope = parentContext.scope,
    log = parentContext.log;

  /*
    Function: scope(code[,needs[,name]]): any
    Filter to log the call to scope() and when the code runs

    Parameters:
      code  - function(context), the code to run with the context as parameter
      needs - optional, array of strings, the names of the properties that
              this code would like to find in the context
      name  - optional, string, name of the context property to set the value
              that the code may return

    Returns:
      any, the return value of this code if it has run synchronously,
      or null if the code has not run yet

    Notes:
    1. The log() function used for logging must be defined beforehand, and can
    be customized to log locally to the console and or to a remote server.
    2. The log calls are made with separate arguments, without converting
    arguments to a string to preserve the original arguments provided, and
    without concatenating to avoid unnecessary parsing when analyzing the logs
    with code. The logged arguments are in the following order:
      * 'scope(' | 'code('
      * code
      * ','
      * needs
      * ','
      * name
      * ')'
  */
  function scope(code,needs,name){
    log("scope(",code,",",needs,",",name,")");
    return parentScope(function(context){
      log("code(",code,",",needs,",",name,")");
      return code(context);
    },needs,name);
  }

  return scope;

},["scope","log"],"scope");
