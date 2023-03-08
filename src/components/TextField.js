import "../styles/styles.css"

export function TextField({inputType, input, onInputChange, label}) {
    return <div className="form-control flex-column">
        <label className="label-medium">{label}</label>
        <input className="body-large" type={inputType} required={true} onChange={e => onInputChange(e.target.value)}
               value={input}/>
    </div>
}
