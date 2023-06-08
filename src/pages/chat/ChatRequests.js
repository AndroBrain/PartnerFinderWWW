import {apiUrl} from "../../App";

export let GetConversationPartnersIds = (jwt, setChats, setError) => {
    fetch(`${apiUrl}/chat/conversationPartners`,
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
                    setChats(json)
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

export let GetConversation = (jwt, setChat, setError, id) => {
    fetch(`${apiUrl}/chat/messages?conversationPartnerId=` + id,
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
                    setChats(json)
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