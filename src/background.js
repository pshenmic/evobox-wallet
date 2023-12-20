import Dash from './dash.min'
import lodash from 'lodash';

console.log('Dash SDK loaded')

chrome.runtime.onMessage.addListener(handleMessages);

let running

async function handleMessages(message) {
    if (running) {
        console.log('request is still loading')
        return
    }
    switch (message) {
        case 'get-account': {
            running = true
            console.log('message from cs', message)


            const client = new Dash.Client({
                seeds: ['44.228.242.181:1443'],
                wallet: {
                    mnemonic: 'gospel cause trust asthma runway desk bicycle crunch upgrade fog used bench',
                    adapter: {
                        setItem: async (key, value) => {
                            if (!value) {
                                debugger
                                return Promise.reject('Passed null')
                            }
                            console.log('set', key, JSON.stringify(value))
                            await chrome.storage.local.set({key: value})
                        },
                        getItem: async (key) => {
                            let item = await chrome.storage.local.get([key])
                            if (lodash.isEqual(item, {})) {
                                item = null
                            }
                            console.log('get', key, JSON.stringify(item))

                            return item
                        }
                    }
                }
            })

            try {
                const account = await client.wallet.getAccount();
                const totalBalance = await account.getTotalBalance();
                const address = await account.getUnusedAddress()
                console.log('Seed: ' + client.wallet.exportWallet())
                console.log('Next unused address: ' + address.address)
                console.log(`Account's total balance: ${totalBalance} duffs`);
            } catch (e) {
                debugger
                console.error(e)
                console.error("Error duroing sync")
            }

            running = false
        }
        default:
            console.warn('Unknown message: ' + message)
    }
}
