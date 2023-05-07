import "./../../../styles/styles.css"
import {appName} from "../../../App";
import {TextField} from "../../../components/TextField";
import {useContext, useState} from "react";
import {ButtonPrimary} from "../../../components/ButtonPrimary";
import {Link, useNavigate} from "react-router-dom";
import {LoginRequest} from "./LoginRequest";
import {authContext} from "../auth";

export function LoginPage() {
    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState(null)
    const {login} = useContext(authContext)
    const navigate = useNavigate()

    const setAsLoggedIn = (jwt) => {
        login(jwt)
        navigate("/")
    }

    const cmdLogin = (e) => {
        e.preventDefault()
        setError(null)
        if (email.trim().length <= 0) {
            setError("Wypełnij pole email.")
        } else if (password.trim().length <= 0) {
            setError("Wypełnij pole hasło.")
        } else {
            LoginRequest(setLoading, setAsLoggedIn, setError, email, password)
        }
    }

    return <div className="auth-page">
        <form className="auth-card flex-column" onSubmit={cmdLogin}>
            <img className="auth-image" src={'drawable/logo.svg'} alt={appName}/>
            <span className="auth-app-name headline-small">{appName}</span>
            <TextField inputType={"text"} label={"Email"} input={email} onInputChange={msg => setEmail(msg)}/>
            <TextField inputType={"password"} label={"Hasło"} input={password} onInputChange={msg => setPassword(msg)}/>
            {error !== null && <span className="error-span auth-error-span">{error}</span>}
            {loading && <span className="label-medium">Logowanie...</span>}
            <ButtonPrimary text="Zaloguj" className="auth-button" onClick={cmdLogin}/>
            <div className="login-bottom-text">
                <span className="body-small">Nie masz jeszcze konta? </span>
                <Link to={"/register"}>Zarejestruj się</Link>
            </div>
        </form>
    </div>
}
