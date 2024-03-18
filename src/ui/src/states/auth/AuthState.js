import React, {useEffect} from 'react';
import {useAuthStore} from "../../stores/authStore";

export default function AuthState({stateChangeHandler}) {
    const seedPhrase = useAuthStore((state) => state.seed);

    console.log('STATIC', 'problem resemble business riot insect book tuition night all turkey envelope dish')
    console.log('seedPhrase', seedPhrase)

    const setSeedPhrase = useAuthStore((state) => state.setSeed);

    useEffect(() => {
        setTimeout(() => {
            setSeedPhrase('problem resemble business riot insect book tuition night all turkey envelope dish')
        }, 500)
    }, [])

    return (<div className={"container"}>
        <h1>Evobox Wallet</h1>
        <form className={"container"} onSubmit={() => stateChangeHandler('home')}>
            <span>Enter your passphrase</span>
            <input type={"text"} onChange={(e) => setSeedPhrase(e.target.value)} value={seedPhrase}/>
            <input type={"submit"}/>
        </form>
    </div>)
}
