
import { BASE_URL, LOGIN_URL, CONTENT_TYPE_APPLICATION_JSON } from "../constant/constants";

export const login = async (username, password) => {
    try {
        const response = await fetch(`${BASE_URL}${LOGIN_URL}`, {
            method: 'POST',
            headers: {
                'Content-Type': CONTENT_TYPE_APPLICATION_JSON,
            },
            body: JSON.stringify({ username, password }),
        });
        if(response.status != 200)
            throw new Error(response.statusText);
        else    
        {
            const responseData = await response.json();
            
            return responseData;
        }

    }
    catch (e) {
        throw e;


    }

}