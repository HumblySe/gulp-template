import { one, two, plus } from './moreScript'; // Import from sibling file

// Below imports needs to be specified in environment.json
import $ from 'jquery'; // Import from node_modules (jQuery is global)
import plz from 'please-ajax'; // Import node_library
import angular from 'angular'; // Import from bower_component.
import { ping } from 'asdf'; // Import plugin from library.

plus(one, two);
ping();

angular.module('test', []);

angular.module('test').
controller('hest', function() {
    this.welcome_message = 'Hello World';
    this.p = 'Im an angular app';
});

$(() => {
    $('a').marquee(); // jQuery.fn import are self-executed and appended to jQuery
    plz.get('http://localhost:9999', {
        success: function (d) {
            console.log(d.data);
        }
    });
});