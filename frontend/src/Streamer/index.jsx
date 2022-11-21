import React from 'react';
import { Routes, Route} from "react-router-dom"
import StreamerWelcome from './AwaitQuestion';
import QuestionSelect from './QuestionSelect';
import StreamerWaitMc from './QuestionSelected';
import StreamerCountdown from './Countdown'
import StreamerSocket from './socket';
import ShowAnswer from './ShowAnswer';

function StreamerRoutes() {
    const [connected, currentStatus, currentQuestion, questionOwner, timeLeft, loop] = StreamerSocket()

    if(currentStatus === "WELCOME") return (<StreamerWelcome/>)
    if(currentStatus=== "SELECT_QUESTION") return (<QuestionSelect QUESTION_OWNER={questionOwner}/>)
    if(currentStatus=== "AWAIT_MC") return (<StreamerWaitMc CURRENT_QUESTION={currentQuestion}/>)
    if(currentStatus=== "START_QUESTION") return (<StreamerCountdown TIME_LEFT={timeLeft} CURRENT_QUESTION={currentQuestion}/>)
    if(currentStatus=== "AWAIT_SCORE") return (<ShowAnswer QUESTION_OWNER={questionOwner} CURRENT_QUESTION={currentQuestion}/>)
    return (<></>
        
    );
}

export default StreamerRoutes