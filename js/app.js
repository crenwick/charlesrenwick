'use strict';

var myName = ' _____ _                _                  \n\/  __ \\ |              | |                 \n| \/  \\\/ |__   __ _ _ __| | ___  ___        \n| |   | \'_ \\ \/ _` | \'__| |\/ _ \\\/ __|       \n| \\__\/\\ | | | (_| | |  | |  __\/\\__ \\       \n \\____\/_| |_|\\__,_|_|  |_|\\___||___\/       \n\n______                   _      _    \n| ___ \\                 (_)    | |   \n| |_\/ \/___ _ ____      ___  ___| | __\n|    \/\/ _ \\ \'_ \\ \\ \/\\ \/ \/ |\/ __| |\/ \/\n| |\\ \\  __\/ | | \\ V  V \/| | (__|   < \n\\_| \\_\\___|_| |_|\\_\/\\_\/ |_|\\___|_|\\_\\';
// console.log(myName);

const videos = document.querySelectorAll('.looping-video')

for (let i = 0; i < videos.length; i++) {
  try {
    const videoEle = videos[i].querySelector('video');
    const posterEle = videos[i].querySelector('.poster');

    videoEle.addEventListener('canplay', function(event) {
      videoEle.play();
      posterEle.style.display = 'none';
    });
  } catch(e) {
    console.error(e);
  }
}

