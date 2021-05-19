package pl.team.touchtalk.dto;

import pl.team.touchtalk.model.User;

import javax.persistence.Lob;
import java.io.Serializable;

public class UserTransferObject implements Serializable, Receiver {

    private final Long id;
    private final String username;
    private final String surname;
    private final String phone;
    @Lob
    private final String image;

    public UserTransferObject(User user) {
        this.id = user.getId();
        this.username = user.getUserDetails().getName();
        this.surname = user.getUserDetails().getSurname();
        this.phone = user.getUserDetails().getPhone();
        this.image = user.getUserDetails().getImage();
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
