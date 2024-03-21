import {DashPlatformApi} from "./api/DashPlatformApi";

chrome.runtime.onMessage.addListener(handleMessages);

const sdk = new DashPlatformApi()

async function handleMessages(message) {
    if (!message || typeof message != 'object') {
        return
    }

    const {method, data} = message

    console.log(message.method, message.data)

    switch (method) {
        case 'register_identity': {
            console.log('message from register_identity', data)
            await sdk.registerIdentity()
        }
        default:
            console.warn('Unknown message method: ' + method)
    }
}
