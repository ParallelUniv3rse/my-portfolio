'use strict';
var $ = require('jbone');
const Ajax = require("reqwest");
import { Observable} from 'rxjs/Observable';
import io from 'socket.io-client';

class Main {

    constructor() {
        this.init();
        let that = "wtf";
        that = "wtf again";
    }

    init() {
        $('body').addClass("green");
        var socket = io.connect('http://localhost:3000');
        socket.on('news', function (data) {
            console.log(data);
            socket.emit('my other event', { my: 'data' });
        });
    }
}
var instance = new Main();
