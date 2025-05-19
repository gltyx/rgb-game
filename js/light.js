function lightReset(force = false) {
    if(Decimal.lt(player.potentialLight,1)&&force == false)return
    if(player.unlockedLight == false){
        player.unlockedLight = true
    }
    let potL = player.potentialLight
    if(Decimal.gte(Decimal.add(player.totalLight,potL),lightMilestoneReqs[2])){
        player.points = new Decimal("1000000")
        player.totalPoints = new Decimal("1000000")
    } else {
        player.points = player.startingPoints
        player.totalPoints = player.startingPoints
    }
    
    
    player.rgb = [0,0,0]
    player.rgbMin = [0,0,0]
    player.rgbMinCost = new Decimal("1e6")
    player.rgbMax = [1,1,1]
    player.rgbMaxCost = new Decimal("100")
    player.colourMulti = [0,0,0]
    player.colourMultiCost = new Decimal("1000")
    player.hexCode = "#000000"
    player.light = Decimal.plus(player.light,potL)
    player.totalLight = Decimal.plus(player.totalLight,potL)
    
}

function buyLightUpgrade(x) {
    if(Decimal.lt(player.light,lightUpgradeCosts[x]))return
    player.light = Decimal.minus(player.light,lightUpgradeCosts[x])
    player.lightUpgrades[x] = true
}
