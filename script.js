const apiKey="AIzaSyCbgCcT2IjO1IUXXjx8G33sV_T7en6eSYA";
const url="https://www.googleapis.com/youtube/v3/search"
const baseUrl = "https://www.googleapis.com/youtube/v3";

const searchBtn= document.getElementById('search');
const searchIn= document.getElementById("searchIn");



//   /**
//    * this will take videoId and returns the statics of the video.
//    */
  async function getVideoStatistics(videoId) {
    // https://www.googleapis.com/youtube/v3/videos?key=AIzaSyDvo2p4xMEI3GC-PWH02_0OAIN1h88k4rE&part=statistics
    const endpoint = `${baseUrl}/videos?key=${apiKey}&part=statistics&id=${videoId}`;
    try {
      const response = await fetch(endpoint);
      const result = await response.json();
      return result.items[0].statistics;
    } catch (error) {
      alert("Failed to fetch Statistics for ", videoId);
    }
  }


  function calculateTheTimeGap(publishTime) {
    let publishDate = new Date(publishTime);
    let currentDate = new Date();
  
    let secondsGap = (currentDate.getTime() - publishDate.getTime()) / 1000;
  
    const secondsPerDay = 24 * 60 * 60;
    const secondsPerWeek = 7 * secondsPerDay;
    const secondsPerMonth = 30 * secondsPerDay;
    const secondsPerYear = 365 * secondsPerDay;
  
    if (secondsGap < secondsPerDay) {
      return `${Math.ceil(secondsGap / (60 * 60))}hrs ago`;
    }
    if (secondsGap < secondsPerWeek) {
      return `${Math.ceil(secondsGap / secondsPerWeek)} weeks ago`;
    }
    if (secondsGap < secondsPerMonth) {
      return `${Math.ceil(secondsGap / secondsPerMonth)} months ago`;
    }
  
    return `${Math.ceil(secondsGap / secondsPerYear)} years ago`;
  }


  function formatNumber(number) {
    if (number < 10000) {
      return number.toString();
    } else if (number < 1000000) {
      return (number / 1000).toFixed(1) + "k";
    } else {
      return (number / 1000000).toFixed(1) + "M";
    }
  }
                
  function navigateToVideoDetails(videoId) {
    const dataToSend = encodeURIComponent(JSON.stringify(videoId));
    window.location.href = `play.html?data=${dataToSend}`;
  }


async function videos(str){
    const res=await  fetch(`${url}?key=${apiKey}&q=${str}&part=snippet&maxResults=20`);
    try{
        const response= await res.json();
        console.log(response)
        
            for (let index = 0; index < response.items.length; index++) {
                let ss= response.items[index].snippet.thumbnails.high.url
                let tit= response.items[index].snippet.title;
                var ch= response.items[index].snippet.channelTitle;
                var idd= response.items[index].id.videoId;
                var publish= response.items[index].snippet.publishTime;
                var time= await  calculateTheTimeGap(publish);
                 var stat= await getVideoStatistics(idd);
                var view= formatNumber(stat.viewCount);


                var cont= document.querySelector('.content');
                var vid= document.createElement('div');
                vid.className='video';
                vid.innerHTML=`
                <img id="lo"  src=${ss}  >
                <div class="down">
                    <div class="logo">
                        <img src=${ss}>
                    </div>
                    <div class="title">
                        <p >${tit}</p>
                        <p class="chName"><b>${ch}</b></p>
                        <p>${view} views , ${time} </p>
                    </div>
                </div>`
                vid.addEventListener('click', ()=>{
                    navigateToVideoDetails(response.items[index].id.videoId);
                })
                cont.appendChild(vid);
            }

        
    }catch(err){
       console.log(err)
    }
} 





searchBtn.addEventListener('click', ()=>{
    const searchVal= searchIn.value
    videos(searchVal)
})