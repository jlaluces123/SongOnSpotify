import { useState } from 'react';
import queryString from 'query-string';

function getAccessToken(url) {
    let parsedToken = queryString.parse(url);

    if (!parsedToken) {
        return;
    }

    return parsedToken.access_token;
}

export function useAccessToken(url) {
    const [token, setToken] = useState(() => {
        return getAccessToken(url);
    });

    return [token, setToken];
}
