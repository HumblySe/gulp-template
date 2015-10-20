import * as scripts from './script';
import { one, two, plus } from './moreScript';
import $ from 'jquery';

scripts.a();
plus(one, two);

$(() => {
    console.log('jQuery is loaded');
});