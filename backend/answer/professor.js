const express = require("express");
const router = express.Router();
const db = require("../config/db");

// path: /answer/score
//SCORING
router.get("/answers/:current_question", async (req,res)=>{
    let {current_question} = req.params
    console.log(req.body)
 try{
  let userAnswer = await db.query("SELECT answer.user_id, owner_name, answer, question_id, createdDateTime FROM answer JOIN users ON users.user_id = answer.user_id WHERE question_id = ?", [current_question])
  res.status(200).json({data: userAnswer})
 }catch(err){
  console.log(err)
 } 
})

router.post("/setscore", async (req,res)=>{
    let {question_id, user_id, score} = req.body
    try{
        await db.query("UPDATE answer SET score = ? WHERE user_id = ? AND question_id = ?", [score, user_id, question_id])
        res.status(200).json({status: "success"})
    }
    catch(err){
        res.status(500).json({status: "error", error: err})
        console.log(err)
    }
})

router.get("/summary", async (req,res)=>{
    try{
        let score = await db.query("SELECT users.user_id, users.owner_name, SUM(answer.score) AS score FROM answer JOIN users ON users.user_id = answer.user_id GROUP BY answer.user_id ORDER BY SUM(answer.score) DESC")
        res.status(200).json({status: "success", score: score})
    }catch(err){
        res.status(500).json({status: "error", detail: err})
    }
})

router.get("/:question_id", async (req,res)=>{
    let {question_id} = req.body
    try{
        let score = await db.query("SELECT users.user_id, users.owner_name, SUM(answer.score) AS score FROM answer JOIN users ON users.user_id = answer.user_id WHERE answer.question_id = ?", [question_id])
        res.status(200).json({status: "success", score: score})
    }catch(err){
        res.status(500).json({error: true, detail: err})
    }
})


module.exports = router;
