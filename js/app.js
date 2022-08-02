"use strict";

var myName =
  " _____ _                _                  \n/  __ \\ |              | |                 \n| /  \\/ |__   __ _ _ __| | ___  ___        \n| |   | '_ \\ / _` | '__| |/ _ \\/ __|       \n| \\__/\\ | | | (_| | |  | |  __/\\__ \\       \n \\____/_| |_|\\__,_|_|  |_|\\___||___/       ";
// console.log(myName);

// Lazy-load the videos

document.addEventListener("DOMContentLoaded", function () {
  var lazyVideos = [].slice.call(document.querySelectorAll("video.lazy-video"));

  if ("IntersectionObserver" in window) {
    var lazyVideoObserver = new IntersectionObserver(function (
      entries,
      _observer
    ) {
      entries.forEach(function (video) {
        if (video.isIntersecting) {
          for (var source in video.target.children) {
            var videoSource = video.target.children[source];
            if (
              typeof videoSource.tagName === "string" &&
              videoSource.tagName === "SOURCE"
            ) {
              videoSource.src = videoSource.dataset.src;
            }
          }

          video.target.load();
          video.target.classList.remove("lazy-video");
          lazyVideoObserver.unobserve(video.target);
        }
      });
    });

    lazyVideos.forEach(function (lazyVideo) {
      lazyVideoObserver.observe(lazyVideo);
    });
  }
});
