package pl.team.touchtalk.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.sql.Date;
import java.util.HashSet;
import java.util.Set;

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

   @ManyToMany
    @JoinTable(
        name = "messages_to_group",
        joinColumns = @JoinColumn(name = "group_id"),
        inverseJoinColumns = @JoinColumn(name = "message_id")
    )
    private Set<Message> message = new HashSet<>();

     public Group(@NotEmpty String name, @NotNull String code) {
        this.name = name;
        this.code = code;
        
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
}