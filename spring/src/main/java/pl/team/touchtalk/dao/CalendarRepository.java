package pl.team.touchtalk.dao;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import pl.team.touchtalk.model.Calendar;
import pl.team.touchtalk.model.Task;

import java.util.List;

public interface CalendarRepository extends CrudRepository<Calendar, Long> {
    Calendar getbyId(Long id);

   // @Query(value = "SELECT * FROM calendar c WHERE c.id in (SELECT ct.id_ FROM calendar_task ct WHERE ct.calendar_id = ?1)", nativeQuery = true)



}
