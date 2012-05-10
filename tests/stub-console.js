// define stub for console.log
var
  stubLogCalls = [];

scope(function(){
  var stubConsole = {};

  stubConsole.log = function(){
    strictEqual(this,stubConsole,"log() must be applied to console object");
    stubLogCalls.push( Array.prototype.slice.call(arguments,0) );
  };

  return stubConsole;
},[],"console");
