package pl.team.touchtalk.dao;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import pl.team.touchtalk.model.Group;

@Repository
public interface GroupRepository extends CrudRepository<Group, Long> {
}
