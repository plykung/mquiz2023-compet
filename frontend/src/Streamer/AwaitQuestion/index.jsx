import React from 'react';
import logo from "../../../src/assets/logo_color.png"

function StreamerWelcome() {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-white-blur">
            <img src={logo} className="animate__animated animate__fadeIn"></img>
            <div className="p-5 rounded-lg bg-white shadow-2xl animate__animated animate__fadeIn"><p className="text-4xl"><strong>ยินดีต้อนรับสู่การแข่งขันตอบปัญหามหิดล ประจำปีการศึกษา 2565</strong></p><br/><p className="text-2xl text-center">ห้องบรรยายชั้น 2 อาคารเรียนรวม<br/>คณะแพทยศาสตร์ มหาวิทยาลัยเชียงใหม่<br/>3-4 ธันวาคม 2565</p>
            </div>
        </div>
    );
}

export default StreamerWelcome;