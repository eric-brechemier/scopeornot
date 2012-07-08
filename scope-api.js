// Application Programming Interface (API) of scopeornot
// https://github.com/eric-brechemier/scopeornot
// This is a null implementation (does nothing)

/*
  Function: scope(code[,needs[,name]]): any
  Run code with needs to define a module with given name

  Parameters:
    code  - function(context), the code to run with the context as parameter
    needs - optional, array of strings, the names of the properties that this
            code would like to find in the context
    name  - optional, string, name of the context property to set with the
            value returned by this code

  Returns:
    any, the return value of this code if it has run synchronously,
    or null if the code has not run yet

  Notes:
  A null or undefined value may be provided for optional arguments, and will
  be treated as if the argument had not been included.

  All arguments have a fixed position; it is not valid to omit the second
  parameter or change the order of parameters. The three valid forms are:
    scope(code);
    scope(code,needs);
    scope(code,needs,name);

  The context may be, depending on the implementation, the global object or the
  window object in browser environment, a shared singleton object, or a context
  object created specifically for this code based on its name and needs.

  Implementations of scope() may be stacked, starting with scope-bootstrap.js:
  each implementation shall define itself as "scope" in the context and expect
  that a new implementation may be defined in a call to scope() using the name
  "scope" as well. It is up to the child implementation to call the parent one,
  before or after its own code or not at all, to fit its design.
*/
function scope(code,needs,name){
  return null;
}
