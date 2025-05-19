function buyPhotonEmitter(x){
    if(Decimal.gt(player.photonEmitters[x].cost,player.light))return
    player.light = Decimal.minus(player.light,player.photonEmitters[x].cost)
    player.photonEmitters[x].cost = Decimal.times(player.photonEmitters[x].cost,Decimal.pow("10",Decimal.add("3",x)))
    player.photonEmitters[x].quant = Decimal.add(player.photonEmitters[x].quant,"1")
    player.photonEmitters[x].mult = Decimal.times(player.photonEmitters[x].mult,"1.2")

}