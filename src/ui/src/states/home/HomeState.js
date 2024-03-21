import React, {useEffect, useState} from 'react';
import {useAuthStore} from "../../stores/authStore";
import {PlatformLinkSDK} from "../../../../../lib/PlatformLinkSDK";

let sdk

export default function () {
    const seedPhrase = useAuthStore((state) => state.seed);
    const [address, setAddress] = useState("");

    useEffect(() => {
        sdk = new PlatformLinkSDK({seedPhrase: "problem resemble business riot insect book tuition night all turkey envelope dish"})
        sdk.sync().catch(console.error)
    }, [])

    const getAddress = async () => {
        console.log('getAddress')
        //
        // window.addEventListener("message", (event) => {
        //     console.log(event.target)
        //     // event.source.postMessage(
        //     //     "hi there yourself!  the secret response " + "is: rheeeeet!",
        //     //     event.origin,
        //     // );
        // });
        //
        // window.postMessage({type: 'get_address', data: null})

        await sdk.sync()

        const address = await sdk.getAddress()

        setAddress(address)
    }

    return (
        <div className={"container"}>
            <div className={"container"}>
                <span>Seed Phrase</span>
                <span>{seedPhrase}</span>
            </div>
            <div className={"container"}>
                <span>Address</span>
                <span>{address}</span>
            </div>
            <div className={"container"}>
                <span>Balance</span>
                <span>0.1337</span>
            </div>
            <div className={"container"}>
                <span>Identity</span>
                <span>4EfA9Jrvv3nnCFdSf7fad59851iiTRZ6Wcu6YVJ4iSeF</span>
            </div>
            <div className={"container"}>
                <span>Platform Credits</span>
                <span>0.123</span>
            </div>
            <div>
                <input type={"button"} onClick={getAddress} value={"Get address"}/>
            </div>
        </div>
    )
}
