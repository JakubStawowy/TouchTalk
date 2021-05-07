import React from "react";
import "./Tasks.css"
import { Route,  Switch, NavLink} from "react-router-dom";
import TaskForm from "./TaskForm";
import ListOfTask from "./ListOfTask";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";


const Tasks = () => {

    return (

        <section className='task-section'>
            <AppBar position="static">
                <div className="navList" >
                    <div className='button-input'>
                        <ul className= 'task-button-panel'>
                            <li ><NavLink activeClassName="activebutton" className='overlap' to='/tasks/all'>Wszystkie zadania</NavLink></li>
                            <li><NavLink activeClassName="activebutton" className='overlap' to='/tasks/active'>Aktywne zadania</NavLink></li>
                            <li ><NavLink activeClassName="activebutton" className='overlap' to='/tasks/closed'>Zamknięte zadania</NavLink></li>
                            <li ><NavLink activeClassName="activebutton" className='overlap' to='/tasks/add'>Dodaj zadanie</NavLink></li>
                        </ul>
                            <input className='find-task' placeholder='Wyszukaj...'/>
                    </div>
                </div>
            </AppBar>

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