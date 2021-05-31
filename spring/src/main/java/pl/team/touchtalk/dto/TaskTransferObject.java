package pl.team.touchtalk.dto;

/*
 * Task Transfer Object
 *
 * @Author Sebastian Pokrywka

 * @Version 1.0
 * @Since 2021-05-08
 * */

import java.io.Serializable;
import java.sql.Date;


public class TaskTransferObject implements Serializable {
    private Long id;
    private String name;
    private String data_task;
    private Boolean done;
    private String start;
    private String finish;
    private Date created_at;
    private  Long id_user;





    public TaskTransferObject(Long id, String name, String data_task, boolean done, String start, String finish,Long id_user) {
        this.id =id;
        this.name=name;
        this.data_task=data_task;
        this.done=done;
        this.start=start;
        this.finish=finish;
        this.created_at=created_at;
        this.id_user=id_user;

    }


    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getData_task() {
        return data_task;
    }

    public Boolean getDone() {
        return done;
    }

    public String getStart() {
        return start;
    }

    public String getFinish() {
        return finish;
    }

    public Date getCreated_at() {
        return created_at;
    }
    public Long getId_user() {
        return id_user;
    }
}

