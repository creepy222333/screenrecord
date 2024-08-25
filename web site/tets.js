// Select buttons and video element
const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');
const recordedVideo = document.getElementById('recordedVideo');

let mediaRecorder;
let recordedChunks = [];

// Start recording
startBtn.addEventListener('click', async () => {
    // Request screen capture
    const stream = await navigator.mediaDevices.getDisplayMedia({ video: true });

    // Initialize media recorder with the stream
    mediaRecorder = new MediaRecorder(stream);

    // Push video data to recordedChunks array
    mediaRecorder.ondataavailable = function(event) {
        if (event.data.size > 0) {
            recordedChunks.push(event.data);
        }
    };

    // Once recording stops, create video blob and display it
    mediaRecorder.onstop = function() {
        const videoBlob = new Blob(recordedChunks, { type: 'video/webm' });
        const videoUrl = URL.createObjectURL(videoBlob);
        recordedVideo.src = videoUrl;
    };

    // Start recording
    mediaRecorder.start();

    // Update button states
    startBtn.disabled = true;
    stopBtn.disabled = false;
});

// Stop recording
stopBtn.addEventListener('click', () => {
    // Stop recording
    mediaRecorder.stop();

    // Update button states
    startBtn.disabled = false;
    stopBtn.disabled = true;
});
