// Static synchronous definition in single shared context
// Implementation of scopeornot API
// https://github.com/eric-brechemier/scopeornot

/*
  Function: scope(code,needs,name)
  Run code immediately, without taking needs into account, and set the return
  value, if any, to a property with given name in the single shared context.

  Parameters:
    code  - function(context), the code to run with the context as parameter
    needs - array of strings, the names of the properties that this code would
            like to find in the context (for documentation purpose)
    name  - string, optional, name of the context property to set the value
            that the code may return

  Note:
  The context is a shared singleton object in this implementation.
*/
var scope = (function(){
  // single shared context
  var context = {};

  function scope(code,needs,name){
    // call code synchronously, without taking needs into account
    var result = code(context);
    if (typeof name==="string"){
      context[name] = result;
    }
  }

  return scope;
}());
