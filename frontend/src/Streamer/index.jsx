import React from 'react';
import { Routes, Route} from "react-router-dom"
import StreamerWelcome from './AwaitQuestion';
import QuestionSelect from './QuestionSelect';
import StreamerSocket from './socket';

function StreamerRoutes() {
    const [connected, currentStatus, currentQuestion, questionOwner, timeLeft, loop] = StreamerSocket()

    if(currentStatus === "WELCOME") return (<StreamerWelcome/>)
    if(currentStatus=== "SELECT_QUESTION") return (<QuestionSelect QUESTION_OWNER={questionOwner}/>)
    return (<></>
        
    );
}

export default StreamerRoutes