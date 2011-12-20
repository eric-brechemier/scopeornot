// Asynchronous Module Definition in single shared context
// Implementation of scopeornot API
// https://github.com/eric-brechemier/scopeornot

/*
  Function: scope(code,needs,name)
  Run code asynchronously once all dependencies listed in needs have been
  loaded, and set the return value, if any, to a property with given name in
  the single shared context.

  Parameters:
    code  - function(context), the code to run with the context as parameter
    needs - array of strings, the names of the properties that this code would
            like to find in the context, to be loaded asynchronously
    name  - string, optional, name of the context property to set the value
            that the code may return

  Notes:
  * when only a code function is provided (no dependencies), the function is
    called immediately and thus runs synchronously instead of asynchronously
  * the context is a shared singleton object in this implementation
*/
/*global scope:true, define */
var scope = (function(){

  // single shared context
  var context = {};

  function scope(code,needs,name){
    var
      id = name,
      dependencies = [],
      i,
      length,
      moduleId;

    if (arguments.length===1){
      // no dependency, no id - just run code synchronously now
      code(context);
      return;
    }

    // Fill in dependencies with the list of module ids not found in context
    for (i=0, length=needs.length; i<length; i++){
      moduleId = needs[i];
      if ( !context.hasOwnProperty(moduleId) ){
        dependencies.push(moduleId);
      }
    }

    function factory(){
      var result;

      // Copy dependencies provided as arguments to the context
      for (i=0, length=dependencies.length; i<length; i++){
        moduleId = dependencies[i];
        context[moduleId] = arguments[i];
      }

      // Call the code with shared context
      result = code(context);

      // Copy the returned value to shared context
      // and return it for the AMD loader
      if (typeof id==="string"){
        context[id] = result;
        return result;
      }
    }

    if (arguments.length===2){
      // no id, fallback to local require()
      define(function(require){
        require(dependencies,factory);
      });
    } else if (arguments.length===3){
      define(id,dependencies,factory);
    }
  }

  return scope;
}());
