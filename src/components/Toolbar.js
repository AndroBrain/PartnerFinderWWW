import {appName} from "../App";
import "./../styles/styles.css"
import {IconField} from "./IconField";
import {useNavigate} from "react-router-dom";
import {useContext} from "react";
import {authContext} from "../pages/auth/auth";
export function Toolbar(props) {
    const navigate = useNavigate()
    const { authState, logout } = useContext(authContext);
    return <div>
        <div className="toolbar flex-row">
            <div className="toolbar-logo flex-row">
                <img src={"drawable/logo.svg"} alt={appName}/>
                <span className={"headline-small"}>{appName}</span>
            </div>
            <div className="toolbar-props flex-row">
                {props.children}
                {authState.jwt !== null && <IconField text={"Wyloguj"} icon={"drawable/logout.svg"} onClick={() => {
                    logout();
                    navigate("/")
                }}/>}
            </div>
        </div>
        <div className="toolbar-line"/>
    </div>
}