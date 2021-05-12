package pl.team.touchtalk.model;
import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.xml.crypto.Data;
import java.io.Serializable;
import java.sql.Date;
import java.time.LocalDate;
import java.util.Set;
/*
 * User POJO
 *
 * @Author Sebastian Pokrywka
 * @Version 1.0
 * @Since 2021-04-06
 * */
@Entity
@Table(name = "task")
public class Task implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    private String name;



    @Column(name = "date_task")
    private String date_task;

    @Column(name = "start")
    private String start;

    @Column(name = "finish")
    private String finish;

    @NotNull
    private Boolean done;

    @NotNull
    @Column(name = "created_at")
    private Date createdAt;

    @JsonIgnore
    @ManyToMany(mappedBy = "tasks")
    private Set<Calendar> cal;


    public Task(Long id, @NotNull String name, String date_task, String start, String finish, @NotNull Boolean done) {
        this.id = id;
        this.name = name;
        this.date_task = date_task;
        this.start = start;
        this.finish = finish;
        this.done = done;
    }

    public Task() {

    }


    @PrePersist
    public void setTask() {
        this.createdAt = new Date(System.currentTimeMillis());

    }

   /* public Task(@NotEmpty String name, @NotEmpty String date_task, @NotEmpty Boolean done, String start, String finish) {
        this.name = name;
        this.date_task=date_task;
        this.done=done;
        this.start = start;
        this.finish = finish;
    }*/
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public @NotEmpty String getStart() {
        return start;
    }

    public void setStart(String start) {
        this.start = start;
    }

    public String getDate_task() {
        return date_task;
    }

    public void setDate_task(String date_task) {
        this.date_task = date_task;
    }


    public String getFinish() {
        return finish;
    }

    public void setFinish(String finish) {
        this.finish = finish;
    }

    public Boolean getDone() {
        return done;
    }

    public void setDone(Boolean done) {
        this.done = done;
    }


    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }

    public Date getCreatedAt() {
        return createdAt;
    }



}






