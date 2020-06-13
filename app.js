const app = () => {
    const song = document.querySelector('.song');
    const play = document.querySelector('.play');
    const outline = document.querySelector('.moving-outline circle');
    const video = document.querySelector('.vid-container video');

    const sounds = document.querySelectorAll('.sound-picker button');

    const timeDisplay = document.querySelector('.time-display');
    const timeSelect = document.querySelectorAll('.time-select button');

    const outltineLength = outline.getTotalLength();
    
    let fakeDuration = 600;

    outline.style.strokeDasharray = outltineLength;
    outline.style.strokeDashoffset = outltineLength;

    sounds.forEach(sound => {
        sound.addEventListener('click', function() {
            song.src = this.getAttribute('data-sound');
            video.src = this.getAttribute('data-video');
            checkPlayng();
        });
    });

    play.addEventListener('click', () => {
        checkPlayng(song);
    });

    timeSelect.forEach(option => {
        option.addEventListener('click', function(){
            fakeDuration = this.getAttribute('data-time');
            timeDisplay.textContent = `${Math.floor(fakeDuration / 60)}:${Math.floor(fakeDuration % 60)}`;
        });
    });

    const checkPlayng = (song) => {
        if (song.paused) {
            song.play();
            video.play();
            play.src = './svg/pause.svg';
        }
        else {
            song.pause();
            video.pause();
            play.src = './svg/play.svg';
        }
    };

    song.ontimeupdate = () => {
        let currentTime = song.currentTime;
        let elapsed = fakeDuration - currentTime;
        let seconds = Math.floor(elapsed % 60);
        let minutes = Math.floor(elapsed / 60);

        let progress = outltineLength - (currentTime / fakeDuration) * outltineLength;
        outline.style.strokeDashoffset = progress;

        timeDisplay.textContent = `${minutes}:${seconds}`;

        if (currentTime >= fakeDuration) {
            song.pause();
            song.currentTime = 0;
            play.src = './svg/play.svg';
            video.pause();
        }
    };
};

app();