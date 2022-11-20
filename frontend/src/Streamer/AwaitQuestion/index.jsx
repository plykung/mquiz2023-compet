import React from 'react';
import StreamerSocket from '../socket';
import logo from "../../../src/assets/logo_color.png"

function StreamerWelcome() {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-white-blur">
            <img src={logo}></img>
            <div className="p-5 rounded-lg bg-white shadow-2xl"><p className="text-4xl"><strong>ยินดีต้อนรับสู่การแข่งขันตอบปัญหามหิดล ประจำปีการศึกษา 2565</strong></p><br/><p className="text-2xl text-center">ห้องบรรยายชั้น 2 อาคารเรียนรวม<br/>คณะแพทยศาสตร์ มหาวิทยาลัยเชียงใหม่<br/>3-4 ธันวาคม 2565</p></div>
        </div>
    );
}

export default StreamerWelcome;