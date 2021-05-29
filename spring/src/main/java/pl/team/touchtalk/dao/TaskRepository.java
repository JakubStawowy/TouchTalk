package pl.team.touchtalk.dao;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import pl.team.touchtalk.model.Task;

import javax.transaction.Transactional;
import java.util.List;

@Repository
public interface TaskRepository extends CrudRepository<Task, Long> {

    @Query(value = "SELECT * FROM task t WHERE t.id_user=?1 ", nativeQuery = true)
    List<Task> getTaskByUserId(Long id);

    @Modifying
    @Transactional
    @Query(value = "Update public.task set done=true where id=?1", nativeQuery = true)
    void putDoneById(Long id);


    /*
@Param(value = "id")
    Task getbyId(Long id);

    @Query(value = "SELECT * FROM task t WHERE t.id in (SELECT ct.id_task FROM calendar_task ct WHERE ct.calendar_id = ?1)", nativeQuery = true)
    List<Task> getTaskByCalendarId(Long id);
*/

}


