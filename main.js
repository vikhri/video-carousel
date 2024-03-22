export default class  VideoSwitcher {
  constructor() {
    this.videosContainers = document.querySelectorAll('.video-carousel__video-wrapper');
    this.videos = document.querySelectorAll('.js-carousel-video');
    this.progressBars = document.querySelectorAll('.js-progress-indicator');
    this.tabs = document.querySelectorAll('.js-video-tab');

    this.currentVideoIndex = 1;
  }
  playNextVideo(index) {
    const nextIndex = (index % 3) + 1;
    this.playVideo(nextIndex);
  }
  resetAllVideos() {
    this.videos.forEach(video => {
      video.classList.remove('is-current');
      video.currentTime = 0;
      video.pause();
    });
    this.progressBars.forEach((bar) => {
      bar.classList.remove('animated');
      bar.style.width = '0%';
    });
  }
  playVideo(index) {
    this.resetAllVideos();
    const currentVideo = document.getElementById(`video${index}`);
    const currentProgress = document.getElementById(`progress${index}`);
    currentVideo.classList.add('is-current');
    currentProgress.classList.add('animated');
    currentVideo.play();
    this.currentVideoIndex = index;
    this.updateProgress(index);
  }

  updateProgress(index) {
    const video = document.getElementById(`video${index}`);
    const progress = document.getElementById(`progress${index}`);
    const progressValue = (video.currentTime / video.duration) * 100;
    progress.style.width = `${progressValue}%`;
  }

  init() {

    document.getElementById(`video${this.currentVideoIndex}`).play();

    for (let i = 1; i <= this.videos.length; i++) {
      const video = document.getElementById(`video${i}`);
      const progress = document.getElementById(`progress${i}`);

      video.addEventListener('ended', () => {
        video.classList.remove('is-current');
        progress.classList.remove('animated');
        this.playNextVideo(i);
      });

      video.addEventListener('timeupdate',  () => {
        this.updateProgress(i);
      });

      for (const tab of this.tabs) {
        tab.addEventListener('click', (e) => {
          if (e.currentTarget.contains(progress)) {
            this.playVideo(i);
          }
        });
      }
    }
  }
}


const videoSwitcher = new VideoSwitcher();

document.addEventListener('DOMContentLoaded', () => {
  videoSwitcher.init();
});