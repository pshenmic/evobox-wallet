import "./ui/styles/app.css";
import App from "./ui/app";
import ReactDOM from 'react-dom/client';
import React from 'react';
import ExecutingEnvironment from "./constants";
import {getRunningEnv} from "./getRunningEnv";

console.log(getRunningEnv())

if(getRunningEnv() === ExecutingEnvironment.CONTENT) {

    const root = document.createElement("div")
    root.className = "container"
    document.body.appendChild(root)

    const rootDiv = ReactDOM.createRoot(root);

    rootDiv.render(
        <React.StrictMode>
            <App/>
        </React.StrictMode>
    );


    console.log('content script loaded')

    window.addEventListener("message",
        async function (request, sender, sendResponse) {
            console.log(request, sender, sendResponse)
            if (chrome.runtime) {
                chrome.runtime.sendMessage('test', (response) => {
                    console.log('received user data', response);
                });
            }
        }
    );
}
