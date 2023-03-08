export function OpinionCard({author, text}) {
    return <div className="opinion-card flex-column">
        <div className="flex-row">
            <span className="headline-small opinion-card-author">{author}</span>
            <img className="opinion-card-quotation" src={"drawable/quotation.svg"} alt={"Cytat"}/>
        </div>
        <span className="body-medium opinion-card-text">{text}</span>
    </div>
}
