import axios from "axios";
import {BASE_URL} from "../helpers/config";

// @ts-ignore
export const refreshTokenData = async ({refreshToken, callbackFn, handleError}) => {
    try {
        console.log("refreshToken");
        const {data} = await axios({
            method: 'get',
            headers: {Authorization: `Bearer ${refreshToken}`},
            url: `${BASE_URL}/auth/refresh-token`,
        })
        if (data) {
            await callbackFn(data.accessToken, data.refreshToken)
        }
    } catch (e) {
        console.error('tokenError');
        console.log(e);
        handleError(true)
    }
}
