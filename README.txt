
scopeornot

LANGUAGE

  JavaScript

AUTHOR

  Eric Bréchemier <scopeornot@eric.brechemier.name>

LICENSE

  MIT
  http://www.opensource.org/licenses/MIT

BACKGROUND STORY

  In November 2008, while working on the development of mangaconseil.com [1],
  I created a module with utility functions for unit tests. The declaration
  used a module pattern seen in the first edition of "JavaScript: The Good
  Parts" by Douglas Crockford [2], published in May 2008:

  // 2008-11-23, CC-BY Eric Bréchemier
  var assert = function() {
    // Builder of
    // Closure object with utility assert methods for unit tests

    (...)

    var isTrue = function(condition,message) {
      // Assert whether condition is true
      // or fail with provided error message.

      if (!condition) {
        fail(message);
      }
    };

    (...)

    return {
      // Public declarations
      isTrue: isTrue,
      isFalse: isFalse,
      equals: equals,
      arrayEquals: arrayEquals,
      fail: fail
    };
  }();

  In September 2009, I created the bezen.org JavaScript library [3] to
  formalize and share the reusable modules created for mangaconseil.com.
  The assert module moved to the "bezen" namespace used by the library,
  a property of the window object.

  // 2009-07-12, CC-BY Eric Bréchemier
  /*global bezen, window */
  window.bezen = window.bezen || {};
  bezen.assert = function() {
    // Builder of
    // Closure object with utility assert methods for unit tests

    (...)

    var isTrue = function(condition,message) {
      // Assert whether condition is true
      // or fail with provided error message.

      if (!condition) {
        fail(message);
      }
    };

    (...)

    return {
      // Public declarations
      isTrue: isTrue,
      isFalse: isFalse,
      equals: equals,
      arrayEquals: arrayEquals,
      fail: fail
    };
  }();

  In October 2009, I added a build script in the bezen.org JavaScript library
  to check the code using JSLint [4], combine the code using Combiner [5] and
  minify the combined script using YUI Compressor [6]. Under the influence of
  Perl, I also added the property '_' in the module API, private by convention.

  The format of the module pattern expected in JSLint had evolved. The function
  had now to be enclosed in parentheses to explicit its nature of expression.
  The namespace 'bezen' was now declared in a separate file, bezen.js, which
  was signaled as a dependency to Combiner using a special comment:

  // 2009-10-06, CC-BY Eric Bréchemier
  /*requires bezen.js */
  /*jslint nomen:false, white:false, onevar:false, plusplus:false */
  /*global bezen */
  bezen.assert = (function() {
    // Builder of
    // Closure object with utility assert methods for unit tests

    (...)

    var isTrue = function(condition,message) {
      // Assert whether condition is true
      // or fail with provided error message.

      if (!condition) {
        fail(message);
      }
    };

    (...)

    return { // public API
      isTrue: isTrue,
      isFalse: isFalse,
      equals: equals,
      arrayEquals: arrayEquals,
      fail: fail,

      _:{ // private section, for unit tests
      }
    };
  }());

  In April 2010, I started working on The Scalable JavaScript Application
  framework [7], using the latest version of the bezen.org JavaScript library
  for unit tests:

  // 2010-01-14, CC-BY Eric Bréchemier
  /*requires bezen.js */
  /*requires bezen.object.js */
  /*jslint nomen:false, white:false, onevar:false, plusplus:false */
  /*global bezen */
  bezen.assert = (function() {
    // Builder of
    // Closure object with utility assert methods for unit tests

    // Define aliases
    var isArray = bezen.object.isArray,
        exists = bezen.object.exists;

    (...)

    var isTrue = function(condition,message) {
      // Assert whether condition is true
      // or fail with provided error message.
      //
      // params:
      //   condition - (boolean) (!nil) the condition to evaluate
      //   message - (string) (!nil) the error message

      if (condition!==true) {
        fail(message);
      }
    };

    (...)

    return { // public API
      fail: fail,
      isTrue: isTrue,
      isFalse: isFalse,
      equals: equals,
      arrayEquals: arrayEquals,
      objectEquals: objectEquals,

      _:{ // private section, for unit tests
        difference: difference
      }
    };
  }());

  This code was used as is for all the unit tests in The Scalable JavaScript
  Application framework until June 2011, when I started using RequireJS [8]
  for the dynamic loading of scripts.

  For compatibility with the former API, the namespace 'bezen' is kept as
  a dependency, and the API of assert module is both assigned to the namespace
  and exported as return value of the factory wrapped in the call to define():

  // 2011-06-14, Copyright 2011 Legal-Box SAS, All Rights Reserved
  // Licensed under the BSD License - http://creativecommons.org/licenses/BSD/
  /*jslint nomen:false, white:false, onevar: false, plusplus: false */
  define(["./bezen","./bezen.object"],
          function(bezen,object) {
    // Builder of
    // Closure object with utility assert methods for unit tests

    // Define aliases
    var isArray = object.isArray,
        exists = object.exists;

    (...)

    var isTrue = function(condition,message) {
      // Assert whether condition is true
      // or fail with provided error message.
      //
      // params:
      //   condition - (boolean) (!nil) the condition to evaluate
      //   message - (string) (!nil) the error message

      if (condition!==true) {
        fail(message);
      }
    };

    (...)

    // Assign to global bezen.assert,
    // for backward compatibility in browser environment
    bezen.assert = {
      // public API
      fail: fail,
      isTrue: isTrue,
      isFalse: isFalse,
      equals: equals,
      arrayEquals: arrayEquals,
      objectEquals: objectEquals,

      _:{ // private section, for unit tests
        difference: difference
      }
    };

    return bezen.assert;
  });

  At the time of this writing, the battle is raging about the best way to
  define modules in the future version of JavaScript: the new syntax [9] and
  API [10] proposed in ECMAScript Harmony are debated [11] [12] [13] [14].

