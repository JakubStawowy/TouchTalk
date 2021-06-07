import React, {useState} from "react";
import {Button, Paper, TextField} from "@material-ui/core";
import axios from "axios";
import Modal from "@material-ui/core/Modal";
import {useHistory} from "react-router-dom";
import {handleNetworkError} from "../actions/handleNetworkError";
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

const JoinGroup = ({open, handleClose}) => {
    const history = useHistory();
    const [code, setCode] = useState("");
    let idActualUser = parseInt(localStorage.getItem("id"));

    const joinGroup = async () => {

        const config = {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }

        await api.post(`/join?id=${idActualUser}&code=${code}`, null, config)
            .catch((error) => handleNetworkError(error, () => history.replace("/")));

        setCode("");
        window.location.reload();
    }

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"

        >
            <div className="modal_style">
                <h2 id="simple-modal-title">Podaj klucz dostępu</h2>
                <TextField className="modal_textField"
                    label="Podaj kod dostępu"
                    onChange={e => setCode(e.target.value)}
                    value={code}
                    onKeyPress={event => {
                        if (event.key === 'Enter') {
                            joinGroup();
                        }
                    }}
                    required/>
                <div className="button_exit_container">
                    <Button variant="contained" color="secondary" onClick={handleClose}>Zamknij</Button>
                    <Button variant="contained" color="primary" onClick={joinGroup}>Dołącz</Button>
                </div>
            </div>
        </Modal>
    )
};

export default JoinGroup;