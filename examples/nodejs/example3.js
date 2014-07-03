console.log( "Example 3: Define a Module with Dependencies" );

console.log(
  "This example defines two more modules: " +
  "\"timestamp\" and \"timeModule\".\n" +
  "Using scope-level1-global alone, the modules can be accessed directly\n" +
  "in the global context as well as indirectly using scope()."
);

require( '../../scope-level1-global.js' );
require( 'timestamp' );
require( 'log' );
require( 'timeModule' );

timeModule.start();
scope(function(context){
  context.timeModule.stop();
  context.log(
    "Duration: " + context.timeModule.getDuration() + "ms"
  );
},["log","timeModule"]);
