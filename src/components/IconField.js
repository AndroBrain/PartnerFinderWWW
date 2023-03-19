import "../styles/styles.css"

export function IconField({text, onClick, icon}) {
    return <>
        <div className={"icon-text headline-medium"}>{text}</div>
        <img className={"icon-img"} src={icon} onClick={onClick}/>
    </>
}