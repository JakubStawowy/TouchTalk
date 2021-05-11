package pl.team.touchtalk.dto;

/*
 * Message
 *
 * @Author Sebastian Pokrywka,

 * @Version 1.0
 * @Since 2021-05-08
 * */

import java.io.Serializable;
import java.sql.Date;


public class TaskTransferObject implements Serializable {
    private int id;
    private String name;
    private String data_task;
    private Boolean done;
    private Date start;
    private Date finish;
    private Date created_at;



    public TaskTransferObject(int id, String name, String data_task, boolean done, Date start, Date finish) {
        this.id =id;
        this.name=name;
        this.data_task=data_task;
        this.done=done;
        this.start=start;
        this.finish=finish;
        this.created_at=created_at;

    }


    public int getId() {
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

    public Date getStart() {
        return start;
    }

    public Date getFinish() {
        return finish;
    }

    public Date getCreated_at() {
        return created_at;
    }
}
