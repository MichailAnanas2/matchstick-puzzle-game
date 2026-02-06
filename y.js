let ysdk = null;
let player = null;
let lb = null;

async function initYandex() {
    try {
        if (typeof YaGames !== 'undefined') {
            const _sdk = await YaGames.init();
            ysdk = _sdk;
            try {
                player = await ysdk.getPlayer({ scopes: false });
            } catch (e) {}
            try {
                lb = await ysdk.getLeaderboards();
            } catch (e) {}
            
            // Инициализация языка через SDK
            if (ysdk.environment && ysdk.environment.i18n) {
                initLanguage(ysdk.environment.i18n.lang);
            }
            
            // Сообщаем платформе, что игра загрузилась
            if (ysdk.features && ysdk.features.LoadingAPI) {
                ysdk.features.LoadingAPI.ready();
            }
            
            console.log("Yandex SDK Initialized");
        }
    } catch (e) {
        console.warn("Yandex SDK failed, using fallback", e);
    }
}

function startGameplay() {
    if (ysdk && ysdk.features && ysdk.features.GameplayAPI) {
        ysdk.features.GameplayAPI.start();
    }
}

function showFullscreen(onClose) {
    if (ysdk) {
        ysdk.adv.showFullscreenAdv({
            callbacks: {
                onOpen: () => {
                    window.game?.pause();
                },
                onClose: (wasShown) => {
                    console.log("Fullscreen closed", wasShown);
                    window.game?.resume();
                    onClose?.();
                },
                onError: (err) => {
                    console.error("Fullscreen error", err);
                    window.game?.resume();
                    onClose?.();
                }
            }
        });
    } else {
        onClose?.();
    }
}

function showRewarded(onSuccess) {
    if (ysdk) {
        let rewarded = false;
        ysdk.adv.showRewardedVideo({
            callbacks: {
                onOpen: () => {
                    console.log('Video ad open.');
                    window.game?.pause();
                },
                onRewarded: () => {
                    console.log('Rewarded!');
                    rewarded = true;
                    onSuccess();
                },
                onClose: () => {
                    console.log('Video ad closed.');
                    window.game?.resume();
                    // Fallback: если реклама закрылась но награда не выдана — всё равно дать подсказку
                    // (для тестирования локально)
                    if (!rewarded) {
                        console.log('No reward received, giving hint anyway (dev mode)');
                        onSuccess();
                    }
                },
                onError: (e) => {
                    console.error('Error while open video ad:', e);
                    window.game?.resume();
                    // При ошибке — всё равно показать подсказку (для локального теста)
                    onSuccess();
                }
            }
        });
    } else {
        onSuccess();
    }
}

async function saveScore(puzzleId, timeMs) {
    const score = 10000000 - timeMs;
    if (lb && ysdk) {
        try {
            const leaderboardName = `puzzle_${String(puzzleId).padStart(3, '0')}`;
            await lb.setLeaderboardScore(leaderboardName, score);
        } catch (e) {
            console.warn("Leaderboard save failed", e);
        }
    }
}

async function getGlobalBest(puzzleId) {
    if (!lb || !ysdk) return null;
    try {
        const leaderboardName = `puzzle_${String(puzzleId).padStart(3, '0')}`;
        const res = await lb.getLeaderboardEntries(leaderboardName, { limit: 1 });
        if (res && res.entries && res.entries.length > 0) {
            const entry = res.entries[0];
            return {
                name: entry.player.publicName,
                time: 10000000 - entry.score
            };
        }
    } catch (e) {
        console.warn("Leaderboard read failed", e);
    }
    return null;
}
