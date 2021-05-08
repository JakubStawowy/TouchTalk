package pl.team.touchtalk.dao;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import pl.team.touchtalk.model.Task;

public interface TaskRepository extends CrudRepository<Task, Long> {

    @Query(nativeQuery = true, value = "SELECT * FROM task WHERE ")
;
}
