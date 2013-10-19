
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

  First, scope() can be used as a replacement for the Immediately-Invoked
  Function Expression used in the JavaScript module pattern:

  var assert = scope(function(){
    (...)

    return {
      isTrue: isTrue,
      isFalse: isFalse,
      equals: equals,
      arrayEquals: arrayEquals,
      fail: fail
    };
  });

  Second, you may declare the names of properties expected by a module
  in the list of needs. These properties, if available, will be set in the
  context object provided as argument:

  scope(function(context){
    var
      timestamp = context.timestamp,
      assert = context.assert;

    assert.equals(typeof timestamp, "function",
                                  "timestamp() is expected to be a function");

    assert.fail("Missing tests");

  },["assert","timestamp"]);

  Finally, you may give a name to each module; the value returned by the
  function will be set to a property with given name in the context, and
  this name may be used in the list of needs of other modules:

  // Declare an alias "assert" for "bezen.org/assert"
  scope(function(context){
    return context["bezen.org/assert"];
  },["bezen.org/assert"],"assert");

  // Copy global Number to context
  scope(function(){
    return Number;
  },[],"Number");

  // Copy global Date to context
  scope(function(){
    return Date;
  },[],"Date");

  // Declare the "timestamp" module
  scope(function(context){
    var
      Number = context.Number,
      Date = context.Date;

    function timestamp(){
      if (typeof Date.now == "function"){
        return Date.now();
      }
      return Number(new Date());
    };

    return timestamp;
  },["Number","Date"],"timestamp");

  // Declare unit tests for the timestamp module in "testTimestamp"
  scope(function(context){
    var
      timestamp = context.timestamp,
      assert = context.assert;

    function testTimestamp(){
      assert.equals(typeof timestamp, "function",
                                  "timestamp() is expected to be a function");
      var before = Number(new Date());
      var value = timestamp();
      var after = Number(New Date());
      assert.equals(typeof value, "Number",
                                "timestamp() is expected to return a number");
      assert.isTrue( before <= value && value <= after,
            "timestamp() is expected to return current time in milliseconds");
    }

    return testTimestamp;
  },["assert","timestamp"],"testTimestamp");

  // Run unit tests for timestamp module
  scope(function(context){
    context.testTimestamp();
  },["testTimestamp"]);

APPLICATION PROGRAMMING INTERFACE (API)

  Function: scope(code,needs,name): any
  Run code with needs to define a module with given name

  Parameters:
    code  - function(context), the code to run with the context as parameter
    needs - array of strings, the names of the properties that this code would
            like to find in the context
    name  - string, optional, name of the context property to set with the
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

  Implementations of scope() may be stacked, starting with scope bootstrap,
  scope-level1-global.js or in RingoJS scope-level1-global-ringojs.js.
  Each implementation shall define itself as "scope" in the context and expect
  that a new implementation may be defined in a call to scope() using the name
  "scope" as well. It is up to the child implementation to call the parent one,
  before or after its own code or not at all, to fit its design.

GETTING STARTED

  The minimal requirement is to load scope-level1-global.js to define
  the global scope() function. This is the level 1 of scope-or-not usage.
  You can then use scope() in the scripts loaded subsequently.

  In the browser:
  <script src="scopeornot/scope-level1-global.js"></script>
  <script src="myscript.js"></script>

  ------------------------------------------------------------
    myscript.js
  ------------------------------------------------------------
    scope(function(context){
      return {
        // my module
      };
    },[],"myModule");
  ------------------------------------------------------------

  At this point, myModule will be set to a property of the global object,
  and can be accessed as myModule from legacy code.

  You can now make the module private without changing its code, by adding
  an extra layer of scope, getting to level 2:

  In the browser:
  <script src="scopeornot/scope-level1-global.js"></script>
  <script src="scopeornot/scope-level2-shared.js"></script>
  <script src="myscript.js"></script>

  There is no myModule property on the global object anymore. The property
  is now set on a private context object instead, shared by all modules.

  Similarly, you can make the module definition available to modules
  using a different loader or convention by adding a level 3 script.
  The level 3 scripts may depend on external loader libraries, for example
  require.js to add support for Asynchronous Module Definition (AMD).

  In the browser:
  <script src="scopeornot/scope-level1-global.js"></script>
  <script src="scopeornot/scope-level2-shared.js"></script>
  <script src="requirejs/require.js"></script>
  <script src="scopeornot/scope-level3-amd.js"></script>
  <script src="myscript.js"></script>

  Without changing the code in your script, you just made your module
  define itself with an Asynchronous Module Definition (AMD). As a bonus,
  if you list a module that is not loaded yet in the list of needs of your
  module, it will get loaded asynchronously using require.js before your
  module gets initialized. See how module identifiers are mapped to paths
  and how to customize these paths in the RequireJS API documentation [23].

  To make your code easier to test and to run in different JavaScript
  environment, it is useful to copy properties available in the global
  scope in a given environment into the private context. For example,
  document and window may be copied from the global scope in a browser,
  and stub modules may be defined for unit tests running server-side:

  ------------------------------------------------------------
    browser.js
  ------------------------------------------------------------
    scope(){
      return window;
    },[],"window");

    scope(){
      return document;
    },[],"document");
  ------------------------------------------------------------

  ------------------------------------------------------------
    browser-stub.js
  ------------------------------------------------------------
    scope(){
      return {
        // stub window object
        (...)
      };
    },[],"window");

    scope(){
      return {
        // stub document object
        (...)
      };
    },[],"document");
  ------------------------------------------------------------

BUILDING BLOCKS

  scope-level0-api.js - null implementation (does nothing)
  scope-level1-global.js - scope bootstrap in global context
  scope-level1-global-ringojs.js - alternative bootstrap for RingoJS
  scope-level2-shared.js - private context shared by all modules
  scope-level2-shared-imports.js - deprecated
  scope-level2-unique.js - (ROADMAP) private context created for each module
  scope-level2-within.js - (ROADMAP) shared context and events in within() [24]
  scope-level3-ready.js - only run code once all dependencies are available
  scope-level3-commonjs.js - CommonJS Modules [2]
  scope-level3-nodejs.js - (ROADMAP) variant of CommonJS Modules for node.js
  scope-level3-amd.js - Asynchronous Module Definition [3]
  scope-level3-amd-anonymous.js - (ROADMAP) variant of AMD ignoring module name
  scope-level3-headjs.js - (ROADMAP) asynchronous loading using head.js
  scope-level4-dynamic.js - (ROADMAP) asynchronous loading based on scope-ready
  scope-level8-log.js - log when scope() is called and when code actually runs

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

  [23] RequireJS API documentation
  http://www.requirejs.org/docs/api.html

  [24] within project on GitHub
  "within is a factory of semi-private spaces
   where properties and events can be shared"
  https://github.com/eric-brechemier/within

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
  2012-07-08, v0.3.0, scope() now returns the result of the code or null
  2012-07-27, v0.4.0, Getting started with building blocks organized in levels
  2012-07-30, v0.4.1, Deprecate inherited properties introduced in v0.0.9
  2012-08-08, v0.4.2, Bug fix: add scope in shared private context
  2013-XX-XX, v0.5.0, Move unit tests from scope-in-browser to this project
  2013-XX-XX, v0.5.1, Bug fix in scope-log: add missing declarations
  2013-XX-XX, v0.5.2, Bug fix in scope-amd: handle missing hasOwnProperty()

