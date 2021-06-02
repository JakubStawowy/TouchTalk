import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails } from "../../actions/getUserDetails.js";
import axios from "axios";
import "./accountSettings.css";
import {handleNetworkError} from "../../actions/handleNetworkError";
import {useHistory} from "react-router";
const AccountSettings = () => {
    const [userInput, setUserInput] = useState({
        username: "",
        surname: "",
        phone: "",
        image: ""
    });

    const [avatar, setAvatar] = useState("");
    const dispatch = useDispatch();
    const history = useHistory();
    const auth = useSelector((state) => state.auth);

    const uploadAvatar = async (e) => {
        const file = e.target.files[0];
        

        const resp = (file) => new Promise((resolve, reject) => {
            let reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        })

        const dataURL = await resp(file);


        setAvatar(dataURL);
        setUserInput({
            ...userInput, image: "Zmiana"
        })

    };


    useEffect(() => {
        getUserDetails().then((res) => {
                setUserInput({
                    username: res.username,
                    surname: res.surname,
                    phone: res.phone,
                    image: res.image

                })
            }
        );
    }, []);

    const handleInput = (e) => {
        setUserInput({ ...userInput, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const config = {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem('token')
            }
        };

        const url = `http://localhost:8080/api/users/${localStorage.getItem(
            "id"
        )}/edit`;

        console.log(userInput);

        await axios.put(url, userInput,config);
        getUserDetails().then((res) =>
            dispatch({ type: "USERDATA_UPDATE", payload: res })
        );
    };

    //     await axios.put(url, userInput,config).catch((error) => handleNetworkError(error, () => history.replace("/")));
    //     getUserDetails().then((res) =>
    //         dispatch({ type: "USERDATA_UPDATE", payload: res }).catch((error) => handleNetworkError(error, () => history.replace("/")))
    //     ).catch((error) => handleNetworkError(error, () => history.replace("/")));
    // };

    const defaultAvatar = avatar ? avatar : "https://www.irishrsa.ie/wp-content/uploads/2017/03/default-avatar.png";
    return (
        <div className='settings'>
            <div>
                <p className='settings-title'>ustawienia</p>
            </div>

            <div className='accountSettings-wrapper'>
                <div className='accountSettings-avatar'>
                    <img
                        className='accountSettings-img'
                        src={userInput.image ? userInput.image : defaultAvatar}
                        alt='xd'
                    />
                    <input type='file' id='file' onChange={uploadAvatar} />
                    <label className='inputimg-label' htmlFor='file'>
                        Wybierz
                    </label>
                </div>
                <form
                    className='accountSettings-form'
                    action='submit'
                    onSubmit={handleSubmit}
                >
                    <label className='accountSettings-label'>IMIE</label>
                    <input
                        name='username'
                        className='input-account'
                        placeholder='imie'
                        value={userInput.username}
                        onChange={handleInput}
                        type='text'
                    />
                    <label className='accountSettings-label'>NAZWISKO</label>
                    <input
                        name='surname'
                        className='input-account'
                        placeholder='nazwisko'
                        value={userInput.surname}
                        onChange={handleInput}
                        type='text'
                    />
                    <label className='accountSettings-label'>TELEFON</label>
                    <input
                        name='phone'
                        className='input-account'
                        placeholder='telefon'
                        value={userInput.phone}
                        onChange={handleInput}
                        type='text'
                    />
                    <button className='accountSettings-btn' type='submit'>
                        Zapisz
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AccountSettings;