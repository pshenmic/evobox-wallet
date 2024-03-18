import React from 'react';
import {useAuthStore} from "../../stores/authStore";

export default function () {
    const seedPhrase = useAuthStore((state) => state.seed);

    // const address = AuthStore.

    return (
        <div className={"container"}>
            <div className={"container"}>
                <span>Seed Phrase</span>
                <span>{seedPhrase}</span>
            </div>
            <div className={"container"}>
                <span>Address</span>
                <span>XgW4eMn5UawDiujujR9UdJ2aAjbf6zHCN3</span>
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
        </div>
    )
}
