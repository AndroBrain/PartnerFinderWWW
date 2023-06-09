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