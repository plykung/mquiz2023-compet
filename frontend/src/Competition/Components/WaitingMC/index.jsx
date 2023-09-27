import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card, Divider, Modal } from "react-daisyui"
import * as BsIcon from "react-icons/bs"
import { FetchQuestionData } from "./helper";
import PropTypes from "prop-types"

function WaitingMC({ connection, CURRENT_QUESTION }) {
  const [user, setUser] = useState();
  const navigate = useNavigate();
  const [question, setQuestion] = useState();
  useEffect(() => {
    if (!localStorage.getItem("user")) return navigate("/");
    if (localStorage.getItem("user"))
      return setUser(JSON.parse(localStorage.getItem("user")));
  }, []);

  useEffect(() => {
    if (CURRENT_QUESTION) {
      FetchData(CURRENT_QUESTION)
    }
  }, [CURRENT_QUESTION])

  const FetchData = async (q_id) => {
    let query = await FetchQuestionData(q_id)
    console.log(query)
    setQuestion(query)
  }

  // modal Rules
  const [rulesModal, setRulesModal] = useState(false)

  if (CURRENT_QUESTION && question)
    return (
      <div className="grid h-screen place-items-center">
        <div>
          <div className="text-center m-2">
            {/* <p className="text-xl">กรุณารอพิธีกร</p> */}
            <p className="text-md"></p>
            <Card className="shadow-xl">
              <Card.Body>
                <p className="text-3xl">{question.type} {question.level && "ระดับ"} {question.level}</p>
                <p className="text-3xl">{question.score} คะแนน</p>
                <p className="text-3xl">{question.time} วินาที</p>
                <Divider>ข้อมูลผู้เล่น</Divider>
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


          <div className="pt-8 text-center">
            <Button color="info" size="lg" startIcon={<BsIcon.BsQuestion />} onClick={() => { setRulesModal(!rulesModal) }}>คำชี้แจงการใช้ระบบแข่งขัน</Button>
          </div>
          <Modal open={rulesModal} onClickBackdrop={() => { setRulesModal(!rulesModal) }}>
            <Button size="sm" color="ghost" shape="circle" className="absolute right-4 top-4" onClick={() => { setRulesModal(!rulesModal) }}>
              x
            </Button>
            <Modal.Header>
              <p className="text-xl">คำชี้แจงการใช้ระบบแข่งขัน</p>
            </Modal.Header>
            <Modal.Body>
              <ul>
                <li>1. เขียนคำตอบที่ต้องการส่งด้วยปากกาหรือนิ้วลงบนพื้นที่ที่เตรียมไว้ให้ <br />
                  <u>แนะนำ</u>ให้เขียนคำตอบเป็น medical term รูปแบบเต็มให้ละเอียดที่สุดและถูกต้องที่สุดเพื่อคะแนนที่ดีที่สุดในข้อนั้นๆ ยกเว้นคำถามจะกำหนดเป็นอย่างอื่น
                </li>
                <br />
                <li>2. หากต้องการลบคำตอบที่เขียนไว้ ให้ขีดเส้นแนวนอน 1 เส้น ทับลงบนคำตอบที่ไม่ต้องการ เช่น <s>คำตอบที่ผิด</s><br />
                  คำตอบที่มีเส้นทับอยู่จะไม่พิจารณาคิดคะแนน</li>
                <br />
                <li>3. หากต้องการลบเส้นล่าสุดที่เขียนลงบนกระดาน ให้ใช้เครื่องมือย้อนกลับ (🔙) ที่มุมบนขวาของกระดานเขียน <br />
                  หากต้องการลบข้อความทั้งหมดบนกระดาน ให้ใช้เครื่องมือถังขยะ (🗑️) ที่มุมบนขวาของกระดานเขียน <br />
                  โปรดระวังว่าการลบข้อความทั้งหมด จะ<u>ไม่สามารถ</u>ใช้เครื่องมือย้อนกลับเพื่อดึงข้อความกลับมาได้
                </li>
                <br />
                <li>4. เส้นทั้งหมดบนกระดาน รวมถึงคำตอบที่ต้องการ รอยทดบนกระดาน และอิโมจิต่างๆ ยกเว้นข้อความตามข้อ 2 จะถูกนำมาพิจารณาให้คะแนนหรือหักคะแนน (ตามดุลยพินิจของกรรมการให้คะแนน)
                </li>
                <br />
                <li>5. ให้ติดตามเวลานับถอยหลังการส่งคำตอบที่อยู่บนกระดานเขียนเสมอเพื่อประโยชน์ของผู้เข้าแข่งขันเอง เมื่อเวลานับถอยหลังหมดลง ให้ยกปากกาและนิ้วออกจากกระดานเขียน<u>ทันที</u> <br />
                  หากเกิดเหตุการณ์ผิดพลาดที่เกิดจากการฝ่าฝืนคำชี้แจงข้อนี้ อาจส่งผลต่อคะแนนสอบได้
                </li>
                <br />
                <li>6. หากเกิดปัญหากับการทำข้อสอบ การส่งคำตอบ การแสดงผลคำตอบที่ไม่ถูกต้อง หรือปัญหาอื่นๆ ให้แจ้งปัญหาพร้อมชื่อทีมให้กับกรรมการคุมสอบแล้วรอการตอบกลับ <br />
                  กรรมการคุมสอบจะ<u>ไม่ตอบปัญหา</u>ที่เกี่ยวข้องกับตัวคำถาม โจทย์ และคำตอบของคำถาม แต่จะมีเวลาให้ผู้เข้าแข่งขันสอบถามได้ หลังจากการเฉลยและตรวจคำตอบในแต่ละข้อ
                </li>
                <br />
                <li>7. ทีมงานแข่งขันตอบปัญหางานวันมหิดลฯ ขอให้ผู้เข้าแข่งขันทุกคนโชคดีกับการสอบนะครับ/นะคะ ❤️
                </li>
                <br />
              </ul>
            </Modal.Body>
          </Modal>

        </div>
      </div>
    );
}

WaitingMC.propTypes = {
  connection: PropTypes.bool.isRequired,
  CURRENT_QUESTION: PropTypes.string.isRequired
}

export default WaitingMC;
