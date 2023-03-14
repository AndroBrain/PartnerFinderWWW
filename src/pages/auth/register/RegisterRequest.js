import {apiUrl} from "../../../App";

export let RegisterRequest = (setIsLoading, setSuccess, setError, email, name, surname, gender, dateOfBirth, password) => {
    fetch(`${apiUrl}/auth/register`,
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
                    firstName: name,
                    secondName: surname,
                    gender: gender,
                    dateOfBirth: dateOfBirth,
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
