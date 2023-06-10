import {apiUrl} from "../../App";

export let GetProfileImageRequest = (jwt, setImage, setError) => {
    fetch(`${apiUrl}/photo/all`,
        {
            "mode": "cors",
            "method": "GET",
            headers: {
                'Authorization': `Bearer ${jwt}`
            },
        }
    )
        .then(response => {
            if (response.status === 200) {
                // response.json().then(json => {
                //     console.log(json)
                // })
            } else {
                try {
                    response.json().then(json => {
                        setError(json)
                        // setError(response.status + " " + json.title)
                    })
                } catch {
                    setError(response.status);
                }
            }
        })
        .catch(e => {
            console.log(e.toString());
            setError(e.toString());
        });
}
