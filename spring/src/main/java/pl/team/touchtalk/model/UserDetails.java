package pl.team.touchtalk.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.springframework.lang.Nullable;

import javax.persistence.*;
import javax.transaction.Transactional;
import javax.validation.constraints.NotEmpty;

/*
 * UserDetails POJO
 *
 * @Author Jakub Stawowy
 * @Version 1.0
 * @Since 2021-04-06
 * */
@Entity
@Table(name = "user_details")
public class UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotEmpty
    private String username;
    @NotEmpty
    private String surname;

    private String phone;

    @JsonIgnore
    private String image;

    @JsonIgnore
    @OneToOne(mappedBy = "userDetails")
    private User user;

    /*
    * constructor
    *
    * @Param username
    * @Param surname
    * @Param phone
    * @Param image
    * */
    public UserDetails(@NotEmpty String username, @NotEmpty String surname, String phone,  String image) {
        this.username = username;
        this.surname = surname;
        this.phone = phone;
        this.image = image;
    }

    public UserDetails() {
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }

    public String getUsername() {        return username;
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

    @Override
    public String toString() {
        return "UserDetails{" +
                "id=" + id +
                ", username='" + username + '\'' +
                ", surname='" + surname + '\'' +
                ", phone='" + phone + '\'' +
                ", image='" + image + '\'' +
                ", user=" + user +
                '}';
    }
}
