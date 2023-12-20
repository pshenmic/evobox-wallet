console.log('content script loaded')

window.addEventListener("message",
    async function (request, sender, sendResponse) {
        console.log(request, sender, sendResponse)
        if (chrome.runtime) {
            chrome.runtime.sendMessage('get-account', (response) => {
                console.log('received user data', response);
            });
        }
    }
);
