importScripts('https://cloud01.playfinity.io/socket.io/socket.io.js');

(function(ext) {
    var ext = this;
    var alarm_went_off = false; // This becomes true after the alarm goes off
    const soundThrow = new Audio("https://labs.playfinity.io/cloud/sounds/standard_generic_throw.mp3");
    const soundCatch = new Audio("https://labs.playfinity.io/cloud/sounds/standard_generic_catch.mp3");
    const soundJump = new Audio("https://labs.playfinity.io/cloud/sounds/jump_v5_level1_1.wav");
    const soundJump180 = new Audio("https://labs.playfinity.io/cloud/sounds/VO_180.wav");
    const soundJump360 = new Audio("https://labs.playfinity.io/cloud/sounds/VO_360.wav");
    const soundJump720 = new Audio("https://labs.playfinity.io/cloud/sounds/VO_720.wav");
    const soundJumpFlip = new Audio("https://labs.playfinity.io/cloud/sounds/VO_Flips.wav");
    const soundJumpCount20 = new Audio("https://labs.playfinity.io/cloud/sounds/VO_20_jumps.wav");
    const soundJumpCount50 = new Audio("https://labs.playfinity.io/cloud/sounds/VO_50_jumps.wav");
    const soundJumpCount100 = new Audio("https://labs.playfinity.io/cloud/sounds/VO_100_jumps.wav");

    var consoleName;

    // Cleanup function when the extension is unloaded
    ext._shutdown = function() {};

    // Status reporting code
    // Use this to report missing hardware, plugin or unsupported browser
    ext._getStatus = function() {
        return {status: 2, msg: 'Ready'};
    };

    ext.listen_name = function(givenName) {
      // do some remote registration
      alert('Action: Register listener for ' + givenName);
      consoleName = givenName.length == 0 ? null : givenName;

      var socket = io("https://cloud01.playfinity.io" + (consoleName != null ? ("?consoleName=" + consoleName) : "" ) );

      socket.on('event', function(event){
        if (event.event == "throw")
          soundThrow.play();
        else if (event.event == "catch")
          soundCatch.play();
        else if (event.event == "jump") {
          soundJump.play();
        } else if (event.event == "landFeet") {
          const rotation = Math.abs(event.rotation);
          if(rotation >= 650)
            soundJump720.play();
          else if(rotation >= 480)
            soundJump540.play();
          else if(rotation >= 300)
            soundJump360.play();
          else if(rotation >= 150)
            soundJump180.play();
        }

        $('#messages').append($('<li>').text(JSON.stringify(event)));

        var randomtop = Math.floor(Math.random() * 450 - 150);
        var randomleft = Math.floor(Math.random() * 450 - 150);
        if (randomtop < 0) randomtop = 0;
        if (randomleft < 0) randomleft = 0;
        //var randomzindex = Math.floor(Math.random() * 450 - 150);
        /*
        $('#eventObjects').append(
          $('<span class="dot"><h1>Round Dot</h1></span>').text("HM!").css({
            "margin-top": randomtop,
            "margin-left": randomleft
          })
        );*/
      });
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