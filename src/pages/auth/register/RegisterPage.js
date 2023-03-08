import {useState} from "react";
import {TextField} from "../../../components/TextField";
import {ButtonPrimary} from "../../../components/PrimaryButton";
import {appName} from "../../../App";

export function RegisterPage() {
    let [email, setEmail] = useState("")
    let [name, setName] = useState("")
    let [surname, setSurname] = useState("")
    let [password, setPassword] = useState("")
    let [repeatPassword, setRepeatPassword] = useState("")
    let [error, setError] = useState(null)

    const cmdRegister = (e) => {
        e.preventDefault()
        if (password !== repeatPassword) {
            setError("Błąd. Hasła muszą być identyczne!")
        }
    }

    return <div className="auth-page">
        <form className="auth-card flex-column" onSubmit={cmdRegister}>
            <img className="auth-image" src={'drawable/logo.svg'} alt={appName}/>
            <span className="auth-app-name headline-small">{appName}</span>
            <TextField inputType={"text"} label={"Email"} input={email} onInputChange={msg => setEmail(msg)}/>
            <TextField inputType={"text"} label={"Imie"} input={name} onInputChange={msg => setName(msg)}/>
            <TextField inputType={"text"} label={"Nazwisko"} input={surname} onInputChange={msg => setSurname(msg)}/>
            <TextField inputType={"password"} label={"Hasło"} input={password} onInputChange={msg => setPassword(msg)}/>
            <TextField inputType={"password"} label={"Powtórz hasło"} input={repeatPassword}
                       onInputChange={msg => setRepeatPassword(msg)}/>
            {error !== null && <span className="error-span">{error}</span>}
            <ButtonPrimary text="Zarejestruj" className="auth-button" onClick={cmdRegister}/>
            <div className="register-bottom-div"></div>
        </form>
    </div>
}
