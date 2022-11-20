import React, {useEffect, useState} from 'react';
import { Alert, Button, Card, Divider, Modal } from 'react-daisyui';
import { SocketConnection } from '../Helpers/AdminMainPage';
import { FetchAllQuestion } from './helper';

function AdminMainPage(props) {
    const [isConnected, gameStatus, questionOwner, loop, emitValue, emitQuestionValue, resetGameState, fetchGameState, emitLoop, emitStart, emitQuestion] = SocketConnection()
    const [currentButton, setCurrentButton] = useState()
    const [currentLoop, setCurrentLoop] = useState()
    const [allQuestion, setAllQuestion] = useState()
    const [open, setOpen] = useState(false)

    useEffect(()=>{
        FetchAllQuestion().then((data)=>{setAllQuestion(data)})
    }, [])

    return (
        <div>
            <p className="text-2xl text-center">MAHIDOL QUIZ GAMEMASTER DESK</p>
            <div className="grid grid-cols-4">
                <div className="col-span-1">
                    <Card>
                        <Card.Body>
                            <Alert innerClassName="text-xs">สถานะปัจจุบัน: {gameStatus}</Alert>
                            <Card.Title>เลือกสถานะเกม</Card.Title>
                            <Button color="primary" size="sm" variant="outline" onClick={()=>{emitValue({role: "admin", CURRENT_GAME_STATUS: "WELCOME"})}}>ปิดแผ่นป้าย</Button>
                            <Button color="primary" size="sm" variant="outline" onClick={()=>{emitValue({role: "admin", CURRENT_GAME_STATUS: "SELECT_QUESTION"})}}>เลือกแผ่นป้าย</Button>
                            <Button color="primary" size="sm" variant="outline" onClick={()=>{emitValue({role: "admin", CURRENT_GAME_STATUS: "AWAIT_MC"})}}>รอปล่อยคำถาม</Button>
                            <Button color="error" size="sm" variant="outline" onClick={()=>{emitValue({role: "admin", CURRENT_GAME_STATUS: "START_QUESTION"}); emitStart();}}>ปล่อยคำถาม</Button>
                            <Button color="warning" size="sm" variant="outline" onClick={()=>{emitValue({role: "admin", CURRENT_GAME_STATUS: "AWAIT_SCORE"})}}>รอคะแนน</Button>
                            <Button color="warning" size="sm" variant="outline" onClick={()=>{emitValue({role: "admin", CURRENT_GAME_STATUS: "REVEAL_SCORE"})}}>เฉลยคะแนน</Button>
                            <Button color="warning" size="sm" variant="outline" onClick={()=>{fetchGameState()}}>เรียกสถานะจากฐานข้อมูล</Button>
                            <Divider>คำสั่งพิเศษ</Divider>
                            <Button color="warning" size="sm" variant="outline" onClick={()=>{resetGameState()}}>รีเซ็ตสถานะเกม</Button>
                            <Button color="warning" size="sm" variant="outline" onClick={()=>{setOpen(true)}}>ยิงคำถาม</Button>
                        </Card.Body>
                    </Card>
                </div>
                <div className="col-span-1">
                    <Card>
                        <Card.Body>
                            <Alert innerClassName="text-xs">เจ้าของปัจจุบัน: {questionOwner}</Alert>
                            <Card.Title>เลือกทีมเจ้าของคำถาม</Card.Title>
                            <Button color="warning" name="semi01" size="sm" variant={currentButton === "semi01"? "" : "outline"} onClick={(e)=>{setCurrentButton(e.target.name); emitQuestionValue({role: "admin", CURRENT_QUESTION_OWNER: "semi01"})}}>SEMI 01</Button>
                            <Button color="warning" name="semi02" size="sm" variant={currentButton === "semi02"? "" : "outline"} onClick={(e)=>{setCurrentButton(e.target.name); emitQuestionValue({role: "admin", CURRENT_QUESTION_OWNER: "semi02"})}}>SEMI 02</Button>
                            <Button color="warning" name="semi03" size="sm" variant={currentButton === "semi03"? "" : "outline"} onClick={(e)=>{setCurrentButton(e.target.name); emitQuestionValue({role: "admin", CURRENT_QUESTION_OWNER: "semi03"})}}>SEMI 03</Button>
                            <Button color="warning" name="semi04" size="sm" variant={currentButton === "semi04"? "" : "outline"} onClick={(e)=>{setCurrentButton(e.target.name); emitQuestionValue({role: "admin", CURRENT_QUESTION_OWNER: "semi04"})}}>SEMI 04</Button>
                            <Button color="warning" name="semi05" size="sm" variant={currentButton === "semi05"? "" : "outline"} onClick={(e)=>{setCurrentButton(e.target.name); emitQuestionValue({role: "admin", CURRENT_QUESTION_OWNER: "semi05"})}}>SEMI 05</Button>
                            <Button color="warning" name="semi06" size="sm" variant={currentButton === "semi06"? "" : "outline"} onClick={(e)=>{setCurrentButton(e.target.name); emitQuestionValue({role: "admin", CURRENT_QUESTION_OWNER: "semi06"})}}>SEMI 06</Button>
                            <Button color="warning" name="semi07" size="sm" variant={currentButton === "semi07"? "" : "outline"} onClick={(e)=>{setCurrentButton(e.target.name); emitQuestionValue({role: "admin", CURRENT_QUESTION_OWNER: "semi07"})}}>SEMI 07</Button>
                            <Button color="warning" name="semi08" size="sm" variant={currentButton === "semi08"? "" : "outline"} onClick={(e)=>{setCurrentButton(e.target.name); emitQuestionValue({role: "admin", CURRENT_QUESTION_OWNER: "semi08"})}}>SEMI 08</Button>
                        </Card.Body>
                    </Card>
                </div>
                <div className="col-span-1">
                    <Card>
                        <Card.Body>
                            <Alert innerClassName="text-xs">Loop ปัจจุบัน: {loop}</Alert>
                            <Card.Title>เลือกลูป</Card.Title>
                            <Button color="warning" name="A" size="sm" variant={currentLoop === "A"? "" : "outline"} onClick={(e)=>{setCurrentLoop(e.target.name); emitLoop({role: "admin", SELECT_LOOP: "A"})}}>A</Button>
                            <Button color="warning" name="B" size="sm" variant={currentLoop === "B"? "" : "outline"} onClick={(e)=>{setCurrentLoop(e.target.name); emitLoop({role: "admin", SELECT_LOOP: "B"})}}>B</Button>
                            <Button color="warning" name="C" size="sm" variant={currentLoop === "C"? "" : "outline"} onClick={(e)=>{setCurrentLoop(e.target.name); emitLoop({role: "admin", SELECT_LOOP: "C"})}}>C</Button>
                        </Card.Body>
                    </Card>
                </div>
                <div className="col-span-1">
                </div>
            </div>

            <Modal open={open} onClickBackdrop={()=>{setOpen(false)}}>
                <Button size="sm" color="error" onClick={()=>{setOpen(false)}}>ปิด</Button>
                <Modal.Header>เลือกคำถามที่ต้องการยิง</Modal.Header>
                <Modal.Body className="grid gap-2">
                    {
                        allQuestion && allQuestion.map((data)=>{
                           return <Button color="warning" size="sm" variant="outline" className="w-full" onClick={()=>{emitQuestion(data.id)}}>{data.id}</Button>
                        })
                    }
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default AdminMainPage;