import React, { useEffect, useRef, useState } from "react";
import CanvasDraw from "react-canvas-draw";
import { Alert, Button } from "react-daisyui";
import { FetchQuestionData, LogData, timeFormat } from "./helper";
import * as BsIcon from "react-icons/bs"

function AnswerQuestion({ COUNTDOWN_UNTIL, CURRENT_QUESTION }) {
  const userCanva = useRef(null);
  const user = JSON.parse(localStorage.getItem("user"))
  const [question, setQuestion] = useState();

  useEffect(() => {
    if (CURRENT_QUESTION) {
      fetchQuestionData(CURRENT_QUESTION);
      
    }
  }, [CURRENT_QUESTION, COUNTDOWN_UNTIL]);

  const fetchQuestionData = async (q_id) => {
    let query = await FetchQuestionData(q_id);
    setQuestion(query);
  };
  if (CURRENT_QUESTION && COUNTDOWN_UNTIL)
    return (
      <>
      <div className="m-3 h-"> 
      <div className="my-2">
      <Alert innerClassName="flex justify-between">
          <div className="flex gap-2 items-center">
          <BsIcon.BsPerson/> {user.owner_name}
          </div>
          <p>{timeFormat(COUNTDOWN_UNTIL)}</p>
          <div className="flex gap-2 items-center">
          <Button variant="outline" size = "sm" onClick={()=>{userCanva.current.undo()}}><BsIcon.BsArrowCounterclockwise/></Button>
          <Button variant="outline" size = "sm" onClick={()=>{userCanva.current.eraseAll()}}><BsIcon.BsTrash/></Button>
          </div>
      </Alert>
      </div>
      <CanvasDraw
      style={{width: "100%"}}
              ref={userCanva}
              lazyRadius={0}
              brushRadius={5}
              canvasHeight={700}
              onChange={() => {
                LogData(user.user_id, CURRENT_QUESTION, userCanva.current.getDataURL());
              }}
            />
      </div>
      </>
    );
}

export default AnswerQuestion;
