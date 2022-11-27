import { PropTypes } from "prop-types";
import React, { useState, useEffect } from "react";
import { Badge, Card } from "react-daisyui";
import { FetchAnswer, FetchScore } from "./helper";
import * as BsIcon from "react-icons/bs"
function ShowAnswer({ CURRENT_QUESTION, QUESTION_OWNER, CURRENT_STATUS }) {
  const [answer, setAnswer] = useState(false);
  const [score, setScore] = useState()

  useEffect(() => {
    if (CURRENT_QUESTION) {
      fetchAnswer(CURRENT_QUESTION);
    }
  }, [CURRENT_QUESTION]);

  useEffect(()=>{
    if (CURRENT_STATUS === "SHOW_SUMMARY") {
     fetchScore(CURRENT_QUESTION)
    }
  }, [CURRENT_STATUS])

  const fetchAnswer = async (q_id) => {
    let data = await FetchAnswer(q_id);
    setAnswer(data);
  };

  const fetchScore = async (q_id) =>{
    let score = await FetchScore(q_id)
    console.log(score)
    setScore(score)
  }

  const filterScore = (user_id) =>{
    if(score?.score){
      let score_data = score?.score.filter((data)=>{
        return data.user_id === user_id
    })
  return score_data[0]?.score
    }
  }
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white-blur gap-5">
      <div className="grid rounded-lg bg-white shadow-2xl bg-opacity-70 text-center text-3xl w-11/12 animate__animated animate__fadeInUp p-5">
        {CURRENT_STATUS === "SHOW_SUMMARY" ? <p className="animate__animated animate__fadeInUp">คำตอบที่ถูกต้อง<br/><strong>{score && score.question_data[0].correct_answer.split("<br/>").map((i)=>{
                          return(
                            <>
                            <span>{i}</span>
                            <br/>
                            </>
                          )
                        })}</strong></p> :"คำตอบของผู้เข้าแข่งขัน"}
      </div>
      <div className="grid grid-cols-4 gap-4">
        {answer &&
          answer.map((data,index) => {
            return (
              <Card key={index} className="col-span-1 bg-white p-2 rounded-2xl shadow-xl animate__animated animate__fadeInDown bg-opacity-80" style={{animationDelay: `${750+index*175}ms`, height: "350px"}}>
              <Card.Body>
              <Card.Title className="flex justify-around"><p className="text-2xl text-center">{data.owner_name}</p>
                {CURRENT_STATUS === "SHOW_SUMMARY" ? filterScore(data.user_id) > 0 ? <BsIcon.BsCheckLg className="animate__animated animate__fadeInUp text-success text-5xl"/> : <BsIcon.BsXLg className="animate__animated animate__fadeInUp text-error text-5xl"/>: null}
                {QUESTION_OWNER === data.user_id ? <Badge color="warning">เจ้าของคำถาม</Badge> : null}
                </Card.Title>
                <img src={data.answer} className="h-48"></img>
                <Card.Actions>
                {CURRENT_STATUS === "SHOW_SUMMARY" ? <p className={filterScore(data.user_id) > 0 ?"text-center text-4xl text-success animate__animated animate__fadeInUp" : "text-center text-4xl text-error animate__animated animate__fadeInUp"}>{filterScore(data.user_id)}</p> : null}
                </Card.Actions>
              </Card.Body>
              </Card>
            );
          })}
      </div>
    </div>
  );
}

ShowAnswer.propTypes = {
  CURRENT_QUESTION: PropTypes.string.isRequired,
  QUESTION_OWNER: PropTypes.string.isRequired,
  CURRENT_STATUS: PropTypes.string.isRequired
}

export default ShowAnswer;
