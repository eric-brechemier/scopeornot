console.log( "Example 4: Define Modules in a Shared Private Scope" );

console.log(
  "By adding scope-level2-shared on top of scope-level1-global,\n" +
  "the same modules are now defined in a shared private scope."
);

require( '../../scope-level1-global.js' );
require( '../../scope-level2-shared.js' );
require( 'Number' );
require( 'Date' );
require( 'timestamp' );
require( '../../node_modules/console.js' );
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
