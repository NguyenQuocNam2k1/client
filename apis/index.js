import axios from "axios";

export const apiBE = axios.create({
    baseURL: "http://localhost:5000",
});

export const apiMapBox = axios.create({
    baseURL:"https://api.mapbox.com",
})