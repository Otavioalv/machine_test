import axios from "axios";

const URL: string = "http://127.0.0.1";
const PORT: number = 5000;

const baseUrl: string = `${URL}:${PORT}`;

const machineApi = axios.create({
    baseURL: baseUrl
})

export default machineApi;