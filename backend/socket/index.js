const express = require("express");
const router = express.Router();
const io = require("socket.io")();
const socketApi = { io: io };
const db = require("../config/db")
const dayjs = require("dayjs")
const utc = require('dayjs/plugin/utc')
dayjs.extend(utc)

var CURRENT_GAME_STATUS = "WELCOME";
var CURRENT_QUESTION_OWNER = null;
var CURRENT_QUESTION_SELECTED = null;
var CURRENT_LOOP = null;
var TIME_LEFT = 0;
var interval

io.on("connection", (socket) => {
  // SOCKET IS CONNECTED
  console.log(socket.id);
  //EMIT INITIAL STATE
  io.emit("CURRENT_GAME_STATUS", CURRENT_GAME_STATUS);
  io.emit("CURRENT_QUESTION_OWNER", CURRENT_QUESTION_OWNER);
  io.emit("CURRENT_QUESTION_SELECTED", CURRENT_QUESTION_SELECTED);
  io.emit("CURRENT_LOOP", CURRENT_LOOP);

  //RESET STATES
  socket.on("RESET_ALL_STATES", async () => {
    CURRENT_GAME_STATUS = "WELCOME";
    CURRENT_QUESTION_OWNER = null;
    CURRENT_QUESTION_SELECTED = null;
    CURRENT_LOOP = null;
    clearInterval(interval)
    try {
      await db.query("UPDATE system_variables SET value = ?", [null])
      io.emit("CURRENT_GAME_STATUS", CURRENT_GAME_STATUS);
      io.emit("CURRENT_QUESTION_OWNER", CURRENT_QUESTION_OWNER);
      io.emit("CURRENT_QUESTION_SELECTED", CURRENT_QUESTION_SELECTED);
      io.emit("CURRENT_LOOP", CURRENT_LOOP);
    } catch (error) {
      console.log(error)
      io.emit("CURRENT_GAME_STATUS", "ERROR AT socket.on(reset_all_states) ON /socket/index.js")
    }
  });
  //HANDLE GAME STATUS
  socket.on("CURRENT_GAME_STATUS", (data) => {
    CURRENT_GAME_STATUS = data.CURRENT_GAME_STATUS;
    io.emit("CURRENT_GAME_STATUS", CURRENT_GAME_STATUS);
  });
  //HANDLE QUESTION OWNER
  socket.on("CURRENT_QUESTION_OWNER", async (data) => {
    CURRENT_QUESTION_OWNER = data.CURRENT_QUESTION_OWNER;
    try {
      await db.query("UPDATE system_variables SET value = ? WHERE id = ?", [data.CURRENT_QUESTION_OWNER, "CURRENT_TEAM"])
      io.emit("CURRENT_QUESTION_OWNER", CURRENT_QUESTION_OWNER);
    } catch (error) {
      console.log(error)
      io.emit("CURRENT_GAME_STATUS", "ERROR AT socket.on(current_question_owner) ON /socket/index.js")
    }
  });
  //
  socket.on("SELECT_LOOP", async (data) => {
    CURRENT_LOOP = data.SELECT_LOOP
    try {
      await db.query("UPDATE system_variables SET value = ? WHERE id = ?", [data.SELECT_LOOP, "LOOP"])
      io.emit("CURRENT_LOOP", CURRENT_LOOP)
    } catch (error) {
      io.emit("CURRENT_GAME_STATUS", "ERROR AT socket.on(select_loop) ON /socket/index.js")
    }
  })
  //HANDLE USER SELECT QUESTION
  socket.on("SELECT_QUESTION", async (data) => {
    CURRENT_QUESTION_OWNER = data.user_id
    CURRENT_QUESTION_SELECTED = data.question_id
    try {
      await db.query("UPDATE system_variables SET value = ? WHERE id = ?", [data.question_id, "CURRENT_QUESTION"])
      await db.query("UPDATE questions SET isSelected = 1 WHERE id = ?", [data.question_id])
      io.emit("CURRENT_GAME_STATUS", "AWAIT_MC")
      io.emit("CURRENT_QUESTION_OWNER", data.user_id)
      io.emit("CURRENT_QUESTION_SELECTED", data.question_id)
    } catch (error) {
      console.log(error)
      io.emit("CURRENT_GAME_STATUS", "ERROR AT socket.on(select_question) ON /socket/index.js")
    }
    io.emit("CURRENT_QUESTION_SELECTED", data.question_id)
  })
  //HANDLE CURRENT STATUS EMITTION
  socket.on("EMIT_CURRENT_FROM_DB", async () => {
    try {
      let query = await db.query("SELECT * FROM system_variables")
      CURRENT_QUESTION_SELECTED = query[1].value
      CURRENT_QUESTION_OWNER = query[2].value
      CURRENT_LOOP = query[0].value

      console.log(`คำถามปัจจุบัน: ${CURRENT_QUESTION_SELECTED}`)
      console.log(`เจ้าของคำถาม: ${CURRENT_QUESTION_OWNER}`)
    } catch (err) {
      console.log(err)
    }
    io.emit("CURRENT_GAME_STATUS", CURRENT_GAME_STATUS);
    io.emit("CURRENT_QUESTION_OWNER", CURRENT_QUESTION_OWNER);
    io.emit("CURRENT_QUESTION_SELECTED", CURRENT_QUESTION_SELECTED);
  })

  //HANDLE START AND TIME LEFT
  socket.on("START_QUESTION", async () => {
    try {
      let question_data = await db.query("SELECT id, time FROM questions WHERE id = ? LIMIT 1", [CURRENT_QUESTION_SELECTED])
      let time = parseInt(question_data[0].time)
      TIME_LEFT = time
      io.emit("COUNTDOWN_UNTIL", TIME_LEFT)
      interval = setInterval(async () => {
        TIME_LEFT = TIME_LEFT - 1
        console.log(`TIME LEFT: ${TIME_LEFT}`)
        io.emit("COUNTDOWN_UNTIL", TIME_LEFT)
        if (TIME_LEFT <= 0) {
          clearInterval(interval)
          setTimeout(async () => {
            CURRENT_GAME_STATUS = "AWAIT_SCORE"
            let getLatest = await db.query("SELECT user_id, answer, question_id, createdDateTime FROM answer_log t1 INNER JOIN (SELECT MAX(createdDateTime) as maxTime FROM answer_log GROUP BY answer_log.user_id) t2 ON t1.createdDateTime = t2.maxTime  WHERE question_id = ?", [CURRENT_QUESTION_SELECTED])
            getLatest.forEach((row) => {
              db.query("INSERT INTO answer (user_id, answer, question_id, score) VALUES (?,?,?,0)", [row.user_id, row.answer, row.question_id])
            })
            io.emit("CURRENT_GAME_STATUS", CURRENT_GAME_STATUS)
          }, 5000)
        }
      }, 1000)
    } catch (err) {
      console.log(err)
    }
  })
  socket.on("FORCE_EMIT_QUESTION", async (data) => {
    CURRENT_QUESTION_SELECTED = data.question_id
    await db.query("UPDATE system_variables SET value = ? WHERE id = ?", [data.question_id, "CURRENT_QUESTION"])
    io.emit("CURRENT_GAME_STATUS", CURRENT_GAME_STATUS);
    io.emit("CURRENT_QUESTION_OWNER", CURRENT_QUESTION_OWNER);
    io.emit("CURRENT_QUESTION_SELECTED", CURRENT_QUESTION_SELECTED);
    io.emit("CURRENT_LOOP", CURRENT_LOOP);
  })
});

router.get("/", (req, res) => {
  res.status(200).json({ status: "success" });
});

module.exports = { socketApi, router };
