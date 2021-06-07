import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails } from "../../actions/getUserDetails.js";
import axios from "axios";
import "./accountSettings.css";

import {useHistory} from "react-router";

const AccountSettings = () => {
    const [userInput, setUserInput] = useState({
        username: "",
        surname: "",
        phone: "",
        image: ""
    });

    const [avatar, setAvatar] = useState("EMPTY");
    const dispatch = useDispatch();
    const history = useHistory();
    const auth = useSelector((state) => state.auth);
    const url ="https://api.cloudinary.com/v1_1/dstba8obh/image/upload";
    const [avatarImage,setAvatarImage]=useState("")

    const changeImage = async (file) =>{

        setAvatarImage(file.target.files[0]);
        const formData = new FormData();
            formData.append("file", file.target.files[0]);
            formData.append("upload_preset","idwiunwv")

                await axios.post(url, formData).then(response => {
                    console.log(response);
                    setAvatar(response.data.secure_url);
                    setUserInput({
                        ...userInput, image: response.data.secure_url
                    })
                });

    }
   

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

        console.log(userInput);
    }, []);

    const handleInput = (e) => {
        setUserInput({ ...userInput, [e.target.name]: e.target.value });
    };
    const config = {
        headers: {
            "Authorization": "Bearer " + localStorage.getItem('token')
        }
    };
    const urlServer = `http://localhost:8080/api/users/${localStorage.getItem(
        "id"
    )}/edit`;
    const handleSubmit = async (e) => {
        e.preventDefault();
        //await uploadAvatar();

        await axios.put(urlServer, userInput, config);
        getUserDetails().then((res) => {
            dispatch({type: "USERDATA_UPDATE", payload: res});
        });
    };

    //     await axios.put(url, userInput,config).catch((error) => handleNetworkError(error, () => history.replace("/")));
    //     getUserDetails().then((res) =>
    //         dispatch({ type: "USERDATA_UPDATE", payload: res }).catch((error) => handleNetworkError(error, () => history.replace("/")))
    //     ).catch((error) => handleNetworkError(error, () => history.replace("/")));
    // };

    const defaultAvatar = "https://www.irishrsa.ie/wp-content/uploads/2017/03/default-avatar.png";
    return (
        <div className='settings'>
            <div>
                <p className='settings-title'>ustawienia</p>
            </div>

            <div className='accountSettings-wrapper'>
                <div className='accountSettings-avatar'>
                    {userInput.image!==""?(
                        console.log(userInput.image),

                            <img
                                className='accountSettings-img'
                                src={userInput.image}
                                alt='ZdjecieProfilowe'
                            />
                    ):
                        <img
                        className='accountSettings-img'
                        src={defaultAvatar}
                         alt='ZdjecieProfilowe'
                         />
                         }
                    <input type='file' id='file' onChange={changeImage} />
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