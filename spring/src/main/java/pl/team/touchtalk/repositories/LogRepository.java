package pl.team.touchtalk.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import pl.team.touchtalk.entities.Log;

@Repository
public interface LogRepository extends CrudRepository<Log, Long> {
}
