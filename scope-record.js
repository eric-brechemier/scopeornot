// Filter scope() calls to record the order in which modules would be defined
// Insert after an implementation of scopeornot API and before modules using it
// https://github.com/eric-brechemier/scopeornot

/*
  Function: scope(code,needs,name)
  Filter scope() calls to record the order of calls to code()

  The intent of this filter is to get a suitable order to combine modules for
  optimization purpose, based on the order determined at run-time using an
  existing loader.

  The records can then be retrieved by calling scope.getCallList(), which
  returns an array of objects with one property for each parameter of the call
  to scope(): code, needs, name.

  Parameters:
    code  - function(context), the code which would have run (but won't run)
    needs - array of strings, the names of the properties that this code would
            like to find in the context
    name  - string, optional, name of the context property to set the value
            that the code may have returned (which won't be set)

  Note:
  The calls are recorded at the time when code() would have been triggered,
  which may come in a different order than calls to scope().
*/
var scope = (function(){
  var
    // Declare alias to filtered scope function
    callScope = scope,

    // Private field
    callList = [];

  /*
    Function: scopeRecord(code,needs,name)
    Filter calls to scope() to record calls to code()

    Parameters:
      code - function, the callback to record
      needs - array, the list of dependencies to save in same record
      name - string, the name of the module to save in same record

    Note:
    "needs" and "name" are omitted in the record when the corresponding
    parameters are omitted from the call to scope().
  */
  function scopeRecord(code,needs,name){
    // call spied scope with the same number of arguments
    switch(arguments.length){
      case 1:
        callScope(function(){
          callList.push({code:code});
        });
        break;
      case 2:
        callScope(function(){
          callList.push({code:code,needs:needs});
        },needs);
        break;
      case 3:
        callScope(function(){
          callList.push({code:code,needs:needs,name:name});
        },needs,name);
        break;
    }
  }

  /*
    Function: scope.getCallList(): array
    Get the list of calls to code() recorded by the scope spy

    Returns:
      array of objects, records of the list of calls to code functions
      registered in calls to scope() after the scope-spy has been loaded,
      with following properties:
        code - function, the function provided in scope() call
        needs - array, the list of dependencies provided in scope() call
        name - string, the name provided in scope() call
  */
  scopeRecord.getCallList = function(){
    return callList;
  };

  return scopeRecord;
}());
