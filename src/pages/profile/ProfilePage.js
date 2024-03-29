import {useNavigate} from "react-router-dom";
import {Box, Card, CardMedia, Typography} from "@mui/material";
import {IconField} from "../../components/IconField";
import {Toolbar} from "../../components/Toolbar";
import {useContext, useEffect, useRef, useState} from "react";
import {GetProfileInfoRequest} from "./GetProfileInfoRequest";
import {GetProfilePictureRequest} from "./GetProfilePictureRequest";
import {decodeBase64Image} from "./GetProfilePictureRequest";
import {authContext} from "../auth/auth";
import {GetProfileDescriptionRequest} from "./GetProfileDescripctionRequest";
import {ButtonPrimary} from "../../components/ButtonPrimary";
import {TextField} from "../../components/TextField";
import {SetProfileDescriptionRequest} from "./SetProfileDescriptionRequest";
import {ButtonOutlined} from "../../components/ButtonOutlined";

import {SetProfileImageRequest} from "./SetProfileImageRequest";

export function ProfilePage() {
    const inputFile = useRef(null)
    const navigate = useNavigate()
    const [profile, setProfile] = useState({})
    const [editDescription, setEditDescription] = useState("")
    const [description, setDescription] = useState("")
    const [isInEditMode, setIsInEditMode] = useState(false)
    const [error, setError] = useState(null)
    const {authState} = useContext(authContext)

    const [image, setImage] = useState(null)

    const onImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            SetProfileImageRequest(authState.jwt, event.target.files[0], () => {
                setImage({src: URL.createObjectURL(event.target.files[0])});
            }, setError)
        }
    }

    const cmdSetDescription = (description) => {
        setDescription(description)
        setEditDescription(description)
    }

    const cmdEdit = (e) => {
        e.preventDefault()
        setIsInEditMode(true)
    }

    const cmdSave = (e) => {
        e.preventDefault()
        SetProfileDescriptionRequest(
            authState.jwt,
            editDescription,
            () => {
                setDescription(editDescription)
                setIsInEditMode(false)
            },
            setError,
        )
    }

    useEffect(() => {
        GetProfileInfoRequest(authState.jwt, setProfile, setError)
        GetProfileDescriptionRequest(authState.jwt, cmdSetDescription, setError)
        GetProfilePictureRequest(authState.jwt, setImage, setError)
    }, [])

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
                <input type='file' accept="image/*" id='file' onChange={onImageChange} ref={inputFile}
                       style={{display: 'none'}}/>
                {image === null ?

                    <Box sx={{
                        display: "flex",
                        flexDirection: "column",
                        textAlign: "center",
                        width: "100%",
                        height: "500px",
                        alignItems: "center",
                        marginTop: "1rem",
                    }}>
                <img src={"drawable/sad.svg"} width="250px"></img>
                    <Typography variant={"h4"} sx={{
                        padding: "0.5rem",
                        textAlign: "center",
                        marginTop: "1rem",
                        marginBottom: "1rem",
                    }}>Brak zdjęcia profilowego</Typography>
                                <ButtonPrimary text={"Dodaj zdjęcie"} onClick={(e) => inputFile.current.click()}/>
                    </Box> :
                    <CardMedia
                        component="img"
                        height="500"
                        image={image.src}
                        sx={{objectPosition: "top", cursor: "pointer"}}
                        onClick={(e) => inputFile.current.click()}
                    />
                }
                <Box sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    minWidth: "min-content"
                }}>
                    <Box sx={{
                        display: "flex",
                        flexDirection: "column",
                        textAlign: "center",
                        margin: "1rem",
                        width: "100%",
                        alignItems: "center",
                    }}>
                        <Typography variant={"h4"} sx={{
                            padding: "0.5rem"
                        }}>{profile.firstName}, {yearDiff(new Date(profile.dateOfBirth), new Date())}</Typography>
                        {!isInEditMode && <Typography variant="h5"
                                                      sx={{padding: "0.5rem"}}>{description ? description : "Dodaj swój krótki opis!"}</Typography>}
                        {isInEditMode && <TextField inputType={"text"} input={editDescription}
                                                    onInputChange={msg => setEditDescription(msg)}/>}
                        <Box sx={{
                            textAlign: "center",
                            margin: "1rem",
                            width: "min-content",
                        }}>
                            {!isInEditMode && <ButtonPrimary text={"Edytuj"} onClick={cmdEdit}/>}
                            {isInEditMode && <div className="flex-row">
                                <ButtonOutlined text={"Anuluj"} onClick={e => setIsInEditMode(false)}
                                                className={"profile-card-cancel-button"}/>
                                <ButtonPrimary text={"Zapisz"} onClick={cmdSave}/>
                            </div>
                            }
                        </Box>
                    </Box>
                </Box>
            </Card>
        </Box>
    </Box>
}

function yearDiff(dt1, dt2) {
    let diffYear = (dt2.getTime() - dt1.getTime()) / 1000;
    diffYear /= (60 * 60 * 24);
    return Math.abs(Math.round(diffYear / 365.25));
}
