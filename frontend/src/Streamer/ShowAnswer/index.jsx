import React, { useState, useEffect } from "react";
import { Badge, Card } from "react-daisyui";
import { FetchAnswer } from "./helper";

function ShowAnswer({ CURRENT_QUESTION, QUESTION_OWNER }) {
  const [answer, setAnswer] = useState(false);

  useEffect(() => {
    if (CURRENT_QUESTION) {
      fetchAnswer(CURRENT_QUESTION);
    }
  }, [CURRENT_QUESTION]);

  const fetchAnswer = async (q_id) => {
    let data = await FetchAnswer(q_id);
    console.table(data);
    setAnswer(data);
  };
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white-blur gap-5">
      <div className="grid rounded-lg bg-white shadow-2xl bg-opacity-70 text-center text-3xl w-11/12 animate__animated animate__fadeInUp p-5">
        คำตอบของผู้เข้าแข่งขัน
      </div>
      <div className="grid grid-cols-4 gap-4">
        {answer &&
          answer.map((data,index) => {
            return (
              <div className="col-span-1 bg-white p-2 rounded-2xl shadow-xl animate__animated animate__fadeInDown bg-opacity-80" style={{animationDelay: `${750+index*175}ms`, height: "350px"}}>
                <div className="flex justify-around"><p className="text-xl text-center">{data.owner_name}</p>
                {QUESTION_OWNER === data.user_id ? <Badge color="warning">เจ้าของคำถาม</Badge> : null}
                </div>
                <img src={data.answer} className="w-80"></img>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default ShowAnswer;
