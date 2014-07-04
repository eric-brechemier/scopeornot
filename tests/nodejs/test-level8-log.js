console.log("Test: scope-level8-log");

require( '../../scope-level1-global.js' );
require( '../../scope-level2-shared.js' );
require( '../../scope-level3-ready.js' );
require( '../../node_modules/assert' );
require( '../../node_modules/test.js' );
require( '../../node_modules/console.js' );
require( './log.js' );
require( '../stub-log.js' );
require( '../../scope-level8-log.js' );
require( '../test-scope-level8-log.js' );
