package pl.team.touchtalk.model;
import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.xml.crypto.Data;
import java.io.Serializable;
import java.sql.Date;
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
    private Date start;

    @Column(name = "finish")
    private Date finish;

    @NotNull
    private Boolean done;

    @NotNull
    @Column(name = "created_at")
    private Date createdAt;

    @JsonIgnore
    @ManyToMany(mappedBy = "tasks")
    private Set<Calendar> cal;

    public Task() {

    }

    @PrePersist
    public void setTask() {
        this.createdAt = new Date(System.currentTimeMillis());

    }

    public Task(@NotEmpty String name, @NotEmpty Data start, @NotEmpty Data finish) {
        this.name = name;
        this.start = (Date) start;
        this.finish = (Date) finish;
    }

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

    public @NotEmpty Data getStart() {
        return (Data) start;
    }

    public void setStart(Date start) {
        this.start = start;
    }



    public Date getFinish() {
        return (Date) finish;
    }

    public void setFinish(Date finish) {
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






