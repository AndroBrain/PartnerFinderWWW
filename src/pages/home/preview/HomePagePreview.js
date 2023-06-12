import {OpinionCard} from "./OpinionCard";
import {ButtonPrimary} from "../../../components/ButtonPrimary";
import {ButtonOutlined} from "../../../components/ButtonOutlined";
import {useNavigate} from "react-router-dom";
import {ProfileCardShort} from "../../../components/ProfileCardShort";
import {Toolbar} from "../../../components/Toolbar";

export function HomePagePreview() {
    const navigate = useNavigate()


    return <div className="flex-column">
        <Toolbar>
            <ButtonPrimary text="Zarejestruj" onClick={() => navigate("/register")}/>
            <ButtonOutlined className="toolbar-login-button" text="Zaloguj" onClick={() => navigate("/login")}/>
        </Toolbar>
        <div className="flex-row">
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
    </div>
}

const opinions = [
    {author: "Michał", text: "Znalazłem miłość już po 5 minutach! Niesamowite"},
    {
        author: "Kaja",
        text: "To świetny portal randkowy! Korzystam z niego od kilku miesięcy i jestem bardzo zadowolona. Posiada ciekawe funkcjonalności i wysoką jakość profili użytkowników. Polecam!"
    },
    {author: "Oskar", text: "Od zawsze miałem problem z trafieniem na osobę, która mnie w pełni rozumie. Dzięki temu portalowi randkowemu poznaję osoby o podobnym spojrzeniu na świat do mojego. Warto było założyć konto!"},
    {author: "Filip", text: "Ten portal randkowy jest niezwykle skutecznym narzędziem, które umożliwiło mi poznanie wyjątkowej osoby, z którą teraz buduję piękną relację."},
    {author: "Hubert", text: "Ta aplikacja randkowa to jak skok ze spadochronem - emocjonujące, pełne adrenaliny i czasem zaskakujące. Tutaj nie ma miejsca na nudę! Każde kliknięcie to potencjalna randka i szansa na poznanie kogoś wyjątkowego. Możesz trafić na osobę, która stawia awokado na pierwszym miejscu w swoim życiu albo na kogoś, kto uważa, że seriale to najważniejsza rzecz na świecie. Jedno jest pewne - ta aplikacja sprawi, że Twoje serce będzie biło jak szalone!"},

]

const profiles = [
    {
        name: "Marian",
        imageSrc: "drawable/marian.jpg",
        bio: "Marian z Poznania to szalony romantyk, który uwielbia spontaniczne wypady, sporty ekstremalne i podróże. Zafascynowany muzyką i sztuką, szuka kogoś do dzielenia życia i przygód."
    },
    {
        name: "Weronika",
        imageSrc: "drawable/weronika.jpg",
        bio: "Weronika to urocza, inteligentna i pełna energii kobieta o nieodpartym uśmiechu. Jej wdzięk i naturalna elegancja przyciągają uwagę wszystkich wokół niej. Na randce z Weroniką możesz spodziewać się niezapomnianych chwil pełnych rozmów, śmiechu i pozytywnej atmosfery."
    },
]
