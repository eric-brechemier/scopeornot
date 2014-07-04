console.log("Test: scope-level1-global");

require( '../../scope-level1-global.js' );
require( '../../node_modules/assert' );
require( '../../node_modules/test.js' );
require( './log.js' );
require( '../../node_modules/global.js' );
require( '../test-scope-level1-global.js' );
