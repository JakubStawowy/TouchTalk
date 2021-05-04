package pl.team.touchtalk.dto;

import java.io.Serializable;

public class UserTransferObject implements Serializable, Receiver {

    private final Long id;
    private final String username;
    private final String surname;
    private final String phone;
    private final String image;

    public UserTransferObject(Long id, String username, String surname, String phone, String image) {
        this.id = id;
        this.username = username;
        this.surname = surname;
        this.phone = phone;
        this.image = image;
    }

    public Long getId() {
        return id;
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
