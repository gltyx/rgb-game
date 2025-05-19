let squareHovered = false

let rollDoubled = false

let rgbRoll = setInterval(() => {
    if(squareHovered) {rollRGB()}
}, 1000/6);



function rollRGB() {
    for(let i=0;i<3;i++){
        player.rgb[i] = player.rgbMin[i]+Math.round(Math.random()*(player.rgbMax[i]-player.rgbMin[i]))
    }

    let rPoints = Decimal.times(Decimal.pow("2",player.colourMulti[0]),Decimal.add(1,player.rgb[0]))
    let gPoints = Decimal.times(Decimal.pow("2",player.colourMulti[1]),Decimal.add(1,player.rgb[1]))
    let bPoints = Decimal.times(Decimal.pow("2",player.colourMulti[2]),Decimal.add(1,player.rgb[2]))

    updateCurrency("points")
    
    player.points = Decimal.add(player.points,Decimal.times(Decimal.times(Decimal.times(rPoints,gPoints),bPoints),player.pointsMulti))
    player.totalPoints = Decimal.add(player.totalPoints,Decimal.times(Decimal.times(Decimal.times(rPoints,gPoints),bPoints),player.pointsMulti))
    convertToHex()
}

function convertToHex() {
    let rHex = ('0' + (player.rgb[0]).toString(16)).slice(-2)
    let gHex = ('0' + (player.rgb[1]).toString(16)).slice(-2)
    let bHex = ('0' + (player.rgb[2]).toString(16)).slice(-2)

    player.hexcode = "#" + rHex + gHex + bHex
}

function upgradeRGBMin(x) {
    if(Decimal.lt(player.points,player.rgbMinCost)||player.rgbMax[x]==player.rgbMin[x])return
    player.points = Decimal.minus(player.points,player.rgbMinCost)
    player.rgbMinCost = Decimal.floor(Decimal.times(player.rgbMinCost,Decimal.times("1.7",player.rgbCostScaling)))
    player.rgbMin[x]++
}


function upgradeRGBMax(x) {
    if(Decimal.lt(player.points,player.rgbMaxCost)) return
    player.points = Decimal.minus(player.points,player.rgbMaxCost)
    player.rgbMaxCost = Decimal.floor(Decimal.times(player.rgbMaxCost,Decimal.times("1.6",player.rgbCostScaling)))
    player.rgbMax[x]++
}

function upgradeColourMulti(x) {
    if(Decimal.lt(player.points,player.colourMultiCost)||player.activeChallenge==0) return
    player.points = Decimal.minus(player.points,player.colourMultiCost)
    player.colourMultiCost = Decimal.floor(Decimal.times(player.colourMultiCost,Decimal.times("2.8",player.rgbCostScaling)))

    player.colourMulti[x]++
}

function buyMaxRGBMin() {
    while(Decimal.gte(player.points,player.rgbMinCost)){
        if(player.rgbMin[1]<=player.rgbMin[2]){
            if(player.rgbMin[0]<=player.rgbMin[1]){
                if(player.rgbMax[0]==player.rgbMin[0]){
                    return
                } else {
                    upgradeRGBMin(0)
                }
            } else{
                if(player.rgbMax[1]==player.rgbMin[1]){
                    return
                } else {
                    upgradeRGBMin(1)
                }
            }
        } else {
            if(player.rgbMax[2]==player.rgbMin[2]){
                return
            } else {
                upgradeRGBMin(2)
            }
        }
    }
}

function buyMaxRGBMax() {
    while(Decimal.gte(player.points,player.rgbMaxCost)){
        if(player.rgbMax[1]<=player.rgbMax[2]){
            if(player.rgbMax[0]<=player.rgbMax[1]){
                upgradeRGBMax(0)
            } else{
                upgradeRGBMax(1)
            }
        } else {
            upgradeRGBMax(2)
        }
    }
}

function buyMaxColourMulti() {
    if(player.activeChallenge==0)return
    while(Decimal.gte(player.points,player.colourMultiCost)){
        if(player.colourMulti[1]<=player.colourMulti[2]){
            if(player.colourMulti[0]<=player.colourMulti[1]){
                upgradeColourMulti(0)
            } else{
                upgradeColourMulti(1)
            }
        } else {
            upgradeColourMulti(2)
        }
    }
}