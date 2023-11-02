const apiKey="AIzaSyCnqxhsiJzga-YlzKW7_bbdiYpshuu7HHc";
const url="https://www.googleapis.com/youtube/v3/search"


const searchBtn= document.getElementById('search');
const searchIn= document.getElementById("searchIn");
let logo=document.getElementById('lo');






// async function videos(str){
//     const res=await  fetch(`${url}?key=${apiKey}&q=${str}&part=snippet`)
//     try{
//         const response= await res.json();
//         console.log(response);
//         // var vid= document.querySelector('.video');
//         // vid.innerHTML=``;
        
//             for (let index = 0; index < response.items.length; index++) {
//                 let ss= response.items[index].snippet.thumbnails.high.url
//                 let tit= response.items[index].snippet.title;
//                 var ch= response.items[index].snippet.channelTitle;

//                 var cont= document.querySelector('.container');
//                 var vid= document.createElement('div');
//                 vid.className='video';
//                 vid.innerHTML=`
//                 <img id="lo"  src=${ss} height="200px" >
//                 <div class="down">
//                     <div class="logo">
//                         <img src="kristen_hindu.jpg" height="50"  width="50">
//                     </div>
//                     <div class="title">
//                         <p>${tit}</p>
//                         <p class="chName"><b>${ch}</b></p>
//                         <p>15 k views , 1 week ago</p>
//                     </div>
//                 </div>`
//                 vid.addEventListener('click', ()=>{
//                     console.log(tit);
//                 })
//                 cont.appendChild(vid);
//             }

        
//     }catch(err){
//         alert(err)
//     }
// } 





// searchBtn.addEventListener('click', ()=>{
//     const searchVal= searchIn.value
//     videos(searchVal)
// })