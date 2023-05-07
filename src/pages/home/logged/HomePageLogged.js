import {Toolbar} from "../../../components/Toolbar";
import {IconField} from "../../../components/IconField";
import {useNavigate} from "react-router-dom";
import {Box, Card, CardMedia, IconButton, Typography} from "@mui/material";
import {useState} from "react";

const usersData = [
    {
        name: "Martyna",
        picture: "drawable/martyna.png",
        age: "21",
        match: "80",
        description: "hejka! Nazywam się Martyna i jestem tutaj, aby poznać nowych ludzi. Zawsze lubię spędzać czas na świeżym powietrzu, biegać lub po prostu spacerować. Lubię też czytać dobre książki i gotować smaczne jedzenie. Szukam kogoś, kto jest szczery, inteligentny i z poczuciem humoru. Jeśli chcesz dowiedzieć się więcej, odezwij się do mnie!"
    },
    {
        name: "Basia",
        picture: "drawable/marta.jpg",
        age: "28",
        match: "70",
        description: "Cześć! Nazywam się Basia i jestem tutaj, aby poznać nowych ludzi. Zawsze lubię spędzać czas na świeżym powietrzu, biegać lub po prostu spacerować. Lubię też czytać dobre książki i gotować smaczne jedzenie. Szukam kogoś, kto jest szczery, inteligentny i z poczuciem humoru. Jeśli chcesz dowiedzieć się więcej, odezwij się do mnie!"
    },
    {
        name: "Kasia",
        picture: "drawable/basia.jpg",
        age: "24",
        match: "10",
        description: "Hejka! Nazywam się Kasia i jestem tutaj, aby poznać nowych ludzi. Zawsze lubię spędzać czas na świeżym powietrzu, biegać lub po prostu spacerować. Lubię też czytać dobre książki i gotować smaczne jedzenie. Szukam kogoś, kto jest szczery, inteligentny i z poczuciem humoru. Jeśli chcesz dowiedzieć się więcej, odezwij się do mnie!"
    }
]

export function HomePageLogged() {
    const navigate = useNavigate()
    const [currentIndex, setCurrentIndex] = useState(0);
    const [users, setUsers] = useState(usersData);

    const userData = users[currentIndex];
    const handleReject = () => {
        const newUsers = [...users];
        newUsers.splice(currentIndex, 1);
        setUsers(newUsers);
        const nextIndex = currentIndex < users.length - 1 ? currentIndex : currentIndex - 1;
        setCurrentIndex(nextIndex);
    }

    return <Box sx={{display: "flex", height: "100%", width: "100%", flexDirection: "column"}}>
        <Toolbar>
            <IconField text={"Wiadomości"} icon={"drawable/send_message.svg"} onClick={() => navigate("/chat")}/>
            <IconField text={"Mój profil"} icon={"drawable/profile.svg"}/>
        </Toolbar>
        {users.length > 0 &&
            <Box sx={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                <IconButton color="primary" aria-label="arrow left" size="small"
                            sx={{display: currentIndex === 0 ? "none" : ""}} onClick={() => {
                    setCurrentIndex(prevState => prevState - 1)
                }}>
                    <img src={"drawable/arrow_left.svg"}/>
                </IconButton>
                <Card sx={{
                    backgroundColor: "var(--md-sys-color-inverse-on-surface-light)",
                    margin: "3rem",
                    width: "80%",
                    minWidth: "min-content"
                }}>
                    <CardMedia
                        component="img"
                        height="500"
                        image={userData.picture}
                        alt="user picture"
                        sx={{objectPosition: "top"}}
                    />
                    <Box sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        minWidth: "min-content"
                    }}>
                        <IconButton color="primary" aria-label="cancel" sx={{margin: "3rem"}} onClick={handleReject}>
                            <img src={"drawable/cancel.svg"} width="100px" style={{margin: "1rem"}}/>
                        </IconButton>
                        <Box sx={{display: "flex", flexDirection: "column", textAlign: "center", margin: "1rem"}}>
                            <Box sx={{display: "flex", flexDirection: "row", justifyContent: "center", margin: "1rem"}}>
                                <Typography variant={"h4"} sx={{
                                    borderRight: "3px solid black",
                                    padding: "0.5rem"
                                }}>{userData.name}, {userData.age}</Typography>
                                <Typography variant="h4" sx={{padding: "0.5rem"}}>Zgranie</Typography>
                                <Typography variant="h4" sx={{
                                    padding: "0.5rem",
                                    color: "var(--md-sys-color-surface-tint-light)"
                                }}>{userData.match}%</Typography>
                            </Box>
                            <Typography variant="h5" sx={{padding: "0.5rem"}}>{userData.description}</Typography>
                        </Box>
                        <IconButton color="primary" aria-label="message" sx={{margin: "3rem"}}
                                    onClick={() => navigate("/chat")}>
                            <img src={"drawable/message.svg"} width="120px" style={{margin: "1rem"}}/>
                        </IconButton>
                    </Box>
                </Card>
                <IconButton color="primary" aria-label="arrow right" size="small" onClick={() => {
                    setCurrentIndex(prevState => prevState + 1)
                }} sx={{display: currentIndex === users.length - 1 ? "none" : ""}}>
                    <img src={"drawable/arrow_right.svg"}/>
                </IconButton>
            </Box>
        }
        {users.length === 0 && <Box sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            marginTop: "3rem",
            flexDirection: "column"
        }}>
            <img src={"drawable/sad.svg"} width="500px"></img>
            <Typography variant={"h3"} sx={{margin: "2rem"}}>Brak dostępnych profili</Typography>
        </Box>
        }
    </Box>
}
