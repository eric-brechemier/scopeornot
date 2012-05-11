// CommonJS Modules
// Implementation of scopeornot API
// https://github.com/eric-brechemier/scopeornot

// This script must be loaded after scope-bootstrap.js.
// It may be loaded after scope-bootstrap.js and scope-private.js
// to define modules in private scope instead of global scope.

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
        if ( !context.hasOwnProperty(need) ){
          // if no value was defined, assign the exported object instead
          context[need] = needExports;
        }
      }
    }
  }

  /*
    Function: scope(code,needs,name)
    Load missing needs with require(), run code and set the result to a
    property with given name in both shared context and module exports

    Parameters:
      code  - function(context), the code to run with the shared context
              as parameter
      needs - array of strings, the names of the properties that this code
              would like to find in the context
      name  - string, optional, name of the property to set the value that the
              code may return, both in shared context and in module exports
  */
  function scope(code,needs,name){
    parentScope(function(context){
      requireMissingNeeds(needs,context);
      var result = code(context);
      if (typeof name === "string"){
        exports[name] = result;
      }
      return result;
    },needs,name);
  }

  return scope;

},["scope"],"scope");