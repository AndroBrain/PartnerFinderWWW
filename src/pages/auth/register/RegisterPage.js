import {useState} from "react";
import {TextField} from "../../../components/TextField";
import {ButtonPrimary} from "../../../components/ButtonPrimary";
import {appName} from "../../../App";
import DatePicker, {registerLocale} from "react-datepicker";
import pl from 'date-fns/locale/pl';

import "react-datepicker/dist/react-datepicker.css";
import {RegisterRequest} from "./RegisterRequest";
import {Navigate} from "react-router-dom";

export function RegisterPage() {
    let [loading, setLoading] = useState(false)
    let [success, setSuccess] = useState(false)
    let [email, setEmail] = useState("")
    let [name, setName] = useState("")
    let [surname, setSurname] = useState("")
    let [gender, setGender] = useState("M")
    let [sexuality, setSexuality] = useState("K")
    const [dateOfBirth, setDateOfBirth] = useState(new Date());
    let [password, setPassword] = useState("")
    let [repeatPassword, setRepeatPassword] = useState("")
    let [error, setError] = useState(null)

    registerLocale('pl', pl)

    const cmdChangeSelectedGender = (option) => {
        setGender(option)
    }

    const cmdChangeSelectedSexuality = (option) => {
        setSexuality(option)
    }

    const cmdRegister = (e) => {
        e.preventDefault()
        if (password !== repeatPassword) {
            setError("Błąd. Hasła muszą być identyczne!")
        } else {
            RegisterRequest(setLoading, setSuccess, setError, email, name, surname, gender, sexuality, dateOfBirth, password)
        }
    }

    return <div className="auth-page">
        <form className="auth-card flex-column" onSubmit={cmdRegister}>
            <img className="auth-image" src={'drawable/logo.svg'} alt={appName}/>
            <span className="auth-app-name headline-small">{appName}</span>
            <TextField inputType={"text"} label={"Email"} input={email} onInputChange={msg => setEmail(msg)}/>
            <TextField inputType={"text"} label={"Imie"} input={name} onInputChange={msg => setName(msg)}/>
            <TextField inputType={"text"} label={"Nazwisko"} input={surname} onInputChange={msg => setSurname(msg)}/>
            <div className="register-gender flex-column">
                <span className="register-gender-text label-medium">Płeć</span>
                <div className="register-radio-group">
                    <label className="body-large">
                        <input type="radio" value="Kobieta" checked={gender === "M"}
                               onChange={e => cmdChangeSelectedGender("M")}/>
                        Mężczyzna
                    </label>
                    <label className="body-large">
                        <input type="radio" value="Kobieta" checked={gender === "K"}
                               onChange={e => cmdChangeSelectedGender("K")}/>
                        Kobieta
                    </label>
                    <label className="body-large">
                        <input type="radio" value="Kobieta" checked={gender === "I"}
                               onChange={e => cmdChangeSelectedGender("I")}/>
                        Inne
                    </label>
                </div>
            </div>
            <div className="register-gender flex-column">
                <span className="register-gender-text label-medium">Seksualność</span>
                <div className="register-radio-group">
                    <label className="body-large">
                        <input type="radio" value="Kobieta" checked={sexuality === "M"}
                               onChange={e => cmdChangeSelectedSexuality("M")}/>
                        Mężczyzna
                    </label>
                    <label className="body-large">
                        <input type="radio" value="Kobieta" checked={sexuality === "K"}
                               onChange={e => cmdChangeSelectedSexuality("K")}/>
                        Kobieta
                    </label>
                    <label className="body-large">
                        <input type="radio" value="Kobieta" checked={sexuality === "I"}
                               onChange={e => cmdChangeSelectedSexuality("I")}/>
                        Inne
                    </label>
                </div>
            </div>
            <span className="register-date-text label-medium">Data urodzenia</span>
            <DatePicker locale="pl" className="register-date-picker" selected={dateOfBirth}
                        onChange={(date) => setDateOfBirth(date)}/>
            <TextField inputType={"password"} label={"Hasło"} input={password} onInputChange={msg => setPassword(msg)}/>
            <TextField inputType={"password"} label={"Powtórz hasło"} input={repeatPassword}
                       onInputChange={msg => setRepeatPassword(msg)}/>
            {error !== null && <span className="error-span auth-error-span">{error}</span>}
            <ButtonPrimary text="Zarejestruj" className="auth-button" onClick={cmdRegister}/>
            {loading && <span className="label-medium">Rejestrowanie...</span>}
            <div className="register-bottom-div"></div>
        </form>
        {success && <Navigate to="/login"/>}
    </div>
}
