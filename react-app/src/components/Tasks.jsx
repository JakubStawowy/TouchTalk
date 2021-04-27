import React from "react";
import { useHistory } from "react-router-dom";
import "./Tasks.css"
import { Route, Link, Switch, NavLink} from "react-router-dom";
import TaskForm from "./TaskForm";
import Task from "./Task"
import ListOfTask from "./ListOfTask";
import { withTheme } from "@material-ui/core";
import { PinDropSharp } from "@material-ui/icons";


const Tasks = () => {

    return (
        <section className='task-section'>
            <div className='task-header'>
                <div className='task-info'>
                    <div >
                        Lista zadań
                    </div>
                    <div>
                        data
                    </div>
                </div>
                <div className='button-input'>
                    <ul className= 'task-button-panel'>
                        <li ><NavLink activeClassName="activebutton" className='overlap' to='/tasks/all'>Wszystkie zadania</NavLink></li>
                        <li><NavLink activeClassName="activebutton" className='overlap' to='/tasks/active'>Aktywne zadania</NavLink></li>
                        <li ><NavLink activeClassName="activebutton" className='overlap' to='/tasks/closed'>Zamknięte zadania</NavLink></li>
                        <li ><NavLink activeClassName="activebutton" className='overlap' to='/tasks/add'>Dodaj zadanie</NavLink></li>
                    </ul>
                    <div>
                        <input className='find-task' placeholder='Wyszukaj...'></input>
                    </div>
                </div>
            </div>

            <Switch>
                <Route exec path='/tasks/all' component={ListOfTask }/>
                <Route path='/tasks/active' component={ListOfTask }/>
                <Route path='/tasks/closed' component={ListOfTask }/>
                <Route path='/tasks/add' component={ TaskForm }/>
            </Switch>
            
        </section>
    );
};

export default Tasks;