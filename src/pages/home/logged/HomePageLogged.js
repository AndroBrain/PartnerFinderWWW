import {Toolbar} from "../../../components/Toolbar";
import {IconField} from "../../../components/IconField";
import {HomeCard} from "../../../components/HomeCard"

export function HomePageLogged() {
    return <>
        <Toolbar>
            <IconField text={"Wiadomości"} icon={"drawable/send_message.svg"}/>
            <IconField text={"Mój profil"} icon={"drawable/profile.svg"}/>
        </Toolbar>
        <HomeCard image={userData.picture} className={"home-container"}>
            <img src={"drawable/cancel.svg"} className={"home-card-icon"}/>
            <img src={"drawable/message.svg"} className={"home-card-icon-right"}/>
            <div className={"headline-medium"}>
                <div className={"home-card-name"}>
                    {userData.name + ", " + userData.age + " | Zgranie: "}
                    <div style={{color: "var(--md-sys-color-primary-light)", display: "inline-block"}}>
                        {userData.match + "%"}
                    </div>
                </div>
                <div className={"home-page-description"}>
                    {userData.description}
                </div>
            </div>
        </HomeCard>
    </>
}
const userData = {
    name: "Martyna",
    picture: "drawable/martyna.png",
    age: "24",
    match: "80",
    description: "Cześć! Nazywam się Kamila i jestem tutaj, aby poznać nowych ludzi. Zawsze lubię spędzać czas na świeżym powietrzu, biegać lub po prostu spacerować. Lubię też czytać dobre książki i gotować smaczne jedzenie. Szukam kogoś, kto jest szczery, inteligentny i z poczuciem humoru. Jeśli chcesz dowiedzieć się więcej, odezwij się do mnie!"
}