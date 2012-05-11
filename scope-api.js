// Application Programming Interface (API) of scopeornot
// https://github.com/eric-brechemier/scopeornot
// This is a null implementation (does nothing)

/*
  Function: scope(code[,needs[,name]])
  Run code at some point maybe, optionally taking needs into account, and
  optionally set the return value to a property with given name in the context.

  Parameters:
    code  - function(context), the code to run with the context as parameter
    needs - optional, array of strings, the names of the properties that this
            code would like to find in the context
    name  - optional, string, name of the context property to set the value
            that the code may return

  Notes:
  The context may be, depending on the implementation, the global object or the
  window object in browser environment, a shared singleton object, or a context
  object created specifically for this code based on its name and needs.

  A null or undefined value may be provided for optional arguments, and will
  be treated as if the argument had not been included.

  All arguments have a fixed position; it is not valid to omit the second
  parameter or change the order of parameters. The three valid forms are:
    scope(code);
    scope(code,needs);
    scope(code,needs,name);
*/
function scope(code,needs,name){}
