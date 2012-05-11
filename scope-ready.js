// Static asynchronous definition in parent context
// Implementation of scopeornot API
// https://github.com/eric-brechemier/scopeornot

// This script must be loaded after scope-bootstrap.js.
// It may be loaded after scope-bootstrap.js and scope-private.js
// to define modules in private scope instead of global scope.

/*global scope*/
scope(function(parentContext){

  var
    // declare alias
    parentScope = parentContext.scope,

    // private field

    // array of functions, queue recording calls to scope() that could not
    // be completed because of missing dependencies. Each function in the queue
    // repeats the recorded call to scope() when triggered.
    queue = [];

  /*
    Function: isReady(needs,context): boolean
    Check whether all needs are found in context

    Parameters:
      needs - optional, array of strings, names of properties expected
              to be found in context
      context - object, set of properties available in context

    Returns:
      boolean, false when one name in needs is not found in context,
      true otherwise
  */
  function isReady(needs,context){
    if (needs === null || typeof needs === "undefined"){
      return true;
    }

    var
      i,
      name;

    for (i=0; i<needs.length; i++){
      name = needs[i];
      if ( !context.hasOwnProperty(name) ){
        return false;
      }
    }

    return true;
  }

  /*
    Function: processQueue()
    Run all functions in the queue, which is previously reset to empty
  */
  function processQueue(){
    var
      // copy of current queue, to iterate on all items once and only once,
      // even if the queue is modified during processing
      currentQueue = [].concat(queue),
      i;

    // empty the queue
    queue = [];

    // retry all
    for (i=0; i<currentQueue.length; i++){
      currentQueue[i]();
    }
  }

  /*
    Function: scope(code,needs,name)
    Run code when all needs are ready

    This is a filter defined on top of another implementation of scope().

    Parameters:
      code  - function(context), the code to run with the context as parameter
      needs - array of strings, the names of the properties that this code
              would like to find in the context
      name  - string, optional, name of the context property to set the value
              that the code may return

    Note:
    The code runs immediately if all needs are ready. Otherwise, the call is
    queued for asynchronous execution. Each time code runs, all queued calls
    are tried again.
  */
  function scope(code,needs,name){
    parentScope(function(context){
      if ( !isReady(needs,context) ){
        queue.push(function(){
          // retry same call
          scope(code,needs,name);
        });
        return;
      }
      parentScope(code,needs,name);
      processQueue();
    },needs);
  }

  return scope;

},["scope"],"scope");
