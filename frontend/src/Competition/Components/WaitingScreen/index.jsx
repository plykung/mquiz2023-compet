import React, {useState, useEffect} from "react";
import { Card } from "react-daisyui";
import { useNavigate } from "react-router-dom";
import * as BsIcon from "react-icons/bs"
import { PropTypes } from "prop-types";

function WaitingScreen({connection}) {
  const [user, setUser] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("user")) return navigate("/");
    if (localStorage.getItem("user"))
      return setUser(JSON.parse(localStorage.getItem("user")));
  }, []);

  return (
    <div className="grid h-screen place-items-center">
      <div>
        <div className="text-center m-2">
          <p className="text-xl">รอคำสั่งจาก GAME MASTER</p>
          <p className="text-md">โครงการตอบปัญหามหิดล ประจำปีการศึกษา 2565</p>
          <Card className="shadow-xl">
            <Card.Body>
              <p>ทีม {user && user.owner_name}</p>
              <p className={connection === true ? "flex items-center justify-center text-success" : "flex items-center justify-center text-error"}>{connection === true ? <><BsIcon.BsCheck2Circle/>เชื่อมต่อกับระบบเกมสำเร็จ</> : <><BsIcon.BsExclamation/>ไม่สามารถติดต่อกับระบบได้ โปรดติดต่อเจ้าหน้าที่</>}</p>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
}

WaitingScreen.propTypes = {
  connection: PropTypes.bool
}

export default WaitingScreen;
