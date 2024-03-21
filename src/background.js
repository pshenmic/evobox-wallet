import {getRunningEnv} from "./getRunningEnv";
import ExecutingEnvironment from "./constants";
import React from "react";

if (getRunningEnv() === ExecutingEnvironment.CONTENT) {
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


