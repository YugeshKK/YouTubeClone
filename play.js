const apiKey = "AIzaSyCbgCcT2IjO1IUXXjx8G33sV_T7en6eSYA";
const url = "https://www.googleapis.com/youtube/v3/commentThreads";
const commentsContainer = document.getElementById("comments-container");






window.addEventListener("load", () => {



  function getQueryParam(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
  }
  
  // Retrieve the data from the URL and display it
  const dataParam = getQueryParam("data");
  let  parsedArray;
  if (dataParam) {
    const decodedData = decodeURIComponent(dataParam);
     parsedArray = JSON.parse(decodedData);
    console.log(parsedArray)
     function onYouTubeIframeAPIReady() {
      var player;
      player = new YT.Player('video-placeholder', {
        height: '360',
        width: '640',
        videoId: parsedArray, // Replace with your YouTube video ID
        events: {
          'onReady': onPlayerReady
        }
      });
    }
  
    onYouTubeIframeAPIReady();

    // The API will call this function when the video player is ready.
    function onPlayerReady(event) {
      event.target.playVideo(); // Auto-play the video
    }
     loadComments(parsedArray);
  } else {
    console.log('no data received')
  }


});

async function loadComments(videoId) {
  let endpoint = `${url}?key=${apiKey}&videoId=${videoId}&maxResults=10&part=snippet`;

  const response = await fetch(endpoint);
  const result = await response.json();

  result.items.forEach((item) => {
    const repliesCount = item.snippet.totalReplyCount;
    const {
      authorDisplayName,
      textDisplay,
      likeCount,
      authorProfileImageUrl: profileUrl,
      publishedAt,
    } = item.snippet.topLevelComment.snippet;

    const div = document.createElement("div");
    div.className = "comment";
    div.innerHTML = `
    <img src="${profileUrl}" class="author-profile" alt="author profile" />
    <b>${authorDisplayName}</b>
    <p>${textDisplay}</p>`;

    commentsContainer.appendChild(div);
  });
}