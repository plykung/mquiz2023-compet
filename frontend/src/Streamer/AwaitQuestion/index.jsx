import React from 'react';
import logo from "../../../src/assets/logo_color.png"

function StreamerWelcome() {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-white-blur">
            <img src={logo} className="animate__animated animate__fadeIn pb-10"></img>
            <div className="p-5 rounded-lg bg-white text-gray-700 shadow-2xl animate__animated animate__fadeIn">
                <p className="text-4xl">
                    <strong>ยินดีต้อนรับสู่การแข่งขันตอบปัญหามหิดล ประจำปีการศึกษา 2566</strong>
                </p>
                <br />
                <p className="text-2xl text-center">ณ หอประชุมมหาวิทยาลัยเชียงใหม่<br />23-24 กันยายน 2566</p>
            </div>
        </div>
    );
}

export default StreamerWelcome;