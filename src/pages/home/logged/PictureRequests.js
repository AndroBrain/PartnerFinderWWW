import {apiUrl} from "../../../App";

export function decodeBase64Image(base64Image) {
    const img = new Image();
    img.src = 'data:image/png;base64,' + base64Image;
    return img;
}

export let GetPictureForCurrentUser = (jwt, setPicture, setError) => {
    fetch(`${apiUrl}/photo/all`,
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
                    setPicture(json)
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

export let GetPictureForUserId = (jwt, setPicture, setError, id) => {
    fetch(`${apiUrl}/photo/all/` + id,
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
                    setPicture(decodeBase64Image(json.photo))
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