DESCRIPTION

  I want to write JavaScript modules today that will still work in 5 years.

  This requires a different mindset. The state of the art for the declaration
  of modules [15] is to wrap each module definition in a so-called Immediately-
  Invoked Function Expression [16]. And when you want to run your module in
  more [17] than [18] one [19] JavaScript environment, to spice up each
  definition with all kinds of awkward motifs [20].

  Here is a simpler proposition: wrap each module definition in a call to a
  function named scope() designed as a future-proof portability layer.

  Instead of changing the code of each module, change the scope() function:
  using different implementations of scope(), the same modules can be defined
  in the global scope, in a shared or a private context, using Asynchronous
  Module Definition [17] or CommonJS Modules [18] or a new script loader that
  appears in the future.

  To create the implementation of scope() that matches your needs, you can
  select building blocks from this project, add your own building blocks, or
  rewrite the scope() function completely. By conforming to the scope() API,
  the building blocks provide a flexible mechanism to change how your modules
  are defined while keeping their code unchanged.

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
    var
      // declare aliases
      Number = context.Number,
      Date = context.Date,
      log = context.log;

    function timestamp(){
      return Number(new Date());
    }

    log( "Now: "+timestamp() );
  },["log","Number","Date"]);

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
      // Private aliases
      timestamp = context.timestamp,
      log = context.log,

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

  Notes:
  The context may be, depending on the implementation, the global object or the
  window object in browser environment, a shared singleton object, or a context
  object created specifically for this code based on its name and needs.

  Implementations of scope() may be stacked, starting with scope-bootstrap.js:
  each implementation shall define itself as "scope" in the context and expect
  that a new implementation can be defined in a call to scope() using the name
  "scope" as well. It is up to the new implementation to call the old one,
  before or after its own code or not at all, to fit its purpose.

INCLUDED IMPLEMENTATIONS

  scope-api.js - null implementation (does nothing) with inline documentation
  scope-bootstrap.js - static synchronous definition in global context
  scope-bootstrap-ringojs.js - alternative bootstrap implementation for RingoJS
  scope-private.js - static synchronous definition in private context
  scope-ready.js - static asynchronous definition in parent context
  scope-log.js - log when scope() is called and when code actually runs
  scope-amd.js - Asynchronous Module Definition [3]
  scope-cjs.js - CommonJS Modules [2]

