package pl.team.touchtalk.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.sql.Date;
import java.util.Set;

@Entity
@Table(name = "calendar")
public class Calendar implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "id_user", referencedColumnName = "id")
    private User idUser;

    @NotNull
    @Column(name = "created_at")
    private Date createdAt;


    @JsonIgnore
    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(
            name = "calendar_task",
            joinColumns = {@JoinColumn(name = "id_calendar")},
            inverseJoinColumns = {@JoinColumn(name = "id_task")}
    )
    private Set<Task> TaskMany;

    public Calendar(@NotEmpty User idUser) {
        this.idUser = idUser;

    }


    public Calendar() {
    }

    @PrePersist
    public void setCalendar() {
        this.createdAt = new Date(System.currentTimeMillis());

    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getIdUser() {
        return idUser;
    }

    public void setIdUser(User idUser) { this.idUser=idUser; }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }

    public Date getCreatedAt() {
        return createdAt;
    }



}
