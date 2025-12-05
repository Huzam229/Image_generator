import axios from 'axios';

const API = axios.create({
    baseURL: "http://localhost:5000/api/",
})


export const GetPost= async ()=> await API.get("/posts/get-posts");
export const CreatePost= async (data)=> await API.post("/posts/create-posts", data);
export const GenerateImage= async (data)=> await API.post("/generateImage/generate-Image", data);


