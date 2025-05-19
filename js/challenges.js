function toggleChallenge(x, currency) {
    if (player.activeChallenge == (-1)) {
        player.activeChallenge = x
        player.currentChallengeCurrency = currency
        lightReset(true)
    } else {
            if (player.challengePendingCompletion) {
                player.challengesCompleted[x] = true
                player.activeChallenge = (-1)
                lightReset(true)
            } else {
                player.activeChallenge = (-1)
                lightReset(true)
            }

    }
}