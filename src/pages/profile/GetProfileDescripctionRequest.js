import {apiUrl} from "../../App";

export let GetProfileDescriptionRequest = (jwt, setDescription, setError) => {
    fetch(`${apiUrl}/user/description`,
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
                    setDescription(json)
                })
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
