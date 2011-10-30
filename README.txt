
scopeornot

LANGUAGE

  JavaScript

DESCRIPTION

  Wrap your modules in scope() calls, and switch the implementation of scope to
  run the code synchronously or asynchronously, optionally defining a module in
  global scope or in a shared context, using CommonJS Modules or Asynchronous
  Module Definition.

  This project defines a single function scope() with multiple implementations.
  The goal is to make definition of modules and private scopes slightly simpler
  than using JavaScript Module pattern, and flexible enough to switch from
  static to dynamic module loading. You can choose one of the provided scope()
  implementations, replace it with another, tweak it to your needs, or create
  your own.

EXAMPLES

  * Run code:
  scope(function(context){
    function timestamp(){
      return Number(new Date());
    }

    if (context.log){
      context.log( "Now: "+timestamp() );
    }
  });

  * Request what you need:
  scope(function(context){
    function timestamp(){
      return Number(new Date());
    }

    context.log( "Now: "+timestamp() );
  },["log"]);

  * Return what you wish to share and give it a name:
  scope(function(){
    function timestamp(){
      return Number(new Date());
    }
    return timestamp;
  },[],"timestamp");

  * Define a module with dependencies:
  scope(function(context){
    var
      // Private alias
      timestamp = context.timestamp,

      // Private fields
      startTime = null,
      endTime = null;

    // Private functions
    function logEvent(name,time){
      log(name+": "+time);
    }

    function start(){
      startTime = timestamp();
      logEvent("start",startTime);
    }

    function stop(){
      endTime = timestamp();
      logEvent("end",endTime);
    }

    function getDuration(){
      if (startTime === null){
        return 0;
      }
      if (endTime === null){
        return timestamp() - startTime;
      }
      return endTime - startTime;
    }

    // Public API
    return {
      start: start,
      stop: stop,
      getDuration: getDuration
    };
  },["timestamp","log"],"timeModule");

APPLICATION PROGRAMMING INTERFACE (API)

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

INCLUDED IMPLEMENTATIONS

  scope-api.js - null implementation (does nothing) with inline documentation
  scope-bootstrap.js - static synchronous definition in single shared context

REFERENCES

  [1] JavaScript Module Pattern: In-Depth
  2010-03-12, by Ben Cherry
  http://www.adequatelygood.com/2010/3/JavaScript-Module-Pattern-In-Depth

  [2] CommonJS Modules
  http://www.commonjs.org/specs/modules/1.0/

  [3] Asynchronous Module Definition
  https://github.com/amdjs/amdjs-api/wiki/AMD
  http://wiki.commonjs.org/wiki/Modules/AsynchronousDefinition

AUTHOR

  Eric Bréchemier <scopeornot@eric.brechemier.name>

LICENSE

  MIT
  http://www.opensource.org/licenses/MIT

HISTORY

  2011-10-30, v0.0.1, Project creation

