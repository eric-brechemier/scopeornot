// Level 2
// Static synchronous definition in a private context shared by all modules
// Implementation of scopeornot API
// https://github.com/eric-brechemier/scopeornot

// This script must be loaded in level 2

/*global scope*/
scope(function(parentContext){
  var
    // private field
    privateContext = {};

  /*
    Function: scope(code[,needs[,name]]): any
    Run code immediately in a private context, and set the return value,
    if any, to a property with given name in the private context

    Parameters:
      code - function(context), the code to run with the private context
             provided as parameter
      needs - optional, array of strings, the names of the properties that
              this code would like to find in the private context
      name - optional, string, name of the private context property to set
             the value that the code may return

    Returns:
      any, the return value of the code
  */
  function scope(code,needs,name){
    var result = code(privateContext);

    if (typeof name !== "string"){
      return result;
    }

    privateContext[name] = result;
    if (name === "scope"){
      // replace the current implementation of scope() in parent context
      parentContext.scope = result;
    }
    return result;
  }

  privateContext.scope = scope;
  return scope;
},[],"scope");
