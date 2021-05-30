import React , {useState, useEffect, useHistory} from "react";
import "./Tasks.css"
import { FiClock } from "react-icons/fi";
import { FaCheck } from "react-icons/fa";
import { GoX } from "react-icons/go";
import axios from 'axios';


const ListOfTask = (data) => {
    console.log(data.text);
    const [tasks, setTasks] = useState(data.data); //nie ustawia mi tego wcale, caly czas jest to samo 
    const [searchText, setSearchText] = useState("");

    console.log(searchText,"tekst")

    const config = {
        headers: {
            "Authorization": "Bearer " + localStorage.getItem('token')
        }
    };

    const isDone = (id) => {
        console.log(id,"to zrobione")
        axios.put(`http://localhost:8080/calendar/task/done/${id}` ,config);
    }

    const isNotDone = (id) => {
        console.log(id,"to usun")
        //axios.delete(`http://localhost:8080/calendar/task/delete/${id}` ,config);
    }

    function search(tasks) {
        const taskKey = ["name"];

        let filtr = tasks.filter((task) =>
            taskKey.some((key) => task[key].toString().toLowerCase().indexOf(searchText.toString()) > -1));
        return filtr;
    }

    return (
        <div className='tasks-list'>

            <div >
                <input className='find-task' id="search"
                            placeholder="Szukaj..."
                            onChange={(e) => setSearchText(e.target.value)}
                            autoComplete="off"/>
            </div>

            <div className='taski'>
            
                {search(tasks).map( task =>
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
                                <button type='reset' className='accept' onClick={isDone.bind(task.id,task.id)}><FaCheck/></button>
                                <button className='discard' onClick={isNotDone.bind(task.id,task.id)}><GoX /></button>
                            </div>
                        </div>
                    </div>
                )}   
            </div>
        </div>
    );
};

export default ListOfTask;