package pl.team.touchtalk.dto;

/*
 *
 * @Author Sebastian Pokrywka,

 * @Version 1.0
 * @Since 2021-05-08
 * */

import java.io.Serializable;
import java.sql.Date;
import java.util.Set;

public class CalendarTransferObject implements Serializable{

   private Long id;
   private Long id_user;
   private Date created_id;


   public CalendarTransferObject(Long id, Long id_user,Date created_id){
       this.id=id;
       this.id_user=id_user;
       this.created_id=created_id;
   }

    public Long getId() {
        return id;
    }

    public Long getId_user() {
        return id_user;
    }

    public Date getCreated_id() {
        return created_id;
    }
}
