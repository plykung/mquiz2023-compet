import React, { useState } from "react";
import { Button, Card, Input } from "react-daisyui";
import { useNavigate } from "react-router-dom";
import { handleLogin } from "./helper";

function LoginPage(props) {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate()

  const submitHandler = async (e) => {
    e.preventDefault()
    setIsLoading(true);
    try{
      let data = await handleLogin(e);
      localStorage.setItem("user", JSON.stringify(data.data))
    }catch(err){
      setIsLoading(false)
      alert(err.reason)
    }
  };

  return (
    <>
      <div className="flex h-screen">
        <div className="m-auto">
          <Card className="w-96 shadow-lg">
            <Card.Body>
              <Card.Title>เข้าสู่ระบบ</Card.Title>
              <form
                onSubmit={(e) => {
                  submitHandler(e);
                }}
              >
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text">ชื่อผู้ใช้</span>
                  </label>
                  <Input name="username" className="w-full"></Input>
                </div>
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text">รหัสผ่าน</span>
                  </label>
                  <Input name="password" className="w-full"></Input>
                </div>
                <Card.Actions className="justify-end">
                  <Button color="primary" loading={isLoading} type="submit">
                    Login
                  </Button>
                </Card.Actions>
              </form>
            </Card.Body>
          </Card>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
