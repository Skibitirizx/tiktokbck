let videoIndex = 0;

const loadVideos = () => {
    fetch(`/api/videos?start=${videoIndex}`)
        .then(response => response.json())
        .then(data => {
            data.videos.forEach(video => {
                const videoElement = document.createElement('div');
                videoElement.classList.add('video-item');
                videoElement.innerHTML = `
                    <video controls>
                        <source src="${video.url}" type="video/mp4">
                        Your browser does not support the video tag.
                    </video>
                    <div class="overlay">
                        <div class="likes">${video.likes} Likes</div>
                        <div class="comments">${video.comments} Comments</div>
                    </div>
                `;
                document.querySelector('.video-container').appendChild(videoElement);
            });
            videoIndex += data.videos.length;
        });
};

// Initial load
loadVideos();

// Infinite scrolling
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 100) {
        loadVideos();
    }
});
