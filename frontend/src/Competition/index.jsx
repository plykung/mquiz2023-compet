import React, { } from "react";
import WaitingScreen from "./Components/WaitingScreen";
import SocketConnection from "./socket";
import QuestionSelector from "./Components/SelectQuestion";
import WaitingMC from "./Components/WaitingMC";
import AnswerQuestion from "./Components/Answer";
import AwaitScore from "./Components/AwaitScore";
import ScoreSummary from "./Components/ScoreSummary";
import PlayResult from "./Components/Result";

function Competition() {
  const [
    isConnected,
    CURRENT_GAME_STATUS,
    CURRENT_QUESTION_OWNER,
    CURRENT_QUESTION_SELECTED,
    COUNTDOWN_UNTIL,
    emitSelectQuestion,
  ] = SocketConnection();

  if (CURRENT_GAME_STATUS === "WELCOME")
    return <WaitingScreen connection={isConnected} />;
  if (CURRENT_GAME_STATUS === "SELECT_QUESTION")
    return (
      <QuestionSelector
        socket={emitSelectQuestion}
        CURRENT_QUESTION_OWNER={CURRENT_QUESTION_OWNER}
      />
    );
  if (CURRENT_GAME_STATUS === "AWAIT_MC")
    if (CURRENT_QUESTION_SELECTED) {
      return (
        <WaitingMC
          connection={isConnected}
          CURRENT_QUESTION={CURRENT_QUESTION_SELECTED}
        />
      );
    } else {
      return <WaitingScreen connection={isConnected} />;
    }
  if (CURRENT_GAME_STATUS === "START_QUESTION")
    return (
      <AnswerQuestion
        COUNTDOWN_UNTIL={COUNTDOWN_UNTIL}
        CURRENT_QUESTION={CURRENT_QUESTION_SELECTED}
      />
    );
  if (CURRENT_GAME_STATUS === "AWAIT_SCORE") return <AwaitScore />;
  if (CURRENT_GAME_STATUS === "SHOW_SUMMARY") return <PlayResult CURRENT_QUESTION={CURRENT_QUESTION_SELECTED} />;
  if (CURRENT_GAME_STATUS === "REVEAL_SCORE") return <ScoreSummary />;
  return <></>;
}

export default Competition;
