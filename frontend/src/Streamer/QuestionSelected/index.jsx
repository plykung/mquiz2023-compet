import React, { useState, useEffect } from "react";
import { FetchQuestionData } from "./helper";
import logo from "../../assets/logo_color.png"
import { PropTypes } from "prop-types"

function StreamerWaitMc({ CURRENT_QUESTION }) {
  const [question, setQuestion] = useState()

  useEffect(() => {
    if (CURRENT_QUESTION) fetchQuestion(CURRENT_QUESTION)
  }, [CURRENT_QUESTION])

  const fetchQuestion = async (question) => {
    try {
      let data = await FetchQuestionData(question)
      setQuestion(data)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white-blur">
      <img src={logo} className="animate__animated animate__fadeIn pb-10"></img>
      <div className="p-5 rounded-lg bg-white text-gray-700  shadow-2xl text-center text-5xl opacity-70 animate__animated animate__fadeIn" style={{ animationDelay: "500ms" }}>
        {question && <span>{question.type} {question.level && "ระดับ"} {question.level}<br /><strong>{question.score} คะแนน</strong> | {question.time} วินาที</span>}
        <br />
      </div>
    </div>
  );
}

StreamerWaitMc.propTypes = {
  CURRENT_QUESTION: PropTypes.string.isRequired
}

export default StreamerWaitMc;
