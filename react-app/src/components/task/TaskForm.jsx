import React from "react";
import "./Tasks.css"
import { useFormik } from "formik";
import axios from 'axios';

const TaskForm = () => {
   
    const formik = useFormik({
        initialValues: {
          name: "",
          date_task: "",
          start: "",
          finish: "",
          done: "",
          id_user: "", 
        },
        onSubmit: (values, {resetForm}) =>  {

          const form = {
                name: values.name,
                date_task: values.date_task,
                start: values.start,
                finish: values.finish,
                done: false,
                // id_user: {$idusera},//TODO tutaj dodac id usera
          };
          const xd = JSON.stringify(form)
          console.log(xd)
        //   const res = axios.post(`http://localhost:8080/api/films/add`, xd, {headers: {'Content-Type': 'application/json', 'Host' : 'http://localhost:3000'  
        //   , 'Content-Length' : '1000' }})
        //   console.log(res);
          resetForm();
        },
      });

    return (
        //TODO
        <form className='add-task-form' onSubmit={formik.handleSubmit}>
            <label className='addTask-label'>TYTUŁ ZADANIA</label>
            <input
            id='name-task'
            className='input-task'
            name='name'
            placeholder='Tytuł zadania'
            onChange={formik.handleChange}
            />
            <label className='addTask-label'>OPIS ZADANIA</label>
            <input
            id='date_task'
            className='input-task'
            name='date_task'
            placeholder='Opis'
            onChange={formik.handleChange}
            />
            <label className='addTask-label'>DATA ROZPOCZĘCIA</label>
            <input
            id='start'
            className='input-task'
            type="date"
            name='start'
            onChange={formik.handleChange}
            />
            <label className='addTask-label'>DATA ZAKOŃCZENIA</label>
            <input
            id='finish'
            className='input-task'
            type='date'
            name='finish'
            onChange={formik.handleChange}
            />
            <button className='task-btn' type='submit' >Dodaj zadanie</button>
        </form>
        
    );
};

export default TaskForm;