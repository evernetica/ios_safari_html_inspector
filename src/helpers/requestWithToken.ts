import axios, {AxiosRequestConfig} from "axios";

export const requestWithToken = async (method, url, authToken, data = null) => {
    const config: AxiosRequestConfig = {
        method: method,
        url: url,
        headers: { Authorization: `Bearer ${authToken}` }
    };
    if (data) {
        config.data = data;
    }
    return axios(config);
};


