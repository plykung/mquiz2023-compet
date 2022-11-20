import React, { useEffect, useState } from 'react';
import { Alert, Badge, Button, Card } from 'react-daisyui';
import * as BsIcon from 'react-icons/bs';
import { FetchQuestionData, FetchUserAnswer, timeFormat, UpdateScore, } from './helper';
import { SocketConnection } from './socket';

function ProfessorChecking(props) {
    const [isConnected, gameStatus, questionOwner, loop, currentQuestionSelect, countdownUntil, ] = SocketConnection()
    const [question, setQuestion] = useState(false)
    const [answers, setAnswers] = useState(false)
    const [isOwnerWrong, setIsOwnerWrong] = useState(false)
    
    useEffect(()=>{
        if(currentQuestionSelect) {
            fetchQuestionData(currentQuestionSelect)
        }
    }, [currentQuestionSelect])
    
    useEffect(()=>{
        if(!countdownUntil && currentQuestionSelect){
            fetchUserAnswer(currentQuestionSelect)
        }
    },[countdownUntil, currentQuestionSelect])

    const fetchQuestionData = async (q_id) =>{
        try{
           let q = await FetchQuestionData(q_id)
           console.log(q)
           setQuestion(q)
        }catch(err){
           console.log(err)
        }
    }

    const fetchUserAnswer = async (q_id) =>{
        console.log(q_id)
        try{
            let data = await FetchUserAnswer(q_id)
            setAnswers(data)
        }catch(err){
            console.log(err)
        }
    }

    const submitScore = async (user_id, score) => {
        await UpdateScore(user_id, score, currentQuestionSelect)
    }

    return (
        <div className="p-3">
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
             answers && question && answers.map((data)=>{
                    return <Card key={data.createdDateTime} className="w-full h-full shadow-xl mt-2">
                        <Card.Body>
                            <Card.Title>{data.owner_name} {data.user_id === questionOwner ? (<Badge size="lg" color="warning">ทีมเจ้าของคำถาม</Badge>) : null}</Card.Title>
                            <img src={data.answer}></img>
                            <div className="flex justify-around">
                            <Button size="md" disabled={data.user_id !== questionOwner ? isOwnerWrong ? false : true : false} onClick={data.user_id === questionOwner ? ()=>{submitScore(data.user_id,question.score)} : ()=>{submitScore(data.user_id,question.score/2)}} variant="success" startIcon={<BsIcon.BsCheckLg/>}>{data.user_id === questionOwner ? question.score : question.score/2} คะแนน</Button>
                            <Button size="md" disabled={data.user_id !== questionOwner ? isOwnerWrong ? false : true : false} onClick={()=>{submitScore(data.user_id,0); data.user_id === questionOwner ? setIsOwnerWrong(true) : null}} variant="error" startIcon={<BsIcon.BsXLg/>}>0 คะแนน</Button>
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

export default ProfessorChecking;