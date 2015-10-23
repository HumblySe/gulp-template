import $ from 'jquery'; // Import from node_modules (jQuery is global)
import { ES6 } from './sample.es6';
var ES5 = require('./sample.es5');

$(() => {
    console.log('Hello World!');
    ES5('ECMASCRIPT 5');
    ES6('ECMASCRIPT 6');
});
