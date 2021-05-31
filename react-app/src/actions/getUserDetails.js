import axios from "axios";

export const getUserDetails = async () => {
    const url = "http://localhost:8080/api/users/" + localStorage.getItem("id");
    const config = {
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
    }


    let user = await axios.get(url, config);
    let image = await axios.get("http://localhost:8080/api/users/imageUser/" + localStorage.getItem("id"), config)
    user.data.image = image.data;

    return user.data;
}