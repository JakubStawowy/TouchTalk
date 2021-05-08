import React from "react";
import { useHistory } from "react-router-dom";
import "./Tasks.css"
import { Route, Link, Switch} from "react-router-dom";
import TaskForm from "./TaskForm";
import Task from "./Task"

const ListOfTask = () => {

    return (
            <div className='tasks-list'>
                <Task />
                <Task />
                <Task />
                <Task />
                <Task />
                <Task />
                <Task />
                <Task />
                <Task />
                <Task />
                <Task />
                <Task />
                <Task />
                
            </div>
    );
};

export default ListOfTask;