import React, {useState, useEffect} from "react";
import "./Tasks.css"
import { Route, Switch, NavLink} from "react-router-dom";
import TaskForm from "./TaskForm";
import ListOfTask from "./ListOfTask";
import ListOfTaskActive from "./ListOfTaskActive";
import ListOfTaskDone from "./ListOfTaskDone";

const Tasks = () => {
  const now = new Date();

  return (
      <section className='task-section'>
        <div className='task-header'>
          <div className='button-input'>
            <ul className='task-button-panel'>
              <li><NavLink activeClassName="activebutton" className='overlap' to='/tasks/all'>Wszystkie
                zadania</NavLink></li>
              <li><NavLink activeClassName="activebutton" className='overlap' to='/tasks/active'>Aktywne
                zadania</NavLink></li>
              <li><NavLink activeClassName="activebutton" className='overlap' to='/tasks/closed'>Zamknięte
                zadania</NavLink></li>
              <li><NavLink activeClassName="activebutton" className='overlap' to='/tasks/add'>Dodaj zadanie</NavLink>
              </li>
            </ul>
            <div>
              <div className='actual-date'>
                {now.getDate()}.{now.getMonth() + 1}.{now.getFullYear()}
              </div>
            </div>
          </div>
        </div>
        <Switch>
          <Route exec path='/tasks/all'>
            <ListOfTask/>
          </Route>
          <Route exec path='/tasks/active'>
            <ListOfTaskActive/>
          </Route>
          <Route exec path='/tasks/closed'>
            <ListOfTaskDone/>
          </Route>
          <Route path='/tasks/add' component={TaskForm}/>
        </Switch>

      </section>
  );
};

export default Tasks;