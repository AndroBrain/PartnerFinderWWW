import "../styles/styles.css"

export function ButtonOutlined({text, onClick, className}) {
    return <div className={"button-outlined " + className} onClick={onClick}>
        <span className="label-medium">{text}</span>
    </div>
}
