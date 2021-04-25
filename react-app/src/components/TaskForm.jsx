import React from "react";
import "./Tasks.css"


const TaskForm = () => {
   
    return (
        //TODO
        <form className='add-task-form'>
            <input placeholder='tytul'></input>
            <input placeholder='opis'></input>
            <input type='date'></input>
            <button>Dodaj zadanie</button>
        </form>
        
    );
};

export default TaskForm;