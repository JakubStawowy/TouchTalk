package pl.team.touchtalk.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import pl.team.touchtalk.enums.UserRoles;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.sql.Date;
import java.util.HashSet;
import java.util.Set;

/*
 * User POJO
 *
 * @Author Jakub Stawowy
 * @Version 1.0
 * @Since 2021-04-06
 * */
@Entity
@Table(name = "users")
public class User implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotEmpty
    @Column(unique = true)
    private String email;

    @NotEmpty
    private String password;

    @NotEmpty
    private String salt;

    @NotNull
    private Boolean logged;

    @NotNull
    @Enumerated(EnumType.STRING)
    private UserRoles role;

    @NotNull
    @Column(name = "created_at")
    private Date createdAt;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "user_details_id", referencedColumnName = "id")
    private UserDetails userDetails;

    @JsonIgnore
    @OneToMany(mappedBy = "sender")
    private Set<Message> messagesSent;

    @JsonIgnore
    @OneToMany(mappedBy = "receiver")
    private Set<Message> messagesReceived;

    @ManyToMany(mappedBy = "users")
    private Set<Group> groups;

    /*
    * constructor
    *
    * @Param email
    * @Param password
    * @Param userDetails
    * */
    public User(@NotEmpty String email, @NotEmpty String password, UserDetails userDetails, String salt) {
        this.email = email;
        this.password = password;
        this.userDetails = userDetails;
        this.salt = salt;
        messagesReceived = new HashSet<>();
        messagesSent = new HashSet<>();
    }

    public User() {
    }

    @PrePersist
    public void setUser() {
        this.createdAt = new Date(System.currentTimeMillis());
        this.logged = false;
        this.role = UserRoles.ROLE_USER;
    }

    public UserRoles getRole() {
        return role;
    }

    public void setRole(UserRoles role) {
        this.role = role;
    }

    public String getSalt() {
        return salt;
    }

    public void setSalt(String salt) {
        this.salt = salt;
    }

    public Set<Group> getGroups() {
        return groups;
    }

    public void setGroups(Set<Group> groups) {
        this.groups = groups;
    }

    public Set<Message> getMessagesReceived() {
        return messagesReceived;
    }

    public void setMessagesReceived(Set<Message> messagesReceived) {
        this.messagesReceived = messagesReceived;
    }

    public Boolean getLogged() {
        return logged;
    }

    public void setLogged(Boolean logged) {
        this.logged = logged;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public UserDetails getUserDetails() {
        return userDetails;
    }

    public void setUserDetails(UserDetails userDetails) {
        this.userDetails = userDetails;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Set<Message> getMessagesSent() {
        return messagesSent;
    }

    public void setMessagesSent(Set<Message> messagesSent) {
        this.messagesSent = messagesSent;
    }
}
