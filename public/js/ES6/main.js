'use strict';

const $ = require('jbone');
const Ajax = require("reqwest");
import { Observable} from 'rxjs/Observable';
import io from 'socket.io-client';


class Client {
    socket;
    
    constructor(socketUrl) {
        this.socket = io.connect(socketUrl);
        this.init();
    }

    init() {
        let _this = this;
        this.socket.on('news', function (data) {
            console.log(data);
            _this.socket.emit('my other event', { my: 'data' });
        });
    }
}
var instance = new Client('http://localhost:3000');