import React, {useState , useEffect} from "react";
import { useNavigate } from "react-router-dom";
import {Card, Button, Divider} from "react-daisyui"
import * as BsIcon from "react-icons/bs"
import { FetchQuestionData } from "./helper";

function WaitingMC({connection, CURRENT_QUESTION}) {
  const [user, setUser] = useState();
  const navigate = useNavigate();
  const [question, setQuestion] = useState();
  useEffect(() => {
    if (!localStorage.getItem("user")) return navigate("/");
    if (localStorage.getItem("user"))
      return setUser(JSON.parse(localStorage.getItem("user")));
  }, []);

  useEffect( ()=>{
    if(CURRENT_QUESTION) {
        FetchData(CURRENT_QUESTION)
    }
  }, [CURRENT_QUESTION])

  const FetchData = async (q_id) =>{
    let query = await FetchQuestionData(q_id)
    console.log(query)
    setQuestion(query)
  }

  if(CURRENT_QUESTION && question)
  return (
    <div className="grid h-screen place-items-center">
      <div>
        <div className="text-center m-2">
          {/* <p className="text-xl">กรุณารอพิธีกร</p> */}
          <p className="text-md"></p>
          <Card className="shadow-xl">
            <Card.Body>
              <p className="text-3xl">{question.type} ระดับ {question.level}</p>
              <p className="text-3xl">{question.score} คะแนน</p>
              <p className="text-3xl">{question.time} วินาที</p>
              <Divider>USER INFORMATION</Divider>
              <p>ทีม {user && user.owner_name}</p>
              <p
                className={
                  connection === true
                    ? "flex items-center justify-center text-success"
                    : "flex items-center justify-center text-error"
                }
              >
                {connection === true ? (
                  <>
                    <BsIcon.BsCheck2Circle />
                    เชื่อมต่อกับระบบเกมสำเร็จ
                  </>
                ) : (
                  <>
                    <BsIcon.BsExclamation />
                    ไม่สามารถติดต่อกับระบบได้ โปรดติดต่อเจ้าหน้าที่
                  </>
                )}
              </p>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default WaitingMC;
