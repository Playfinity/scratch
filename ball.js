importScripts("https://cloud01.playfinity.io/socket.io/socket.io.js");
importScripts("https://code.jquery.com/jquery-1.11.1.js");

new (function() {
    var ext = this;

    var consoleId = "33333";
    var socket = io("https://cloud01.playfinity.io" + (consoleId != null ? ("?consoleId=" + consoleId) : "" ) );

    // Cleanup function when the extension is unloaded
    ext._shutdown = function() {};

    // Status reporting code
    // Use this to report missing hardware, plugin or unsupported browser
    ext._getStatus = function() {
        return { status: 2, msg: 'Ready'};
    };

    // Functions for block with type 'w' will get a callback function when a
    // ball catch event occurs.
    ext.ballCatch = function(callback) {
        console.log('Waiting for ball catch event');
        socket.on('event', function(msg){
            callback("ballEvent");
        });
    };

    // Block and block menu descriptions
    var descriptor = {
        blocks: [
            ['w', 'when ball catch occurs', 'ballCatch'],
        ]
    };

    // Register the extension
    ScratchExtensions.register('Playfinity ball events', descriptor, ext);
})();