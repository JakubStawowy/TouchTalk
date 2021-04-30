package pl.team.touchtalk.entities;


import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/*
* Group POJO
*
* @Author Sebastian Pokrywka
* @Version 1.0
* @Since 2021-04-06
* */

@Entity
@Table(name = "groups")
public class Group implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotEmpty
    @Column(unique = true)
    private String name;

    @NotNull
    private String code;

    @ManyToMany
    @JoinTable(
        name = "user_in_groups",
        joinColumns = @JoinColumn(name = "group_id"),
        inverseJoinColumns = @JoinColumn(name = "user_id")
    )
    private Set<User> users = new HashSet<>();

    @JsonIgnore
    @OneToMany(mappedBy = "group")
    private Set<GroupMessage> groupMessagesSent;

//    @JsonIgnore
//    @OneToMany(mappedBy = "group")
//    private Set<Message> messagesReceived;

    /*
    * constructor
    *
    * @Param name - group name
    * @Param code - group code used to find join group
    * */
    public Group(@NotEmpty String name, @NotNull String code) {
        this.name = name;
        this.code = code;
        
    }

    public Group() {

    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName(){
        return name;
    }
    public void setName(String name){
        this.name=name;
    }
    
    public String getCode(){
        return code;
    }
    public void setCode(String code){
        this.code=code;
    }

    public Set<User> getUsers() {
        return users;
    }

    public void setUsers(Set<User> users) {
        this.users = users;
    }

    public void addNewUser(User user){
        Set<User> tmp = getUsers();
        tmp.add(user);
        setUsers(tmp);
    }

    @Override
    public String toString() {
        return "Group{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", code='" + code + '\'' +
                ", users=" + users +
                ", groupMessagesSent=" + groupMessagesSent +
                '}';
    }
}