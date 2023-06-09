import {apiUrl} from "../../App";
import {decodeBase64Image} from "../home/logged/PictureRequests";

export let GetConversationPartnersIds = (jwt, setChats, setError) => {
    fetch(`${apiUrl}/chat/conversationPartners`,
        {
            "mode": "cors",
            "method": "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwt}`
            },
        }
    )
        .then(response => {
            if (response.status === 200) {
                response.json().then(json => {
                    setChats(json)
                })
            } else {
                try {
                    response.json().then(json => {
                        setError(json)
                    })
                } catch {
                    setError(response.status);
                }
            }
        })
        .catch(e => {
            setError(e.toString());
        });
}

export let GetConversation = (jwt, setChat, setError, id) => {
    fetch(`${apiUrl}/chat/messages?conversationPartnerId=` + id,
        {
            "mode": "cors",
            "method": "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwt}`
            },
        }
    )
        .then(response => {
            if (response.status === 200) {
                response.json().then(json => {
                    setChat(json)
                })
            } else {
                try {
                    response.json().then(json => {
                        setError(json)
                    })
                } catch {
                    setError(response.status);
                }
            }
        })
        .catch(e => {
            setError(e.toString());
        });
}

export let GetCurrentUserEmail = (jwt, setEmail, setError, id) => {
    fetch(`${apiUrl}/user/email?id=` + id,
        {
            "mode": "cors",
            "method": "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwt}`
            },
        }
    )
        .then(response => {
            if (response.status === 200) {
                response.json().then(json => {
                    setEmail(json)
                })
            } else {
                try {
                    response.json().then(json => {
                        setError(json)
                    })
                } catch {
                    setError(response.status);
                }
            }
        })
        .catch(e => {
            setError(e.toString());
        });
}

export let GetBasicInfoForAllUsers = async (jwt, setBasicUsersInfo, setError, ids) => {
    try {
        let userInfo = [];
        const pictures = await Promise.all(ids.map((userId) => GetUserPicture(jwt, userId)));
        const basicInfo = await Promise.all(ids.map((userId) => GetUserInfo(jwt, userId)));
        pictures.forEach((result, index) => {
            userInfo.push({
                "picture": decodeBase64Image(result.photo),
                "name": basicInfo.at(index).firstName,
                "id":index,
            })
        });
        setBasicUsersInfo(userInfo);
    } catch (error) {
        console.error("Błąd podczas pobierania danych dla użytkowników:", error);
    }
}

export let GetUserInfo = (jwt, id) => {
    return new Promise((resolve, reject) => {
        fetch(`${apiUrl}/user/info/` + id, {
            mode: "cors",
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwt}`
            },
        })
            .then(response => {
                if (response.status === 200) {
                    return response.json();
                } else {
                    throw new Error('Failed to get current user ID');
                }
            })
            .then(json => {
                resolve(json);
            })
            .catch(error => {
                reject(error.toString());
            });
    });
};

export let GetUserPicture = (jwt, id) => {
    return new Promise((resolve, reject) => {
        fetch(`${apiUrl}/photo/all/` + id, {
            mode: "cors",
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwt}`
            },
        })
            .then(response => {
                if (response.status === 200) {
                    return response.json()
                } else {
                    throw new Error('Failed to get current user ID');
                }
            })
            .then(json => {
                resolve(json);
            })
            .catch(error => {
                reject(error.toString());
            });
    });
};