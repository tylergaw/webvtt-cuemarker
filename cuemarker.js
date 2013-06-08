// Super dumb keyboard controls for HTML video elements and keyframe marker for
// creating WebVTT cue times.
window.cuemarker = (function () {
    'use strict';

    var vid = null,
        seekInterval = 0.03;

    // Format - 00:00:00.000
    // This is the format required by WebVTT. It's very strict about it.
    function formatTime (time) {
        var t = parseFloat(time),
            hrs = Math.floor(t / 3600),
            mins = Math.floor((t - (hrs * 3600)) / 60),
            secs = (t - (hrs * 3600) - (mins * 60)).toFixed(3);

        function addleadingZero (num) {
            var n = num;

            if (n < 10) {
                n = '0' + n;
            }

            return n;
        }

        return [hrs, mins, secs].map(addleadingZero).join(':');
    }

    // Given the in and out times, return a string to be used in WebVTT.
    // inOutTimes should be an array with two items.
    // ex: "00:01:20.123 --> 00:05:10.212"
    function getCueTime (inOutTimes) {
        return formatTime(inOutTimes[0]) + ' --> ' + formatTime(inOutTimes[1]);
    }

    // Add key controls to video play/pause, cue mark, and seeking
    function addKeyEvents () {
        var inTime = null;

        function markTime () {
            if (!inTime) {
                inTime = vid.currentTime;
            }
            else {
                console.log(getCueTime([inTime, vid.currentTime]));
                inTime = null;
            }
        }

        // Dir should be 'forward' or 'backward'
        function seek (dir) {
            var curTime = vid.currentTime,
                timeDiff = (dir === 'forward') ? seekInterval : -seekInterval;

            if (!vid.paused) {
                vid.pause();
            }

            vid.currentTime = curTime + timeDiff;
        }

        function keyup (e) {
            var keymap = {
                // Space bar Play/pause
                32: function () {
                    vid.paused ? vid.play() : vid.pause();
                },
                // right arrow seek++
                39: function () {
                    seek('forward');
                },
                // left arrow seek--
                37: function () {
                    seek('backward');
                },
                // period cue mark open/close
                190: markTime
            };

            if (keymap[e.keyCode]) {
                keymap[e.keyCode]();
            }
        }

        window.addEventListener('keyup', keyup, false);
    }

    return function (video) {
        vid = video;
        addKeyEvents();
    };
}());