import {apiUrl} from "../../App";

export let SetRating = (jwt, id, rating) => {
    fetch(`${apiUrl}/rate?targetUserId=${id}&rating=${rating}`,
        {
            "mode": "cors",
            "method": "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwt}`
            },
        }
    )
        .then(response => {

        })
        .catch(e => {

        });
}

export let GetRating = (jwt, setRating, id) => {
    fetch(`${apiUrl}/rate?targetUserId=${id}`,
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
                    setRating(json)
                })
            } else {
                try {
                    response.json().then(json => {

                    })
                } catch {

                }
            }
        })
        .catch(e => {

        });
}