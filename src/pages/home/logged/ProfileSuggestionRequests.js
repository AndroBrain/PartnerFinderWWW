import {apiUrl} from "../../../App";
import {useEffect} from "react";

export let GetProfileSuggestionsIds = (jwt, setUsers, setError, id) => {
    fetch(`http://localhost:5000/matches?user_id=${id}&num_matches=10`,
        {
            "mode": "cors",
            "method": "GET",
        }
    )
        .then(response => {
            if (response.status === 200) {
                response.json().then(json => {
                    setUsers(json)
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

export let GetUserInfo = (jwt, setUser, setError, id) => {
    fetch(`${apiUrl}/user/info/` + id,
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
                    setUser(json)
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

export let GetUserDescription = (jwt, setUserDescription, setError, id) => {
    fetch(`${apiUrl}/user/description/` + id,
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
                    setUserDescription(json)
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

export let GetCurrentUserId = (jwt) => {
    return new Promise((resolve, reject) => {
        fetch(`${apiUrl}/user/id/`, {
            mode: "cors",
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwt}`
            },
        })
            .then(response => {
                if (response.status === 200) {
                    return response.json();
                } else {
                    throw new Error('Failed to get current user ID');
                }
            })
            .then(json => {
                resolve(json);
            })
            .catch(error => {
                reject(error.toString());
            });
    });
};

export let GetUserEmail = (jwt, id) => {
    return new Promise((resolve, reject) => {
        fetch(`${apiUrl}/user/email?id=${id}`, {
            mode: "cors",
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwt}`
            },
        })
            .then(response => {
                if (response.status === 200) {
                    return response.json();
                } else {
                    throw new Error('Failed to get current user ID');
                }
            })
            .then(json => {
                resolve(json);
            })
            .catch(error => {
                reject(error.toString());
            });
    });
};


