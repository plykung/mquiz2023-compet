import axios from "axios"
import { ENDPOINT } from "../../../config"

const FetchQuestionData = async (question_id) =>{
    try{
        let question = await axios.get(`${ENDPOINT}/questions/${question_id}/`)
        return question.data.data
    }catch(err){
        console.log(err)
    }
}

const LogData = async (user,q_id,answer) => {
    try{
        await axios.post(`${ENDPOINT}/answer/`, {question_id: q_id, user_id: user, answer: answer})
    }catch(err){
        console.log(err)
    }}

    function timeFormat(duration)
    {   
        // Hours, minutes and seconds
        var hrs = ~~(duration / 3600);
        var mins = ~~((duration % 3600) / 60);
        var secs = ~~duration % 60;
    
        // Output like "1:01" or "4:03:59" or "123:03:59"
        var ret = "";
    
        if (hrs > 0) {
            ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
        }
    
        ret += "" + mins + ":" + (secs < 10 ? "0" : "");
        ret += "" + secs;
        return ret;
    }

export {FetchQuestionData, LogData, timeFormat}