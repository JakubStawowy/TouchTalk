import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails } from "../../actions/getUserDetails.js";
import axios from "axios";
import "./accountSettings.css";
const AccountSettings = () => {
    const [userInput, setUserInput] = useState("");
    const [avatar, setAvatar] = useState("");
    const dispatch = useDispatch();

    const auth = useSelector((state) => state.auth);

    const uploadAvatar = async (e) => {
        const file = e.target.files[0];
        const base64 = await convertBase64(file);
        setAvatar(base64);
        setUserInput({
            username: `${userInput.username}`,
            surname: `${userInput.surname}`,
            phone: `${userInput.phone}`,
            image: base64
        })

    };
    const convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);

            fileReader.onload = () => {
                resolve(fileReader.result);
            };
            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    };

    useEffect(() => {
        getUserDetails().then((res) =>
            setUserInput({
                username: res.data.username,
                surname: res.data.surname,
                phone: res.data.phone,
                image: res.data.image,
            })
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

        const userDetails = {
            name: `${userInput.username}`,
            surname: `${userInput.surname}`,
            phone: `${userInput.phone}`,
            image: avatar,
        };
        const url = `http://localhost:8080/api/users/${localStorage.getItem(
            "id"
        )}/edit`;

        await axios.put(url, userDetails,config);
        getUserDetails().then((res) =>
            dispatch({ type: "USERDATA_UPDATE", payload: res.data })
        );
    };

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