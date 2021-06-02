import React , {useState, useEffect} from "react";
import "./Tasks.css"
import { FiClock } from "react-icons/fi";
import { FaCheck } from "react-icons/fa";
import { GoX } from "react-icons/go";
import axios from 'axios';


const ListOfTaskDone = () => {

    const [tasks, setTasks] = useState("");
    const [searchText, setSearchText] = useState("");

    const config = {
        headers: {
            "Authorization": "Bearer " + localStorage.getItem('token')
        }
    };
    
    useEffect(() => {
            fetch(`http://localhost:8080/calendar/user/${localStorage.getItem("id")}`, config)
            .then((res) => res.json())
            .then((data) => setTasks(data.filter(task => (task.done === true))))
                
    }, )


    const isDone = (id) => {
        console.log('put')
        axios.get(`http://localhost:8080/calendar/task/done/${id}` ,config);
    }

    const isNotDone = (id) => {
        axios.delete(`http://localhost:8080/calendar/task/delete/${id}` ,config);
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
                {tasks ? search(tasks).map( task =>
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
                ) : <p className='loading-task' >Brak zadań</p>}   
            </div>
        </div>
    );
};

export default ListOfTaskDone;