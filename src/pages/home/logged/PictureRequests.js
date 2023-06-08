import {apiUrl} from "../../../App";

export function decodeBase64Image() {
    const base64Image = "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"
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
                    setPicture(decodeBase64Image(json.picture))
                    // setPicture(decodeBase64Image("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").src)
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