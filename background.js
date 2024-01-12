chrome.tabs.onUpdated.addListener((tabId, changeInfo) => {
    if (changeInfo.status === 'complete') {
        chrome.tabs.get(tabId, function (tab) {
            if (tab.active && tab.url.includes('youtube.com/watch')) {
                console.log('Tab updated: ' + tabId);
                chrome.scripting.executeScript({
                    target: { tabId: tabId, allFrames: true },
                    function: skipAd,
                }).then(() => console.log("script injected"));
            }
        });
    }
});

function skipAd() {
    console.log('Skip ad');
    const skipButton = document.querySelector('.ytp-ad-skip-button-container');
    if (skipButton) {
        skipButton.click();
    }
    console.log('Ad skipped');
}