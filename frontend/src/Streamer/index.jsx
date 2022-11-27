import React from 'react';
import StreamerWelcome from './AwaitQuestion';
import QuestionSelect from './QuestionSelect';
import StreamerWaitMc from './QuestionSelected';
import StreamerCountdown from './Countdown'
import StreamerSocket from './socket';
import ShowAnswer from './ShowAnswer';
import StreamerScore from './Score';

function StreamerRoutes() {
    const [, currentStatus, currentQuestion, questionOwner, timeLeft, ] = StreamerSocket()
    if(currentStatus === "WELCOME") return (<StreamerWelcome/>)
    if(currentStatus=== "SELECT_QUESTION") return (<QuestionSelect QUESTION_OWNER={questionOwner}/>)
    if(currentStatus=== "AWAIT_MC") return (<StreamerWaitMc CURRENT_QUESTION={currentQuestion}/>)
    if(currentStatus=== "START_QUESTION") return (<StreamerCountdown TIME_LEFT={timeLeft} CURRENT_QUESTION={currentQuestion}/>)
    if(currentStatus=== "AWAIT_SCORE" || currentStatus === "SHOW_SUMMARY") return (<ShowAnswer QUESTION_OWNER={questionOwner} CURRENT_QUESTION={currentQuestion} CURRENT_STATUS={currentStatus} />)
    if(currentStatus=== "REVEAL_SCORE") return (<StreamerScore/>)
    return (<></>
        
    );
}

export default StreamerRoutes