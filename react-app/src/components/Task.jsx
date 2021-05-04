import React from "react";
import "./Tasks.css"
import { FiClock } from "react-icons/fi";
import {FaCheck } from "react-icons/fa";
import {GoX } from "react-icons/go";


const Task = () => {

    return (
        <div className='task'>
            <div className='col1'>
                <div>
                    tytul
                </div>
                <div>
                    data 
                </div>
            </div>
            <div className='col2'>
                opis
            </div>
            <div className='col3'>
                <div className='time-to-left'>
                    <FiClock />Data dodania
                </div>
                <div className='accept-discard-buttons'>
                    <button className='accept'><FaCheck/></button>
                    <button className='discard'><GoX /></button>
                </div>
            </div>
        </div>
    );
};

export default Task;















