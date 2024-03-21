import React from 'react';
import {useAuthStore} from "../../stores/authStore";
import {DashPlatformApi} from "../../../../api/DashPlatformApi";

const sdk = new DashPlatformApi()

export default function () {
    const seedPhrase = useAuthStore((state) => state.seed);

    const register = () => {
        console.log('Registering identity')

        window.postMessage({type: 'register_identity', data: null})
    }

    return (
        <div className={"container"}>
            <div className={"container"}>
                <span>Seed Phsdfsfrase</span>
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
            <div>
                <input type={"button"} onClick={register} value={"Register Identity"} />
            </div>
        </div>
    )
}
