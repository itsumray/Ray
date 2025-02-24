document.getElementById("searchForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const query = document.getElementById("searchQuery").value;
    searchVideos(query);
});

function searchVideos(query) {
    const apiKey = "AIzaSyC_O58TFr5rI-UibHnTS-oZoRzNGONQGAw";
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(query)}&type=video&key=${apiKey}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const contentDiv = document.getElementById("content");
            contentDiv.innerHTML = ""; // Clear previous content

            data.items.forEach(item => {
                const videoId = item.id.videoId;
                const videoDiv = document.createElement("div");
                videoDiv.className = "video-item";
                videoDiv.innerHTML = `
                    <h3>${item.snippet.title}</h3>
                    <iframe width="560" height="315" src="https://www.vidproxy.com/embed/${videoId}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                `;
                contentDiv.appendChild(videoDiv);
            });
        })
        .catch(error => console.error("Error fetching YouTube data:", error));
}
