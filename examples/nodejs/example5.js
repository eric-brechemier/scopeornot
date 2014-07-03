console.log( "Example 5: Load missing dependencies dynamically" );

console.log(
  "Adding scope-level3-commonjs in a CommonJS environment,\n" +
  "missing dependencies are loaded dynamically with require()\n" +
  "and are exported for direct access with require()."
);

require( '../../scope-level1-global.js' );
require( '../../scope-level2-shared.js' );
require( '../../scope-level3-commonjs.js' );

require( 'Date' );
require( 'timestamp' );
require( 'console' );
require( 'log' );
require( 'timeModule' );

scope(function(context){
  context.timeModule.start();
},["timeModule"]);

scope(function(context){
  context.timeModule.stop();
  context.log(
    "Duration: " + context.timeModule.getDuration() + "ms"
  );
},["log","timeModule"]);
