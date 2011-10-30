// Application Programming Interface (API) of scopeornot
// https://github.com/eric-brechemier/scopeornot
// This is a null implementation (does nothing)

/*
  Function: scope(code,needs,name)
  Run code at some point maybe, optionally taking needs into account, and
  optionally set the return value to a property with given name in the context.

  Parameters:
    code  - function(context), the code to run with the context as parameter
    needs - array of strings, the names of the properties that this code would
            like to find in the context
    name  - string, optional, name of the context property to set the value
            that the code may return

  Note:
  The context may be, depending on the implementation, the global object or the
  window object in browser environment, a shared singleton object, or a context
  object created specifically for this code based on its name and needs.
*/
function scope(code,needs,name){}
