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

    @Column(name = "name")
    private String name;



    @Column(name = "data_task")
    private String data_task;

    @Column(name = "start")
    private String start;

    @Column(name = "finish")
    private String finish;



    private Boolean done;


    @Column(name = "created_at")
    private Date createdAt;


    @Column(name = "id_user")
    private Long id_user;



    public Task(Long id,  String name, String data_task, String start, String finish,  Boolean done,Long  id_user) {
        this.id = id;
        this.name = name;
        this.data_task = data_task;
        this.start = start;
        this.finish = finish;
        this.done = done;
        this.id_user=id_user;
    }


    public Task(Long id, @NotNull String name, String data_task, String start, String finish, @NotNull Boolean done,Long  id_user) {
        this.id = id;
        this.name = name;
        this.data_task = data_task;
        this.start = start;
        this.finish = finish;
        this.done = done;
        this.id_user=id_user;
    }

    public Task() {

    }

    public Long getId_user() {
        return id_user;
    }

    public void setId_user(Long id_user) {
        this.id_user = id_user;
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

    public  String getStart() {

        return start;
    }

    public void setStart(String start) {
        this.start = start;
    }

    public String getData_task() {
        return data_task;
    }

    public void setData_task(String data_task) {
        this.data_task = data_task;
    }


    public void setData_task(String data_task) {
        this.data_task = data_task;
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