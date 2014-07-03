console.log( "Example 2: Request What You Need" );

console.log(
  "This example is similar to Example 1\n" +
  "This time, the module lists its needs explicitly.\n" +
  "It works in the same way, because scope-level1-global is used alone,\n" +
  "and scope-level1-global ignores the needs declared by modules."
);

require( '../../scope-level1-global.js' );
require( 'timestamp' );
require( 'log' );
require( 'run-code-with-needs' );
