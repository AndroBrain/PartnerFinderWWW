import {useNavigate} from "react-router-dom";
import {Box, Card, CardMedia, Typography} from "@mui/material";
import {IconField} from "../../components/IconField";
import {Toolbar} from "../../components/Toolbar";
import {useContext, useEffect, useState} from "react";
import {GetProfileInfoRequest} from "./GetProfileInfoRequest";
import {authContext} from "../auth/auth";

export function ProfilePage() {
    const navigate = useNavigate()
    const [profile, setProfile] = useState({})
    const [error, setError] = useState(null)
    const {authState} = useContext(authContext)

    useEffect(() => {
        GetProfileInfoRequest(authState.jwt, 2, setProfile, setError)
    }, [])

    console.log(authState.jwt)
    console.log("profile", profile)
    return <Box sx={{display: "flex", height: "100%", width: "100%", flexDirection: "column"}}>
        <Toolbar>
            <IconField text={"Wiadomości"} icon={"drawable/send_message.svg"} onClick={() => navigate("/chat")}/>
            <IconField text={"Strona główna"} icon={"drawable/main_page.svg"} onClick={() => navigate("/")}/>
        </Toolbar>
        <Box sx={{display: "flex", justifyContent: "center", alignItems: "center"}}>
            <Card sx={{
                backgroundColor: "var(--md-sys-color-inverse-on-surface-light)",
                margin: "3rem",
                width: "80%",
                minWidth: "min-content"
            }}>
                {error !== null && <span className="error-span auth-error-span">{error}</span>}
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
                    <Box sx={{display: "flex", flexDirection: "column", textAlign: "center", margin: "1rem"}}>
                        <Box sx={{display: "flex", flexDirection: "row", justifyContent: "center", margin: "1rem"}}>
                            <Typography variant={"h4"} sx={{
                                padding: "0.5rem"
                            }}>{profile.firstName}, {yearDiff(new Date(profile.dateOfBirth), new Date())}</Typography>
                        </Box>
                        <Typography variant="h5" sx={{padding: "0.5rem"}}>{userData.description}</Typography>
                    </Box>
                </Box>
            </Card>
        </Box>
    </Box>
}

function yearDiff(dt1, dt2) {
    var diffYear = (dt2.getTime() - dt1.getTime()) / 1000;
    diffYear /= (60 * 60 * 24);
    return Math.abs(Math.round(diffYear / 365.25));
}

const userData = {
    picture: "drawable/martyna.png",
    description: "hejka! Nazywam się Martyna i jestem tutaj, aby poznać nowych ludzi. Zawsze lubię spędzać czas na świeżym powietrzu, biegać lub po prostu spacerować. Lubię też czytać dobre książki i gotować smaczne jedzenie. Szukam kogoś, kto jest szczery, inteligentny i z poczuciem humoru. Jeśli chcesz dowiedzieć się więcej, odezwij się do mnie!"
}
