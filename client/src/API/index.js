import axios from "axios";

const url = "http://localhost:5000/posts"
let axiosConfig = {
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        "Access-Control-Allow-Origin": "*",
    }
  };

export const fetchForm = () => axios.get(url)
export const createForm = (newPost) => axios.post(url,newPost,axiosConfig)

