package pl.team.touchtalk.model;

/*
 * Message POJO
 *
 * @Author Sebastian Pokrywka,

 * @Version 1.0
 * @Since 2021-04-22
 * */
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

    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;


    @NotNull
    @Column(name = "created_at")
    private Date createdAt;


    @JsonIgnore
    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(
            name = "calendar_task",
            joinColumns = {@JoinColumn(name = "calendar_id")},
            inverseJoinColumns = {@JoinColumn(name = "task_id")}
    )
    private Set<Task> TaskMany;


    public Object Calendar(@NotEmpty User idUser) {
        this.idUser = idUser;

        Set<Task> tasks;

    public Calendar(User user)
        this.user = user;

    public Calendar() {
        }

        @PrePersist
        public void setCalendar () {
            this.createdAt = new Date(System.currentTimeMillis());

        }

        public Long getId () {
            return id;
        }

        public void setId (Long id){
            this.id = id;
        }


        public User getIdUser () {
            return idUser;
        }

        public void setIdUser (User idUser){
            this.idUser = idUser;
        }

        public void setCreatedAt(Date createdAt){
            this.createdAt = createdAt;

            public User getUser() {
                return user;
            }

            public void setUser (User user){
                this.user = user;
            }

            public Date getCreatedAt() {
                return createdAt;
            }

            public void setCreatedAt(Date createdAt){
                this.createdAt = createdAt;
            }

            public Set<Task> getTasks() {
                return tasks;
            }

            public void setTasks(Set <Task> tasks) {
                this.tasks = tasks;
            }
        }

        private void Calendar() {
        }
    }

    private void Calendar() {
    }
