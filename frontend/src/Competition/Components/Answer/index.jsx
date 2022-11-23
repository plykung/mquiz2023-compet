import React, { useEffect, useRef, useState } from "react";
import CanvasDraw from "react-canvas-draw";
import { Alert, Button, Divider, Modal } from "react-daisyui";
import { GiConsoleController, GiPointySword } from "react-icons/gi"
import { FetchItems, FetchQuestionData, LogData, timeFormat, ItemBeingUsed, GetHint } from "./helper";
import * as BsIcon from "react-icons/bs"
import * as FcIcon from "react-icons/fc"

function AnswerQuestion({ COUNTDOWN_UNTIL, CURRENT_QUESTION }) {
  const userCanva = useRef(null);
  const user = JSON.parse(localStorage.getItem("user"))
  const [question, setQuestion] = useState();
  const [itemModal, setItemModal] = useState(false)
  const [item, setItem] = useState();
  const [hint, setHint] = useState();

  useEffect(() => {
    if (CURRENT_QUESTION) {
      fetchQuestionData(CURRENT_QUESTION);
    }
  }, [CURRENT_QUESTION, COUNTDOWN_UNTIL]);

  useEffect(()=>{
    if(user.subrole==="final") fetchItem();
  }, [])

  const getHint = async () =>{
    let result = await GetHint(CURRENT_QUESTION)
    console.log(result.data)
    setHint(result.data)
  }

  useEffect(()=>{
    if(item){
      if(filterUsed("hint")){
        getHint()
      }
    }
  }, [item])

  const fetchQuestionData = async (q_id) => {
    let query = await FetchQuestionData(q_id);
    setQuestion(query);
  };

  const fetchItem = async () => {
    let query = await FetchItems(user.user_id)
    setItem(query)
  }

  const itemExecute = async (item_id) =>{
    try{
      let query = await ItemBeingUsed(user.user_id, item_id, CURRENT_QUESTION)
      fetchItem();
    }catch(err){
    cobsole.log(err)
    }
  }

  const filterUsed = (item_id) =>{
    if(item) {
   let result = item.filter((data)=>{return data.item_id === item_id})
   return result[0].item_used
  }

  const filterEffect = () =>{
    if(item){
      let result = item.filter((data)=>{return data.item_used === 1})
      return result
    }
  }
  }
  if (CURRENT_QUESTION && COUNTDOWN_UNTIL)
    return (
      <>
      <div className="m-3 h-"> 
      <div className="my-2">
      <Alert innerClassName="flex justify-between">
          <div className="flex gap-2 items-center">
          <BsIcon.BsPerson/> {user.owner_name}
          {user.subrole==="final" && <Button color="warning" size = "md" startIcon={<GiPointySword/>} onClick={()=>{fetchItem(); setItemModal(true)}}>ไอเทม</Button> }
          </div>
          <p>{timeFormat(COUNTDOWN_UNTIL)}</p>
          <div className="flex gap-2 items-center">
          <Button size = "md" onClick={()=>{userCanva.current.undo()}}><BsIcon.BsArrowCounterclockwise/></Button>
          <Button color="error" size = "md" onClick={()=>{userCanva.current.eraseAll()}}><BsIcon.BsTrash/></Button>
          </div>
      </Alert>
      </div>
      <CanvasDraw
      style={{width: "100%"}}
              ref={userCanva}
              lazyRadius={0}
              brushRadius={5}
              canvasHeight={700}
              onChange={() => {
                LogData(user.user_id, CURRENT_QUESTION, userCanva.current.getDataURL());
              }}
            />
      </div>
      { user.subrole === "final" && <> <Modal open={itemModal} onClickBackdrop={()=>{setItemModal(!itemModal)}}>
              <Modal.Header>
                ไอเทมของทีม {user.owner_name}
              </Modal.Header>
              <Modal.Body>
                <div className="grid grid-cols-4 gap-2">
          <Button color="tertiary" disabled = {filterUsed("double")} size="lg" value="double" onClick={()=>{itemExecute("double")} }><p className="text-2xl">Double</p></Button>
          <Button color="tertiary" disabled = {filterUsed("extra_chance")} size="lg" value="extra_chance" onClick={()=>{itemExecute("extra_chance")} }><p className="text-2xl">Extra Chance</p></Button>
          <Button color="tertiary" disabled = {filterUsed("hint")} size="lg" value="hint" onClick={()=>{itemExecute("hint")} }><p className="text-2xl">Hint</p></Button>
          <Button color="tertiary" disabled = {filterUsed("streak")} size="lg" value="streak" onClick={()=>{itemExecute("streak")} }><p className="text-2xl">Streak</p></Button>
                </div>
              </Modal.Body>
      <Divider>ไอเทมที่มีผลในข้อนี้</Divider>
      {
        item?.map((data)=>{
          return <>{data.item_used && data.executed_at === CURRENT_QUESTION ? <>- {data.detail}<br/></> : null}</>
        })
      }
      {
        filterUsed("hint") ? <> {
          <>
          <Divider>คำใบ้</Divider>
           {hint?.hint_type === "photo" ? <><img src={hint?.hint_link}></img> <p>{hint?.hint_detail}</p></> : <>{hint?.hint_detail}</>}
           </>
        }</> : null
      }
      </Modal>
      </>}
      </>
    );
}

export default AnswerQuestion;
