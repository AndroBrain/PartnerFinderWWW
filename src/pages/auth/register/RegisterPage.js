import {useState} from "react";
import {TextField} from "../../../components/TextField";
import {ButtonPrimary} from "../../../components/ButtonPrimary";
import {appName} from "../../../App";
import DatePicker, {registerLocale} from "react-datepicker";
import pl from 'date-fns/locale/pl';

import "react-datepicker/dist/react-datepicker.css";
import {RegisterRequest} from "./RegisterRequest";
import {Navigate} from "react-router-dom";
import {validateEmail} from "../auth";

export function RegisterPage() {
    let [loading, setLoading] = useState(false)
    let [success, setSuccess] = useState(false)
    let [email, setEmail] = useState("")
    let [name, setName] = useState("")
    let [surname, setSurname] = useState("")
    let [gender, setGender] = useState("male")
    let [sexuality, setSexuality] = useState("heterosexual")
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
        setError(null)
        let fieldErrors = ""
        if (email.trim().length <= 0) {
            fieldErrors += "Wypełnij pole email.\n"
        } else if (validateEmail(email)) {
            fieldErrors += "Podaj prawidłowy email.\n"
        }
        if (name.trim().length <= 0) {
            fieldErrors += "Wypełnij pole imie.\n"
        }
        if (surname.trim().length <= 0) {
            fieldErrors += "Wypełnij pole nazwisko.\n"
        }
        if (password.length <= 0) {
            fieldErrors += "Wypełnij pole hasło.\n"
        }
        if (password !== repeatPassword) {
            fieldErrors += "Hasła muszą być identyczne.\n"
        }
        if (fieldErrors === "") {
            RegisterRequest(setLoading, setSuccess, setError, email, name, surname, gender, sexuality, dateOfBirth, password)
            return
        }
        setError(fieldErrors)
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
                        <input type="radio" value="Kobieta" checked={gender === "male"}
                               onChange={e => cmdChangeSelectedGender("male")}/>
                        Mężczyzna
                    </label>
                    <label className="body-large">
                        <input type="radio" value="Kobieta" checked={gender === "female"}
                               onChange={e => cmdChangeSelectedGender("female")}/>
                        Kobieta
                    </label>
                </div>
            </div>
            <div className="register-gender flex-column">
                <span className="register-gender-text label-medium">Orientacja</span>
                <div className="register-radio-group">
                    <label className="body-large">
                        <input type="radio" value="Heteroseksualność" checked={sexuality === "heterosexual"}
                               onChange={e => cmdChangeSelectedSexuality("heterosexual")}/>
                        Heteroseksualność
                    </label>
                    <label className="body-large">
                        <input type="radio" value="Homoseksualność" checked={sexuality === "homosexual"}
                               onChange={e => cmdChangeSelectedSexuality("homosexual")}/>
                        Homoseksualność
                    </label>
                    <label className="body-large">
                        <input type="radio" value="Biseksualność" checked={sexuality === "bisexual"}
                               onChange={e => cmdChangeSelectedSexuality("bisexual")}/>
                        Biseksualność
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
