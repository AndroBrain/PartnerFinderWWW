import {apiUrl} from "../../App";

export let SetProfileImageRequest = (jwt, image, onSuccess, setError) => {
    const formData = new FormData();
    formData.append('file', image);
    console.log(formData)
    fetch(`${apiUrl}/photo/upload`,
        {
            "mode": "cors",
            "method": "POST",
            headers: {
                'Authorization': `Bearer ${jwt}`
            },
            body: formData
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
