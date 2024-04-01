import React, {useEffect, useState} from 'react';
import {useAuthStore} from "../../stores/authStore";
import {PlatformLinkSDK} from "../../../../../lib/PlatformLinkSDK";

let sdk
let running

export default function () {
    const seedPhrase = useAuthStore((state) => state.seed);
    const [address, setAddress] = useState("n/a");
    const [balance, setBalance] = useState("n/a");

    useEffect(() => {
        if (!running) {
            running = true

            sdk = new PlatformLinkSDK({seedPhrase})
            sdk
                .sync()
                .then(() => sdk.generateAddress())
                .then(e => setAddress(e))
                .then(() => sdk.wallet.getBalance())
                .then(e => setBalance(e))
                .catch(console.error)
        }

    }, [])

    const getWalletBalance = async () => {
        console.log('getWalletBalance')

        const balance = await sdk.wallet.getBalance()

        setBalance(balance)
    }

    const getAddress = async () => {
        console.log('getAddress')

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
                <span>Next Address</span>
                <span>{address}</span>
            </div>
            <div className={"container"}>
                <span>Wallet Balance</span>
                <span>{balance}</span>
            </div>
            <div className={"container"}>
                <span>Identity</span>
                <span></span>
            </div>
            <div className={"container"}>
                <span>Platform Credits</span>
                <span></span>
            </div>
            <div>
                <input type={"button"} onClick={getWalletBalance} value={"Get wallet balance"}/>
            </div>
        </div>
    )
}
