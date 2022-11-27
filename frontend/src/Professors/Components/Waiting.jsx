import React, { useEffect, useState, useRef } from 'react';
import { Alert, Badge, Button, Card, Form, Input, InputGroup } from 'react-daisyui';
import toast, {Toaster} from "react-hot-toast"
import * as BsIcon from 'react-icons/bs';
import { FetchQuestionData, FetchUserAnswer, GetUserItems, GetUserScore, timeFormat, UpdateScore, } from './helper';
import { SocketConnection } from './socket';

function ProfessorChecking() {
    const [, gameStatus, questionOwner, loop, currentQuestionSelect, countdownUntil, ] = SocketConnection()
    const [question, setQuestion] = useState(false)
    const [answers, setAnswers] = useState(false)
    const [isOwnerWrong, setIsOwnerWrong] = useState(false)
    const [itemsUsed, setItemUsed] = useState(false)
    const [streak, setStreak] = useState()
    const [score, setScore] = useState()
    const ref = useRef()
    
    useEffect(()=>{
        if(currentQuestionSelect) {
            fetchQuestionData(currentQuestionSelect)
            fetchScore()
        }
    }, [currentQuestionSelect])
    
    useEffect(()=>{
        if(gameStatus === "AWAIT_SCORE"){
            fetchUserAnswer(currentQuestionSelect)
            fetchItemUsed(currentQuestionSelect)
        }
    },[countdownUntil, currentQuestionSelect, gameStatus])

    const fetchQuestionData = async (q_id) =>{
        try{
           let q = await FetchQuestionData(q_id)
           setQuestion(q)
        }catch(err){
           console.log(err)
        }
    }

    const fetchUserAnswer = async (q_id) =>{
        try{
            let data = await FetchUserAnswer(q_id)
            setAnswers(data)
        }catch(err){
            console.log(err)
        }
    }

    const submitScore = async (user_id, score) => {
        await UpdateScore(user_id, score, currentQuestionSelect)
        toast.success(`บันทึกคะแนนของผู้ใช้ ${user_id} = ${score} คะแนน สำเร็จแล้ว`)
        fetchScore()
    }

    const fetchItemUsed = async (question_id) => {
        let data = await GetUserItems(question_id)
        setItemUsed(data.items)
        setStreak(data.streak_active)
    }

    const filterUsedItem = (user_id) => {
        if(itemsUsed){
            let filtered = itemsUsed?.filter((data)=>{return data.user_id === user_id})
            return filtered;
        }
        return null;
    }

    const fetchScore = async () =>{
        try{
            let score = await GetUserScore(currentQuestionSelect);
            setScore(score)
        }catch(err){
            alert("ERROR")
        }
    }

    const filterScore = (user_id)=>{
        let filtered = score?.filter((data)=>{return user_id === data.user_id})
        return filtered[0]?.score
    }

    return (
        <div className="p-3">
        <Toaster position="top-center" reverseOrder={false}/>
        <Alert innerClassName="flex justify-around" className="shadow-xl">
            <p>สถานะเกมปัจจุบัน : {`${gameStatus}`}</p>
            <p>ลูป : {loop}</p>
            <p>คำถามข้อปัจจุบัน : {currentQuestionSelect ? currentQuestionSelect : "NONE"}</p>
            <p>ทีมเจ้าของคำถาม : {questionOwner ? questionOwner : "NONE"}</p>
            <p>เหลือเวลาอีก {timeFormat(countdownUntil)} นาที</p>
        </Alert>
        <Card className="w-full shadow-xl mt-2">
            <Card.Body>
                <Card.Title>
                    หมวด {question && question.type} - {question && question.score} คะแนน - {question && question.time} วินาที
                </Card.Title>
                <p>{question && question.text}</p>
            </Card.Body>
        </Card>
        {gameStatus === "AWAIT_SCORE" &&
        <div className="grid grid-cols-4 gap-2">
            {
             answers && answers.map((data,index)=>{
                    return <Card key={index} className="w-full h-full shadow-xl mt-2">
                        <Card.Body>
                            <Card.Title>{data.owner_name} {data.user_id === questionOwner ? (<Badge size="lg" color="warning">ทีมเจ้าของคำถาม</Badge>) : null}</Card.Title>
                            <img src={data.answer}></img>
                            <p>คะแนนในระบบ: {filterScore(data.user_id) ? filterScore(data.user_id) : "ERROR CONTACT IT"}</p>
                            <div className="flex justify-around">
                            {
                                data.subrole === "final"
                                ? <div>
                                <p className="text-error">ACTIVE ITEMS</p> {
                                    filterUsedItem(data.user_id) && filterUsedItem(data.user_id).map((data,index)=>{
                                        return <p key={index}>- {data.item_id}</p>
                                    })
                                }{streak && streak.includes(data.user_id)? <Badge color="error">ทีมนี้มี STREAK!</Badge> : null}
                                    <Form onSubmit={(e)=>{e.preventDefault(); submitScore(data.user_id, e.target.value.value)}}>
                                    <InputGroup>
                                        <span>คะแนน</span>
                                        <Input type="text" name="value" placeholder="กรอกคะแนน" ref={ref} bordered/>
                                    <Button color="success">บันทึก</Button>
                                    </InputGroup>
                                    </Form>
                                </div>
                                :
                                <>
                            <Button size="md" disabled={data.user_id !== questionOwner ? isOwnerWrong ? false : true : false} onClick={data.user_id === questionOwner ? ()=>{submitScore(data.user_id,question.score); setIsOwnerWrong(false)} : ()=>{submitScore(data.user_id,question.score/2)}} variant="success" startIcon={<BsIcon.BsCheckLg/>}>{data.user_id === questionOwner ? question.score : question.score/2} คะแนน</Button>
                            <Button size="md" disabled={data.user_id !== questionOwner ? isOwnerWrong ? false : true : false} onClick={()=>{submitScore(data.user_id,0); data.user_id === questionOwner ? setIsOwnerWrong(true) : null}} variant="error" startIcon={<BsIcon.BsXLg/>}>0 คะแนน</Button>
                                </>
                            }
                            </div>
                        </Card.Body>
                    </Card>
                })
            }
        </div>
        }
        </div>
    );
}

export default ProfessorChecking