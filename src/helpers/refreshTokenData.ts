import axios from "axios";
import {MAIN_URL} from "./consts";

export const refreshTokenData = async ({refreshToken, callbackFn, handleError}) => {
    try {
        console.log("refreshToken");
        const {data} = await axios({
            method: 'get',
            headers: {Authorization: `Bearer ${refreshToken}`},
            url: `${MAIN_URL}/auth/refresh-token`,
        })
        console.log('data');
        console.log(data);
        if (data) {
            await callbackFn(data.accessToken, data.refreshToken)
        }
    } catch (e) {
        console.error('tokenError');
        console.log(e);
        handleError(true)
    }
}
