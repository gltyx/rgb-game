const volumeSlider = document.getElementById("volume-slider")

function lessFlash() {
    player.lessFlash = !player.lessFlash
}

function updateVolume(value){
    if(value <= -50){
        player.soundsVolume = -200
    } else {
        player.soundsVolume = value
    }
    
}

volumeSlider.addEventListener("input", () => updateVolume(volumeSlider.value));

