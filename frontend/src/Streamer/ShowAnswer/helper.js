import axios from "axios"
import { ENDPOINT } from "../../config"

const FetchAnswer = async (q_id) => {
    try{
        let ans = await axios.get(`${ENDPOINT}/answer/score/answers/${q_id}/`)
        return ans.data.data
    }catch(err){
        throw err;
    }
        
}

export {FetchAnswer}