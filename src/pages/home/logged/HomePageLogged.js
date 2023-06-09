import {Toolbar} from "../../../components/Toolbar";
import {IconField} from "../../../components/IconField";
import {useNavigate} from "react-router-dom";
import {Box, Card, CardMedia, IconButton, Typography} from "@mui/material";
import {useContext, useEffect, useState} from "react";
import {authContext} from "../../auth/auth";
import {
    GetCurrentUserId,
    GetProfileSuggestionsIds,
    GetUserDescription, GetUserEmail,
    GetUserInfo,
} from "./ProfileSuggestionRequests";
import {decodeBase64Image, GetPictureForUserId} from "./PictureRequests";

function calculateAge(dateString) {
    const birthday = new Date(dateString);
    const today = new Date();

    let age = today.getFullYear() - birthday.getFullYear();
    const monthDiff = today.getMonth() - birthday.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthday.getDate())) {
        age--;
    }

    return age;
}
export function HomePageLogged() {
    const navigate = useNavigate()
    const [currentIndex, setCurrentIndex] = useState(0);
    const {authState} = useContext(authContext)

    const [profiles, setProfiles] = useState([])
    const [error, setError] = useState(false);
    const [match, setMatch] = useState("");
    const [description, setDescription] = useState("");
    const [picture, setPicture] = useState("drawable/profile2.svg");
    const [userInfo, setUserInfo] = useState({
        firstName: "",
        dateOfBirth: "",
    });

    const SendEmptyMessage = (jwt, id) => {
        const fetchData = async () => {
            try {

                const email = await GetUserEmail(jwt, id);
                localStorage.setItem('email', email);
            } catch (error) {
                console.log(error.toString());
            }
        };
        fetchData();
    };

    useEffect( () => {
        const fetchData = async () => {
            try {
                const currentUserId = await GetCurrentUserId(authState.jwt);
                GetProfileSuggestionsIds(authState.jwt, setProfiles, setError, currentUserId);
            } catch (error) {
                setError(error.toString());
            }
        };
        fetchData();
    }, [])

    useEffect(() => {
        if (profiles && profiles.length > 0) {
            setMatch( Math.round(profiles[currentIndex].score * 100));
            GetUserDescription(authState.jwt, setDescription, setError, profiles[currentIndex].target_user_id)
            GetPictureForUserId(authState.jwt, setPicture, setError, profiles[currentIndex].target_user_id)
            GetUserInfo(authState.jwt, setUserInfo, setError, profiles[currentIndex].target_user_id)
        }
    }, [currentIndex, profiles]);


    return <Box sx={{display: "flex", height: "100%", width: "100%", flexDirection: "column"}}>
        <Toolbar>
            <IconField text={"Wiadomości"} icon={"drawable/send_message.svg"} onClick={() => {
                navigate("/chat")
            }}/>
            <IconField text={"Mój profil"} icon={"drawable/profile.svg"} onClick={() => navigate("/profile")}/>
        </Toolbar>
        {profiles.length > 0 &&
            <Box sx={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                <IconButton color="primary" aria-label="arrow left" size="small"
                            sx={{display: currentIndex === 0 ? "none" : ""}} onClick={() => {
                    setCurrentIndex(prevState => prevState - 1)
                }}>
                    {/*<img src={img.src}/>*/}
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
                        image={picture.src}
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
                                    borderRight: "3px solid black",
                                    padding: "0.5rem"
                                }}>{userInfo.firstName}, {calculateAge(userInfo.dateOfBirth)}</Typography>
                                <Typography variant="h4" sx={{padding: "0.5rem"}}>Zgranie</Typography>
                                <Typography variant="h4" sx={{
                                    padding: "0.5rem",
                                    color: "var(--md-sys-color-surface-tint-light)"
                                }}>{match}%</Typography>
                            </Box>
                            <Typography variant="h5" sx={{padding: "0.5rem"}}>{description}</Typography>
                        </Box>
                        <IconButton color="primary" aria-label="message" sx={{margin: "3rem"}}
                                    onClick={() => {
                                        SendEmptyMessage(authState.jwt, profiles[currentIndex].target_user_id);
                                        navigate("/chat")
                                    }}>
                            <img src={"drawable/message.svg"} width="120px" style={{margin: "1rem"}}/>
                        </IconButton>
                    </Box>
                </Card>
                <IconButton color="primary" aria-label="arrow right" size="small" onClick={() => {
                    setCurrentIndex(prevState => prevState + 1)
                }} sx={{display: currentIndex === profiles.length - 1 ? "none" : ""}}>
                    <img src={"drawable/arrow_right.svg"}/>
                </IconButton>
            </Box>
        }
        {profiles.length === 0 && <Box sx={{
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
