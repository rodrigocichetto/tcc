
// module.exports = () => {

//     let io;

//     return {
//         init: (server) => {

//             // console.log(io);
//             io = require('socket.io').listen(server);

//             io.on('connection', function () {
//                 console.log('a user connected');
//                 // io.emit('irrigation:updated', { teste: 123 });
//             });
//             // console.log(io);
//         },
//         getIo() {
//             console.log(io);
//             return io;
//         }
//     }

// }

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