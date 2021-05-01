import React, {useState} from "react";
import {Paper, TextField} from "@material-ui/core";
import axios from "axios";

/*
 * @Functionalities
 * @Author Bartosz Szlęzak
 * @Author Grzegorz Szydło
 * @Author Paweł Szydło
 * @Author Łukasz Stolarz
 * @Version 2.0
 * @Since 2021-04-30
 * */

const api = axios.create({
    baseURL: `http://localhost:8080`
})

const JoinGroup = () => {

    const [code, setCode] = useState("");
    let idActualUser = parseInt(localStorage.getItem("id"));

    const joinGroup = async () => {
        await api.post(`/joingroup?id=${idActualUser}&code=${code}`)
    }

    return (
        <Paper>
            <p>Dołącz do grupy</p>
            <TextField
                label="Podaj kod dostępu"
                onChange={e => setCode(e.target.value)}
                value={code}
                onKeyPress={event => {
                    if (event.key === 'Enter') {
                        joinGroup().then(r => {console.log(r)});
                        setCode("");
                    }
                }}
                required/>
        </Paper>
    )
};

export default JoinGroup;