# Cuemarker

Super simple helper for creating [WebVTT](http://dev.w3.org/html5/webvtt/) cue
times for HTML video elements.

Demo: http://tylergaw.github.io/webvtt-cuemarker/demo.html

## What does it do?

1. Adds a few keyboard controls to given html video element;
  - Space bar for play/pause toggling
  - Left/right arrow for seeking through the video
  - Period "." for marking in/out points of each cue
2. After each out point is set, the cue time is output in WebVTT format:
`00:01:20.123 --> 00:05:10.212`

## Usage

Include `cuemarker.js` in your super-sweet html www page!

`<script src="/path/to/cuemarker.js"></script>`

Initialize Cuemarker by passing it the video element you want it to watch

    var video = document.getElementById('my-video');
    cuemarker(video);

NOTE: The element needs to be a DOM element, not a jQuery object. If you're using
jQuery you can access the DOM element using `get()`

    var video = $('#my-video').get(0);

While the video is playing, pressing the "."/">" key will set an in point. Pressing
the key again will set an out point and call the `output` function. The cuetime
will be passed to `output`. The
next "."/">" keypress will set an in point.


### Options

You can modify the seekInterval and output by providing an options map as a second
parameter to `cuemarker`

    cuemarker(video, {
        seekInterval: 2.5,
        output: function (cuetime) {}
    });

Now copypasta those times to your vtt file.

## What did I learn?

I learned that the native JavaScript `map` method is supported really well as of
June 2013. I was under the impression that it was something that would not be
widely implemented until much later. I used it here https://github.com/tylergaw/webvtt-cuemarker/blob/master/cuemarker.js#L27