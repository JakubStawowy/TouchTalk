import React, {useState} from "react";
import {Paper, TextField} from "@material-ui/core";
import axios from "axios";
import {handleNetworkError} from "../actions/handleNetworkError";
import {useHistory} from "react-router";

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
    baseURL: `http://localhost:8080/api/groups`
})

const JoinGroup = () => {
    const history = useHistory();
    const [code, setCode] = useState("");
    let idActualUser = parseInt(localStorage.getItem("id"));
    const joinGroup = async () => {

        const config = {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }

        await api.post(`/join?id=${idActualUser}&code=${code}`, null, config).catch((error) => handleNetworkError(error, () => history.replace("/")));
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
                        joinGroup().then(() => {alert("Zostales zapisany do grupy poprawnie")}).catch((error) => alert(error));
                        setCode("");
                    }
                }}
                required/>
        </Paper>
    )
};

export default JoinGroup;