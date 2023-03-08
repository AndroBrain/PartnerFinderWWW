import {OpinionCard} from "./OpinionCard";

export function HomePagePreview() {

    return <div className="flex-row">
        <div className="flex-column flex-1">
            <span>TEST</span>
        </div>

        <div className="flex-column flex-1 opinions-section">
            {opinions.map(opinion => <OpinionCard author={opinion.author}
                                                  text={opinion.text}/>)}
        </div>
    </div>
}

const opinions = [
    {author: "Michał", text: "Znalazłem miłość już po 5 minutach! Niesamowite"},
    {
        author: "Kaja",
        text: "To świetny portal randkowy! Korzystam z niego od kilku miesięcy i jestem bardzo zadowolona. Posiada ciekawe funkcjonalności i wysoką jakość profili użytkowników. Polecam!"
    },
    {author: "Oskar", text: "OK"},
    {author: "Filip", text: "OK"},
    {author: "Hubert", text: "OK"},

]