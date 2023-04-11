import axios from "axios";

import mongoose from "mongoose";
import { Await } from "react-router-dom";

const instance = axios.create({
    // baseURL: 'http://localhost:3000',
    baseURL: 'http://localhost:8000/api/',
})
export default instance
// function ConectData(){}{
//     try {
//       await  mongoose.connect("mongodb://localhost:27017/we17309")
//     } catch (error) {
        
//     }
// }
// export default ConectData