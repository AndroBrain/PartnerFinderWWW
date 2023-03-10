import {OpinionCard} from "./OpinionCard";
import {ButtonPrimary} from "../../../components/ButtonPrimary";
import {ButtonOutlined} from "../../../components/ButtonOutlined";
import {useNavigate} from "react-router-dom";
import {ProfileCardShort} from "../../../components/ProfileCardShort";

export function HomePagePreview() {
    const navigate = useNavigate()


    return <div className="flex-row">
        <div className="flex-column flex-1 mission-section">
            <span className="display-medium">Dzieli Cię tylko krok od Miłości</span>
            <span className="title-medium mission-text">Witaj na naszej stronie randkowej, która została stworzona specjalnie dla osób poszukujących miłości, przyjaźni lub romantycznej przygody. Nasza platforma oferuje łatwy w obsłudze interfejs, który umożliwia szybkie i skuteczne wyszukiwanie potencjalnych partnerów.</span>
            <div className="flex-row mission-auth-section">
                <ButtonPrimary text="Zarejestruj" onClick={() => navigate("/register")}/>
                <span className="label-medium mission-auth-or-text">lub</span>
                <ButtonOutlined text="Zaloguj" onClick={() => navigate("/login")}/>
            </div>
            {
                profiles.map((profile) =>
                    <ProfileCardShort name={profile.name}
                                      imageSrc={profile.imageSrc} bio={profile.bio}/>
                )
            }
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

const profiles = [
    {
        name: "Marian",
        imageSrc: "drawable/marian.png",
        bio: "Marian z Poznania to szalony romantyk, który uwielbia spontaniczne wypady, sporty ekstremalne i podróże. Zafascynowany muzyką i sztuką, szuka kogoś do dzielenia życia i przygód."
    },
    {
        name: "Weronika",
        imageSrc: "drawable/weronika.png",
        bio: "Marian z Poznania to szalony romantyk, który uwielbia spontaniczne wypady, sporty ekstremalne i podróże. Zafascynowany muzyką i sztuką, szuka kogoś do dzielenia życia i przygód."
    },
]
