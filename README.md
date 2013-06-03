# Cuemarker

Super simple helper for creating [WebVTT](http://dev.w3.org/html5/webvtt/) cue
times for HTML video elements.

## What does it do?

1. Adds a few keyboard controls to given html video element;
  - Space bar for play/pause toggling
  - Left/right arrow for seeking through the video
  - Period "." for marking in/out points of each cue
2. After each out point is set, the cue time is logged to the console in WebVTT format:
`00:01:20.123 --> 00:05:10.212`

## Requirements

- [Underscore](http://underscorejs.org/)

## Usage

- Include `cuemarker.js` in your super-sweet html www page!
`<script src="/path/to/cuemarker.js"></script>`
- Initialize Cuemarker by passing it the video element you want it to watch
```Javascript
var video = document.getElementById('my-video');
cuemarker(video);
```
NOTE: The element needs to be a DOM element, not a jQuery object. If you're using
jQuery you can access the DOM element using `get()`
```JavaScript
var video = $('#my-video').get(0);
```