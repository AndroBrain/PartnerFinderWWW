import {appName} from "../App";
import "./../styles/styles.css"

export function Toolbar(props) {
    return <div>
        <div className="toolbar flex-row">
            <div className="toolbar-logo flex-row">
                <img src={"drawable/logo.svg"} alt={appName}/>
                <span className={"headline-small"}>{appName}</span>
            </div>
            <div className="toolbar-props flex-row">
                {props.children}
            </div>
        </div>
        <div className="toolbar-line"/>
    </div>
}