import "./../../../styles/styles.css"
import {appName} from "../../../App";
import {TextField} from "../../../components/TextField";
import {useState} from "react";
import {ButtonPrimary} from "../../../components/ButtonPrimary";
import {Link} from "react-router-dom";

export function LoginPage() {
    let [email, setEmail] = useState("")
    let [password, setPassword] = useState("")

    const cmdLogin = (e) => {
        e.preventDefault()
    }

    return <div className="auth-page">
        <form className="auth-card flex-column" onSubmit={cmdLogin}>
            <img className="auth-image" src={'drawable/logo.svg'} alt={appName}/>
            <span className="auth-app-name headline-small">{appName}</span>
            <TextField inputType={"text"} label={"Email"} input={email} onInputChange={msg => setEmail(msg)}/>
            <TextField inputType={"password"} label={"Hasło"} input={password} onInputChange={msg => setPassword(msg)}/>
            <ButtonPrimary text="Zaloguj" className="auth-button" onClick={cmdLogin}/>
            <div className="login-bottom-text">
                <span className="body-small">Nie masz jeszcze konta? </span>
                <Link to={"/register"}>Zarejestruj się</Link>
            </div>
        </form>
    </div>
}
