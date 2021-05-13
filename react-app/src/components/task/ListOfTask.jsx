import React from "react";
import "./Tasks.css"
import { FiClock } from "react-icons/fi";
import { FaCheck } from "react-icons/fa";
import { GoX } from "react-icons/go";

const ListOfTask = (data) => {

    return (
        <div className='tasks-list'>
            {data.data.map( task => 
            <div class='task'>
                <div className='col1'>
                    <div>
                        {task.name}
                    </div>
                    <div>
                        {task.createdAt}
                    </div>
                </div>

                <div className='col2'>
                    {task.date_task}
                </div>

                <div className='col3'>
                    <div className='time-to-left'>
                        <FiClock />{task.finish}
                    </div>
                    <div className='accept-discard-buttons'>
                        <button className='accept'><FaCheck/></button>
                        <button className='discard'><GoX /></button>
                    </div>
                </div>
                
            </div>
        )}   
        </div>
    );
};

export default ListOfTask;