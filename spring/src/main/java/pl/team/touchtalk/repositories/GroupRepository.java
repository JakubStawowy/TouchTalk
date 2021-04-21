package pl.team.touchtalk.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import pl.team.touchtalk.entities.Group;

@Repository
public interface GroupRepository extends CrudRepository<Group, Long> {
}
