// Level 3
// Asynchronous Module Definition in single shared context
// Implementation of scopeornot API
// https://github.com/eric-brechemier/scopeornot

// This script must be loaded in level 3 and depends on an implementation
// of the Asynchronous Module Definition such as RequireJS, not included.

/*global scope, require, define */
scope(function(parentContext){

  var
    // declare alias
    parentScope = parentContext.scope;

  /*
    Function: listMissingNeeds(needs,context): array
    List the needed properties missing from the context

    Parameters:
      needs - array of strings, names of the properties that the code expects
              to find in context
      context - object, set of properties in current context

    Returns:
      array of strings, the list of properties from needs that have not beed
      found in the context, in same order
  */
  function listMissingNeeds(needs,context){
    var
      missingNeeds = [],
      need,
      i,
      length;

    for (i=0, length=needs.length; i<length; i++){
      need = needs[i];
      if ( !context.hasOwnProperty(need) ){
        missingNeeds.push(need);
      }
    }

    return missingNeeds;
  }

  /*
    Function: exportDependencies(context,names,values)
    Set the values of properties with given names in the context

    Parameters:
      context - object, the set of properties in current context
      names - array of strings, the list of names of properties to set
      values - array, the list of values of properties to set
  */
  function exportDependencies(context,names,values){
    var
      i,
      length;

    for (i=0, length=names.length; i<length; i++){
      context[ names[i] ] = values[i];
    }
  }

  /*
    Function: scope(code[,needs[,name]]): any
    Load missing needs and run code asynchronously with AMD,
    copy the exported module to a property with given name in shared context

    Parameters:
      code  - function(context), the code to run with the shared context
              as parameter
      needs - optional, array of strings, the names of the properties that this
              code would like to find in the context; missing needs will be
              loaded using AMD
      name  - optional, string, name of the context property to set the value
              that the code may return in shared context and as module export
              for AMD

    Returns:
      any, the return value of this code if it has run synchronously,
      or null if the code has not run yet
  */
  function scope(code,needs,name){
    if (typeof needs === "undefined") {
      // run code now synchronously
      return parentScope(code);
    }

    return parentScope(function(context){
      var
        result = null,
        id = name,
        dependencies = listMissingNeeds(needs,context),
        factory = function(){
          exportDependencies(context,dependencies,arguments);
          result = code(context);
          if (typeof name === "string"){
            context[name] = result;
          }
          return result;
        };

      if (typeof id === "string"){
        define(id,dependencies,factory);
      } else {
        require(dependencies,factory);
      }
      return result;
    },needs);
  }

  return scope;

},["scope"],"scope");
