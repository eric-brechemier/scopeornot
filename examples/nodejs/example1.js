console.log( "Example 1: Run Code" );

console.log(
  "In this example, the scripts are loaded in order, using require().\n" +
  "scope-level1-global is used alone,\n" +
  "which results in modules declared in the global scope."
);

require( '../../scope-level1-global.js' );
require( 'timestamp' );
require( 'log' );
require( 'run-code' );
