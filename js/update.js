setInterval(() => {
    let dt = (Date.now() - player.lastTick) / 1000;
    player.lastTick = Date.now();

    let rPoints = Decimal.times(Decimal.pow("2", player.colourMulti[0]), Decimal.add(1, player.rgbMin[0]))
    let gPoints = Decimal.times(Decimal.pow("2", player.colourMulti[1]), Decimal.add(1, player.rgbMin[1]))
    let bPoints = Decimal.times(Decimal.pow("2", player.colourMulti[2]), Decimal.add(1, player.rgbMin[2]))

    player.lowestRoll = Decimal.times(Decimal.times(Decimal.times(rPoints, gPoints), bPoints), player.pointsMulti)

    player.pointsMulti = player.pointMultis.reduce((a, b) => Decimal.times(a, b))
    player.lightMulti = player.lightMultis.reduce((a, b) => Decimal.times(a, b))
    // Light
    player.potentialLight = Decimal.floor(Decimal.times(Decimal.pow(Decimal.divide(player.totalPoints, "1e9"), "0.33"), player.lightMulti))

    // Light Milestones
    for (let i = 0; i < lightMilestoneReqs.length; i++) {
        if (Decimal.gte(player.totalLight, lightMilestoneReqs[i])) {
            player.lightMilestones[i] = true
        }
    }

    // Light Milestone Rewards
    if (player.lightMilestones[1]) {
        player.points = Decimal.add(player.points, Decimal.times(player.lowestRoll, dt))
        player.totalPoints = Decimal.add(player.totalPoints, Decimal.times(player.lowestRoll, dt))

    }
    if (player.lightMilestones[2]) {
        player.startingPoints = new Decimal("1000000")
    }
    if (player.lightMilestones[4]) {
        player.unlockedChallenges = true
    }

    // Light Upgrades
    if (player.lightUpgrades[0]) {
        player.pointMultis[0] = Decimal.add("1", Decimal.log2(Decimal.add("1", player.totalLight)))
    } else {
        player.pointMultis[0] = new Decimal("1")
    }
    if (player.lightUpgrades[1] && rollDoubled == false) {
        rollDoubled = true;
        clearInterval(rgbRoll)
        rgbRoll = setInterval(() => {
            if (squareHovered) {
                rollRGB()
            }
        }, 1000 / 12);
    }
    if (player.lightUpgrades[2]) {
        player.rgbCostScaling = new Decimal("0.95")
    } else {
        player.rgbCostScaling = new Decimal("1")
    }
    if (player.lightUpgrades[3]) {
        player.pointMultis[1] = new Decimal("4")
    } else {
        player.pointMultis[1] = new Decimal("1")
    }
    if (player.lightUpgrades[4]) {
        player.unlockedFidgetToys = true
    }
    if (player.lightUpgrades[5]) {
        player.unlockedPhotonEmitters = true
    }
    // Fidget Toys
    if (player.colourClickerTime < 0.1) {
        player.colourClickerTime = 0
    }
    if (player.colourClickerTime > 0) {
        player.colourClickerTime -= 1 * dt
        player.pointMultis[2] = new Decimal("10")
    } else {
        player.pointMultis[2] = new Decimal("1")
    }

    // Photons
    player.photons = Decimal.add(player.photons, Decimal.times(Decimal.times(player.photonEmitters[0].quant, player.photonEmitters[0].mult), dt))
    player.totalPhotons = Decimal.add(player.totalPhotons, Decimal.times(Decimal.times(player.photonEmitters[0].quant, player.photonEmitters[0].mult), dt))
    player.photonEmitters[0].quant = Decimal.add(player.photonEmitters[0].quant, Decimal.times(Decimal.times(player.photonEmitters[1].quant, player.photonEmitters[1].mult), dt))
    player.photonEmitters[1].quant = Decimal.add(player.photonEmitters[1].quant, Decimal.times(Decimal.times(player.photonEmitters[2].quant, player.photonEmitters[2].mult), dt))
    player.photonEmitters[2].quant = Decimal.add(player.photonEmitters[2].quant, Decimal.times(Decimal.times(player.photonEmitters[3].quant, player.photonEmitters[3].mult), dt))

    if (Decimal.gt(player.photons, "0")) {
        player.lightMultis[0] = Decimal.add("1", Decimal.pow(Decimal.divide(player.photons, "1"), "0.33"))
    } else {
        player.lightMultis[0] = new Decimal("1")
    }

    // Challenges
    if (player.activeChallenge > (-1)) {
        if (player.currentChallengeCurrency == "points") {
            if (Decimal.gte(player.points, challengeReqs[player.activeChallenge])) {
                player.challengePendingCompletion = true
            } else {
                player.challengePendingCompletion = false
            }
        }
    } else {
        player.challengePendingCompletion = false
    }

    // Challenge Rewards
    if (player.challengesCompleted[0]) {
        player.lightMultis[1] = new Decimal("10")
    } else {
        player.lightMultis[1] = new Decimal("1")
    }


}, 1000 / 30);