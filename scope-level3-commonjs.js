// Level 3
// CommonJS Modules
// Implementation of scopeornot API
// https://github.com/eric-brechemier/scopeornot

// This script must be loaded in level 3 and depends on the availability
// of the CommonJS require() function in the JavaScript environment.

/*global scope, require, exports */
scope(function(parentContext){

  var
    // declare alias
    parentScope = parentContext.scope;

  /*
    Function: requireMissingNeeds(needs,context)
    Use require() to load missing dependencies in the context

    Parameters:
      needs - array of strings, names of the properties that the code expects
              to find in context
      context - object, set of properties in current context
  */
  function requireMissingNeeds(needs,context){
    if (needs===null || typeof needs === "undefined"){
      return;
    }

    var
      i,
      need,
      needExports;

    for (i=0; i<needs.length; i++){
      need = needs[i];
      if ( !context.hasOwnProperty(need) ){
        needExports = require(need);
        // scope() can be called within required module
        // and set the needName property in context.
        // The value defined by scope() call must be preserved.
        if ( context.hasOwnProperty(need) ){
          // when the context was set in scope(), copy it in exported module
          needExports[need] = context[need];
        } else {
          // otherwise copy the module exports to the context
          context[need] = needExports;
        }
      }
    }
  }

  /*
    Function: scope(code,needs,name): any
    Load missing needs with require(), run code and set the result to a
    property with given name in both shared context and module exports

    Parameters:
      code  - function(context), the code to run with the shared context
              as parameter
      needs - array of strings, the names of the properties that this code
              would like to find in the context
      name  - string, optional, name of the property to set the value that the
              code may return, both in shared context and in module exports

    Returns:
      any, the return value of this code if it has run synchronously,
      or null if the code has not run yet
  */
  function scope(code,needs,name){
    return parentScope(function(context){
      requireMissingNeeds(needs,context);
      return code(context);
    },needs,name);
  }

  return scope;

},["scope"],"scope");
