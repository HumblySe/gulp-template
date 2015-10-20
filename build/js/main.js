import { one, two, plus } from './moreScript'; // Import from sibling file

// Below imports needs to be specified in environment.json
import angular from '../../bower_components/angular'; // Import from bower_component.
import $ from 'jquery'; // Import from node_modules (jQuery is global)
import { ping } from '../plugins/asdf'; // Import plugin from library.
import plz from 'please-ajax'; // Import node_library

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