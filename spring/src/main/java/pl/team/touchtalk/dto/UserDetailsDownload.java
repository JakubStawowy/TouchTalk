package pl.team.touchtalk.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.Lob;
import javax.validation.constraints.NotEmpty;

public class UserDetailsDownload {

    private Long id;
    private String username;
    private String surname;
    private String phone;
    private String image;


    public UserDetailsDownload(Long id, String username, String surname, String phone, String image) {
        this.id = id;
        this.username = username;
        this.surname = surname;
        this.phone = phone;
        this.image = image;
    }

    public UserDetailsDownload() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getSurname() {
        return surname;
    }

    public void setSurname(String surname) {
        this.surname = surname;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }
}
