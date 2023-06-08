import {apiUrl} from "../../App";

export function decodeBase64Image(image) {
    const img = new Image();
    img.src = 'data:image/png;base64,' + image;
    return img;
}

export let GetProfilePictureRequest = (jwt, setPicture, setError) => {
    fetch(`${apiUrl}/photo/all/`,
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
                        if (json !== "No photo files found.") {
                            setError(json)
                        }
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