REFERENCES

  [1] mangaconseil.com
  http://mangaconseil.com

  [2] JavaScript: The Good Parts
  May 2008: First Edition
  by Douglas Crockford

  [3] bezen.org JavaScript library
  http://bezen.org/javascript/

  [4] JSLint - The JavaScript code quality tool
  by Douglas Crockford
  http://jslint.com/

  [5] Introducing Combiner, a JavaScript/CSS concatenation tool
  2009-09,22, by Nicholas C. Zakas
  http://www.nczonline.net/blog/2009/09/22/
    introducing-combiner-a-javascriptcss-concatenation-tool/

  [6] YUI Compressor
  http://developer.yahoo.com/yui/compressor/

  [7] The Scalable JavaScript Application framework
  https://github.com/eric-brechemier/lb_js_scalableApp
  https://github.com/eric-brechemier/introduction_to_lb_js_scalableApp

  [8] RequireJS - A JavaScript Module Loader
  by James Burke
  http://requirejs.org/

  [9] harmony:modules - ECMAScript Wiki
  http://wiki.ecmascript.org/doku.php?id=harmony:modules

  [10] harmony:module_loaders - ECMAScript Wiki
  http://wiki.ecmascript.org/doku.php?id=harmony:module_loaders

  [11] ES Modules: suggestions for improvement
  2012-06-25, by James Burke
  http://tagneto.blogspot.ca/2012/06
    /es-modules-suggestions-for-improvement.html

  [12] On ES 6 Modules
  2012-06-25, by Isaac Z. Schlueter
  http://blog.izs.me/post/25906678790/on-es-6-modules

  [13] Comments on Isaac's ES modules post
  2012-06-26, by James Burke
  http://tagneto.blogspot.ca/2012/06/comments-on-isaacs-es-modules-post.html

  [14] Static module resolution
  2012-06-29, by Dave Herman
  http://calculist.org/blog/2012/06/29/static-module-resolution/

  [15] JavaScript Module Pattern: In-Depth
  2010-03-12, by Ben Cherry
  http://www.adequatelygood.com/2010/3/JavaScript-Module-Pattern-In-Depth

  [16] Immediately-Invoked Function Expression (IIFE)
  2010-11-15, by Ben Alman
  http://benalman.com/news/2010/11/immediately-invoked-function-expression/

  [17] Asynchronous Module Definition
  https://github.com/amdjs/amdjs-api/wiki/AMD
  http://wiki.commonjs.org/wiki/Modules/AsynchronousDefinition

  [18] CommonJS Modules
  http://www.commonjs.org/specs/modules/1.0/

  [19] window - Gecko DOM Reference - Mozilla Developer Network
  https://developer.mozilla.org/en/DOM/window

  [20] UMD (Universal Module Definition) patterns
  https://github.com/umdjs/umd

  [21] my-common by Jie Meng-Gérard
  https://github.com/jiem/my-common

  [22] ParisJS
  http://parisjs.org

PRIOR ART

  scopeornot was inspired by the scope() function in my-common project [21],
  presented by Jie Meng-Gérard at ParisJS [22] in March 2011.

HISTORY

  2011-10-30, v0.0.1, Project creation: scope-api, scope-bootstrap
  2011-12-19, v0.0.2, Asynchronous Module Definition: scope-amd
  2012-01-07, v0.0.3, Record order of code() calls: scope-record
  2012-04-27, v0.0.4, Updated scope-bootstrap: global context, can be stacked
  2012-05-08, v0.0.5, Synchronous definition in private scope: scope-private
  2012-05-09, v0.0.6, Asynchronous definition: scope-ready
  2012-05-09, v0.0.7, Log when scope() is called and when code runs: scope-log
  2012-05-09, v0.0.8, scope-record is deprecated
  2012-05-09, v0.0.9, Enhance scope-private: import inherited properties too
  2012-05-10, v0.1.0, Bug fix in scope-log: add missing dependency "scope"
  2012-05-11, v0.2.0, CommonJS Modules: scope-cjs
  2012-06-11, v0.2.1, Global definition in RingoJS: scope-bootstrap-ringojs
  2012-06-11, v0.2.2, Delete deprecated script scope-record

