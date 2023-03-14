import {apiUrl} from "../../../App";

export let LoginRequest = (setIsLoading, setSuccess, setError, email, password) => {
    fetch(`${apiUrl}/auth/login`,
        {
            "mode": "cors",
            "method": "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            "body": JSON.stringify(
                {
                    email: email,
                    password: password,
                }
            )
        }
    )
        .then(response => {
            setIsLoading(false)
            if (response.status === 200) {
                setSuccess(true)
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
