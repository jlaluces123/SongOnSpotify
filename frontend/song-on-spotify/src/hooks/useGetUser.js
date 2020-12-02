import { useEffect, useState } from 'react';
import axios from 'axios';

function getUserData(accessToken) {
    // https://api.spotify.com/v1/me
    axios
        .get('https://api.spotify.com/v1/me', {
            headers: {
                Authorization: 'Bearer ' + accessToken,
            },
        })
        .then((response) => {
            return response.data;
        })
        .catch((err) => console.log('ERROR GET /v1/me', err));
}

export function useGetUser(token) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        if (token) {
            setUser(getUserData(token));
        }
    }, []);

    return [user, setUser];
}
