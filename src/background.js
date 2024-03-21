import {getRunningEnv} from "./getRunningEnv";
import ExecutingEnvironment from "./constants";
import React from "react";
import {PlatformLinkSDK} from "../lib/PlatformLinkSDK";

if (getRunningEnv() === ExecutingEnvironment.CONTENT) {
    const sdk = new PlatformLinkSDK()

    chrome.runtime.onMessage.addListener(handleMessages);

    async function handleMessages(message) {
        switch (message) {
            case 'test': {
                console.log('message from test', message)
                break
            }
            default:
                console.warn('Unknown message: ' + message)
        }
    }

    console.log('background script loading finished')
}


