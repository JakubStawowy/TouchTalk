import React from "react";
import "./Tasks.css"
import { FiClock } from "react-icons/fi";
import { FaCheck } from "react-icons/fa";
import { GoX } from "react-icons/go";
import axios from 'axios';


const ListOfTask = (data) => {
    
    const isDone = () => {
        console.log("to zrobione")
    }

    const isNotDone = () => {
        console.log("to nie zrobione")

    }

    return (
        <div className='tasks-list'>
            {data.data.map( task => 
            <div className={task.done ? "task1" : "task2"} key={task.id}>
                <div className='col1'>
                    <div>
                        {task.name}
                    </div>
                    <div>
                        {task.createdAt}
                    </div>
                </div>

                <div className='col2'>
                    {task.data_task}
                </div>

                <div className='col3'>
                    <div className='time-to-left'>
                        <FiClock />{task.finish}
                    </div>
                    <div className='accept-discard-buttons'>
                        <button className='accept' onClick={isDone}><FaCheck/></button>
                        <button className='discard' onClick={isNotDone}><GoX /></button>
                    </div>
                </div>
                
            </div>
        )}   
        </div>
    );
};

export default ListOfTask;