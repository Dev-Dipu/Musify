// songs data

let songIndex = 0;
let isPlay = 0;

const data = [{name: "Qaafirana", singer: "Arijit Singh", image: "images/qaafirana.jpg", link: "audio/qaafirana.m4a", time: "5:41"},
{name: "Your Eyes", singer: "Barney Sku", image: "images/youreyes.jpg", link: "audio/youreyes.m4a", time: "1:47"},
{name: "Lamhey", singer: "Anubha", image: "images/lamhey.jpg", link: "audio/lamhey.m4a", time: "2:29"},
{name: "Malang Sajna", singer: "Sachet Tandon", image: "images/malang.jpg", link: "audio/malang.m4a", time: "2:41"},
{name: "Saudebazi", singer: "Javed Ali", image: "images/saudebazi.jpg", link: "audio/saudebazi.m4a", time: "5:54"},
{name: "Tera Yaar Hoon Mai", singer: "Arijit Singh", image: "images/terayaarhoon.jpg", link: "audio/terayaarhoon.m4a", time: "4:24"},
{name: "Chaand Baaliyan", singer: "Aditya", image: "images/chaandbaaliyan.jpeg", link: "audio/chaandbaaliyan.m4a", time: "1:43"}
];


// setting panel
let home = document.querySelector("#home");
let setting = document.querySelector("#setting");
setting.addEventListener("click", function(){
    home.classList.toggle("open-close-setting");
    if(home.classList.contains("open-close-setting")){
        setting.classList.remove("ri-menu-3-fill");
        setting.classList.add("ri-close-line");
    }
    else{
        setting.classList.remove("ri-close-line");
        setting.classList.add("ri-menu-3-fill");
    }
})

// song dets change

let songName = document.querySelector("#song-name");
let singer = document.querySelector("#singer");
let plate = document.querySelector("#plate");
function updateSongDets(){
    songName.textContent = data[songIndex].name;
    singer.textContent = data[songIndex].singer;
    plate.style.backgroundImage = `url(${data[songIndex].image})`;
    audio.src = data[songIndex].link;
}
updateSongDets();

let progress = document.querySelector("#song-bar input");
audio.onloadedmetadata = function(){
    progress.value = audio.currentTime;
    progress.max = audio.duration;
}

progress.onchange = function(){
    audio.currentTime = progress.value;
}


// audio visualizer on play
let playBtn = document.querySelector("#play");

playBtn.addEventListener("click", function(){
    audioVisualizer();
    changeUi();
});
function changeUi(){
    if(isPlay)
    {
        isPlay = 0;
        playBtn.classList.remove("ri-pause-fill");
        playBtn.classList.add("ri-play-fill");
        
    }
    else{
        isPlay = 1;
        playBtn.classList.remove("ri-play-fill");
        playBtn.classList.add("ri-pause-fill");
    }

    // update song bar
    if(isPlay){
        setInterval(() => {
            progress.value = audio.currentTime;
            document.querySelector("#timer").textContent = `${Math.floor(audio.currentTime/60)}:${Math.floor(audio.currentTime%60)}`;
            document.querySelector("#total-time").textContent = `${Math.floor(audio.duration/60)}:${Math.floor(audio.duration%60)}`;
        }, 500);
    }
}



// control panel
// backward and forward buttons

function playNext(){
    songIndex = (songIndex + 1) % data.length;
    updateSongDets();
    isPlay = 0;
    audioVisualizer();
    changeUi();
}

let forward = document.querySelector("#forward");
forward.addEventListener("click", function(){
        playNext();
        reset();
})

let backward = document.querySelector("#backward");
backward.addEventListener("click", function(){
        songIndex = (songIndex - 1) % data.length;
        updateSongDets();
        isPlay = 0;
        audioVisualizer();
        changeUi();
        reset();
})

// loop 
let loopbtn = document.querySelector("#loop");
let looptag = document.querySelector("#loop span");
loopbtn.addEventListener("click", function(){

    loopbtn.classList.toggle("loop");
    audio.loop =!audio.loop;
    if(audio.loop){
        looptag.style.display = "block";
    }
    else{
        looptag.style.display = "none";
    }
})


// like
let liked = false;

function like(){
    likeBtn.classList.toggle("like");
    liked =!liked;
    if(liked){
        likeBtn.classList.remove("ri-heart-line");
        likeBtn.classList.add("ri-heart-fill");
    }
    else{
        likeBtn.classList.remove("ri-heart-fill");
        likeBtn.classList.add("ri-heart-line");
    }
}

let likeBtn = document.querySelector("#like");
likeBtn.addEventListener("click", function(){
    like();
})


// open playlist
document.querySelector("#open-playlist").addEventListener("click", function(){
    document.querySelector("#main").classList.toggle("open-close");
})

// manage playlist songs

// playlist songs dets

let clutter = "";
data.forEach(function(song, index){
    clutter += `
    <div class="song-box" id="${index}">
        <div class="sb-play ctrl-btn-wh">
            <i class="ri-play-fill"></i>
        </div>
        <div class="sb-dets">
            <span>
            <h4 class="sb-name">${song.name}</h4>
            <h4 class="sb-singer">${song.singer}</h4>
            </span>
            <div class="sb-time">${song.time}</div>
        </div>   
    </div>`
});

document.querySelector("#songs-container").innerHTML = clutter;

// playlist songs play button
document.querySelector("#songs-container").childNodes.forEach(function(song){
    song.addEventListener("click", function(){
        songIndex = this.id;
        updateSongDets();
        isPlay = 0;
        audioVisualizer();
        changeUi();
        reset();
    })
})

// reset

let reset = function(){
    liked = false;
    likeBtn.classList.remove("like");
    likeBtn.classList.remove("ri-heart-fill");
    likeBtn.classList.add("ri-heart-line");
    audio.loop = false;
    loopbtn.classList.remove("loop");
    looptag.style.display = "none";
}



// final touches with micro intereactions





// future updates liked songs playlist customization
// search bar to search song



