// This module is deprecated and will be deleted in a future version

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
    Function: importFromParentContext(needs)
    Copy missing needs found in parent context to private context

    Parameter:
      needs - optional array of strings, the names of the properties that
              code would like to find in the private context, defaults to []

    Note:
    Nothing happens in case needs argument is null or undefined.
  */
  function importFromParentContext(needs){
    needs = needs || [];

    var
      i,
      need;

    // for each need
    for (i=0; i<needs.length; i++){
      need = needs[i];
      if (
        // not found in private context and found in parent context
        !privateContext.hasOwnProperty(need) && need in parentContext
      ){
        // copy from parent context to private context
        privateContext[need] = parentContext[need];
      }
    }
  }

  /*
    Function: exportToPrivateContext(name,value)
    Set the value of a property with given name in private context

    Parameters:
      name - string, the name of the property to set
      value - any, the value of the property

    Notes:
    1. Nothing happens in case the given name is not a string.

    2. If the name is "scope", the value is copied both in private context
    and in the parent context to replace the global scope() function.
  */
  function exportToPrivateContext(name,value){
    if (typeof name !== "string"){
      return;
    }

    privateContext[name] = value;
    if (name === "scope"){
      // replace the current implementation of scope() in parent context
      parentContext.scope = value;
    }
  }

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

    Note:
    This implementation is expected to be defined on top of scope-bootstrap.
    It replaces the old implementation of scope() that was used for its own
    definition.

    If a requested property is missing in the private context but present in
    the parent context, the property is copied from the parent context to the
    private context beforehand. The intent is to make global objects available
    in the private context, while preserving the global context.

    The only exception is the property "scope", which will be copied from the
    private context to the parent context, to allow the replacement of current
    implementation of scope() with another implementation defined on top.
  */
  function scope(code,needs,name){
    importFromParentContext(needs);
    var result = code(privateContext);
    exportToPrivateContext(name,result);
    return result;
  }

  return scope;
},[],"scope");
