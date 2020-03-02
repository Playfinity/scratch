importScripts('https://cloud01.playfinity.io/socket.io/socket.io.js');

(function(ext) {
    var ext = this;
    var alarm_went_off = false; // This becomes true after the alarm goes off

    // Cleanup function when the extension is unloaded
    ext._shutdown = function() {};

    // Status reporting code
    // Use this to report missing hardware, plugin or unsupported browser
    ext._getStatus = function() {
        return {status: 2, msg: 'Ready'};
    };

    ext.listen_name = function(GivenName) {
       // do some remote registration
       alert('Action: Register listener');
    };

    ext.when_throw = function() {
       // Reset alarm_went_off if it is true, and return true
       // otherwise, return false.
       if (alarm_went_off === true) {
           alarm_went_off = false;
           return true;
       }

       return false;
    };

    // Block and block menu descriptions
    var descriptor = {
        blocks: [
            ['', 'listen for ball throws from %s', 'listen_name', 'name'],
            ['h', 'when ball is thrown', 'when_throw'],
        ]
    };

    // Register the extension
    ScratchExtensions.register('Ball extension', descriptor, ext);
})();