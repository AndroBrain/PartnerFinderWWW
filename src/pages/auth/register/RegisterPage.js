import {useState} from "react";
import {TextField} from "../../../components/TextField";
import {ButtonPrimary} from "../../../components/ButtonPrimary";
import {appName} from "../../../App";
import DatePicker from "react-datepicker";
import { registerLocale, setDefaultLocale } from  "react-datepicker";
import pl from 'date-fns/locale/pl';

import "react-datepicker/dist/react-datepicker.css";

export function RegisterPage() {
    let [email, setEmail] = useState("")
    let [name, setName] = useState("")
    let [surname, setSurname] = useState("")
    let [selectedGender, setSelectedGender] = useState("M")
    const [birthdate, setBirthdate] = useState(new Date());
    let [password, setPassword] = useState("")
    let [repeatPassword, setRepeatPassword] = useState("")
    let [error, setError] = useState(null)

    registerLocale('pl', pl)

    const cmdChangeSelectedOption = (option) => {
        setSelectedGender(option)
    }

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
            <div className="register-gender flex-column">
                <span className="register-gender-text label-medium">Płeć</span>
                <div className="register-radio-group">
                    <label className="body-large">
                        <input type="radio" value="Kobieta" checked={selectedGender === "M"}
                               onChange={e => cmdChangeSelectedOption("M")}/>
                        Mężczyzna
                    </label>
                    <label className="body-large">
                        <input type="radio" value="Kobieta" checked={selectedGender === "K"}
                               onChange={e => cmdChangeSelectedOption("K")}/>
                        Kobieta
                    </label>
                    <label className="body-large">
                        <input type="radio" value="Kobieta" checked={selectedGender === "I"}
                               onChange={e => cmdChangeSelectedOption("I")}/>
                        Inne
                    </label>
                </div>
            </div>
            <span className="register-date-text label-medium">Data urodzenia</span>
            <DatePicker locale="pl" className="register-date-picker" selected={birthdate} onChange={(date) => setBirthdate(date)}/>
            <TextField inputType={"password"} label={"Hasło"} input={password} onInputChange={msg => setPassword(msg)}/>
            <TextField inputType={"password"} label={"Powtórz hasło"} input={repeatPassword}
                       onInputChange={msg => setRepeatPassword(msg)}/>
            {error !== null && <span className="error-span">{error}</span>}
            <ButtonPrimary text="Zarejestruj" className="auth-button" onClick={cmdRegister}/>
            <div className="register-bottom-div"></div>
        </form>
    </div>
}
