webpackJsonp([0],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _moreScript = __webpack_require__(1);

	// Import from sibling file

	var _bower_componentsAngular = __webpack_require__(2);

	var _bower_componentsAngular2 = _interopRequireDefault(_bower_componentsAngular);

	// Import from bower_component

	var _jquery = __webpack_require__(4);

	var _jquery2 = _interopRequireDefault(_jquery);

	// Import from node_modules (jQuery is global)

	var _pluginsAsdf = __webpack_require__(5);

	// Import plugin from library.

	var _pleaseAjax = __webpack_require__(6);

	var _pleaseAjax2 = _interopRequireDefault(_pleaseAjax);

	// Import node_library

	(0, _moreScript.plus)(_moreScript.one, _moreScript.two);

	(0, _pluginsAsdf.ping)();

	_bower_componentsAngular2['default'].module('test', []);

	_bower_componentsAngular2['default'].module('test').controller('hest', function () {
	    this.welcome_message = 'Hello World';
	    this.p = 'Im an angular app';
	});

	(0, _jquery2['default'])(function () {
	    (0, _jquery2['default'])('a').marquee(); // jQuery.fn import are self-executed and appended to jQuery
	    _pleaseAjax2['default'].get('http://localhost:9999', {
	        success: function success(d) {
	            console.log(d.data);
	        }
	    });
	});

/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.plus = plus;
	var one = 1;
	exports.one = one;
	var two = 2;

	exports.two = two;

	function plus(a, b) {
	    console.log(a + b);
	}

/***/ }
]);