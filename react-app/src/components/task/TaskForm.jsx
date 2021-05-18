import React from "react";
import "./Tasks.css"
import { useFormik } from "formik";
import {useHistory} from "react-router-dom";
import axios from 'axios';

const TaskForm = () => {

    const history = useHistory()
    const lz = (i) => {
        return `${i}`.padStart(2, "0");
    }

    const now = new Date();
    const createdAt = `${now.getFullYear()}-${lz((now.getMonth()+1))}-${lz(now.getDate())}`;

    const formik = useFormik({
        initialValues: {
            name: "",
            data_task: "",
            start: "",
            finish: "",
            done: "",
            createdAt: "",
            id_user: "",
        },
        onSubmit: (values, {resetForm}) =>  {

            const form = {
                name: values.name,
                data_task: values.data_task,
                start: values.start,
                finish: values.finish,
                done: false,
                createdAt: createdAt,
                // id_user: ${localStorage.getItem("id")},
                id_user: 1,
            };

            const res = axios.post(`http://localhost:8080/calendar`, JSON.stringify(form), {headers: {'Content-Type': 'application/json', "Authorization": "Bearer " + localStorage.getItem('token') }})
            console.log(res);
            resetForm();
            history.push('/tasks/active')
        },
    });

    return (
        <form className='add-task-form' onSubmit={formik.handleSubmit}>
            <label className='addTask-label2'>DODAJ ZADANIE</label>
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
                id='data_task'
                className='input-task'
                name='data_task'
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