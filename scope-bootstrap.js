// Static synchronous definition in global context
// Implementation of scopeornot API
// https://github.com/eric-brechemier/scopeornot

var scope = (function(){
  var
    // global context
    context = this;

  /*
    Function: scope(code,needs,name)
    Run code immediately in global context, without taking needs into account,
    and set the return value, if any, to a property with given name in the
    global context.

    Parameters:
      code  - function(context), the code to run with the global context
              provided as parameter
      needs - array of strings, the names of the properties that this code
              would like to find in the global context; ignored, only useful
              for documentation purpose
      name  - string, optional, name of the global context property to set the
              value that the code may return

    Note:
    The global context is accessed using "this" when scope() is called. A
    different context may be used if the scope() function is applied to another
    object instead.
  */
  function scope(code,needs,name){
    // call code synchronously, without taking needs into account
    var result = code(context);
    if (typeof name === "string"){
      context[name] = result;
    }
  }

  return scope;
}());
