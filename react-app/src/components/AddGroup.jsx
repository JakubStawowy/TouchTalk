import {Button, Paper, TextField} from "@material-ui/core";
import React, {useState} from "react";
import axios from "axios";
import Modal from '@material-ui/core/Modal';
import SaveIcon from '@material-ui/icons/Save';
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

const AddGroup = ({open, handleClose}) => {
    const history = useHistory();
    let idActualUser = parseInt(localStorage.getItem("id"));
    const [group, setGroup] = useState({
        groupName: "",
        password: generatePassword(10),
        creatorId: idActualUser
    });

    function generatePassword(length) {
        let result           = [];
        let characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let charactersLength = characters.length;
        for ( let i = 0; i < length; i++ ) {
            result.push(characters.charAt(Math.floor(Math.random() *
                charactersLength)));
        }
        return result.join('');
    }


    const createGroup = () => {

        console.log(group);
        const config = {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }
        api.post('/add', group, config).then(data => {
            setGroup({
                groupName: "",
                password: "",
                creatorId: 0
            }
        )}).catch((error) => handleNetworkError(error, () => history.replace("/")));


    }

    return(

        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"

        >
            {/*ciało modala*/}
            <div className="modal_style">
                <h2 id="simple-modal-title">Podaj nazwę grupy</h2>
                <TextField className="modal_textField"
                    label="Podaj nazwę grupy"
                    onChange={e => setGroup({
                        ...group,
                        groupName: e.target.value,
                    })}
                    value={group.groupName}
                    onKeyPress={event => {
                        if (event.key === 'Enter') {
                            createGroup();
                        }
                    }}
                    required/>
                    <div className="button_exit_container">
                        <Button variant="contained" color="secondary" onClick={handleClose}>Zamknij</Button>
                        <Button variant="contained" color="primary" onClick={createGroup}>Stwórz</Button>
                    </div>

            </div>
        </Modal>
    );
}

export default AddGroup;
