import React, {useState, useEffect} from "react";
import "./Tasks.css"
import { Route, Switch, NavLink} from "react-router-dom";
import TaskForm from "./TaskForm";
import ListOfTask from "./ListOfTask";


const Tasks = () => {

    const now = new Date();
    const [tasks, setTasks] = useState("");
    const [taskDone, setTasksDone] = useState("");
    const [taskActive, setTasksActive] = useState("");

    const config = {
        headers: {
            "Authorization": "Bearer " + localStorage.getItem('token')
        }
    };
    useEffect(() => {
            fetch(`http://localhost:8080/calendar/user/${localStorage.getItem("id")}`, config)
            .then((res) => res.json())
            .then((data) => setTasks(data))
    }, []);

    useEffect(() => {
            fetch(`http://localhost:8080/calendar/user/${localStorage.getItem("id")}`, config)
            .then((res) => res.json())
            .then((data) => setTasksDone(data.filter(task => task.done === true)))
    }, [])

    useEffect(() => {
            fetch(`http://localhost:8080/calendar/user/${localStorage.getItem("id")}`, config)
            .then((res) => res.json())
            .then((data) => setTasksActive(data.filter(task => task.done === false)))
    }, [])

    return (
        <section className='task-section'>
            <div className='task-header'>
                <div className='task-info'>
                    <div >
                        Lista zadań
                    </div>
                    {/* <div className='actual-date'>
                        {now.getDate()}.{now.getMonth()+1}.{now.getFullYear()}
                    </div> */}
                </div>
                <div className='button-input'>
                    <ul className= 'task-button-panel'>
                        <li ><NavLink activeClassName="activebutton" className='overlap' to='/tasks/all'>Wszystkie zadania</NavLink></li>
                        <li><NavLink activeClassName="activebutton" className='overlap' to='/tasks/active'>Aktywne zadania</NavLink></li>
                        <li ><NavLink activeClassName="activebutton" className='overlap' to='/tasks/closed'>Zamknięte zadania</NavLink></li>
                        <li ><NavLink activeClassName="activebutton" className='overlap' to='/tasks/add'>Dodaj zadanie</NavLink></li>
                    </ul>
                    <div>
                        {/* <input className='find-task' placeholder='Wyszukaj...'></input> */}
                        <div className='actual-date'>
                        {now.getDate()}.{now.getMonth()+1}.{now.getFullYear()}
                    </div>
                    </div>
                </div>
            </div>

            <Switch>
                <Route exec path='/tasks/all'>
                    {tasks ? <ListOfTask data={tasks}/> : <p className='loading-task'>Ładowanie...</p>}
                </Route>
                <Route exec path='/tasks/active'>
                    {tasks ? <ListOfTask data={taskActive}/> : <p className='loading-task'>Ładowanie...</p>}
                </Route>
                <Route exec path='/tasks/closed'>
                    {tasks ? <ListOfTask data={taskDone}/> : <p className='loading-task'>Ładowanie...</p>}
                </Route>
                <Route path='/tasks/add' component={ TaskForm }/>
            </Switch>
            
        </section>
    );
};

export default Tasks;