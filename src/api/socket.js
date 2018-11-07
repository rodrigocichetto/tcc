module.exports = class Socket {

    constructor() {
        this.io;
    }

    static init(server) {

        this.io = require('socket.io').listen(server);

        this.io.on('connection', function () {
            console.log('socket: user connected');
        });

    }

    static getIo() {
        return this.io;
    }
}