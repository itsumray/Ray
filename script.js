// Your YouTube API key
const API_KEY = 'AIzaSyC_O58TFr5rI-UibHnTS-oZoRzNGONQGAw';  // Your API Key

// Search button click event
document.getElementById('searchBtn').addEventListener('click', function() {
    let query = document.getElementById('searchQuery').value;
    if (query) {
        searchVideos(query);
    }
});

// Function to search YouTube videos
function searchVideos(query) {
    const videoResults = document.getElementById('videoResults');
    videoResults.innerHTML = '';  // Clear previous results

    // Make a request to the YouTube API
    fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&key=${API_KEY}`)
        .then(response => response.json())
        .then(data => {
            // Loop through the response and display the videos
            data.items.forEach(item => {
                const videoId = item.id.videoId;
                const title = item.snippet.title;
                const description = item.snippet.description;
                const thumbnail = item.snippet.thumbnails.high.url;

                // Create an iframe for each video
                const videoElement = document.createElement('div');
                videoElement.classList.add('video');

                videoElement.innerHTML = `
                    <h3>${title}</h3>
                    <iframe src="https://www.youtube.com/embed/${videoId}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                    <p>${description}</p>
                `;

                // Append the video element to the results container
                videoResults.appendChild(videoElement);
            });
        })
        .catch(error => {
            console.log('Error fetching YouTube videos:', error);
        });
}
