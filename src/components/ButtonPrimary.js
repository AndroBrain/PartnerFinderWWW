import "../styles/styles.css"

export function ButtonPrimary({text, onClick, className}) {
    return <div className={"button-primary " + className} onClick={onClick}>
        <span className="label-medium">{text}</span>
    </div>
}