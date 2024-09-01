let currentsong = new Audio();

    function secondsToMinutesSeconds(seconds) {
        if (isNaN(seconds) || seconds < 0) {
            return "00:00";
        }
    
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);
    
        const formattedMinutes = String(minutes).padStart(2, '0');
        const formattedSeconds = String(remainingSeconds).padStart(2, '0');
    
        return `${formattedMinutes}:${formattedSeconds}`;
    }

async function getSongs() {
    let a = await fetch("https://github.com/avikbiswas123/Spotify/tree/7157230df0e86626bd8dc20a66ff31eb4cc13ca3/ABCD_2/ABCD_2")


    let res = await a.text()
    console.log(res);
    let div = document.createElement("div")
    div.innerHTML = res
    let tds = div.getElementsByTagName("a")
    console.log(tds);
    let songs = []
    for (let index = 0; index < tds.length; index++) {
        const element = tds[index];
        if (element.href.endsWith(".mp3")) {
            songs.push(element.href.split("/ABCD_2/ABCD_2/")[1].split(".mp3")[0].replaceAll("_", " "))
        }
    }
    return songs



}
function playmusic(track) {
    currentsong.src = "/ABCD_2/ABCD_2/" + track
    currentsong.play()
    play.src = "media-pause.svg"
    document.querySelector(".track").innerHTML = track.split(".mp3")[0].replaceAll("_", " ")
    document.querySelector(".duration").innerHTML = ``

}

async function main() {

    let songs = await getSongs()
    console.log(songs);

    let songUL = document.querySelector(".songlist").getElementsByTagName("ul")[0]
    console.log(songUL);

    for (const song of songs) {
        songUL.innerHTML = songUL.innerHTML + `<li>
                            <img class="invert" src="music.svg" alt="">

                            <div class="songinfo">
                                <h4>${song}</h4>
                                <h4>Avik Biswas</h4>
                                
                            </div>
                            <div class="play">
                                <img class="invert" src="media-play.svg" alt="">
                            </div>


                        </li>`
    }
    Array.from(document.querySelector(".songlist").getElementsByTagName("li")).forEach(e => {
        e.addEventListener("click", element => {
            console.log(e.querySelector(".songinfo").firstElementChild.innerHTML.replaceAll(" ", "_").concat(".mp3"))
            playmusic(e.querySelector(".songinfo").firstElementChild.innerHTML.replaceAll(" ", "_").concat(".mp3"))


        })
    })


}

main()
let play = document.querySelector(".play")
play.addEventListener("click", () => {
    if (currentsong.paused) {
        currentsong.play()
        play.src = "media-pause.svg"


    }
    else {
        currentsong.pause()
        play.src = "media-play.svg"
    }



}) 
currentsong.addEventListener("timeupdate",()=>{
document.querySelector(".duration").innerHTML = `${secondsToMinutesSeconds(currentsong.currentTime)}/${secondsToMinutesSeconds(currentsong.duration)}`

document.querySelector(".circle").style.left=(currentsong.currentTime/currentsong.duration)*100 + "%"


})  
document.querySelector(".seekbar"),addEventListener("click",(e)=>{

    let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100;
        document.querySelector(".circle").style.left = percent + "%";
        currentsong.currentTime = ((currentsong.duration) * percent) / 100



})
document.querySelector(".hamburger").addEventListener("click",()=>{

document.querySelector(".left").style.left="-1%"


})

