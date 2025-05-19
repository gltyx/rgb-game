const colourClickerSound = new Tone.Player("https://clawrez.gay/games/rgbgame/sounds/colourClickerClick.mp3").toDestination()
const colourClickers = [
    document.getElementById("colour-clicker-0"),
    document.getElementById("colour-clicker-1"),
    document.getElementById("colour-clicker-2"),

]

function colourClickerToy(x) {
    player.colourClickerTime = 180
    let ranCol = []
    for(let i=0;i<3;i++){
        ranCol[i] = Math.round(Math.random()*255)
    }
    colourClickers[x].style.backgroundColor = "rgb(" + ranCol[0] + "," + ranCol[1] + "," + ranCol[2] + ")"
    const pitchShift = (Math.random() * 2 - 1) * 2; // Range: -1 to 1 semitones
    colourClickerSound.playbackRate = 1 + pitchShift / 12;  // Convert semitones to ratio
    colourClickerSound.volume.value = player.soundsVolume

    Tone.loaded().then(() => {
        colourClickerSound.start()
    })

}
