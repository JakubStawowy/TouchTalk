package pl.team.touchtalk.dao;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import pl.team.touchtalk.model.Task;

import java.util.List;

@Repository
public interface TaskRepository extends CrudRepository<Task, Long> {

    @Query(value = "SELECT * FROM task t WHERE t.id_user=?1 ", nativeQuery = true)
    List<Task> getTaskByUserId(Long id);

    /*
    Task getbyId(Long id);
    @Query(value = "SELECT * FROM task t WHERE t.id in (SELECT ct.id_task FROM calendar_task ct WHERE ct.calendar_id = ?1)", nativeQuery = true)
    List<Task> getTaskByCalendarId(Long id);
*/

}