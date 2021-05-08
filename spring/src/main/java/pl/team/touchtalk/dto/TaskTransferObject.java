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
    private Long id;
    private String name;
    private Boolean done;
    private Date start;
    private Date finish;
    private Date created_at;

    public TaskTransferObject(Long id, String name, Boolean done, Date start, Date finish, Date created_at){

        this.id =id;
        this.name=name;
        this.done=done;
        this.start=start;
        this.finish=finish;
        this.created_at=created_at;
    }


    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
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
