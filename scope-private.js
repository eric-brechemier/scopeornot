// Static synchronous definition in private context
// Implementation of scopeornot API
// https://github.com/eric-brechemier/scopeornot

/*
  Function: scope(code,needs,name)
  Run code immediately in a private context, and set the return value, if any,
  to a property with given name in the private context

  Parameters:
    code - function(context), the code to run with the private context provided
           as parameter
    needs - array of strings, the names of the properties that this code would
            like to find in the private context
    name - string, optional, name of the private context property to set the
           value that the code may return

  Note:
  This script must be loaded after scope-bootstrap.js and before scripts that
  call scope() to define modules in the private context.

  This implementation is expected to be defined on top of scope-bootstrap.
  It replaces the old implementation of scope() that was used for its own
  definition.

  It keeps access to the parent context of the old implementation. If a
  requested property is missing in the private context but present in the
  parent context, the property is copied from the parent context to the
  private context beforehand. The intent is to make global objects available
  in the private context, while preserving the global context.

  The only exception is the property "scope", which will be copied from the
  private context to the parent context, to allow the replacement of current
  implementation of scope() with another implementation defined on top.
*/
/*global scope*/
scope(function(parentContext){
  var
    privateContext = {};

  return function(code,needs,name){
    needs = needs || [];

    var
      i,
      need,
      result;

    // for each need
    for (i=0; i<needs.length; i++){
      need = needs[i];
      if (
        // not found in private context and found in parent context
        !privateContext.hasOwnProperty(need) &&
        parentContext.hasOwnProperty(need)
      ){
        // copy the global property to private context
        privateContext[need] = parentContext[need];
      }
    }

    result = code(privateContext);
    if (typeof name === "string"){
      privateContext[name] = result;
      if (name === "scope"){
        // replace the current implementation of scope in parent context
        parentContext.scope = result;
      }
    }
  };
},["scope"],"scope");
