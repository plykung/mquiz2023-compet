import React, { useState, useEffect } from 'react';
import { FetchQuestionData } from './helper';
import { timeFormat } from '../../Competition/Components/Answer/helper';
import * as BsIcon from "react-icons/bs"
import { ENDPOINT } from '../../config';
import { PropTypes } from "prop-types"

function StreamerCountdown({ TIME_LEFT, CURRENT_QUESTION }) {
    const [question, setQuestion] = useState()

    useEffect(() => {
        if (CURRENT_QUESTION) {
            fetchQuestion(CURRENT_QUESTION)
        }
    }, [])

    const fetchQuestion = async (question) => {
        let q = await FetchQuestionData(question)
        console.log(q)
        setQuestion(q)
    }

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-white-blur text-gray-700  gap-5">
            <div className="grid grid-cols-3 p-5 rounded-lg bg-white shadow-2xl bg-opacity-100 text-center text-3xl w-9/12 animate__animated animate__fadeInUp">
                <div className="flex justify-around"><BsIcon.BsClock /> {timeFormat(TIME_LEFT)}</div>
                <div className="flex justify-around"><BsIcon.BsTrophy /> {question && question.score} คะแนน</div>
                <div className="flex justify-around"><BsIcon.BsStack /> {question && question.type}</div>
            </div>
            <div className="p-5 rounded-lg bg-white bg-opacity-90 shadow-2xl w-9/12 animate__animated animate__fadeInUp" style={{ animationDelay: "500ms" }}>
                {question && <>
                    <p className="text-2xl">{question.text.split("<br/>").map((i) => {
                        return (
                            <>
                                <span>{i}</span>
                                <br />
                            </>
                        )
                    })}</p><div className="flex justify-center pt-6">
                        {question.pics && <img src={`${ENDPOINT}/static/${question.pics}`} className='min-h-[500px] max-h-[700px]'></img>}
                    </div>
                </>}
            </div>
        </div>
    );
}

StreamerCountdown.propTypes = {
    TIME_LEFT: PropTypes.number,
    CURRENT_QUESTION: PropTypes.string
}

export default StreamerCountdown;