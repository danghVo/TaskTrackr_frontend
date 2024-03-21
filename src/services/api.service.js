import axios from "axios";

const commonConfig = {
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
    },
};

export default (baseURL) => {
    const server = import.meta.env.VITE_API_URL
    return axios.create({
        baseURL: server + baseURL,
        ...commonConfig
    })
}