console.log("Test: scope-level3-ready");

require( '../../scope-level1-global.js' );
require( '../../scope-level2-shared.js' );
require( '../../node_modules/assert.js' );
require( '../../node_modules/test.js' );
require( '../../node_modules/console.js' );
require( './log.js' );
require( '../../scope-level3-ready.js' );
require( '../test-scope-level3-ready.js' );
