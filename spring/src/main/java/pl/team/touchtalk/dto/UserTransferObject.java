package pl.team.touchtalk.dto;

import java.io.Serializable;

public class UserTransferObject implements Serializable {

    private final String username;
    private final String surname;
    private final String phone;
    private final String image;

    public UserTransferObject(String username, String surname, String phone, String image) {
        this.username = username;
        this.surname = surname;
        this.phone = phone;
        this.image = image;
    }

    public String getUsername() {
        return username;
    }

    public String getSurname() {
        return surname;
    }

    public String getPhone() {
        return phone;
    }

    public String getImage() {
        return image;
    }
}
