document.getElementById("searchForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const query = document.getElementById("searchQuery").value;
    searchYouTube(query);
});

function searchYouTube(query) {
    const apiKey = "AIzaSyC_O58TFr5rI-UibHnTS-oZoRzNGONQGAw";
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(query)}&type=video&key=${apiKey}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const resultsDiv = document.getElementById("results");
            resultsDiv.innerHTML = "";

            data.items.forEach(item => {
                const videoId = item.id.videoId;
                const encodedVideoId = btoa(videoId); // Encode video ID

                const videoDiv = document.createElement("div");
                videoDiv.innerHTML = `
                    <h3>${item.snippet.title}</h3>
                    <button onclick="loadVideo('${encodedVideoId}')">Watch Video</button>
                `;
                resultsDiv.appendChild(videoDiv);
            });
        })
        .catch(error => console.error("Error fetching YouTube data:", error));
}

function loadVideo(encodedVideoId) {
    const videoId = atob(encodedVideoId); // Decode Base64
    document.getElementById("videoContainer").innerHTML = `
        <iframe width="560" height="315" src="https://piped.video/embed/${videoId}" frameborder="0" allowfullscreen></iframe>
    `;
}


