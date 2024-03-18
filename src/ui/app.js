import "./styles/app.css";
import React, {useState} from 'react';
import AuthState from "./src/states/auth/AuthState";
import HomeState from "./src/states/home/HomeState";
export default function App() {
    const [currentState, setCurrentState] = useState('auth')

    // useEffect(() => useState('auth'),[])

    return currentState === 'auth' ? <AuthState stateChangeHandler={(state) => setCurrentState(state)}/> : <HomeState/>
}
