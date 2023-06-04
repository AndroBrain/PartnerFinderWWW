import {apiUrl} from "../../App";

export let PostSurveyRequest = (jwt, answers, onSuccess, setError) => {
    console.log(JSON.stringify(
        answers
    ))
    fetch(`${apiUrl}/questions/answer`,
        {
            "mode": "cors",
            "method": "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwt}`
            },
            body: JSON.stringify(
                answers
            )
        }
    )
        .then(response => {
            if (response.status === 200) {
                onSuccess()
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
